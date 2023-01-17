class Scratch3D {
    constructor() {
    }

    getInfo() {
        return {
            "id": "3D",
            "name": "3D",
            "blocks": [
                        {
                            "opcode": "render3D",
                            "blockType": "reporter",
                            "text": "render 3D point x: [x] y: [y] z: [z] with camera at [camera]",
                            "arguments": {
                                "x": {
                                    "type": "number",
                                    "defaultValue": 0
                                },
                                "y": {
                                    "type": "number",
                                    "defaultValue": 0
                                },
                                "z": {
                                    "type": "number",
                                    "defaultValue": 0
                                },
                                "camera" : {
                                "type": "string",
                                "defaultValue": "origin"
},
}
},
],
};
}
    render3D({x, y, z, camera}) {
    // Logic to convert 3D point to 2D point based on camera location
    // ...
    return `(${x}, ${y})`;
}
    }

Scratch.extensions.register(new Scratch3D());
