//@skip-src

/**
 * Является ли строка палиндромом
 * @param  {string}  value
 * @return {boolean}
 */
function isPalindrome(value) {
    value = value.toLowerCase().replace(/[^a-z]/gi, '');

    if (value.length === 0) {
        return true;
    }

    const len = value.length - 1;
    const pivot = Math.floor(value.length / 2) + 1;

    for (let i=0; i < pivot; i++) {
        const index1 = i;
        const index2 = len - i;
        if (value.charCodeAt(i) !== value.charCodeAt(len - i)) {
            return false;
        }
    }
    return true;
}
