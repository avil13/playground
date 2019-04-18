function get(src, path) {
    const pathList = path.split('.');
    let tmp = src;
    let key;

    for (let i = 0; i < pathList.length; i++) {
        key = pathList[i];
        if (!tmp[key]) {
            return tmp[key];
        }
        tmp = tmp[key];
    }
    return tmp;
}
