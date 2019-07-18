//@skip-src

/**
 * Перенос нулей в конец массива
 * @param  {number[]} input
 * @return {number[]}
 */
function zsort(input) {
    const nums = [];
    const zeros = [];

    for (let i = 0; i < input.length; i++) {
        if (input[i] === 0) {
            zeros.push(input[i]);
        } else {
            nums.push(input[i]);
        }
    }

    return [...nums, ...zeros];
}
