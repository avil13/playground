//@skip-src

function Dummy() {
    if (!(this instanceof Dummy)) {
        return new Dummy();
    }

    if (Dummy._singleton) {
        return Dummy._singleton;
    }

    Dummy._singleton = this;
}

Dummy.prototype.setValue = function (value) {
    this.value = value;
};

Dummy.prototype.getValue = function () {
    return this.value;
};
