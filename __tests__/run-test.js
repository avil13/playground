const {
    logger,
    logState
} = require('./logger');

module.exports = runTest;


function makeState(data) {
    return {
        name: data.testName,
        file: data.testFile,
        result: null,
        list: [],
        testMap: {}, // для проверки промисов
        get isEnd() {
            for (let k in this.testMap) {
                if (this.testMap.hasOwnProperty(k)) {
                    if (this.testMap[k] === false) {
                        return false;
                    }
                }
            }
            return true;
        },
        set isEnd(v) {}
    };
}

/**
 * Test runner
 */
function runTest({
    testFile,
    testName,
    testResult
}) {
    const state = makeState({
        testFile,
        testName
    });

    for (let key in testResult) {
        if (testResult.hasOwnProperty(key)) {

            const {
                resolve,
                reject
            } = logger(key, state);

            const res = testResult[key];

            // resolve(res.result || res.resolve);
            resolve(res.result || res.resolve);

            if (res.reject !== null) {
                reject(res.reject);
            }
        }
    }

    logState(state);
}
