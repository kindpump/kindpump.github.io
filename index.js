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
        const url = `https://geocode.xyz/${CITY},${STATE}?json=1`;
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.matches) {
                    const coordinates = {
                        latitude: data.latt,
                        longitude: data.longt
                    }
                    return coordinates;
                } else {
                    throw new Error(data.reason);
                }
            })
            .catch(error => {
                return error;
            });
    }
}

Scratch.extensions.register(new ScratchGeoLocation());
