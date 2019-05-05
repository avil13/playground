const vm = require('vm');
const path = require('path');
const load = require('./load-module-src')(path.join(__dirname, '..', 'node_modules'));

const {
    performance
} = require('perf_hooks');

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
        clearTimeout,
        setTimeout, // : function(fn, time, arg) { time = (time||1) / 10; setTimeout(fn, time, arg); },
        performance,
        require,
        module,
        exports,
        console: consoleVm,
        _testCode: {}, // данные возвращаемые тестами
        _result: {} // результаты тестов
    };

    this.codeMap = new Map();
}

Run.prototype.set = function (key, code) {
    this.codeMap.set(key, code);
    return this;
};

Run.prototype.run = function (callback) {
    this.usedTags = [];

    const {
        isEnd,
        code
    } = processTags.call(this, callback);

    // если теги не указали пропустить тест,
    // то запускаем его в песочнице
    if (isEnd === false) {
        runVm.call(this, code, callback); // VM
    }

    setTimeout(() => {
        callback(this.sandbox, this.usedTags);
    }, 1100);
}

/**
 * Оработка тегов
 *
 * @param {Function} callback
 * @returns
 */
function processTags(callback) {
    // skip this test
    if (this.tags.includes('skip')) {
        this.usedTags.push('skip');

        return {
            isEnd: true,
            code: ''
        };
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

    const code = getCodeByTags.call(this, this.codeMap, this.tags);

    return {
        isEnd: false,
        code
    };
};


/**
 * Запуск Песочницы
 *
 * @param {String} code
 */
function runVm(code) {
    try {
        vm.createContext(this.sandbox);

        vm.runInContext(code, this.sandbox, {
            timeout: 1500,
            breakOnSigint: true,
            displayErrors: false
        });
    } catch (err) {
        if (err.message && err.stack) {
            if (this.tags.includes('hide-error-message')) {
                this.usedTags.push('hide-error-message');
            } else {
                console.error(err.message);
            }

            if (this.tags.includes('hide-error-stack')) {
                this.usedTags.push('hide-error-stack');
            } else {
                console.error(err.stack);
            }
        } else {
            if (this.tags.includes('hide-error-message') || this.tags.includes('hide-error-stack')) {
                this.usedTags.push('hide-error-message');
                this.usedTags.push('hide-error-stack');
            } else {
                console.error(err);
            }
        }

        if (process.env.NODE_ENV !== 'dev') {
            process.exit(1);
        }
    }
}


/**
 * обрабатываем код соглано указанным тегам
 *
 * @param {*} codeMap
 * @param {Array} [tags=[]]
 * @returns String
 */
function getCodeByTags(codeMap, tags = []) {
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
    codeMap.set('isolate', `${isolate}`);

    const code = [
            codeMap.get('libs'),

            codeMap.get('prefix'),

            // codeMap.get('html'),

            codeMap.get('prefixSrc'),
            codeMap.get('src'),
            codeMap.get('suffixSrc'),

            codeMap.get('isolate'),

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
 */
function takeResults(tests) {
    const resultOfTests = {};

    for (let key in tests) {
        if (tests.hasOwnProperty(key)) {
            const fn = tests[key];

            resultOfTests[key] = {
                result: null,
                resolve: null,
                reject: null,
                time: 0,
                timerStart() {
                    this.time = performance.now();
                },
                timerEnd() {
                    this.time = performance.now() - this.time;
                    const len = `${parseInt(this.time)}`.length;
                    this.time = this.time.toFixed(5 - len) + 'ms';
                }
            };


            resultOfTests[key].timerStart();

            resultOfTests[key].result = fn.call(
                null,
                function resolve(value) {
                    if (resultOfTests[key].reject === null) {
                        resultOfTests[key].resolve = value;
                        resultOfTests[key].timerEnd();
                    }
                },
                function reject(value) {
                    if (resultOfTests[key].resolve === null) {
                        resultOfTests[key].reject = !value || value === 'fail'; // !(value === false || value === 'fail' || !value);
                        resultOfTests[key].timerEnd();
                    }
                }
            );

            if (resultOfTests[key].result !== undefined) {
                resultOfTests[key].timerEnd();
            }
        }
    }

    return resultOfTests;
}


/**
 * функция тестов внутри песочницы
 */
function isolate(callback) {
    const res = callback();
    return {
        getResult() {
            return res;
        }
    };
}
