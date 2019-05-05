//@skip-src

function uniq(values) {
    return values.filter((val, index, arr) => {
        return arr.indexOf(val) === index;
    });
}
