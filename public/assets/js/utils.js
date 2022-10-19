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

function parseMapLoadingError(xhr) {
    error = parseError(xhr);
    error.htmlContent = xhr.responseText;
    return error;
}

function parseTflError(xhr) {
    return parseError(xhr);
}

function parseError(xhr) {
    error = new AppError(`${xhr.status}: ${xhr.statusText}`);
    error.debugInfo = xhr.responseText;
    return error;
}

function checkError(error) {
    if (error instanceof NetworkError) {
        return error;
    }
    if (error instanceof AppError) {
        return error;
    }
    return new AppError(error.message);
}

class AppError extends Error {

    debugInfo;

    constructor(message) {
        super(message);
    }
}

class NetworkError extends AppError {

    htmlContent;

    constructor(message) {
        super(message);
    }
}

function handleError(error) {
    console.log(error);
    console.log(`Debug info: ${error.debugInfo}`);
    if (error instanceof AppError) {
        alert(error.message);
        if (error instanceof NetworkError && error.htmlContent) {
            document.documentElement.innerHTML = error.htmlContent;
        }
        return;
    }
    alert(`Unexpected error type. Check logs for details.`);
}

function safeLog(data) {
    if (DEBUG) console.log(data);
}