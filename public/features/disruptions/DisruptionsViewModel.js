class DisruptionViewModel extends ViewModel {

    repository = new DisruptionsRepository();

    constructor(view) {
        super(view);
    }

    // Override
    onPageReady() {
        this
            .repository.loadMap()
            .then(this.view.displayMap)
            .then(this.repository.loadDisruptions)
            .then(this.view.displayDisruptions)
            .catch(this.view.showError);
    }
}