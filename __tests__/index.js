const path = require('path');
const runTest = require('./run-test');
const reader = require('./reader');
const Run = require('./run-vm');

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
].filter((f, i, arr) => {
    // all or last on DEV mode
    if (process.env.NODE_ENV !== 'dev') {
        return true;
    }
    return i === arr.length -1;
})


// test
FOLDERS.forEach((folder) => {
    const pathFolder = path.join(__dirname, '../tasks', folder);

    reader(pathFolder, (data) => {
        const runner = new Run();

        runner
            .add(data.source.src)
            .add(data.solution.src)
            .add(data.testSrc.src);

        runTest({
            testFile: path.join(folder, data.solution.path),
            testName: folder,
            testResult: runner.run(data.tags)._code
        });
    });
});
