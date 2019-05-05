const clc = require('./color');

module.exports = table;


function table(data) {
    const {
        list,
        nameMaxLength,
        valueMaxLength
    } = makeList(data);

    const w = wrapColorByName;

    const prefix = '┌'.padEnd(nameMaxLength + 3, '─') + '┬' +
        '┐'.padStart(valueMaxLength + 3, '─');
    const suffix = '└'.padEnd(nameMaxLength + 3, '─') + '┴' +
        '┘'.padStart(valueMaxLength + 3, '─');
    const lines = [];

    list.forEach(item => {
        const name = item.name;
        const value = item.value + '';

        lines.push('│ ' + w(name, name.padEnd(nameMaxLength)) +
            ' │ ' + w(name, value.padStart(valueMaxLength)) +
            ' │');
    });

    console.log(
        [prefix, ...lines, suffix].join('\n')
    );

    return {
        list,
        nameMaxLength,
        valueMaxLength
    };
}


function makeList(data) {
    const list = [];
    let nameMaxLength = 0;
    let valueMaxLength = 0;

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            val = data[key];
            if (key.length > nameMaxLength) {
                nameMaxLength = key.length;
            }
            switch (typeof data[key]) {
                case 'string':
                case 'number':
                    if (`${data[key]}`.length > valueMaxLength) {
                        valueMaxLength = `${data[key]}`.length;
                    }
                    list.push({
                        name: key,
                        value: data[key]
                    });
            }
        }
    }

    return {
        list,
        nameMaxLength,
        valueMaxLength
    };
}


function wrapColorByName(name, value = '') {
    const maps = {
        files: 'white',
        success: 'green',
        failed: 'red',
        skip: 'blue'
    };

    const key = name.trim();

    if (maps[key]) {
        return clc[maps[key]](value || name);
    }
    return value || name;
}
