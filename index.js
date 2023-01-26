class Scratch3Speech2Scratch {
    constructor (runtime) {
        this.runtime = runtime;
        this.speech = '';
    }

    getInfo () {
        return {
            id: "speech2scratch",
            name: "Speech2Scratch",
            blocks: [{
                    "opcode": "startRecognition",
                    blockType: BlockType.COMMAND,
                    text: "Start Recognition"
                },
                {
                    "eventType": {
                    "type": BlockType.REPORTER,
                    "text": 'Get Speech'
                }
            ],
            "menus": {
            }
        };
    }

    startRecognition () {
        SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.onresult = (event) => {
            this.speech = event.results[0][0].transcript;
        }
        recognition.start();
    }

    getSpeech() {
        return this.speech;
    }
}

(function() {
    var extensionInstance = new Scratch3Speech2Scratch(window.vm.extensionManager.runtime)
    var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
    window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
})()
