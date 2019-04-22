//@skip-src

Function.prototype.delay = function(ms) {
    setTimeout(() => {
        this();
    }, ms);
}
