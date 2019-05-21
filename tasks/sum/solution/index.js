//@skip-src

function sum(...args) {
    return args.reduce((prev, next) => {
        return prev + next;
    }, 0);
}
