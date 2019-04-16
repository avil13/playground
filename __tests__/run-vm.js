const vm = require('vm');

module.exports = Run;

/**
 * Run virtual sandbox
 */
function Run() {
    if (!(this instanceof Run)) {
        return new Run();
    }
    this.sandbox = {};
    vm.createContext(this.sandbox);
}

Run.prototype.add = function(code) {
    vm.runInContext(code, this.sandbox);
    return this.sandbox;
};
