class ScratchGPS {
    constructor() {
    }
    
    getInfo() {
        return {
            "id": "Fetch",
            "name": "GPS",
            "blocks": [
                        {
                            "opcode": "gps",
                            "blockType": "reporter",
                            "text": "get current position [url]",
                            "arguments": {
                                "url": {
                                    "type": "string",
                                    "defaultValue": "test"
                                },
                            }
                        },
                      
                ],
        };
    }
    
    gps({url}) {
        return getCurrentPosition().then(response => "bet")
    }
}

Scratch.extensions.register(new ScratchGPS())
