function parseMapLoadingError(xhr) {
    error = parseHttpError(xhr);
    error.htmlContent = xhr.responseText;
    return error;
}

function parseTflError(xhr) {
    return parseHttpError(xhr);
}

function parseHttpError(xhr) {
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

function globalHandleUIError(error) {
    console.log(error);
    if (error.debugInfo) {
        console.log(`Debug info: ${error.debugInfo}`);
    }
    if (error instanceof AppError) {
        alert(error.message);
        if (error instanceof NetworkError && error.htmlContent) {
            document.documentElement.innerHTML = error.htmlContent;
        }
        return;
    }
    alert(`Unexpected error type. Check logs for details.`);
}