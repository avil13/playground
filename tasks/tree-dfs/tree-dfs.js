var inputTree = {
	value: 1,
	children: [
		{
			value: 2,
			children: [{value: 4}, {value: 5}]
		},
		{
			value: 3,
			children: [{value: 6}, {value: 7}]
		},
	]
};

function walk(tree) {
	function walker(node) {
		return [node.value].concat([].concat(node.children).map(walker));
	}

	return walker(tree);
}

console.log("result:", walk(inputTree));
