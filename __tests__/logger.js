module.exports = logger;


function logger(name, value) {
    // colors
    const _green = '\x1b[32m';
    const _red = '\x1b[31m';
    const _cyan = '\x1b[0;36m';
    const _white = '\x1b[0;37m';
    const _off = '\x1b[0m';

    let _val = value;
    let _desc = s(value); // full description if error

    if (Array.isArray(value)) {
        _val = s(value[0]) === s(value[1]);
        _desc = `\n${_red}⇒${_off} ${s(value[0])} \n${_green}⇒${_off} ${s(value[1])}`
    }

    console.log([
        (_cyan + name + '\t'),
        (_val ? _green : _red),
        (_val || _val + _white + ' ' + _desc),
        _off
    ].join(' '));
}

function s(val) {
    return JSON.stringify(val, null, 0);
}
