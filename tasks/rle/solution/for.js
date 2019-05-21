//@skip-src

/**
 * Реализовать RLE-сжатие: AAAB -> A3B, BCCDDDAXXXX -> BC2D3AX4
 * @param  {string} value
 * @return {string}
 */
function rle(value) {
    let count = 1;
    let res = '';
    let prev = '';

    for (let i = 0; i <= value.length; i++) {
        const next = value[i];

        if (prev === next) {
            count++;
        } else {
            res += `${prev}${count === 1 ? '' : count}`;
            count = 1;
            prev = next;
        }
    }

    return res;
}
