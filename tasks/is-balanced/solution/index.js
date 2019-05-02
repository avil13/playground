/**
 * Проверка на сбалансированность фигурных скобкок
 * @param  {string}  input
 * @return {boolean}
 */
function isBalanced(input) {
    let left = 0;
    let right = 0;
    input.split('').forEach(v => {
        if (v === '{') {
            left++;
        } else if (v === '}') {
            right++;
        }
    });
    return left === right;
}
