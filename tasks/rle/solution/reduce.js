//@skip-src

/**
 * Реализовать RLE-сжатие: AAAB -> A3B, BCCDDDAXXXX -> BC2D3AX4
 * @param  {string} value
 * @return {string}
 */
function rle(value) {
    let count = 1;
    let res = '';

    // к строке добавляется еще один символ,
    // без него в reduce не хватает еще одного прохода
    (value + '_').split('')
        .reduce((prev, next) => {
            if (prev === next) {
                count++;
            } else {
                res += `${prev}${count === 1 ? '' : count}`;
                count = 1;
            }

            return next;
        }, '');

    return res;
}
