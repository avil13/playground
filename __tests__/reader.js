const path = require('path');
const fs = require('fs');
const readFileTag = require('./read-file-tag');


module.exports = reader;


function reader(dirPath, callback) {
    const solutionDir = path.join(dirPath, 'solution');

    fs.readdir(solutionDir, (err, files) => {
        if (err) {
            throw err;
        }
        files.forEach(file => {
            const dirData = readFolderWithSolution(dirPath, file);

            callback(dirData);
        });
    });
}

/**
 * read file source
 */
function readFolderWithSolution(dirPath, solutionFileName) {
    const name = path.basename(dirPath);

    const codeLib = {
        html: {
            src: '',
            ext: 'html',
            // wrap: (code) => {
            //     return '_html = `'+ code + '`;';
            // }
        },
        source: {
            src: '',
            ext: 'js'
        },
        testSrc: {
            src: '',
            ext: 'tests.js',
            wrap: (code) => {
                return `_testCode = ${code}`;
            }
        },
        solution: {
            src: '',
            path: `solution/${solutionFileName}`
        }
    };

    const tags = [];

    for (var key in codeLib) {
        if (codeLib.hasOwnProperty(key)) {
            const el = codeLib[key];

            const filename = el.path || el.ext && `${name}.${el.ext}`;

            el.src = fs.readFileSync(path.join(dirPath, filename), 'utf-8');

            readFileTag(el.src, tags);

            if (el.wrap) {
                el.src = el.wrap(el.src);
            }
        }
    }

    codeLib['tags'] = tags;

    return codeLib;
}
