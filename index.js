class GPT {
  constructor() {
    this.apiKey = ""; // Set the API key to an empty string by default
  }

  getInfo() {
    return {
      "id": "GPT",
      "name": "GPT",
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
        {
          "opcode": "getChatResponse",
          "blockType": "reporter",
          "text": "get GPT chat response for [prompt]",
          "arguments": {
            "prompt": {
              "type": "string",
              "defaultValue": "Hello, GPT!"
            },
          }
        },
      ],
    };
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  async getChatResponse({prompt}) {
    const response = await fetch(`https://api.openai.com/v1/engines/davinci-codex/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        "prompt": `${prompt}`,
        "max_tokens": 50,
        "n": 1,
        "stop": "\n"
      })
    });
    const data = await response.json();
    return data.choices[0].text.trim();
  }

  fetchURL({url}) {
    return fetch(url).then(response => response.text())
  }

  jsonExtract({name, data}) {
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

Scratch.extensions.register(new GPT());
