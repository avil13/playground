//@skip-src

// Вариант решения от Гриши

let zero = (function f(...a) {
    let s = a.reduce((x, y) => x + y, 0);
    return (...a) => a.length ? f.apply(null, [s, ...a]) : s;
})(0);
