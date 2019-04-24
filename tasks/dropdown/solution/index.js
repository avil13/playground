//@html
//@skip-src
//@hide-error-stack
//@hide-error-message



/** @class Widget */
var Widget = function (el, options) {
    this.el = el;
    this.options = options || {};
};

Widget.prototype.find = function (selector) {
    return this.el.querySelector(selector);
};

/** @class Dropdown */
/** @extends Widget */
var Dropdown = function () {
    // Выполним родительский метод:

    // ...
    if (typeof this.__proto__._super === 'function') {
        this.__proto__._super.apply(this, arguments);
    }
    // end ...

    this.find('.js-ctrl').addEventListener('click', this.handleEvent.bind(this));
};

// Тут наследуем Widget
// ...
function extend(subClass, superClass) {
    subClass.prototype = Object.assign(
        Object.create(superClass.prototype, {
            constructor: {
                value: superClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        }),

        superClass.prototype
    );

    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass

    subClass.prototype._super = superClass;
}
extend(Dropdown, Widget);
// end ...


Dropdown.prototype.handleEvent = function (evt) {
    this.toggle();
};

Dropdown.prototype.toggle = function () {
    var menu = this.find('.js-menu');
    // нужно добавить или убрать класс `collapsed`
    menu.classList.toggle('collapsed');
};

// Используем
var dd = new Dropdown(menu);

// Тесты
console.log('dd is Widget:', dd instanceof Widget);
console.log('dd is Dropdown:', dd instanceof Dropdown);
