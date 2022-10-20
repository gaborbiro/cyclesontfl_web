class DisruptionViewModel extends ViewModel {

    repository = new DisruptionsRepository();

    constructor(document, view) {
        super(document, view);
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