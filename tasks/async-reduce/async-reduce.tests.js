({
    'asyncReduce(..)': function (resolve) {
        let a = () => Promise.resolve('a');
        let b = () => Promise.resolve('b');
        let c = () => new Promise(resolve => setTimeout(() => resolve('c'), 100));

        asyncReduce(
            [a, c, b],
            (acc, value) => [...acc, value],
            ['d']
        ).then(results => {
            resolve([
                results,
                ['d', 'a', 'c', 'b']
            ]); // ['d', 'a', 'c', 'b'];
        });
    }
})
