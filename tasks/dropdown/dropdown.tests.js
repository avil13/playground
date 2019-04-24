({
	"dd is Widget": function () {
		return new Dropdown(menu.cloneNode(true)) instanceof Widget;
	},

	"dd is Dropdown": function () {
		return new Dropdown(menu.cloneNode(true)) instanceof Dropdown;
	},

	"dd.toggle": function () {
		var sandbox = isolate(function () {
			var ctrl = dd.find('.js-ctrl');
			var menu = dd.find('.js-menu');
			var res = [];

			res.push(menu.classList.contains('collapsed'));

			simulateEvent(ctrl, 'click');
			res.push(menu.classList.contains('collapsed'));

			simulateEvent(ctrl, 'click');
			res.push(menu.classList.contains('collapsed'));

			return res;
		});

		return [[true, false, true], sandbox.getResult()];
	}
})
