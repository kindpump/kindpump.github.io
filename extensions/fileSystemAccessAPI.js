// Name: File System Access API
// ID: fsaapi98396
// Description: Access and modify files and folders using FSA-API.
// By: Rocky the Protogen
// License: GNU-GPL3

/**
 * Credits:
 *  https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
 *  https://github.com/TurboWarp/extensions/blob/master/extensions/files.js
 *
 */

(function (Scratch) {
  "use strict";

  const app = {
    hasFSAccess:
      "chooseFileSystemEntries" in window || "showOpenFilePicker" in window,
  };

  let fileHandle;
  let output = "";
  let storefd = null;
  let writeFail = false;
  let unsupportedBrowser = false;
  let mayOpenFilePicker = false;

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      "File System Access API cannot run on sandboxes. Please disable the sandbox when loading the extension."
    );
  }
  
  alert(
    "🛠️   This extension is in development   🛠️\nTo prevent data loss, avoid using this on personal files or folders."
  );

  if (app.hasFSAccess) {
    console.log("Browser supports FSAAPI.");
  } else {
    unsupportedBrowser = true;
    alert(
      "Your current browser does not support File System Access API!\nThese blocks will not function.\nThere is a button in the palette to let you see supported browsers."
    );
  }

  class fsaapi98396 {
    /**
     * Imported code for later use.
     */
    humanFileSize(bytes, si = false, dp = 1) {
      const thresh = si ? 1000 : 1024;
      if (Math.abs(bytes) < thresh) {
        return bytes + " B";
      }
      const units = si
        ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
      let u = -1;
      const r = 10 ** dp;
      do {
        bytes /= thresh;
        ++u;
      } while (
        Math.round(Math.abs(bytes) * r) / r >= thresh &&
        u < units.length - 1
      );
      return bytes.toFixed(dp) + " " + units[u];
    }
    /**
     * End of Imports
     */
    getInfo() {
      return {
        id: "fsaapi98396",
        name: "File System Access API",
        docsURI:
          "https://developer.chrome.com/docs/capabilities/web-apis/file-system-access",
        blocks: [
          {
            func: "getSupportedBrowsers",
            blockType: Scratch.BlockType.BUTTON,
            text: "Supported Browsers",
            hideFromPalette: !unsupportedBrowser,
          },
          {
            opcode: "getUserPermissionFP",
            blockType: Scratch.BlockType.COMMAND,
            text: "Request file picker permission",
          },
          {
            opcode: "rqFilePicker",
            blockType: Scratch.BlockType.COMMAND,
            text: "Request to open file",
          },
          {
            opcode: "writeAccessFailCheck",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Access denied?",
          },
          {
            opcode: "outputCheck",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Is JSON blank?",
          },
          {
            opcode: "getFileHandles",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get information JSON",
          },
          {
            opcode: "getOpenedFileData",
            blockType: Scratch.BlockType.REPORTER,
            text: "Read file using [TYPE]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TYPES",
              },
            },
          },
          {
            opcode: "writeSingleFile",
            blockType: Scratch.BlockType.COMMAND,
            text: "Write string [IN] to open file",
            arguments: {
              IN: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "closeSingleFile",
            blockType: Scratch.BlockType.COMMAND,
            text: "Close File",
          },
          {
            opcode: "dirMultiFileOpen",
            blockType: Scratch.BlockType.COMMAND,
            text: "(No Code Yet) Open a Directory",
          },
        ],
        menus: {
          TYPES: {
            acceptReporters: true,
            items: ["stream", "text", "arrayBuffer"],
          },
        },
      };
    }

    getSupportedBrowsers() {
      Scratch.openWindow(
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker#browser_compatibility"
      );
    }

    async getUserPermissionFP() {
      if (!mayOpenFilePicker) {
        mayOpenFilePicker = confirm(
          `Do you allow the following site to open your file picker?\n"${window.location.href}"`
        );
        if (!mayOpenFilePicker) throw new Error("Permission denied");
      }
    }

    async rqFilePicker() {
      try {
        if (output === "" && mayOpenFilePicker) {
          [fileHandle] = await window.showOpenFilePicker({ multiple: false });
          const file = await fileHandle.getFile();
          output = JSON.stringify({
            type: file.type,
            name: file.name,
            size: file.size,
            lastModified: file.lastModified,
          });
          if (file.size >= 25000000) {
            if (
              !confirm(
                `This file is quite large (${this.humanFileSize(
                  file.size,
                  true
                )}). It could cause the site to freeze or crash! Continue anyway?`
              )
            ) {
              throw new Error("Large file import aborted by user");
            }
          }
          storefd = file;
        } else {
          throw new Error("Could not prompt, check user input and try again.");
        }
      } catch (error) {
        writeFail = true;
        console.error("Error opening file:", error);
        throw error;
      }
    }

    async getOpenedFileData(args) {
      if (!storefd) return "";
      try {
        const file = await fileHandle.getFile(); // Re-acquire the file after writing
        storefd = file;
        if (args.TYPE === "arrayBuffer") {
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          return "[" + Array.from(uint8Array).toString() + "]";
        } else if (args.TYPE === "text") {
          return await file.text();
        } else if (args.TYPE === "stream") {
          const streamReader = file.stream().getReader();
          const decoder = new TextDecoder();
          let StreamOutResult = "";
          const chunkSize = 1024;
          
          async function readChunks() {
            while (true) {
              const { done, value } = await streamReader.read();
              if (done) {
                console.log('Stream reading complete.');
                return StreamOutResult;
              }
              StreamOutResult += decoder.decode(value, { stream: true });
              if (value.length >= chunkSize) {
                await new Promise(resolve => setTimeout(resolve, 5));
              }
            }
          }
          
          return await readChunks();
        } else {
          throw new Error("Invalid type specified");
        }
      } catch (error) {
        console.error('Error reading file:', error);
        throw new Error("Error reading file");
      }
    }

    getFileHandles() {
      return output;
    }

    outputCheck() {
      return output === "";
    }

    async writeSingleFile(args) {
      if (fileHandle) {
        try {
          const writable = await fileHandle.createWritable();
          await writable.write(args.IN);
          await writable.close();
          console.log("File written successfully");
          storefd = await fileHandle.getFile(); // Re-acquire the file handle after writing
        } catch (error) {
          console.error("Error writing to file:", error);
          throw new Error("Error writing to file");
        }
      } else {
        throw new Error("No file to write to!");
      }
    }

    async closeSingleFile() {
      if (fileHandle) {
        fileHandle = null;
        storefd = null;
        output = "";
        console.log("File closed successfully");
      } else {
        throw new Error("No file to close!");
      }
    }

    writeAccessFailCheck() {
      return writeFail || !mayOpenFilePicker;
    }
  }

  Scratch.extensions.register(new fsaapi98396());
})(Scratch);
