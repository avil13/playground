const vm = require('vm');
const path = require('path');
const load = require('./load-module-src')(path.join(__dirname, '..', 'node_modules'));

const jsdom = require('jsdom');
const {
    JSDOM
} = jsdom;

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
        setTimeout,
        require,
        module,
        exports,
        console: consoleVm,
        _code: {}, // данные возвращаемые тестами
        isolate(callback) {
            const res = callback();
            return {
                getResult() {
                    return res;
                }
            }
        }
    };

    this.codeMap = new Map();
}

Run.prototype.add = function (key, code) {
    this.codeMap.set(key, code);

    return this;
};

Run.prototype.run = function (tags) {

    if (tags.includes('html')) {
        const html = this.codeMap.get('html');
        const dom = new JSDOM(html);
        const window = dom.window; // переменаня нужна для simulate-event
        const document = dom.window.document; // переменаня нужна для simulate-event

        this.sandbox['window'] = window;
        this.sandbox['document'] = document;

        const se = load('simulate-event');

        this.sandbox['simulateEvent'] = eval(se);
    }

    const code = wrapByTags(this.codeMap, tags);

    // VM
    vm.createContext(this.sandbox);

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
function wrapByTags(codeMap, tags = []) {
    // нет ни каких действий
    tags.forEach(tag => {
        console.log(_tag, tag);
        switch (tag) {
            case 'try-all': // оборачиваем весь код в try catch
                codeMap.add('prefix', 'try {');
                codeMap.add('suffix', ' } catch(e) { console.error(e) }');
                break;

            case 'try-src':
                codeMap.add('prefixSrc', 'try {');
                codeMap.add('suffixSrc', ' } catch(e) { console.error(e) }');
                break;

            case 'skip-src':
                codeMap.add('src', '');
                break;
        }
    });

    const code = [
            codeMap.get('libs'),

            codeMap.get('prefix'),

            // codeMap.get('html'),

            codeMap.get('prefixSrc'),
            codeMap.get('src'),
            codeMap.get('suffixSrc'),

            codeMap.get('solution'),
            codeMap.get('test'),

            codeMap.get('suffix'),
        ]
        .filter(v => !!v)
        .join('\n\n');

    return code;
}
