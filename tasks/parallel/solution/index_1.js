/*
 так как с webWorker'ами пока беда,
 второй вариан решения, пока работает только в браузере

 https://github.com/avil13/try_js_test/blob/master/src_2/index_2.2.js
*/


// Паралельные вычисления
function parallel(funcs, callback) {

    // просто счетчик того что у нас остались не завершенные задания
    let _waitings = 0;
    let _pendings = new Array(funcs.length);

    const resolve = (index) => {
        return (result) => {
            --_waitings;
            _pendings[index] = result;

            if (_waitings === 0) {
                callback(_pendings);
            }
        }
    };

    for (let i=0; i < funcs.length; i++) {
        const fn = funcs[i];
        const value = fn(resolve(i));

        if (value === undefined) {
            ++_waitings;
        } else {
            _pendings[i] = value;
        }
    }

    if (_waitings === 0) {
        callback(_pendings);
    }
}
