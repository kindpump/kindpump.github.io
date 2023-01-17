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
                            "text": "My Coordinates",
                        },
                ],
        };
    }

    getCoordinates() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const coordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                    resolve(coordinates);
                },
                error => reject(error)
            );
        });
    }
}

Scratch.extensions.register(new ScratchGeoLocation());
