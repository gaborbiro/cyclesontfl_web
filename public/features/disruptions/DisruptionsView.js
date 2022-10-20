class DisruptionsView extends DisruptionsViewInterface {

    // Override
    displayMap = (mapData) => {
        var container = document.createElement('x');
        container.innerHTML = mapData;
        let svgNode = document.querySelector('svg');
        var bodyNode = svgNode.parentNode;

        var newSvgNode = container.querySelector('#status-map');

        if (newSvgNode) bodyNode.replaceChild(newSvgNode.cloneNode(true), svgNode);
    }

    // Override
    displayDisruptions = (disruptionUIModels) => {
        if (disruptionUIModels.length > 0) {
            document.querySelector('#lines_container_title').innerHTML = "Disruptions:";
            var disruptedLinesContainer = document.querySelector('#lines_container');
            disruptionUIModels.forEach(disruption => this.#adaptDistruptionUIModel(disruption, disruptedLinesContainer));
        } else {
            document.querySelector('#lines_container_title').innerHTML = "No disruptions";
        }
    }

    #adaptDistruptionUIModel(disruption, container) {
        var lineButton = document.createElement("div");
        this.#adaptLineUIModel(disruption.line, lineButton);
        container.appendChild(lineButton);

        var segments = disruption.segments;
        segments.forEach(this.#adaptSegmentUIModel);
    }

    #adaptLineUIModel(lineUIModel, node) {
        node.setAttribute("class", "button");
        node.style.backgroundColor = lineUIModel.backgroundColor;
        node.style.color = lineUIModel.textColor;
        node.innerHTML = lineUIModel.name;
    }

    #adaptSegmentUIModel(segment) {
        var segmentNode = document.querySelector(segment.id);

        if (!segmentNode) {
            var segmentNode = document.querySelector(segment.idAlt);
        }

        if (segmentNode) {
            segmentNode.setAttribute('class', "linedisrupted");
            segmentNode.setAttribute('stroke-dasharray', "3, 1");
        }
    }

    
    // Override
    showError = globalHandleUIError
}