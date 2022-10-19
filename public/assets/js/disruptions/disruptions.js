const LineMapping = new Map([
    ["bakerloo", Bakerloo],
    ["central", Central],
    ["circle", Circle],
    ["district", District],
    ["dlr", DLR],
    ["elizabeth", Elizabeth],
    ["hammersmith-city", HammersmithCity],
    ["jubilee", Jubilee],
    ["metropolitan", Metropolitan],
    ["northern", Northern],
    ["london-overground", Overground],
    ["piccadilly", Piccadilly],
    ["victoria", Victoria],
    ["waterloo-city", WaterlooCity],
]);

class DisruptionViewModel {
    CACHE = {};
    view;

    constructor(document, disruptionView) {
        this.view = disruptionView;
        document.addEventListener('DOMContentLoaded', () => {
            this
                .loadMap()
                .then(this.view.showMap)
                .then(this.loadDisruptions)
                .catch(this.view.showError);
        });
    }

    loadMap = () => {
        return new Promise((resolve, reject) => {
            var url = "assets/svg/tubemap.svg"
            var xhr = this.CACHE[url] = this.CACHE[url] || new XMLHttpRequest();

            xhr.open('GET', url);
            xhr.onload = function () {
                // safeLog(`loadMap onload: code: ${xhr.statusCode} status: ${xhr.statusText} payload: ${xhr.responseText}`);
                if (xhr.status == "200") {
                    resolve(xhr.responseText);
                } else {
                    reject(parseMapLoadingError(xhr));
                }
            };
            xhr.onerror = function () {
                // safeLog(`loadMap onerror: code: ${xhr.statusCode} status: ${xhr.statusText} payload: ${xhr.responseText}`);
                reject(parseError(xhr));
            };
            xhr.send();
        }).catch(function (error) {
            throw checkError(error);
        });
    }

    loadDisruptions = () => {
        return new Promise((resolve, reject) => {
            // var url = "https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground/Status?detail=true";
            var url = "assets/json/bakerloo_district_disrupted.json";
            var xhr = this.CACHE[url] = this.CACHE[url] || new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.viewModel = this
            xhr.onload = function () {
                // safeLog(`loadDisruptions onload: code: ${xhr.statusCode} status: ${xhr.statusText} payload: ${xhr.responseText}`);
                if (xhr.status == "200") {
                    var statusJSON = JSON.parse(xhr.responseText);
                    statusJSON.forEach((statusEntry) => {
                        this.viewModel.processLine(statusEntry);
                    });
                    resolve();
                } else {
                    reject(parseTflError(xhr));
                }
            }
            xhr.onerror = function () {
                // safeLog(`loadDisruptions onerror: code: ${xhr.statusCode} status: ${xhr.statusText} payload: ${xhr.responseText}`);
                reject(parseError(xhr));
            };
            xhr.send();
        }).catch(function (error) {
            throw checkError(error);
        });
    }

    processLine = (line) => {
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

        line.lineStatuses
            .filter(lineStatus => lineStatus.disruption && lineStatus.disruption.affectedRoutes)
            .forEach(lineStatus => {
                safeLog(`Processing lineStatus ${lineStatus}`);
                lineStatus.disruption.affectedRoutes
                    .filter(route => route.routeSectionNaptanEntrySequence)
                    .forEach(route => {
                        this.processRoute(route, modeConv, lineId);
                    });
            });
        if (line.lineStatuses.some(lineStatus => lineStatus.disruption && lineStatus.disruption.affectedRoutes)) {
            document.querySelector('#lines_container_title').innerHTML = "Disruptions:"
            this.addLineButton(line);
        }
    }

    addLineButton= (line) => {
        var disruptedLinesContainer = document.querySelector('#lines_container');
        var simpleLine = LineMapping.get(line.id);

        var lineButton = document.createElement("div");
        lineButton.setAttribute("class", "button");
        lineButton.style.backgroundColor = Lines.get(simpleLine).backgroundColor;
        lineButton.style.color = Lines.get(simpleLine).textColor;
        lineButton.innerHTML = line.name;
        disruptedLinesContainer.appendChild(lineButton);
    }

    // segment ids: [\w]+-[\w]+_[\w\d]+_[\w\d]+
    processRoute= (route, modeConv, lineId) => {
        var startcode = null;
        var endcode = null;
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
                    var segment = document.querySelector(segmentId);

                    if (!segment) {
                        var segmentId = '#' + modeConv + "-" + lineId + "_" + startcode.toLowerCase() + "_" + endcode.toLowerCase() + "_2_";
                        var segment = document.querySelector(segmentId);
                    }

                    var segmentIdReverse = '#' + modeConv + "-" + lineId + "_" + endcode.toLowerCase() + "_" + startcode.toLowerCase();
                    var segmentReverse = document.querySelector(segmentIdReverse);

                    if (!segmentReverse) {
                        var segmentId = '#' + modeConv + "-" + lineId + "_" + endcode.toLowerCase() + "_" + startcode.toLowerCase() + "_2_";
                        var segmentReverse = document.querySelector(segmentId);
                    }

                    if (segment) {
                        segment.setAttribute('class', "linedisrupted");
                        segment.setAttribute('stroke-dasharray', "3, 1");
                    }
                    if (segmentReverse) {
                        segmentReverse.setAttribute('class', "linedisrupted");
                        segmentReverse.setAttribute('stroke-dasharray', "3, 1");
                    }
                }
            });
    }
}