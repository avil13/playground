
/**
 * Две строки называются изоморфными, когда в строке A можно заменить
 * конкретный символ на любой другой для получения строки B.
 * Порядок символов должен остаться неизменным. Каждый
 * последовательный символ в строке A сравнивается с
 * каждым последовательным символов в строке B.
 *
 * @param  {string} left
 * @param  {string} right
 * @return {boolean}
 */
function isIsomorphic(left, right) {
    if (left.length !== right.length) {
        return false;
    }

    return getStringIndexHash(left) === getStringIndexHash(right);
}

function getStringIndexHash(str) {
    const res = [];

    return str
        .split('')
        .map(v => {
            if (res.indexOf(v) === -1) {
                res.push(v);
            }
            return res.indexOf(v);
        })
        .join('');
}
