//@skip-src

/**
 * Перенос нулей в конец массива
 * @param  {number[]} input
 * @return {number[]}
 */
function zsort(input) {
    return input.sort((a, b) => {
        if (a === 0) {
            return 1;
        }
        return -1;
    });
}
