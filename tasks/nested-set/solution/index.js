//@html
//@ts-check

function getCategoriesAsHTML(inputData) {
    const dataTree = getJsonTree(inputData);
    const ulNode = getUlNode(dataTree);
    return ulNode.outerHTML;
}

function getUlNode(item) {
    const ul = document.createElement('ul');
    ul.appendChild(getLiNode(item));
    return ul;
}

function getLiNode(item) {
    const li = document.createElement('li');
    li.insertAdjacentText('afterbegin', item.title);

    if (item.childs.length) {
        item.childs.forEach(child => {
            li.appendChild(getUlNode(child));
        });
    }

    return li;
}


function getJsonTree(inputData) {
    inputData = [...inputData];
    const root = inputData[0];
    const data = getTree(root, inputData);
    root.childs = data.filter(v => v.childs.length);
    return root;
}

function getTree(root, items) {
    return items
        .filter(item =>
            root.left < item.left && root.right > item.right
        )
        .map((value, i, arr) => {
            value.childs = getTree(value, arr);
            return value;
        });
}
