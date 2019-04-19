const vm = require('vm');

module.exports = Run;

const _vm = `\x1b[0;33m vm:\x1b[0m`;
const _err = `\x1b[0;31m [Error]:\x1b[0m`;
const _tag = `\x1b[0;34m [tag]:\x1b[0m`;

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

    this.codes = [];

    vm.createContext(this.sandbox);
}

Run.prototype.add = function (code) {
    this.codes.push(code);
    return this;
};

Run.prototype.run = function (tags = []) {
    // const code = `try { ${ this.code } } catch(e) { console.error(e) }`;
    const code = wrapByTags(this.codes, tags);

    try {
        vm.runInContext(code, this.sandbox, {
            timeout: 10000,
            breakOnSigint: true,
            displayErrors: true
        });
    } catch (err) {
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


/**
 * обрабатываем код соглано указанным тегам
 *
 * @param {*} src
 * @param {*} tag
 */
function wrapByTags(codes = [], tags = []) {
    // нет ни каких действий
    if (tags.length === 0) {
        return codes.join('\n\n');
    }

    let code = '';

    tags.forEach(tag => {
        switch (tag) {
            case 'try-all': // оборачиваем весь код в try catch
                console.log(_tag, tag);
                code = `try {${ codes.join('\n\n') } } catch(e) { console.error(e) }`;
                break;

            case 'try-src':
                console.log(_tag, tag);
                code = codes.map((c, i) => {
                    if (i === 0) {
                        return `try {${ c } } catch(e) { }`
                    }
                    return c;
                }).join('\n\n');
                break;

            case 'skip-src':
                console.log(_tag, tag);
                code = codes.map((c, i) => {
                    return (i === 0) ? '' : c;
                }).join('\n\n');
                break;
        }
    });

    return code || codes.join('\n\n');
}
