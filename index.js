class Vector {
    constructor (runtime) {
        this.runtime = runtime;
        this.vectors = {};
    }
    
    getInfo () {
        return {
            id: 'vector',
            name: 'Vector Math',
            blocks: [
                {
                    opcode: 'createVec',
                    blockType: 'button',
                    text: 'Create New Vector',
                    arguments: {
                        x: {
                            type: "number",
                            defaultValue: ''
                        },
                        y: {
                            type: "number",
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'vec',
                    blockType: 'reporter',
                    text: '',
                    arguments: {
                        x: {
                            type: "number",
                            defaultValue: ''
                        },
                        y: {
                            type: "number",
                            defaultValue: ''
                        }
                    }
                }
            ]
        };
    }
    getVector({name}) {
        if(this.vectors.hasOwnProperty(name)) {
          return this.vectors[name];
        } else {
          return;
        }
    };
    createVector({name}) {
        if(this.vectors.hasOwnProperty(name)) {
          return;
        } else {
          this.vectors[name] = [0, 0, 0];
          return;
        }
    }
}
function findReactComponent(element) {
    let fiber = element[Object.keys(element).find(key => key.startsWith("__reactInternalInstance$"))];
    if (fiber == null) return null;

    const go = fiber => {
        let parent = fiber.return;
        while (typeof parent.type == "string") {
            parent = parent.return;
        }
        return parent;
    };
    fiber = go(fiber);
    while(fiber.stateNode == null) {
        fiber = go(fiber);
    }
    return fiber.stateNode;
}

window.vm = findReactComponent(document.getElementsByClassName("stage-header_stage-size-row_14N65")[0]).props.vm;

(function() {
    var extensionInstance = new Advanced(window.vm.extensionManager.runtime)
    var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
    window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
    var extensionInstance = new Vector(window.vm.extensionManager.runtime)
    var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
    window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
})()
