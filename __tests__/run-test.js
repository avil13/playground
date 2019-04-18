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

            const log = logger(key, state);
            const result = testResult[key](log);

            switch (typeof result) {
                case 'boolean':
                case 'object':
                    log(result);
                    break;
            }

        }
    }

    logState(state);
}
