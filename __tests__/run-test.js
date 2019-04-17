const logger = require('./logger');

module.exports = runTest;

/**
 * Test runner
 */
function runTest(testResult) {
    for (let key in testResult) {
        if (testResult.hasOwnProperty(key)) {
            const result = testResult[key](logger.bind(null, key));

            switch(typeof result) {
                case 'boolean':
                case 'object':
                    logger(key, result);
                    break;
            }
        }
    }
}
