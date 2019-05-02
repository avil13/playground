module.exports = {
    logger,
    logState,
    makeState,
    getAllTestLog
};


// colors
const clc = require('./color');

const allTestLog = {
    files: 0,
    success: 0,
    failed: 0,
    skip: 0
};

function getAllTestLog() {
    return allTestLog;
}


function makeState(data) {
    if (!data.testName) {
        throw 'makeState empty parametr "{ testName }"'
    }
    if (!data.testFile) {
        throw 'makeState empty parametr "{ testFile }"'
    }
    return {
        name: data.testName,
        file: data.testFile,
        result: null,
        list: [],
        testMap: {}, // для проверки промисов
        get isEnd() {
            for (let k in this.testMap) {
                if (this.testMap.hasOwnProperty(k)) {
                    if (this.testMap[k] === false) {
                        return false;
                    }
                }
            }
            return true;
        },
        set isEnd(v) {}
    };
}


/**
 * Функция для логирования результатов теста
 *
 * @param {string} testName ключ - описание теста
 * @param {object} state объект родителя, для отправки статуса теста
 * @returns {function}
 */
function logger(testName, state) {
    // этот тест еще не завершен
    state.testMap[testName] = false;

    // ok test
    function resolve(value) {
        let _val = value;
        let _desc = clc.red('⇒', s(value)); // full description if error

        if (Array.isArray(value)) {
            _val = s(value[0]) === s(value[1]);
            _desc = clc.red('⇒', s(value[0])) +
                '\n' +
                clc.green('⇒', s(value[1]));
        }

        state.testMap[testName] = true;

        // check, all test is good?
        state.result = ((res, val) => {
            switch (res) {
                case null:
                case true:
                    return val === true;
                default:
                    return false;
            }
        })(state.result, _val);


        state.list.push([
            clc.cyan(testName),
            clc._right,
            clc.greenOrRed(
                state.result,
                _val === true || 'false ' + '\n' + _desc
            )
        ].join(' '));
    }


    // fail test
    function reject(value) {
        const res = value === false || value === 'fail';
        resolve(res);
    }


    return {
        resolve,
        reject
    };
}


/**
 * Отображение состояния в консоли
 *
 * @param {*} state
 */
function logState(state, isRunAgain = true) {
    if (state.isEnd || isRunAgain === false) {

        let statusStr = '';

        ++allTestLog.files;

        if (state.result === null) {
            statusStr = clc.blueBg(state.name, state.file);
            ++allTestLog.skip;
        } else {
            statusStr = clc.greenOrRedBg(state.result, state.name, state.file);
            ++(allTestLog[state.result ? 'success' : 'failed']);
        }

        console.log(statusStr);
        console.log(state.list.join('\n'));
        console.log(
            clc.gray(''.padStart(45, '—'))
        ); // test delimiter
    } else {
        setTimeout(function () {
            logState(state, false);
        }, 1100);
    }
}


/**
 * Helper
 */
function s(val) {
    if (typeof val === 'function') {
        return val.toString();
    }
    return JSON.stringify(val, null, 0);
}
