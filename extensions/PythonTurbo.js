// Name: PythonBridge
// ID: pythonBridge
// Description: Communicate with a Python script using WebSockets
// License: MIT

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("PythonBridge extension must be run unsandboxed");
  }

  class PythonBridge {
    constructor() {
      this.socket = null;
      this.lastMessage = "";
      this.connected = false;
    }

    getInfo() {
      return {
        id: "pythonBridge",
        name: "Python Bridge",
        color1: "#5b8c5a",
        color2: "#4e784d",
        blocks: [
          {
            opcode: "connect",
            blockType: Scratch.BlockType.COMMAND,
            text: "connect to WebSocket [url]",
            arguments: {
              url: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "ws://localhost:8765",
              },
            },
          },
          {
            opcode: "sendMessage",
            blockType: Scratch.BlockType.COMMAND,
            text: "send [message] to Python",
            arguments: {
              message: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello from TurboWarp!",
              },
            },
          },
          {
            opcode: "getLastMessage",
            blockType: Scratch.BlockType.REPORTER,
            text: "last message from Python",
          },
          {
            opcode: "isConnected",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "connected to Python?",
          },
        ],
      };
    }

    connect(args) {
      const url = args.url;
      if (this.socket) {
        this.socket.close();
      }

      this.socket = new WebSocket(url);
      this.socket.onopen = () => {
        console.log("[PythonBridge] Connected");
        this.connected = true;
      };

      this.socket.onmessage = (event) => {
        this.lastMessage = event.data;
        console.log("[PythonBridge] Received:", event.data);
      };

      this.socket.onerror = (error) => {
        console.error("[PythonBridge] Error:", error);
        this.connected = false;
      };

      this.socket.onclose = () => {
        console.log("[PythonBridge] Connection closed");
        this.connected = false;
      };
    }

    sendMessage(args) {
      const msg = args.message;
      if (this.socket && this.connected) {
        this.socket.send(msg);
      } else {
        console.warn("[PythonBridge] Not connected");
      }
    }

    getLastMessage() {
      return this.lastMessage;
    }

    isConnected() {
      return this.connected;
    }
  }

  Scratch.extensions.register(new PythonBridge());
})(Scratch);
