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
    testResult,
    tags
}) {
    const state = makeState({
        testFile,
        testName,
        tags
    });

    for (let key in testResult) {
        if (testResult.hasOwnProperty(key)) {
            const res = testResult[key];

            const value = (res.result || res.resolve || res.reject);

            logger(key, state, value, res.time);
        }
    }

    logState(state);
}
