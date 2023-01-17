class ScratchSnapchat {
    constructor() {
    }

    getInfo() {
        return {
            "id": "Snapchat",
            "name": "Snapchat",
            "blocks": [
                        {
                            "opcode": "sendSnap",
                            "blockType": "command",
                            "text": "send snap to [username] with [media]",
                            "arguments": {
                                "username": {
                                    "type": "string",
                                    "defaultValue": ""
                                },
                                "media": {
                                    "type": "string",
                                    "defaultValue": ""
                                }
                            }
                        },
                ],
        };
    }

    sendSnap({username, media}) {
        // Logic to send snap to specified username with the specified media
        // ...
        // requires an access token to be passed in the request headers
        // and the correct endpoint to be used for sending snaps
    }
}

Scratch.extensions.register(new ScratchSnapchat());
