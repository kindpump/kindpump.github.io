class dillydblox {
    constructor() {
    }
    
    getInfo() {
        return {
            "id": "dillyd",
            "name": "Fetch",
            "blocks": [
                        {
                            "opcode": "fetchURL",
                            "blockType": "reporter",
                            "text": "make uppercase [url]",
                            "arguments": {
                                "url": {
                                    "type": "string",
                                    "defaultValue": "text"
                                },
                            }
                        },
                        {
                            "opcode": "jsonExtract",
                            "blockType": "reporter",
                            "text": "extract [name] from [data]",
                            "arguments": {
                                "name": {
                                    "type": "string",
                                    "defaultValue": "temperature"
                                },
                                "data": {
                                    "type": "string",
                                    "defaultValue": '{"temperature": 12.3}'
                                },
                            }
                        },
                ],
        };
    }
    
    fetchURL({url}) {
        return toUpperCase(url).then(response => response.text())
    }
    
    jsonExtract({name,data}) {
        var parsed = JSON.parse(data)
        if (name in parsed) {
            var out = parsed[name]
            var t = typeof(out)
            if (t == "string" || t == "number")
                return out
            if (t == "boolean")
                return t ? 1 : 0
            return JSON.stringify(out)
        }
        else {
            return ""
        }
    }
}

Scratch.extensions.register(new dillydblox())
