const path = require('path');
const runTest = require('./run-test');
const reader = require('./reader');
const Run = require('./run-vm');

const FOLDERS = [
    'a-lt-a',
    'anagrams',
    'argument',
    'array-missing',
];


// test
FOLDERS.forEach((folder) => {
    const pathFolder = path.join(__dirname, '../tasks', folder);
    const res = reader(pathFolder);

    const r = new Run();
    let c;

    c = r.add(res.source.src);
    c = r.add(res.solution.src);
    c = r.add(res.testSrc.src);

    runTest(folder, c._code);
});
