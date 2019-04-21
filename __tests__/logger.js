module.exports = {
    logger,
    logState
};


// colors
const clc = require('./color');

/**
 * Функция для логирования результатов теста
 *
 * @param {string} testName ключ - описание теста
 * @param {object} state объект родителя, для отправки статуса теста
 * @returns {function}
 */
function logger(testName, state) {
    // обнулем стейт
    state.result = null;

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

        state.list.push([
            clc.cyan(testName),
            clc._right,
            clc.greenOrRed(_val, _val === true || 'false ' + '\n' + _desc)
        ].join(' '));

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

        if (state.result === null) {
            statusStr = clc.blueBg(state.name, state.file);
        } else {
            statusStr = clc.greenOrRedBg(state.result, state.name, state.file);
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
