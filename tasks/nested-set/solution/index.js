//@html
//@skip

function getCategoriesAsHTML(inputData) {
    const data = getTree(inputData);
    console.table(data);
}


function getTree(list) {
    const res = {};

    return list.map(v => v).sort((a, b) => {
        return a.left > b.left ? 1 : -1;
        // return a.right > b.right ? 1 : -1;
    })
}
