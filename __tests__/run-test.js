const logger = require('./logger').logger;
const logState = require('./logger').logState;

module.exports = runTest;

const state = {
    name: '',
    result: null,
    list: []
};

/**
 * Test runner
 */
function runTest(testName, testResult) {
    state.name = testName;

    for (let key in testResult) {
        if (testResult.hasOwnProperty(key)) {

            const log = logger(key, state);
            const result = testResult[key](log);

            switch(typeof result) {
                case 'boolean':
                case 'object':
                    log(result);
                    break;
            }
        }
    }

    logState(state);
}
