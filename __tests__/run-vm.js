const vm = require('vm');

module.exports = Run;

/**
 * Run virtual sandbox
 */
function Run() {
    if (!(this instanceof Run)) {
        return new Run();
    }
    this.sandbox = {
        setTimeout // для песочницы
    };

    vm.createContext(this.sandbox);
}

Run.prototype.add = function (code) {
    vm.runInContext(code, this.sandbox, {
        timeout: 10000,
        breakOnSigint: true,
        displayErrors: true
    });
    return this.sandbox;
};
