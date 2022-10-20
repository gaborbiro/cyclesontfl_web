class DisruptionsViewInterface {

    displayMap(mapData) { } // string object containing svg data

    displayDisruptions(disruptions) { } // list of DisruptionUIModels

    showError(error) { }
}

class DisruptionUIModel {
    line; // LineUIModel
    segments; // list of SegmentUIModels

    constructor(line, segments) {
        this.line = line;
        this.segments = segments;
    }
}

class LineUIModel {
    name;
    backgroundColor;
    textColor;

    constructor(name, backgroundColor, textColor) {
        this.name = name;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
    }
}

class SegmentUIModel {
    id;
    idAlt;

    constructor(id, idAlt) {
        this.id = id;
        this.idAlt = idAlt;
    }
}