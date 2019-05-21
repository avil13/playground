//@ts-check
//@html
//@skip-src


// Получить безопасный HTML
//  * #source — элемент, в котором лежит исходный HTML
//  * #result — элемент, куда нужно вставить безопасный HTML

function getSafeHTML(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    console.log('=>', template.innerHTML);

    for (let i = 0; i < template.childNodes.length; i++) {
        const node = template.childNodes[i];
        onlyWhiteList(node);
    }


    return template.innerHTML;
}

function onlyWhiteList(node) {
    const whiteList = [
        'src', 'href', 'alt', 'class'
    ];

    const newEl = document.createElement(node.nodeName);

    console.log('>', node.attributes);

    return newEl;
}



// Используем
//@ts-ignore
var html = source.innerHTML.slice(4, -3).trim();
var res = getSafeHTML(html);

result.innerHTML = res;

// console.log('source:', html);
// console.log('result:', res);
