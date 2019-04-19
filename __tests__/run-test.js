const logger = require('./logger').logger;
const logState = require('./logger').logState;

module.exports = runTest;


/**
 * Test runner
 */
function runTest({ testFile, testName, testResult }) {
    const state = {
        name: testName,
        file: testFile,
        result: false,
        list: [],
        waiting: 0 // для проверки промисов
    };

    for (let key in testResult) {
        if (testResult.hasOwnProperty(key)) {

            const { resolve, reject } = logger(key, state);
            const result = testResult[key](resolve, reject);

            if (!(result instanceof Promise)) {
                resolve(result);
            }
        }
    }

    logState(state);
}
