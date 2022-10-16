const Bakerloo = "Bakerloo";
const Central = "Central";
const Circle = "Circle";
const District = "District";
const DLR = "DLR";
const Elizabeth = "Elizabeth";
const HammersmithCity = "Hammersmith & City";
const Jubilee = "Jubilee";
const Metropolitan = "Metropolitan";
const Northern = "Northern";
const Overground = "Overground";
const Piccadilly = "Piccadilly";
const Victoria = "Victoria";
const WaterlooCity = "Waterloo & City";

const AllowedAnywhere = "Allowed anywhere";
const NotAllowed = "Not allowed";

const lineColors = new Map([
    [Bakerloo, "#B36305"],
    [Central, "#E32017"],
    [Circle, "#FFD300"],
    [District, "#00782A"],
    [DLR, "#00A4A7"],
    [Elizabeth, "#9364CD"],
    [HammersmithCity, "#F3A9BB"],
    [Jubilee, "#A0A5A9"],
    [Metropolitan, "#9B0056"],
    [Northern, "#000000"],
    [Overground, "#EE7C0E"],
    [Piccadilly, "#003688"],
    [Victoria, "#0098D4"],
    [WaterlooCity, "#95CDBA"],
]);

const pastMidnight_0000_0730 = "00:00-07:30";
const morningPeak_0730_0930 = "07:30-09:30";
const daytime_0930_1600 = "09:30-16:00";
const eveningPeak_1600_1900 = "16:00-19:00";
const nighttime_1900_2400 = "19:00-00:00";

const allowedSet = new Map([
    [Bakerloo, "Between Queen's Park and Harrow & Wealdstone"],
    [Central, "Between Leyton, Epping and Newbury Park (via Hainault only)\nBetween White City, Ealing Broadway and West Ruislip"],
    [Circle, AllowedAnywhere],
    [District, AllowedAnywhere],
    [DLR, AllowedAnywhere],
    [Elizabeth, AllowedAnywhere],
    [HammersmithCity, AllowedAnywhere],
    [Jubilee, "Between Stratford and Canning Town\nBetween Finchley Road and Stanmore"],
    [Metropolitan, AllowedAnywhere],
    [Northern, "Between Golders Green and Hendon Central\nBetween Colindale and Edgware\nBetween East Finchley, Mill Hill East and High Barnet"],
    [Piccadilly, "Between Oakwood and Cockfosters\nBetween Barons Court, Hounslow West and Uxbridge"],
    [Overground, AllowedAnywhere],
    [Victoria, NotAllowed],
    [WaterlooCity, NotAllowed],
]);

const notAllowedSet = new Map([
    [Bakerloo, NotAllowed],
    [Central, NotAllowed],
    [Circle, NotAllowed],
    [District, NotAllowed],
    [DLR, NotAllowed],
    [Elizabeth, "From west: until Royal Oak\nTo west: from Paddington\nFrom east: until Bethnal Green\nTo east: from Liverpool Street\nNote: until the Elizabeth Line fully opens (Sprin 2023), the times are actually slightly different"],
    [HammersmithCity, NotAllowed],
    [Jubilee, NotAllowed],
    [Metropolitan, NotAllowed],
    [Northern, NotAllowed],
    [Piccadilly, NotAllowed],
    [Overground, "From Liverpool Street station going towards Chingford, Enfield Town or Cheshunt.\nComing from Chingford, Enfield Town or Cheshunt until Bethnal Green."],
    [Victoria, NotAllowed],
    [WaterlooCity, NotAllowed],
]);

const weekdayConfig = new Map([
    [pastMidnight_0000_0730, allowedSet],
    [morningPeak_0730_0930, notAllowedSet],
    [daytime_0930_1600, allowedSet],
    [eveningPeak_1600_1900, notAllowedSet],
    [nighttime_1900_2400, allowedSet],
]);

const weekendOrHolidaysConfig = new Map([
    [pastMidnight_0000_0730, allowedSet],
    [morningPeak_0730_0930, allowedSet],
    [daytime_0930_1600, allowedSet],
    [eveningPeak_1600_1900, allowedSet],
    [nighttime_1900_2400, allowedSet],
]);

function getLineRules(dateTime) {
    if (!arraysEqual(Array.from(allowedSet.keys()), Array.from(notAllowedSet.keys()))) {
        throw new Error("allowedSet and notAllowedSet must have the same set of keys")
    }

    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const timestamp = hour * 60 + minute;

    const day = dateTime.getDay()
    const previousDay = (day - 1).mod(7);
    const targetDay = day;
    const nextDay = (day + 1).mod(7);
    // console.log(`previousDay: ${previousDay}, targetDay: ${targetDay}, nextDay: ${nextDay}`);

    const weekConfigList = [
        weekendOrHolidaysConfig, // 0 Sunday
        weekdayConfig, // 1 - Monday
        weekdayConfig, // 2 Tuesday
        weekdayConfig, // 3 Wednesday
        weekdayConfig, // 4 Thursday
        weekdayConfig, // 5 Friday
        weekendOrHolidaysConfig, // 6 Saturday
    ]

    const previousDayConfig = weekConfigList[previousDay];
    const targetDayConfig = weekConfigList[targetDay];
    const nextDayConfig = weekConfigList[nextDay];

    let previousTimeOfDay;
    let targetTimeOfDay;
    let nextTimeOfDay;

    switch (true) {
        case timestamp < 450: // past midnight
            previousTimeOfDay = nighttime_1900_2400;
            targetTimeOfDay = pastMidnight_0000_0730;
            nextTimeOfDay = morningPeak_0730_0930;
            break;
        case timestamp < 570: // morning peak
            previousTimeOfDay = pastMidnight_0000_0730;
            targetTimeOfDay = morningPeak_0730_0930;
            nextTimeOfDay = daytime_0930_1600;
            break;
        case timestamp < 960: // daytime
            previousTimeOfDay = morningPeak_0730_0930;
            targetTimeOfDay = daytime_0930_1600;
            nextTimeOfDay = eveningPeak_1600_1900;
            break;
        case timestamp < 1140: // evening peak
            previousTimeOfDay = daytime_0930_1600;
            targetTimeOfDay = eveningPeak_1600_1900;
            nextTimeOfDay = nighttime_1900_2400;
            break;
        case timestamp < 1440: // nighttime
            previousTimeOfDay = eveningPeak_1600_1900;
            targetTimeOfDay = nighttime_1900_2400;
            nextTimeOfDay = pastMidnight_0000_0730;
            break;
    }
    // console.log(`previousTimeOfDay: ${previousTimeOfDay}, targetTimeOfDay: ${targetTimeOfDay}, nextTimeOfDay: ${nextTimeOfDay}`);

    const previousSet = previousDayConfig.get(previousTimeOfDay);
    const targetSet = targetDayConfig.get(targetTimeOfDay);
    const nextSet = nextDayConfig.get(nextTimeOfDay);
    // console.log(`targetLineRules: ${Array.from(targetSet)}`);

    const lines = Array.from(allowedSet.keys());
    const rules = new Map();
    lines.forEach(line => {
        rules.set(line, {
            previousTimeOfDay: previousTimeOfDay,
            previousRule: previousSet.get(line),
            targetTimeOfDay: targetTimeOfDay,
            targetRule: targetSet.get(line),
            nextTimeOfDay: nextTimeOfDay,
            nextRule: nextSet.get(line),
        });
    });

    return rules;
}

function printConfigList(configList) {
    var result = "";
    configList.forEach((config) => {
        result = result + `\n\n${printConfig(config)}`;
    });
    return result;
}

function printConfig(config) {
    var result = "";
    config.forEach((lineRules, period) => {
        result = result + `\n${period} - ${Array.from(lineRules)}`;
    });
    return result;
}

Number.prototype.mod = function (b) {
    // Calculate
    return ((this % b) + b) % b;
}