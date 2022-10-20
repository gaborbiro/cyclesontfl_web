class RulesView extends RulesViewInterface {

    // Override
    populateRules = (rules) => {
        var { dateTime, lineRules } = rules;

        const dateTimePicker = document.querySelector('#datetime_picker');
        dateTimePicker.value = dateTime;

        const tableElement = document.querySelector('#rules');
        tableElement.innerHTML = "";
        lineRules.forEach(ruleEntry => {
            var row = tableElement.insertRow(tableElement.rows.length);
            this.#adaptRuleRow(row, ruleEntry.line, ruleEntry.targetRule, ruleEntry.targetTimeOfDay);
        });
    }

    #adaptRuleRow(row, line, targetRule, targetTimeOfDay) {
        var cellLine = row.insertCell(0);
        cellLine.innerHTML = RuleEntryInfo.get(line).name;
        cellLine.style.color = RuleEntryInfo.get(line).textColor;
        cellLine.style.backgroundColor = RuleEntryInfo.get(line).backgroundColor;

        var cellRule = row.insertCell(1);
        cellRule.style.borderRightColor = targetRule.statusColor;
        cellRule.style.borderRightWidth = "5px";
        var message = `${targetRule.message.replaceAll("\n", "<br />")}`;
        if (targetRule.showHours) {
            message += `<br/>(${targetTimeOfDay})`;
        }
        cellRule.innerHTML = message;
    }

    // Override
    showError = globalHandleUIError
}