function getAnagrams(inputList) {
    const res = [];
    const tmp = {};

    const list = toSingleArray(inputList);
    const orderList = []; // for the correct order

    list.forEach(function (str) {
        const hash = getHash(str);

        if (!tmp[hash]) {
            tmp[hash] = [];
            orderList.push(hash);
        }

        tmp[hash].push(str)
    });

    orderList.forEach(key => {
        if (tmp[key].length > 1) {
            res.push(tmp[key]);
        }
    });

    return res;
}

function toSingleArray(arr) {
    return arr.reduce((a, b) => {
        return a.concat(b);
    }, []);
}

function getHash(str) {
    var hash = 0,
        i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i);
    }
    return hash;
}
