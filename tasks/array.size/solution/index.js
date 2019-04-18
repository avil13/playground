
Object.defineProperty(Array.prototype, 'size', {
    enumerable: false,
    get() {
        return this.length
    },
    set(v) {
        this.length = v;
    },
});
