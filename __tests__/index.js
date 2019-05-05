const path = require('path');
const runTest = require('./run-test');
const reader = require('./reader');
const Run = require('./run-vm');

const exitHandler = require('./exit-handler');
const cliTable = require('./cli-table');
const {
    getAllTestLog
} = require('./logger');


exitHandler(function () {
    cliTable(getAllTestLog());
});

const FOLDERS = [
    'a-lt-a',
    'anagrams',
    'argument',
    'array-missing',
    'array-sort',
    'array.size',
    'async-pause',
    'async-reduce',
    'attr-accessor',
    'binary-tree',
    'bomb',
    'calc',
    'class-name',
    'clicks',
    'constructor', // тут беда с описанием задачи
    'deferred',
    'delay',
    'dropdown',
    'dummy',
    'extend',
    'futures',
    'get-range',
    'graph',
    'intersection',
    'is-balanced',
    'is-isomorphic',
    'is-palindrome',
    'minmax',
    'naturalnumber',
    'nested-set',
    'parallel',
    'printnumbers',
    // ...
    'regexp',
    'rle',
    'romannumbers',
    'rpn',
    'safehtml',
    'sum',
].filter((f, i, arr) => {
    // all or last on DEV mode
    if (process.env.NODE_ENV !== 'dev') {
        return true;
    }
    return i === arr.length - 1;
});


// test
FOLDERS.forEach((folder) => {
    const pathFolder = path.join(__dirname, '../tasks', folder);

    reader(pathFolder, (data) => {
        const runner = new Run(data.tags);

        runner
            .set('html', data.html.src)
            .set('src', data.source.src)
            .set('solution', data.solution.src)
            .set('test', data.testSrc.src);

        runner.run((res, tags) => {
            runTest({
                testFile: path.join(folder, data.solution.path),
                testName: folder,
                // testResult: res._testCode
                testResult: res._result,
                tags
            });
        });
    });
});
