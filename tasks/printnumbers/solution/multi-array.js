//@skip-src

/**
 * Вывод чисел в колонках
 * @param   {Number}  max    от 0 до max
 * @param   {Number}  cols   количество колонок
 * @returns {String}
 */
var printNumbers = function (max, cols) {
    const res = [
        [] // first line
    ];

    const lineIndex = Math.ceil(max / cols);

    for (let i = 0; i < max; i++) {
        const columIndex = i % lineIndex;

        if (!res[columIndex]) {
            res.push([]); // new line
        }

        res[columIndex].push(i);
    }

    return res.map(v => v.join(' ')).join('\n');
};
