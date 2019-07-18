/*
Нужно написать функцию zero (сумматор от S0 = 0), которая принимает любое количество аргументов типа Number (args0)
 и возвращаяет такую же функцию (сумматор от S1, где S1 = S0 + sum(args0)), которая в свою очередь возвращает либо S1 (если вызвана без аргументов)
 либо функцию-сумматор от S2 = S1 + sum(args1) с аналогичными свойствами (если вызвана с аргументами)
 и т.д. до сумматора от SN, глубина не ограничена
*/

function zero() {
    // ваш код тут
}

let five = zero(2, 3);
let six = zero(1, 2, 3);
let seven = zero(3, 4);
let ten = seven(3);
let fifteen = ten(5);
let twenty = ten(five(), five());
let hundred = twenty(twenty(), 30, 30);

console.log('zero()', zero()); // 0
console.log('six()', six()); // 6
console.log('seven()', seven()); // 7
console.log('ten()', ten()); // 10
console.log('fifteen()', fifteen()); // 15
console.log('hundred()', hundred()); // 100
