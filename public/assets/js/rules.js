const AllowedFolded = "You can take folded cycles anywhere, at any time on all transport services. However, on buses the driver can decide not to let you travel if it's too busy.";
const AllowedAnywhere = "Allowed anywhere";
const NotAllowed = "Not allowed";
const NotAllowedEver = "Never allowed";
const AllowedNationalRail = "Use <a target='_blank' href='http://plusbike.nationalrail.co.uk/'>PlusBike</a> to find out where you can take cycles on National Rail services.";
const AllowedRiver = "Most <a target='_blank' href='https://tfl.gov.uk/modes/river/'>river services</a> allow non-folded cycles but you should check with them before you travel.";
const AllowedEmiratesAir = "You can take a non-folded cycle at any time.";
const AllowedCoaches = "You need to check with the <a target='_blank' href='https://tfl.gov.uk/modes/coaches/coach-companies'>coach company</a> to see if you can take a non-folded cycle.";
const AllowedBakerloo = "Between Queen's Park and Harrow & Wealdstone";
const AllowedCentral = "Between Leyton, Epping and Newbury Park (via Hainault only)\nBetween White City, Ealing Broadway and West Ruislip";
const AllowedJubilee = "Between Stratford and Canning Town\nBetween Finchley Road and Stanmore";
const AllowedNorthern = "Between Golders Green and Hendon Central\nBetween Colindale and Edgware\nBetween East Finchley, Mill Hill East and High Barnet";
const AllowedPiccadilly = "Between Oakwood and Cockfosters\nBetween Barons Court, Hounslow West and Uxbridge";
const PartiallyAllowedElizabeth = "From west: until Royal Oak\nTo west: from Paddington\nFrom east: until Bethnal Green\nTo east: from Liverpool Street\n\nNote: until the Elizabeth Line fully opens (Spring 2023), the times are actually slightly <a target='_blank' href='https://lcc.org.uk/news/new-connections-for-cycles-on-trains/'>different</a>";
const PartiallyAllowedOverground = "From Liverpool Street station going towards Chingford, Enfield Town or Cheshunt.\nComing from Chingford, Enfield Town or Cheshunt until Bethnal Green.";

const pastMidnight_0000_0730 = "00:00-07:30";
const morningPeak_0730_0930 = "07:30-09:30";
const daytime_0930_1600 = "09:30-16:00";
const eveningPeak_1600_1900 = "16:00-19:00";
const nighttime_1900_2400 = "19:00-00:00";

const allowedSet = new Map([
    [Folded, { message: AllowedFolded, showHours: false, statusColor: "green" }],
    [Bakerloo, { message: AllowedBakerloo, showHours: true, statusColor: "orange" }],
    [Central, { message: AllowedCentral, showHours: true, statusColor: "orange" }],
    [Circle, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [District, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [DLR, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [Elizabeth, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [HammersmithCity, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [Jubilee, { message: AllowedJubilee, showHours: true, statusColor: "orange" }],
    [Metropolitan, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [Northern, { message: AllowedNorthern, showHours: true, statusColor: "orange" }],
    [Piccadilly, { message: AllowedPiccadilly, showHours: true, statusColor: "green" }],
    [Overground, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [Victoria, { message: NotAllowedEver, showHours: false, statusColor: "red" }],
    [WaterlooCity, { message: NotAllowedEver, showHours: false, statusColor: "red" }],
    [BusTram, { message: NotAllowedEver, showHours: false, statusColor: "red" }],
    [NationalRail, { message: AllowedNationalRail, showHours: false, statusColor: "orange" }],
    [River, { message: AllowedRiver, showHours: false, statusColor: "orange" }],
    [EmiratedAir, { message: AllowedEmiratesAir, showHours: false, statusColor: "green" }],
    [Coaches, { message: AllowedCoaches, showHours: false, statusColor: "orange" }],
]);

const notAllowedSet = new Map([
    [Folded, { message: AllowedFolded, showHours: false, statusColor: "green" }],
    [Bakerloo, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [Central, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [Circle, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [District, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [DLR, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [Elizabeth, { message: PartiallyAllowedElizabeth, showHours: true, statusColor: "orange" }],
    [HammersmithCity, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [Jubilee, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [Metropolitan, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [Northern, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [Piccadilly, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [Overground, { message: PartiallyAllowedOverground, showHours: true, statusColor: "orange" }],
    [Victoria, { message: NotAllowedEver, showHours: false, statusColor: "red" }],
    [WaterlooCity, { message: NotAllowedEver, showHours: false, statusColor: "red" }],
    [BusTram, { message: NotAllowedEver, showHours: false, statusColor: "red" }],
    [NationalRail, { message: AllowedNationalRail, showHours: false, statusColor: "red" }],
    [River, { message: AllowedRiver, showHours: false, statusColor: "orange" }],
    [EmiratedAir, { message: AllowedEmiratesAir, showHours: false, statusColor: "green" }],
    [Coaches, { message: AllowedCoaches, showHours: false, statusColor: "orange" }],
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

function getLineRules(dateTime = new Date()) {
    if (!arraysEqual(Array.from(allowedSet.keys()), Array.from(notAllowedSet.keys()))) {
        throw new Error("allowedSet and notAllowedSet must have the same set of keys")
    }

    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const timestamp = hour * 60 + minute;

    const weekConfigList = [
        weekendOrHolidaysConfig, // 0 Sunday
        weekdayConfig, // 1 - Monday
        weekdayConfig, // 2 Tuesday
        weekdayConfig, // 3 Wednesday
        weekdayConfig, // 4 Thursday
        weekdayConfig, // 5 Friday
        weekendOrHolidaysConfig, // 6 Saturday
    ]

    const day = dateTime.getDay()
    const previousDayConfig = weekConfigList[(day - 1).mod(7)];
    const targetDayConfig = weekConfigList[day];
    const nextDayConfig = weekConfigList[(day + 1).mod(7)];

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

    const previousSet = previousDayConfig.get(previousTimeOfDay);
    const targetSet = targetDayConfig.get(targetTimeOfDay);
    const nextSet = nextDayConfig.get(nextTimeOfDay);

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