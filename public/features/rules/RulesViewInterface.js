class RulesViewInterface {
    displayRules(rules) { } // RulesUIModel
    showError(error) { }
}

class RulesUIModel {
    dateTime;
    lineRules; // list of LineRulesUIModels

    constructor(dateTime, lineRules) {
        this.dateTime = dateTime;
        this.lineRules = lineRules;
    }
}

class LineRuleUIModel {
    line;
    previousTimeOfDay;
    previousRule;
    targetTimeOfDay;
    targetRule;
    nextTimeOfDay;
    nextRule;

    constructor(
        line,
        previousTimeOfDay,
        previousRule,
        targetTimeOfDay,
        targetRule,
        nextTimeOfDay,
        nextRule
    ) {
        this.line = line;
        this.previousTimeOfDay = previousTimeOfDay;
        this.previousRule = previousRule;
        this.targetTimeOfDay = targetTimeOfDay;
        this.targetRule = targetRule;
        this.nextTimeOfDay = nextTimeOfDay;
        this.nextRule = nextRule;
    }
}