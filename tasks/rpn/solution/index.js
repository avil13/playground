//@skip-src

/**
 * Реализовать функцию суммирования
 * @param  {string} input
 * @return {number}
 */
function calc(input) {
    const operands = [];
    let res = 0;

    input.split(' ').forEach(v => {
        if (/\d/.test(v)) {
            operands.push(+v);
        } else {
            const n1 = operands[operands.length - 2];
            const n2 = operands[operands.length - 1];

            switch (v) {
                case '+':
                    res = n1 + n2;
                    break;
                case '-':
                    res = n1 - n2;
                    break;
                case '*':
                    res = n1 * n2;
                    break;
                case '/':
                    res = n1 / n2;
                    break;
            }

            operands.splice(-2, 2, res);
        }
    });

    return res;
}
