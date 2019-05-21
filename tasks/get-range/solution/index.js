function getRange(length, callback) {
    var values = [];

    for (var i = 0; i < length; i++) {
        setTimeout(function (i2) {
                values.push(i2);

                if (i2 === length) {
                    callback(values);
                }
            },
            i * 10,
            (i + 1)
        );
    }
}
