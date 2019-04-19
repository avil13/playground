const path = require('path');
const fs = require('fs');


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
        source: {
            src: '',
            ext: 'js',
            // wrap: (code) => {
            //     return ``
            // }
        },
        testSrc: {
            src: '',
            ext: 'tests.js',
            wrap: (code) => {
                return `_code = ${code}`;
            }
        },
        solution: {
            src: '',
            path: `solution/${solutionFileName}`
        }
    };

    for (var key in codeLib) {
        if (codeLib.hasOwnProperty(key)) {
            const el = codeLib[key];

            const filename = el.path || el.ext && `${name}.${el.ext}`;

            el.src = fs.readFileSync(path.join(dirPath, filename), 'utf-8');

            if (el.wrap) {
                el.src = el.wrap(el.src);
            }
        }
    }

    return codeLib;
}
