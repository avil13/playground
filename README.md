Playground
----------
JavaScript puzzles for the little ones.

---

> Взяв за основу задачки от [@RubaXa](https://github.com/RubaXa), решил их порешать, и слегка расширил этот форк, что бы было проще это все делать.

### запуск:

- Для запуска тестов, достаточно только запустить команду `npm tun test`.

- Для `dev` режима, нужно будет установить пакеты(`npm i`) и запустить `npm run dev`

### разработка:

- В папке с тестом, создаем папку `solution`. Каждый файл в этой папке будет считаться решением, так как одна и так же задача, может быть решена по разному.

- В процессе работы, мне иногда нужно было обрабатывать исходный код, либо не загружать его вовсе, поэтому была добавлена система тегов. В начале файла решения, ставится тег, который определяет как нужно обрабатывать файлы задачи.

| tag | descrition |
|---|---|
`//@try-all` | Оборачивает весь код в `try catch`
`//@try-src` | Оборачивает файл примера в  `try catch`
`//@skip-src` | Не загружает файл примера
`//@html` | в тесте используются window и document events
`//@skip` | пропустить этот тест


---


## New tasks
 1. Create the folder `/tasks/funkymonkey/` (required files: `funkymonkey.js`, `funkymonkey.html` and `funkymonkey.tests.js`)
 2. Add an entry to `/tasks/tasks.json`
 3. Send pull request


---


#### funkymonkey.js
```js
// Welcome text / Task description

var funkymonkey = function () {
	// ...
};


console.log(funkymonkey());
```


#### funkymonkey.html
HTML coding

```js
<div>Wow!</div>
```


#### funkymonkey.tests.js
Unit tests

```js
({
	"#1.equal": function () {
		return ["..", funkymonkey()]; // equal
	},

	"#2.ok": function () {
		return ".." === funkymonkey(); // ok
	},

	"#3.async": function (resolve) {
		setTimeout(function () {
			resolve(["..", funkymonkey()]); // equal
		}, 3);
	}
})
```
