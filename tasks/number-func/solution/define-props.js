//@skip-src

// решение Гриши, кинет ссылку на себя, прикреплю.

Object.setPrototypeOf(Number.prototype, new Proxy({}, {
    get(target, prop, r) {
        try {
            let func = new Function(`return ${prop}`)();
            let value = r.valueOf();
            let res = [];
            for (let i = 1; i <= value; i++) {
                res.push(func(i));
            }
            return res;
        } catch (e) {
            return target[prop];
        }
    }
}));
