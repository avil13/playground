({
    "1[n => n + 1] = [2]": function () {
        return [
            1[n => n + 1],
            [2]
        ];
    },
    "3[n => n + 1], [2, 3, 4]": function () {
        return [
            3[n => n + 1],
            [2, 3, 4]
        ];
    },
    "4[n => n + 1] = [2, 3, 4, 5]": function () {
        return [
            4[n => n + 1],
            [2, 3, 4, 5]
        ];
    },

    "1[n => n * 2] = [2]": function () {
        return [
            1[n => n * 2],
            [2]
        ];
    },
    "2[n => n * 2] = [2, 4]": function () {
        return [
            2[n => n * 2],
            [2, 4]
        ];
    },
    "3[n => n * 2] = [2, 6]": function () {
        return [
            3[n => n * 2],
            [2, 4, 6]
        ];
    },
})
