class GPTExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this.text = '';
    this.apiKey = '';
  }

  getInfo() {
    return {
      id: 'gpt',
      name: 'GPT-3 Text Completion',
      blocks: [
        {
          opcode: 'completeText',
          blockType: Scratch.BlockType.COMMAND,
          text: 'complete [TEXT] using GPT-3 with API key [APIKEY]',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'The quick brown fox'
            },
            APIKEY: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'YOUR_API_KEY_HERE'
            }
          }
        }
      ]
    };
  }

  completeText(args) {
    const prompt = args.TEXT;
    const maxTokens = 50;
    const apiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    const apiKey = args.APIKEY;

    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt,
        max_tokens: maxTokens
      })
    })
    .then(response => response.json())
    .then(data => {
      const completedText = data.choices[0].text;
      const target = this.runtime.getEditingTarget();
      target.setVariable('completedText', completedText);
    })
    .catch(error => console.error(error));
  }
}

Scratch.extensions.register(new GPTExtension());
