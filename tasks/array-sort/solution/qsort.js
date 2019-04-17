function sort(values) {
    if (values.length < 2) {
        return values;
    }

    const pivot = values[Math.floor(values.length / 2)];

    const less = values.filter(v => v < pivot);
    const greater = values.filter(v => v > pivot);

    return [
        ...sort(less),
        pivot,
        ...sort(greater)
    ];
}
