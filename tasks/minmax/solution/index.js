/**
 * Найти min/max в произвольной строке
 * @param   {String} входные данные
 * @returns {{min:Number, max:Number}}  объект
 */
function getMinMax(string) {
    const res = {
        min: null,
        max: null
    };

    const reg = /[-\d\.]+/gi;

    const list = string.match(reg);

    if (list !== null) {
        list.map(v => +v)
            .forEach(num => {
                if (num < res.min) {
                    res.min = num;
                }
                if (num > res.max) {
                    res.max = num;
                }
            });
    }

    return res;
}
