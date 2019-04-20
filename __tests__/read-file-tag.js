module.exports = readFileTag;

/**
 * метод возвращающий массив заголовочных тегов файла
 * теги созадются по приниципу //@tagName без пробелов
 *
 * @param {string} src
 * @param {array} tags
 * @returns {array}
 */
function readFileTag(src, tags) {
    const lines = src.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const tag = getTag(lines[i]);
        if (!tag) {
            return tags;
        }
        tags.push(tag);
    }

    return tags;
}


function getTag(str) {
    const re = /\/\/@([^\n\s]+)/;
    if (re.test(str)) {
        return str.replace(re, '$1');
    }
    return false;
}
