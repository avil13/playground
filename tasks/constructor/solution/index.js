/*
 подробное объяснение
 https://github.com/RubaXa/playground/issues/7
*/

sum = new (Function.prototype.bind.apply(Sum, [null, ...args]));
