const {
    logger,
    logState,
    makeState
} = require('./logger');

module.exports = runTest;


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

            resolve(res.result || res.resolve);

            if (res.reject !== null) {
                reject(res.reject);
            }
        }
    }

    logState(state);
}
