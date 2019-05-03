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
    // '', ...
    // 'parallel',
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
            .add('html', data.html.src)
            .add('src', data.source.src)
            .add('solution', data.solution.src)
            .add('test', data.testSrc.src);

        runner.run((res) => {
            runTest({
                testFile: path.join(folder, data.solution.path),
                testName: folder,
                // testResult: res._testCode
                testResult: res._result
            });
        });
    });
});
