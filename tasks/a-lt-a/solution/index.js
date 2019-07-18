a = {
    val: 1,
    valueOf() {
        return ++this.val;
    }
};
