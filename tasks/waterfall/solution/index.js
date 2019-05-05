//@skip-src

function waterfall(...args) {
    if (!(this instanceof waterfall)) {
        // вызваем функцию как конструктор,
        // что бы был this в котором будем хранить состояние
        return new waterfall(args);
    }

    if (args.length === 1 && Array.isArray(args[0])) {
        args = args[0];
    }

    this._funcs = this._funcs || args;

    if (!this._funcs.length) {
        return;
    }

    const fn = this._funcs.shift();
    const done = this.done.bind(this);
    // this._result // свойство в котором храним результат
    done(
        fn(this._result, done)
    );
}

// в случае если пришло корректное значение,
// то продолжаем цепочку
waterfall.prototype.done = function (res) {
    if (res !== undefined) {
        this._result = res;
        waterfall.call(this);
    }
}
