//@skip-src

const MAXIMUM = 20; // количество римских цифр которые мы добавим

// пройдемся по циклу, добавляя значения в Number
for (let i = 1; i < MAXIMUM; i++) {
    Number.prototype[getRoman(i)] = range(i);
}


// helpers

function range(_length) {
    return Array.from(Array(_length).keys());
}

function getRoman(num) {
    let roman = '';

    const lookup = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    for (let i in lookup) {
        while (num >= lookup[i]) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
}
