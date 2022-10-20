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

function safeLog(data) {
    if (DEBUG) console.log(data);
}

/**
 * Translates the specified date-time into the British Summer Time and formats it as following:
 * YYYY-MM-DD'T'HH:mm
 * This can be used to set the value of the datetime-local html input field.
 */
function getBST_Input_Date(dateTime = new Date()) {
    const bstTimezone = 'Europe/London'
    // Cheating with the Canadian format a bit, as it produces the ISO date-format, allowing it to be used with the date picker
    const simpleFormattedDate = dateTime.toLocaleDateString('en-CA', { timeZone: bstTimezone });
    const simpleFormattedTime = dateTime.toLocaleTimeString('en-GB', { timeZone: bstTimezone });
    return `${simpleFormattedDate}T${simpleFormattedTime}`.substring(0, 16);
}

async function includeHTMLs(document) {
    while(await new Promise(async (resolve, reject) => {
        const elements = document.getElementsByTagName("*");
        for (i = 0; i < elements.length; i++) {
            const element = elements[i];
            const file = element.getAttribute("w3-include-html");
            if (file) {
                element.removeAttribute("w3-include-html");
                try {
                    element.innerHTML = await fetchFile(file);
                    resolve(1);
                    return;
                } catch (error) {
                    element.innerHTML = "<p style='color: red;'>Content not found.</p>";
                    reject(error);
                }
            }
        }
        resolve(-1);
    }) == 1);
}

function fetchFile(file) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", file, false);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    resolve(this.responseText);
                }
                if (this.status == 404) {
                    reject(new NetworkError(`Error fetching file: ${file}`));
                }
            }
        }
        xhr.onerror = function () {
            reject(parseHttpError(xhr));
        };
        xhr.send();
    });
}

async function initView(document, viewModel) {
    try {
        await includeHTMLs(document);

        document.addEventListener('DOMContentLoaded', () => {
            viewModel.onPageReady()
        });
    } catch (error) {
        globalHandleUIError(error);
    }
}