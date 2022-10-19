class ViewModel {
    view;

    constructor(document, view) {
        this.view = view;
        document.addEventListener('DOMContentLoaded', () => {
            this.onPageReady()
        });
    }

    onPageReady() { }
}