const path = require('path');
const fs = require('fs');

module.exports = makeLoad;

function makeLoad(nodeModulesPath) {

    //
    return function load(filePath) {
        const pathString = path.join(nodeModulesPath, filePath);
        const stat = fs.lstatSync(pathString);
        let fileName = '';

        if (stat.isDirectory()) {
            const list = fs.readdirSync(pathString);

            if (list.includes('index.js')) {
                fileName = pathString + '/index.js';
            } else if (list.includes('package.json')) {
                fileName = getPackageMainFile(pathString);
            } else {
                throw `==> Can't load "${filePath}"`
            }

        } else {
            fileName = /\.(js|json)$/.test(fileName) ? fileName : `${filePath}.js`;
        }

        return fs.readFileSync(fileName, 'utf-8');
    }
}

function getPackageMainFile(packagePath) {
    const pkgSrc = fs.readFileSync(packagePath + '/package.json', 'utf-8');
    const pkg = JSON.parse(pkgSrc);
    return packagePath + '/' + pkg.main;
}
