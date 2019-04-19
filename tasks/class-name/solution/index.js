//@skip-src

class Foo {
    get name() {
        const src = this.constructor + '';
        const re = /class\s+(\w+)[^]+/gm;
        return src.trim().replace(re, '$1');
    }
}

class Bar extends Foo {
}

class Qux extends Bar {
}
