//@skip-src

/**
 * Реализовать RLE-сжатие: AAAB -> A3B, BCCDDDAXXXX -> BC2D3AX4
 * @param  {string} value
 * @return {string}
 */
function rle(value) {
    const re = /(.)\1+/g;

    return value.replace(re, function (letterGroup, letter) {
        return `${letter}${letterGroup.length}`;
    });
}
