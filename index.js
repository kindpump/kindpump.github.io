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
            navigator.permissions.query({name:'geolocation'}).then(function(permissionStatus) {
                if(permissionStatus.state === 'granted'){
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
                } else {
                    reject("Permission Denied: Access to location is denied");
                }
            });
        });
    }
}

Scratch.extensions.register(new ScratchGeoLocation());
