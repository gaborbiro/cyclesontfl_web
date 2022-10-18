function arraysEqual(array1, array2) {
    if (array1 === array2) return true;
    if (array1 == null || array2 == null) return false;
    if (array1.length !== array2.length) return false;

    const sortedArray1 = array1.slice().sort();
    const sortedArray2 = array2.slice().sort();

    for (var i = 0; i < sortedArray1.length; ++i) {
        if (sortedArray1[i] !== sortedArray2[i]) return false;
    }
    return true;
}

Number.prototype.mod = function (b) {
    // Calculate
    return ((this % b) + b) % b;
}