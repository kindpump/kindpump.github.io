class WeirdBlocks {
    getInfo() {
        return {
            "id": "WeirdBlocks",
            "name": "WeirdBlocks",
            "blocks": [{
                    "opcode": "wb_rickroll",
                    "blockType": "command",
                    "text": "rickroll all people in project",
                    "arguments": {
                    }
                }],
            },
        "menus"; {
        }
    };
    wb_rickroll(){
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ",'_blank').focus();
    }
}
Scratch.extensions.register(new WeirdBlocks());
