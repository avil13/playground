//@skip-src

/**
 * Найти пересечение двух массивов
 * @param  {number[]} left
 * @param  {number[]} right
 * @return {number[]}
 */
function intersection(left, right) {
    const res = [];
    left.forEach(v => {
        if (right.includes(v)) {
            res.push(v);
        }
    });
    return res;
}

console.log(intersection(
    [1, 2, 3, 4, 5],
    [2, 8, 3]
));
