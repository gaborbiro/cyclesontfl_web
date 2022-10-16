const Folded = "Folded cycles";
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
const BusTram = "Bus and Tram"
const NationalRail = "National Rail"
const River = "River"
const EmiratedAir = "Emirates Air Line"
const Coaches = "Coaches"

const AllowedFolded = "You can take folded cycles anywhere, at any time on all transport services. However, on buses the driver can decide not to let you travel if it's too busy.";
const AllowedAnywhere = "Allowed anywhere";
const NotAllowed = "Not allowed";
const NotAllowedEver = "Never allowed";
const NotAllowedBusesTrams = "Cycles cannot be taken on buses and trams";
const AllowedNationalRail = "Use <a target='_blank' href='http://plusbike.nationalrail.co.uk/'>PlusBike</a> to find out where you can take cycles on National Rail services.";
const AllowedRiver = "Most <a target='_blank' href='https://tfl.gov.uk/modes/river/'>river services</a> allow non-folded cycles but you should check with them before you travel.";
const AllowedEmiratesAir = "You can take a non-folded cycle at any time.";
const AllowedCoaches = "You need to check with the <a target='_blank' href='https://tfl.gov.uk/modes/coaches/coach-companies'>coach company</a> to see if you can take a non-folded cycle.";
const AllowedBakerloo = "Between Queen's Park and Harrow & Wealdstone";
const AllowedCentral = "Between Leyton, Epping and Newbury Park (via Hainault only)\nBetween White City, Ealing Broadway and West Ruislip";
const AllowedJubilee = "Between Stratford and Canning Town\nBetween Finchley Road and Stanmore";
const AllowedNorthern = "Between Golders Green and Hendon Central\nBetween Colindale and Edgware\nBetween East Finchley, Mill Hill East and High Barnet";
const AllowedPiccadilly = "Between Oakwood and Cockfosters\nBetween Barons Court, Hounslow West and Uxbridge";
const PartiallyAllowedElizabeth = "From west: until Royal Oak\nTo west: from Paddington\nFrom east: until Bethnal Green\nTo east: from Liverpool Street\nNote: until the Elizabeth Line fully opens (Spring 2023), the times are actually slightly <a target='_blank' href='https://lcc.org.uk/news/new-connections-for-cycles-on-trains/'>different</a>";
const PartiallyAllowedOverground = "From Liverpool Street station going towards Chingford, Enfield Town or Cheshunt.\nComing from Chingford, Enfield Town or Cheshunt until Bethnal Green.";


const lineColors = new Map([
    [Folded, { backgroundColor: "#FFFFFF", textColor: "#000000" }],
    [Bakerloo, { backgroundColor: "#B36305", textColor: "#ffffff" }],
    [Central, { backgroundColor: "#E32017", textColor: "#ffffff" }],
    [Circle, { backgroundColor: "#FFD300", textColor: "#ffffff" }],
    [District, { backgroundColor: "#00782A", textColor: "#ffffff" }],
    [DLR, { backgroundColor: "#00A4A7", textColor: "#ffffff" }],
    [Elizabeth, { backgroundColor: "#9364CD", textColor: "#ffffff" }],
    [HammersmithCity, { backgroundColor: "#F3A9BB", textColor: "#ffffff" }],
    [Jubilee, { backgroundColor: "#A0A5A9", textColor: "#ffffff" }],
    [Metropolitan, { backgroundColor: "#9B0056", textColor: "#ffffff" }],
    [Northern, { backgroundColor: "#000000", textColor: "#ffffff" }],
    [Overground, { backgroundColor: "#EE7C0E", textColor: "#ffffff" }],
    [Piccadilly, { backgroundColor: "#003688", textColor: "#ffffff" }],
    [Victoria, { backgroundColor: "#0098D4", textColor: "#ffffff" }],
    [WaterlooCity, { backgroundColor: "#95CDBA", textColor: "#ffffff" }],
    [BusTram, { backgroundColor: "#FFFFFF", textColor: "#000000" }],
    [NationalRail, { backgroundColor: "#FFFFFF", textColor: "#000000" }],
    [River, { backgroundColor: "#FFFFFF", textColor: "#000000" }],
    [EmiratedAir, { backgroundColor: "#FFFFFF", textColor: "#000000" }],
    [Coaches, { backgroundColor: "#FFFFFF", textColor: "#000000" }],
]);

const pastMidnight_0000_0730 = "00:00-07:30";
const morningPeak_0730_0930 = "07:30-09:30";
const daytime_0930_1600 = "09:30-16:00";
const eveningPeak_1600_1900 = "16:00-19:00";
const nighttime_1900_2400 = "19:00-00:00";

const allowedSet = new Map([
    [Folded, { message: AllowedFolded, showHours: false }],
    [Bakerloo, { message: AllowedBakerloo, showHours: true }],
    [Central, { message: AllowedCentral, showHours: true }],
    [Circle, { message: AllowedAnywhere, showHours: true }],
    [District, { message: AllowedAnywhere, showHours: true }],
    [DLR, { message: AllowedAnywhere, showHours: true }],
    [Elizabeth, { message: AllowedAnywhere, showHours: true }],
    [HammersmithCity, { message: AllowedAnywhere, showHours: true }],
    [Jubilee, { message: AllowedJubilee, showHours: true }],
    [Metropolitan, { message: AllowedAnywhere, showHours: true }],
    [Northern, { message: AllowedNorthern, showHours: true }],
    [Piccadilly, { message: AllowedPiccadilly, showHours: true }],
    [Overground, { message: AllowedAnywhere, showHours: true }],
    [Victoria, { message: NotAllowedEver, showHours: false }],
    [WaterlooCity, { message: NotAllowedEver, showHours: false }],
    [BusTram, { message: NotAllowedBusesTrams, showHours: false }],
    [NationalRail, { message: AllowedNationalRail, showHours: false }],
    [River, { message: AllowedRiver, showHours: false }],
    [EmiratedAir, { message: AllowedEmiratesAir, showHours: false }],
    [Coaches, { message: AllowedCoaches, showHours: false }],
]);

const notAllowedSet = new Map([
    [Folded, { message: AllowedFolded, showHours: false }],
    [Bakerloo, { message: NotAllowed, showHours: true }],
    [Central, { message: NotAllowed, showHours: true }],
    [Circle, { message: NotAllowed, showHours: true }],
    [District, { message: NotAllowed, showHours: true }],
    [DLR, { message: NotAllowed, showHours: true }],
    [Elizabeth, { message: PartiallyAllowedElizabeth, showHours: true }],
    [HammersmithCity, { message: NotAllowed, showHours: true }],
    [Jubilee, { message: NotAllowed, showHours: true }],
    [Metropolitan, { message: NotAllowed, showHours: true }],
    [Northern, { message: NotAllowed, showHours: true }],
    [Piccadilly, { message: NotAllowed, showHours: true }],
    [Overground, { message: PartiallyAllowedOverground, showHours: true }],
    [Victoria, { message: NotAllowedEver, showHours: false }],
    [WaterlooCity, { message: NotAllowedEver, showHours: false }],
    [BusTram, { message: NotAllowedBusesTrams, showHours: false }],
    [NationalRail, { message: AllowedNationalRail, showHours: false }],
    [River, { message: AllowedRiver, showHours: false }],
    [EmiratedAir, { message: AllowedEmiratesAir, showHours: false }],
    [Coaches, { message: AllowedCoaches, showHours: false }],
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