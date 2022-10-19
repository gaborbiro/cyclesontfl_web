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
