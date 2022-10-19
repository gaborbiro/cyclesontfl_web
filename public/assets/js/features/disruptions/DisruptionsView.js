class DisruptionView {

    displayMap(mapData) { }

    displayDisruptions(disruptions) { } // list of DisruptionUIModel objects

    showError(error) { }
}

class DisruptionUIModel {
    line; // LineUIModel instance
    segments; // list of SegmentUIModel instances

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