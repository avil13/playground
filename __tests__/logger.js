module.exports = {
    logger,
    logState
};


// colors
const _green = '\x1b[32m';
const _red = '\x1b[31m';
const _blue = '\x1b[34m';
const _greenBg = '\x1b[42m';
const _redBg = '\x1b[41m';
const _blueBg = '\x1b[44m';
const _cyan = '\x1b[0;36m';
const _white = '\x1b[0;37m';
const _gray = '\x1b[0;90m';
const _off = '\x1b[0m';
const _right = '\x1b[40G'


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
        let _desc = `\n${_red}⇒${_off} ${s(value)}`; // full description if error

        if (Array.isArray(value)) {
            _val = s(value[0]) === s(value[1]);
            _desc = `\n${_red}⇒${_off} ${s(value[0])} \n${_green}⇒${_off} ${s(value[1])}`
        }

        state.list.push([
            (_cyan + testName),
            (_val === true ? _green : _red),
            _right,
            (_val === true || 'false ' + _desc),
            _off
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
            statusStr = `${_blueBg} ${state.name} ${_off} ${_blue} ${state.file} ${_off}`;
        } else if (state.result === true) {
            statusStr = `${_greenBg} ${state.name} ${_off} ${_green} ${state.file} ${_off}`;
        } else {
            statusStr = `${_redBg} ${state.name} ${_off} ${_red} ${state.file} ${_off}`;
        }

        console.log(statusStr);
        console.log(state.list.join('\n'));
        console.log(
            _gray + ''.padStart(45, '—') + _off
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
