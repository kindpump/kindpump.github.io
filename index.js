class ScratchGeoLocation {
    constructor() {
    }

    getInfo() {
        return {
            "id": "GeoLocation",
            "name": "GeoLocation",
            "blocks": [
                        {
                            "opcode": "getCoordinates",
                            "blockType": "reporter",
                            "text": "Coordinates of [CITY] , [STATE]",
                            "arguments": {
                                "CITY": {
                                    "type": "string",
                                    "defaultValue": ""
                                },
                                "STATE": {
                                    "type": "string",
                                    "defaultValue": ""
                                }
                            }
                        },
                ],
        };
    }

    getCoordinates({CITY, STATE}) {
        const url = `https://nominatim.openstreetmap.org/search/${CITY},${STATE}?format=json`;
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length) {
                    const coordinates = {
                        latitude: data[0].lat,
                        longitude: data[0].lon
                    }
                    return coordinates;
                } else {
                    throw new Error("No data found");
                }
            })
            .catch(error => {
                return error;
            });
    }
}

Scratch.extensions.register(new ScratchGeoLocation());
