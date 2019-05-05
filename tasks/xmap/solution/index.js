//@skip-src

/**
 * Реализовать свой Map
 * @constructor
 */
function XMap() {
    this._data = {};
}


XMap.prototype._toKey = function (name) {
    return `${JSON.stringify(name) || name}`;
};

XMap.prototype.set = function (key, value) {
    const mappingKey = this._toKey(key);
    this._data[mappingKey] = value;
};

XMap.prototype.has = function (key) {
    const mappingKey = this._toKey(key);
    return this._data[mappingKey] !== undefined;
};

XMap.prototype.get = function (key) {
    const mappingKey = this._toKey(key);
    return this._data[mappingKey] || null;
};

XMap.prototype.remove = function (key) {
    const mappingKey = this._toKey(key);
    delete this._data[mappingKey];
};
