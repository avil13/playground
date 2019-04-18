const logger = require('./logger').logger;
const logState = require('./logger').logState;

module.exports = runTest;


/**
 * Test runner
 */
function runTest({ testFile, testName, testResult }) {

    for (let key in testResult) {
        if (testResult.hasOwnProperty(key)) {
            const state = {
                name: testName,
                file: testFile,
                result: false,
                list: [],
                hasResult: false // для проверки промисов
            };

            const log = logger(key, state);
            const result = testResult[key](log);

            switch (typeof result) {
                case 'boolean':
                case 'object':
                    log(result);
                    break;
            }

            logState(state);
        }
    }
}
