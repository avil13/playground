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
const _right = '\x1b[40G'


/**
 * Функция для логирования результатов теста
 *
 * @param {string} name ключ - описание теста
 * @param {object} state объект родителя, для отправки статуса теста
 * @returns {function}
 */
function logger(name, state) {
    // обнулем стейт
    state.result = true;
    state.list = [];

    return function loggerChild(value) {
        let _val = value;
        let _desc = s(value); // full description if error

        if (Array.isArray(value)) {
            _val = s(value[0]) === s(value[1]);
            _desc = `\n${_red}⇒${_off} ${s(value[0])} \n${_green}⇒${_off} ${s(value[1])}`
        }

        state.list.push([
            (_cyan + name + '\t'),
            (_val ? _green : _red),
            _right + (_val || _val + _white + ' ' + _desc),
            _off
        ].join(' '));

        if (!_val) {
            state.result = false;
        }
    }
}


/**
 * Отображение состояния в консоли
 *
 * @param {*} state
 */
function logState(state) {
    console.log('');

    console.log(`${state.result ? _greenBg : _redBg} ${state.name} ${_off}`);

    if (state.result === false) {
        console.log(`${_red}${state.file}${_off}`);
    }

    state.list.forEach(v => {
        console.log(v);
    });
}

/**
 * Helper
 *
 * @param {*} val
 */
function s(val) {
    return JSON.stringify(val, null, 0);
}
