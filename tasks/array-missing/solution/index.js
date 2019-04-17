function missing(values) {
    const sortedValues = values.sort();
    const max = sortedValues[sortedValues.length - 1];

    if (max === undefined) {
        return max;
    }

    const fullValues = Array.from(Array(max), (_, i) => ++i);

    for (let i = 0; i < fullValues.length; i++) {
        if (fullValues[i] !== sortedValues[i]) {
            return fullValues[i];
        }
    }
}
