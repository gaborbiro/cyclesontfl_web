class RulesViewModel extends ViewModel {

    repository = new RulesRepository();

    constructor(view) { // RulesView.js
        super(view);
    }

    // Override
    onPageReady() {
        this
            .repository.getLineRules()
            .then(this.view.populateRules)
            .catch(this.view.showError);
    }

    onNewDateTimeSelected = (dateTime) => {
        this
            .repository.getLineRules(dateTime)
            .then(this.view.populateRules)
            .catch(this.view.showError);
    }

    onResetClicked = () => {
        this
            .repository.getLineRules()
            .then(this.view.populateRules)
            .catch(this.view.showError);
    }

}