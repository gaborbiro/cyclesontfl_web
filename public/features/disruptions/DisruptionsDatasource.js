class DisruptionsDatasource {
    CACHE = {};

    getMap() {
        var url = "assets/svg/tubemap.svg";
        return this.#doFetch(
            url,
            /* handleResponseLambda = */(xhr) => xhr.responseText,
            /* handleErrorLambda = */ parseMapLoadingError,
        );
    }

    getDisruptions() {
        if (DEBUG) {
            var url = "assets/json/bakerloo_district_disrupted.json";
        } else {
            var url = "https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground/Status?detail=true";
        }
        return this.#doFetch(
            url,
            (xhr) => JSON.parse(xhr.responseText),
            parseTflError,
        )
    }

    #doFetch(url, handleResponseLambda, handleErrorLambda) {
        return new Promise((resolve, reject) => {
            var xhr = this.CACHE[url] = this.CACHE[url] || new XMLHttpRequest();

            xhr.open('GET', url);
            xhr.onload = function () {
                if (xhr.status == "200") {
                    resolve(handleResponseLambda(xhr));
                } else {
                    reject(handleErrorLambda(xhr));
                }
            };
            xhr.onerror = function () {
                reject(parseHttpError(xhr));
            };
            xhr.send();
        })
    }
}