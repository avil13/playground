/**
 * Получения двумерный массив анаграмм из произвольного массива слов
 * @param   {string[]} list
 * @returns {Array<[string, string]>}
 */
function getAnagrams(list) {
}

const inputList = [
	'кот', 'пила', 'барокко',
	'стоп', 'ток', 'кошка',
	'липа', 'коробка', 'пост',
];

// Проверка
console.log(JSON.stringify(getAnagrams(inputList), null, 2));
// [
//   ['кот', 'ток'],
//   ['барокко', 'коробка'],
//   ['пила', 'липа'],
//   ['стоп', 'пост'],
// ]
