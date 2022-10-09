class ScratchFetch {
    constructor() {
    }
    
    getInfo() {
        return {
            "id": "Fetch",
            "name": "Fetch",
            "blocks": [
                        {
                            "opcode": "fetchURL",
                            "blockType": "reporter",
                            "text": "fetch data from [url]",
                            "arguments": {
                                "url": {
                                    "type": "string",
                                    "defaultValue": "https://api.weather.gov/stations/KNYC/observations"
                                },
                            }
                        },
                    
                ],
        };
    }
    
    fetchURL({url}) {
      
        
        return  navigator.geolocation.getCurrentPosition(url)
            .then(response => response.text())
 
    }
}

Scratch.extensions.register(new ScratchFetch())
