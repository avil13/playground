const path = require('path');
const fs = require('fs');


module.exports = reader;

/**
 * read file source
 */
function reader(dirPath) {
    const name = path.basename(dirPath);

     const codeLib = {
         source: {
             src: '',
             ext: 'js'
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
             path: 'solution/index.js'
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
