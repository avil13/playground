const vm = require('vm');
const path = require('path');
const load = require('./load-module-src')(path.join(__dirname, '..', 'node_modules'));

const jsdom = require('jsdom');
const {
    JSDOM
} = jsdom;

module.exports = Run;

const _vm = `\x1b[0;33m vm:\x1b[0m`;
const _err = `\x1b[0;31m[Error]:\x1b[0m`;
const _tag = `\x1b[0;34m[tag]: \x1b[0m`;

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
function Run(tags) {
    if (!(this instanceof Run)) {
        return new Run();
    }

    this.tags = tags;

    // песочница со ссылкой на текущий котекст
    // в некоторых объектах
    this.sandbox = {
        setTimeout, // : function(fn, time, arg) { time = (time||1) / 10; setTimeout(fn, time, arg); },
        require,
        module,
        exports,
        console: consoleVm,
        _testCode: {}, // данные возвращаемые тестами
        _result: {}, // результаты тестов
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

Run.prototype.run = function (callback) {
    this.usedTags = [];

    // skip this test
    if (this.tags.includes('skip')) {
        this.usedTags.push('skip');
        logTags(this.usedTags);
        callback({ _testCode: {}, _result: {} });
        return;
    }

    // use HTML in script
    if (this.tags.includes('html')) {
        this.usedTags.push('html');

        const html = this.codeMap.get('html');
        const dom = new JSDOM(html);
        const window = dom.window; // need for simulate-event
        const document = dom.window.document; // need for simulate-event

        this.sandbox['window'] = window;
        this.sandbox['document'] = document;

        const se = load('simulate-event');
        this.sandbox['simulateEvent'] = eval(se);

        // find ID and pass to variable
        const ids = html.match(/id="([^"]+)/gm);
        if (ids) {
            ids.forEach(id => {
                const name = id.replace('id="', '');
                this.sandbox[name] = document.getElementById(name);
            });
        }
    }

    const code = wrapByTags.call(this, this.codeMap, this.tags);

    // VM
    vm.createContext(this.sandbox);

    try {
        vm.runInContext(code, this.sandbox, {
            timeout: 5000,
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

    setTimeout(() => {
        logTags(this.usedTags);
        callback(this.sandbox, this.tags);
    }, 1100);
};


function logTags(usedTags) {
    if (usedTags.length > 0) {
        console.log(
            usedTags.map(t => _tag + t).join('\n')
        );
    }
}


/**
 * обрабатываем код соглано указанным тегам
 *
 * @param {*} src
 * @param {*} tag
 */
function wrapByTags(codeMap, tags = []) {
    // нет ни каких действий
    tags.forEach(tag => {
        switch (tag) {
            case 'try-all': // оборачиваем весь код в try catch
                this.usedTags.push('try-all');
                codeMap.set('prefix', 'try {');
                codeMap.set('suffix', ' } catch(e) { console.error(e) }');
                break;

            case 'try-src':
                this.usedTags.push('try-src');
                codeMap.set('prefixSrc', 'try {');
                codeMap.set('suffixSrc', ' } catch(e) { console.error(e) }');
                break;

            case 'skip-src':
                this.usedTags.push('skip-src');
                codeMap.set('src', '');
                break;
        }
    });

    codeMap.set('results', `_result=(${takeResults})(_testCode)`);

    const code = [
            codeMap.get('libs'),

            codeMap.get('prefix'),

            // codeMap.get('html'),

            codeMap.get('prefixSrc'),
            codeMap.get('src'),
            codeMap.get('suffixSrc'),

            codeMap.get('solution'),
            codeMap.get('test'),

            codeMap.get('results'),

            codeMap.get('suffix'),
        ]
        .filter(v => !!v)
        .join('\n\n');

    return code;
}


/**
 * функция для сбора результатов тестов внутри песочницы
 *
 */
function takeResults(tests) {
    const results = {};

    for (let key in tests) {
        if (tests.hasOwnProperty(key)) {
            const fn = tests[key];
            results[key] = {
                result: null,
                resolve: null,
                reject: null
            };

            results[key].result = fn.call(
                null,
                function resolve(value) {
                    if (results[key].reject === null) {
                        results[key].resolve = value;
                    }
                },
                function reject(value) {
                    if (results[key].resolve === null) {
                        results[key].reject = !(value === false || value === 'fail');
                    }
                }
            );
        }
    }

    return results;
}
