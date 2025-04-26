class RulesRepository {

    getLineRules = (dateTime = new Date()) => {
        return new Promise((resolve, reject) => {
            try {
                var rules = this.#calculateLineRules(dateTime);
                resolve(new RulesUIModel(getBST_Input_Date(dateTime), rules));
            } catch (error) {
                reject(error);
            }
        }).catch(function (error) {
            throw checkError(error);
        });
    }

    #calculateLineRules(dateTime) {
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

        const rules = [];
        lines.forEach(line => {
            rules.push(new LineRuleUIModel(
                line,
                previousTimeOfDay,
                previousSet.get(line),
                targetTimeOfDay,
                targetSet.get(line),
                nextTimeOfDay,
                nextSet.get(line),
            ));
        });
        return rules;
    }
}

const allowedSet = new Map([
    [RuleFolded, { message: AllowedFolded, showHours: false, statusColor: "green" }],
    [RuleEBikes, { message: EBikesNotAllowed, showHours: false, statusColor: "green" }],
    [RuleBakerloo, { message: AllowedBakerloo, showHours: true, statusColor: "orange" }],
    [RuleCentral, { message: AllowedCentral, showHours: true, statusColor: "orange" }],
    [RuleCircle, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [RuleDistrict, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [RuleDLR, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [RuleElizabeth, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [RuleHammersmithCity, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [RuleJubilee, { message: AllowedJubilee, showHours: true, statusColor: "orange" }],
    [RuleMetropolitan, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [RuleNorthern, { message: AllowedNorthern, showHours: true, statusColor: "orange" }],
    [RulePiccadilly, { message: AllowedPiccadilly, showHours: true, statusColor: "green" }],
    [RuleOverground, { message: AllowedAnywhere, showHours: true, statusColor: "green" }],
    [RuleVictoria, { message: NotAllowedEver, showHours: false, statusColor: "red" }],
    [RuleWaterlooCity, { message: NotAllowedEver, showHours: false, statusColor: "red" }],
    [RuleBusTram, { message: NotAllowedEver, showHours: false, statusColor: "red" }],
    [RuleNationalRail, { message: AllowedNationalRail, showHours: false, statusColor: "orange" }],
    [RuleRiver, { message: AllowedRiver, showHours: false, statusColor: "orange" }],
    [RuleEmiratedAir, { message: AllowedEmiratesAir, showHours: false, statusColor: "green" }],
    [RuleCoaches, { message: AllowedCoaches, showHours: false, statusColor: "orange" }],
]);

const notAllowedSet = new Map([
    [RuleFolded, { message: AllowedFolded, showHours: false, statusColor: "green" }],
    [RuleEBikes, { message: EBikesNotAllowed, showHours: false, statusColor: "green" }],
    [RuleBakerloo, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [RuleCentral, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [RuleCircle, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [RuleDistrict, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [RuleDLR, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [RuleElizabeth, { message: PartiallyAllowedElizabeth, showHours: true, statusColor: "orange" }],
    [RuleHammersmithCity, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [RuleJubilee, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [RuleMetropolitan, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [RuleNorthern, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [RulePiccadilly, { message: NotAllowed, showHours: true, statusColor: "red" }],
    [RuleOverground, { message: PartiallyAllowedOverground, showHours: true, statusColor: "orange" }],
    [RuleVictoria, { message: NotAllowedEver, showHours: false, statusColor: "red" }],
    [RuleWaterlooCity, { message: NotAllowedEver, showHours: false, statusColor: "red" }],
    [RuleBusTram, { message: NotAllowedEver, showHours: false, statusColor: "red" }],
    [RuleNationalRail, { message: AllowedNationalRail, showHours: false, statusColor: "red" }],
    [RuleRiver, { message: AllowedRiver, showHours: false, statusColor: "orange" }],
    [RuleEmiratedAir, { message: AllowedEmiratesAir, showHours: false, statusColor: "green" }],
    [RuleCoaches, { message: AllowedCoaches, showHours: false, statusColor: "orange" }],
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