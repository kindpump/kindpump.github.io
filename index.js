class GPTExtension {
  getInfo() {
    return {
      id: 'gpt3',
      name: 'GPT-3 Blocks',
      blocks: [
        {
          opcode: 'generateText',
          text: 'generate text from GPT-3 model [MODEL] with prompt [PROMPT] and API key [APIKEY] with max tokens [MAXTOKENS] and temperature [TEMPERATURE]',
          blockType: Scratch.BlockType.REPORTER,
          arguments: {
            MODEL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'text-davinci-002'
            },
            PROMPT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello'
            },
            APIKEY: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'sk-AbCdEf.....'
            },
            MAXTOKENS: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 50
            },
            TEMPERATURE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0.7
            }
          }
        }
      ]
    };
  }

  async generateText(args) {
    const model = args.MODEL;
    const prompt = args.PROMPT;
    const apiKey = args.APIKEY;
    const maxTokens = args.MAXTOKENS;
    const temperature = args.TEMPERATURE;

    try {
      const response = await fetch(`https://api.openai.com/v1/engines/${model}/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: maxTokens,
          temperature: temperature
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate text from GPT-3: ${response.status} ${response.statusText}\n${errorText}`);
      }

      const result = await response.json();
      const text = result.choices[0].text.trim();
      return text;

    } catch (error) {
      console.error(error);
      return 'Uh oh! Something went wrong.';
    }
  }
}

Scratch.extensions.register(new GPTExtension());
