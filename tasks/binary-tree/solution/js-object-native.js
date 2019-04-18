function BinaryTree() {
    this._data = {};
}

BinaryTree.prototype.add = function(...vals) {
    vals.forEach(val => {
        this._data[val] = val;
    });
}

BinaryTree.prototype.has = function(val) {
    return this._data[val] !== undefined;
}

BinaryTree.prototype.remove = function(val) {
    delete this._data[val];
}

BinaryTree.prototype.size = function() {
    return Object.keys(this._data).length;
}

BinaryTree.prototype.toArray = function() {
    return Object.values(this._data).sort();
}
