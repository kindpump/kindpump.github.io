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
                            "text": "gpt data from [prompt] and GPT key [key]",
                            "arguments": {
                                "prompt": {
                                    "type": "string",
                                    "defaultValue": "https://api.weather.gov/stations/KNYC/observations"
                                },
                                "key": {
                                    "type": "string",
                                    "defaultValue": "gptkeygoeshere"
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
    
    fetchURL({prompt,key}) {
        return fetch(`https://api.openai.com/v1/engines/davinci-codex/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer {key}.then(response => response.text())
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

Scratch.extensions.register(new ScratchFetch())
