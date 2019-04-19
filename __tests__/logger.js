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
    state.result = null;
    ++state.waiting;

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

        state.waiting--;
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
        setTimeout(function () {
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
    if (typeof val === 'function') {
        return val.toString();
    }
    return JSON.stringify(val, null, 0);
}
