class DisruptionsRepository {

    #datasource = new DisruptionsDatasource();

    loadMap = () => {
        return this.#datasource
            .getMap()
            .catch(function (error) {
                throw checkError(error);
            });
    }

    loadDisruptions = () => {
        return this.#datasource
            .getDisruptions()
            .then((statusJSON) => this.#processStatusJSON(statusJSON))
            .catch(function (error) {
                throw checkError(error);
            });
    }

    #processStatusJSON(statusJSON) {
        let result = [];
        var lineResult;
        statusJSON.forEach((line) => {
            lineResult = this.#processLine(line);
            if (lineResult) {
                result.push(lineResult);
            }
        });
        return result;
    }

    #processLine = (line) => {
        var lineId = line.id;
        var mode = line.modeName;
        if (!line.lineStatuses) {
            return
        }
        var modeConv;
        switch (mode) {
            case "tube":
                modeConv = "lul";
                break;
            case "overground":
                modeConv = "raillo";
                lineId = "overground";
                break;
            case "dlr":
                modeConv = "dlr";
                break;
            default:
                throw new Error(`Unexpected mode ${mode}`);
        }

        var statusSegments = [];
        line.lineStatuses
            .filter(lineStatus => lineStatus.disruption && lineStatus.disruption.affectedRoutes)
            .forEach(lineStatus => {
                lineStatus.disruption.affectedRoutes
                    .filter(route => route.routeSectionNaptanEntrySequence)
                    .forEach(route => {
                        var segments = this.#processRoute(route, modeConv, lineId);
                        statusSegments.push(segments);
                    });
            });
        if (line.lineStatuses.some(lineStatus => lineStatus.disruption && lineStatus.disruption.affectedRoutes)) {
            return this.#mapLineUIModel(line, statusSegments);
        } else {
            return undefined
        }
    }

    #mapLineUIModel = (line, statusSegments) => {
        var simpleLineInfo = LineInfo.get(line.id);
        var lineUIModel = new LineUIModel(
            simpleLineInfo.name,
            simpleLineInfo.backgroundColor,
            simpleLineInfo.textColor
        )
        var segments = [];
        statusSegments.forEach((routeSegments) => {
            routeSegments.forEach((segment) => {
                segments.push(new SegmentUIModel(segment.segmentId, segment.segmentIdAlt));
                segments.push(new SegmentUIModel(segment.segmentIdReverse, segment.segmentIdReverseAlt));
            });
        })
        return new DisruptionUIModel(lineUIModel, segments);
    }

    // segment ids: [\w]+-[\w]+_[\w\d]+_[\w\d]+
    #processRoute = (route, modeConv, lineId) => {
        var startcode = null;
        var endcode = null;
        var result = [];
        route.routeSectionNaptanEntrySequence
            .filter(naptanEntrySequence => naptanEntrySequence.stopPoint)
            .forEach(naptanEntrySequence => {
                if (!startcode) {
                    startcode = naptanEntrySequence.stopPoint.id;
                } else {
                    startcode = endcode;
                    endcode = naptanEntrySequence.stopPoint.id;
                }
                if (startcode && endcode) {
                    var segmentId = '#' + modeConv + "-" + lineId + "_" + startcode.toLowerCase() + "_" + endcode.toLowerCase();
                    var segmentIdAlt = '#' + modeConv + "-" + lineId + "_" + startcode.toLowerCase() + "_" + endcode.toLowerCase() + "_2_";
                    var segmentIdReverse = '#' + modeConv + "-" + lineId + "_" + endcode.toLowerCase() + "_" + startcode.toLowerCase();
                    var segmentIdReverseAlt = '#' + modeConv + "-" + lineId + "_" + endcode.toLowerCase() + "_" + startcode.toLowerCase() + "_2_";
                    result.push({
                        "segmentId": segmentId,
                        "segmentIdAlt": segmentIdAlt,
                        "segmentIdReverse": segmentIdReverse,
                        "segmentIdReverseAlt": segmentIdReverseAlt,
                    })
                }
            });
        return result;
    }
}