//@skip-src

function deferred() {
    if (!(this instanceof deferred)) {
        return new deferred();
    }

    this._value = null;
    this._queue = [];

    return this;
}

deferred.prototype.resolve = function (val) {
    if (val !== 'fail') {
        this._value = val;
        this._run();
    }
    return this;
};

deferred.prototype.then = function (callback) {
    this._queue.push(callback);
    this._run();
    return this;
}

deferred.prototype._run = function() {
    if (this._value) {
        const fn = this._queue.shift();
        if (fn) {
            this._value = fn(this._value) || this._value;
            this._run();
        }
    }
}
