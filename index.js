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
        const session_id = '123456789';
        const project_id = 'your_project_id';
        const access_token = 'your_access_token';
        const url = 'https://dialogflow.googleapis.com/v2/projects/'+ project_id + '/agent/sessions/' + session_id + ':detectIntent';
        return fetch(url, {
          method: 'POST',
          body: JSON.stringify({queryInput: {text: {text: message, languageCode: "en"}}}),
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
          },
        })
        .then(res => res.json())
        .then(response => {
           return response.queryResult.fulfillmentText;
        })
        .catch(error => {
           return error;
        });
    }
}

Scratch.extensions.register(new ScratchChatbot());
