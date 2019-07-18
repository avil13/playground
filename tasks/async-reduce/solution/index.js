/**
 * Асинхронный reduce
 * @param  {any[]}    input
 * @param  {Function} iterator
 * @param  {any} initialValue
 * @return {Promise}
 */
async function asyncReduce(input, iterator, initialValue) {
    for (let i = 0; i < input.length; i++) {
        if (typeof input[i] === 'function') {
            input[i] = await input[i]();
        }

        initialValue = iterator(initialValue, input[i]);
    }

    return initialValue;
}
