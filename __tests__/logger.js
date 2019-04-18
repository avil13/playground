module.exports = {
    logger,
    logState
};



// colors
const _green = '\x1b[32m';
const _red = '\x1b[31m';
const _greenBg = '\x1b[42m';
const _redBg = '\x1b[41m';
const _cyan = '\x1b[0;36m';
const _white = '\x1b[0;37m';
const _off = '\x1b[0m';
const _right = '\x1b[30G'


/**
 * Функция для логирования результатов теста
 *
 * @param {string} testName ключ - описание теста
 * @param {object} state объект родителя, для отправки статуса теста
 * @returns {function}
 */
function logger(testName, state) {

    // обнулем стейт
    state.result = false;
    ++state.waiting;

    return function loggerChild(value) {
        let _val = value;
        let _desc = s(value); // full description if error

        if (Array.isArray(value)) {
            _val = s(value[0]) === s(value[1]);
            _desc = `\n${_red}⇒${_off} ${s(value[0])} \n${_green}⇒${_off} ${s(value[1])}`
        }

        state.list.push([
            (_cyan + testName + '\t'),
            (_val ? _green : _red),
            _right + (_val || _val + ' ' + _desc),
            _off
        ].join(' '));

        state.result = !!_val || false;
        state.waiting--;
    }
}


/**
 * Отображение состояния в консоли
 *
 * @param {*} state
 */
function logState(state) {
    if (state.waiting < 1) {
        console.log(
            '\n' +
            `${state.result ? _greenBg : _redBg} ${state.name} ${_off}` +
            `${state.result ? _green : _red} ${state.file} ${_off}`
        );

        state.list.forEach(v => {
            console.log(v);
        });
    } else {
        setTimeout(function() {
            --state.waiting; // что бы не уйти в цикл
            logState(state);
        }, 700);
    }
}

/**
 * Helper
 *
 * @param {*} val
 */
function s(val) {
    return JSON.stringify(val, null, 0);
}
