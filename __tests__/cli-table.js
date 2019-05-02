module.exports = table;


function table(data) {
    const {
        list,
        nameMaxLength,
        valueMaxLength
    } = makeList(data);

    const prefix = '┌'.padEnd(nameMaxLength + 3, '─') + '┬' +
        '┐'.padStart(valueMaxLength + 3, '─');
    const suffix = '└'.padEnd(nameMaxLength + 3, '─') + '┴' +
        '┘'.padStart(valueMaxLength + 3, '─');
    const lines = [];

    list.forEach(item => {
        lines.push('│ ' + item.name.padEnd(nameMaxLength) +
            ' │ ' + ('' + item.value).padStart(valueMaxLength) +
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
