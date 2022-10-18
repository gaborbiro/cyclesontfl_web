const lineMapping = new Map([
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

function loadDisruptions(document, CACHE) {
    url_root2 = "https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground/Status?detail=true";
    request = CACHE[url_root2] = CACHE[url_root2] || new XMLHttpRequest();

    request.open('GET', url_root2);

    request.onload = function () {
        statusJSON = JSON.parse(request.responseText);
        statusJSON.forEach(processLine);
    }

    request.send();
}

function processLine(line) {
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
            lineStatus.disruption.affectedRoutes
                .filter(route => route.routeSectionNaptanEntrySequence)
                .forEach(route => {
                    processRoute(line, route, modeConv, lineId);
                });
        });
    if (line.lineStatuses.some(lineStatus => lineStatus.disruption && lineStatus.disruption.affectedRoutes )) {
        document.querySelector('#lines_container_title').innerHTML = "Disruptions:"
        var disruptedLinesContainer = document.querySelector('#lines_container');
        var lineButton = document.createElement("div");
        lineButton.setAttribute("class", "button");
        var simpleLine = lineMapping.get(line.id);
        lineButton.style.backgroundColor = lineColors.get(simpleLine).backgroundColor;
        lineButton.style.color = lineColors.get(simpleLine).textColor;
        lineButton.innerHTML = line.name;
        disruptedLinesContainer.appendChild(lineButton);
    }
}

// segment ids: [\w]+-[\w]+_[\w\d]+_[\w\d]+
function processRoute(line, route, modeConv, lineId) {
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