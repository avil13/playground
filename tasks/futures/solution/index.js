function Futures(executor) {
    if (!(this instanceof Futures)) {
        return new Futures(executor);
    }

    this._status = 'pending'; // pending | fulfilled | rejected
    this._queue = []; // цепочка обработчиков
    this._catchers = []; // цепочка обработчиков ошибок
    this._dataRes; // последний результат
    this._err; // последняя ошибка

    // в задании не было указано,
    // что эту функцию нужно указывать через прототип,
    // поэтому она тут
    this.catch = (rejectFn) => {
        this._catchers.push(rejectFn);
    };

    // работа с ошибками
    this.reject = (err) => {
        this._status = 'rejected';
        this._queue = [];
        const _catchFn = this._catchers.shift();
        let catchRes;

        if (_catchFn) {
            catchRes = _catchFn(err);
        }
        if (this._catchers.length) {
            this.reject(catchRes);
        }
    };

    // работа с цепочкой событий
    this.resolve = (data) => {
        this._dataRes = data;
        const fn = this._queue.shift();

        if (fn) {
            try {
                this._dataRes = fn(this._dataRes);
            } catch (e) {
                this.reject(e);
            }
        }
        if (this._queue.length) {
            this.resolve(this._dataRes);
        } else {
            this._status = 'fulfilled';
        }
    };

    executor(this.resolve, this.reject);
}

Futures.prototype.then = function (resolver, rejector) {
    this._queue.push(resolver);
    this._catchers.push(rejector);

    if (this._status === 'fulfilled') {
        this.resolve(this._dataRes);
    }
    return this;
};
