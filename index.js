class ScratchChatbot {
    constructor() {
    }

    getInfo() {
        return {
            "id": "Chatbot",
            "name": "Chatbot",
            "blocks": [
                        {
                            "opcode": "getResponse",
                            "blockType": "reporter",
                            "text": "chatbot says [message]",
                            "arguments": {
                                "message": {
                                    "type": "string",
                                    "defaultValue": ""
                                }
                            }
                        },
                ],
        };
    }

    getResponse({message}) {
        // Logic to send message to chatbot API and receive the chatbot's response
        return fetch('https://your-chatbot-api.com/message', {
          method: 'POST',
          body: JSON.stringify({message: message}),
          headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(response => {
           return response.chatbot_response;
        })
        .catch(error => {
           return error;
        });
    }
}

Scratch.extensions.register(new ScratchChatbot());
