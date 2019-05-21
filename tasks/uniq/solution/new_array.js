//@skip-src

function uniq(values) {
    const res = [];
    for (let i = 0; i < values.length; i++) {
        if (res.indexOf(values[i]) === -1) {
            res.push(values[i]);
        }
    }
    return res;
}
