//@skip-src

// Написать функцию получения простых чисел.
// Число является простым, если делиться на 1 и само себя.

var getNaturalNumbers = function (max) {
    const list = [];

    for (let num = 2; num <= max; num++) {
        if (isNaturalNumber(num)) {
            list.push(num);
        }
    }

    return list;
};


function isNaturalNumber(num) {
    if (num < 2) {
        return false;
    }

    const maxNumber = Math.floor(Math.sqrt(num));

    for (let i = 2; i <= maxNumber; i++) {
        if (num % i == 0) {
            return false;
        }
    }

    return true;
}


console.log(getNaturalNumbers(40));
