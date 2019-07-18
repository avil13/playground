//@skip-src


function zero(...args) {
    if (args.length === 0) {
        return sum.apply(null, args);
    }

    return (...subArgs) => {
        const tmpArr = [...args, ...subArgs];

        if (subArgs.length === 0) {
            return sum.apply(null, tmpArr);
        }

        return zero.apply(null, tmpArr);
    }
}


function sum(...nums) {
    return nums.reduce((a, b) => {
        return +a + +b;
    }, 0);
}
