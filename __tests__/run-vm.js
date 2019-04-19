const vm = require('vm');

module.exports = Run;

const _vm = `\x1b[0;33m vm:\x1b[0m`;

const consoleVm = {
    ...console,
    ...{
        log(...args) {
            if (process.env.NODE_ENV === 'dev') {
                console.log.apply(null, [_vm, ...args]);
            }
        },
        warn(...args) {
            if (process.env.NODE_ENV === 'dev') {
                console.warn.apply(null, [_vm, ...args]);
            }
        },
        error(...args) {
            if (process.env.NODE_ENV === 'dev') {
                console.error.apply(null, [_vm, ...args]);
            }
        }
    }
};

/**
 * Run virtual sandbox
 */
function Run() {
    if (!(this instanceof Run)) {
        return new Run();
    }
    // песочница со ссылкой на текущий котекст
    // в некоторых объектах
    this.sandbox = {
        setTimeout,
        console: consoleVm
    };

    vm.createContext(this.sandbox);
}

Run.prototype.add = function (code) {
    vm.runInContext(code, this.sandbox, {
        timeout: 10000,
        breakOnSigint: true,
        displayErrors: true
    });
    return this.sandbox;
};
