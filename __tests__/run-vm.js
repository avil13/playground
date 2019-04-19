const vm = require('vm');

module.exports = Run;

const _vm = `\x1b[0;33m vm:\x1b[0m`;
const _err = `\x1b[0;31m [Error]:\x1b[0m`;

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
        _code: {},
        setTimeout,
        console: consoleVm
    };

    this.code = '';

    vm.createContext(this.sandbox);
}

Run.prototype.add = function (code) {
    this.code += '\n\n' + code;
    return this;
};

Run.prototype.run = function () {
    // const code = `try { ${ this.code } } catch(e) { console.error(e) }`;
    const code = this.code;

    try {
        vm.runInContext(code, this.sandbox, {
            timeout: 10000,
            breakOnSigint: true,
            displayErrors: true
        });
    } catch(err) {
        console.log(_err);
        if (err.message && err.stack) {
            console.error(err.message);
            console.error(err.stack);
        } else {
            console.error(err);
        }

        if (process.env.NODE_ENV !== 'dev') {
            process.exit(1);
        }
    }

    return this.sandbox;
};
