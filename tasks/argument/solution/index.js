function myFunc(a, b, c) {
    var argName = 'b'; // название аргумента
    var argValue; // значение полученное по `argName`

    argValue = ((name, args) => {
        // тело функции в виде строки
        const fn = '' + myFunc;

        // получаем список параметров в виде строки
        const reg1 = /^[^\(]+\(([^\)]+)\)[^]+/gm
        const argStr = fn.replace(reg1, ($0, $1) => $1);

        // получаем имена параметров в виде массива
        const reg2 = /([^\s,]+)/gm
        const list = argStr.match(reg2) || [];

        return args[list.indexOf(name)];
    })(argName, Array.from(arguments));

    return argValue;
}
