/**
 * Реализовать класс
 * @constructor
 */
function BinaryTree() {
}

var tree = new BinaryTree();

tree.add(1, 2, 3, 4);
tree.add(5);

console.log('2:', tree.has(2)); // true
console.log('5:', tree.has(5)); // true

tree.remove(3);

console.log('size:', tree.size()); // 4
