const fs = require('fs');
const path = require('path');
const vm = require('vm');

const FOLDER = path.join(__dirname, 'tasks/a-lt-a');


function reader(dirPath) {
    const name = path.basename(dirPath);

    const codeLib = {
        source: {
            src: '',
            ext: 'js'
        },
        testSrc: {
            src: '',
            ext: 'tests.js'
        },
        solution: {
            src: '',
            path: 'solution/index.js'
        }
    };

    for (var key in codeLib) {
        if (codeLib.hasOwnProperty(key)) {
            const el = codeLib[key];

            const filename = el.path || el.ext && `${name}.${el.ext}`;
        }

        el.src = fs.readFileSync(path.join(dirPath, filename), 'utf-8');
    }

    return codeLib;
}












