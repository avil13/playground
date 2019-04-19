const path = require('path');
const runTest = require('./run-test');
const reader = require('./reader');
const Run = require('./run-vm');

const FOLDERS = [
    // 'a-lt-a',
    // 'anagrams',
    // 'argument',
    // 'array-missing',
    // 'array-sort',
    // 'array.size',
    // 'async-pause',
    // 'async-reduce',
    // 'attr-accessor',
    // 'binary-tree',
    'bomb',
];


// test
FOLDERS.forEach((folder) => {
    const pathFolder = path.join(__dirname, '../tasks', folder);

    reader(pathFolder, (data) => {
        const runner = new Run();
        let c;

        c = runner.add(data.source.src);
        c = runner.add(data.solution.src);
        c = runner.add(data.testSrc.src);

        runTest({
            testFile: path.join(folder, data.solution.path),
            testName: folder,
            testResult: c._code
        });
    });
});
