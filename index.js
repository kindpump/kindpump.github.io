class Scratch3Facemesh2ScratchBlocks {
    get PERSON_NUMBER_MENU () {
      let person_number_menu = []
      for (let i = 1; i <= 10; i++) {
        person_number_menu.push({text: String(i), value: String(i)})
      }
      return person_number_menu;
    }

    get KEYPOINT_MENU () {
      let keypoint_menu = [];
      for (let i = 1; i <= 468; i++) {
        keypoint_menu.push({text: String(i), value: String(i)})
      }
      return keypoint_menu;
    }

    get VIDEO_MENU () {
      return [
          {
            text: Message.off[this._locale],
            value: 'off'
          },
          {
            text: Message.on[this._locale],
            value: 'on'
          },
          {
            text: Message.video_on_flipped[this._locale],
            value: 'on-flipped'
          }
      ]
    }

    get INTERVAL_MENU () {
      return [
          {
            text: '0.1',
            value: '0.1'
          },
          {
            text: '0.2',
            value: '0.2'
          },
          {
            text: '0.5',
            value: '0.5'
          },
          {
            text: '1.0',
            value: '1.0'
          }
      ]
    }

    get RATIO_MENU () {
      return [
          {
            text: '0.5',
            value: '0.5'
          },
          {
            text: '0.75',
            value: '0.75'
          },
          {
            text: '1',
            value: '1'
          },
          {
            text: '1.5',
            value: '1.5'
          },
          {
            text: '2.0',
            value: '2.0'
          }
      ]
    }

    constructor (runtime) {
        this.runtime = runtime;

        this.faces = [];
        this.ratio = 0.75;

        this.detectFace = () => {
          // We should reuse the video element created by videoProvider instead of creating a new video element
          // This is because iOS or iPad does not allow camera attached to two video elements
          this.video = this.runtime.ioDevices.video.provider.video

          alert(Message.please_wait[this._locale]);


          this.facemesh = ml5.facemesh(this.video, function() {
            console.log("Model loaded!")
          });

          this.facemesh.on('predict', faces => {
            if (faces.length < this.faces.length) {
              this.faces.splice(faces.length);
            }
            faces.forEach((face, index) => {
              this.faces[index] = {keypoints: face.scaledMesh};
            });
          });
        }

        this.runtime.ioDevices.video.enableVideo().then(this.detectFace)
    }

    getInfo () {
        this._locale = this.setLocale();

        return {
            id: 'facemesh2scratch',
            name: 'Facemesh2Scratch',
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'getX',
                    blockType: BlockType.REPORTER,
                    text: Message.getX[this._locale],
                    arguments: {
                        PERSON_NUMBER: {
                            type: ArgumentType.STRING,
                            menu: 'personNumberMenu',
                            defaultValue: '1'
                        },
                        KEYPOINT: {
                            type: ArgumentType.STRING,
                            menu: 'keypointMenu',
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'getY',
                    blockType: BlockType.REPORTER,
                    text: Message.getY[this._locale],
                    arguments: {
                        PERSON_NUMBER: {
                            type: ArgumentType.STRING,
                            menu: 'personNumberMenu',
                            defaultValue: '1'
                        },
                        KEYPOINT: {
                            type: ArgumentType.STRING,
                            menu: 'keypointMenu',
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'getPeopleCount',
                    blockType: BlockType.REPORTER,
                    text: Message.peopleCount[this._locale]
                },
                {
                    opcode: 'videoToggle',
                    blockType: BlockType.COMMAND,
                    text: Message.videoToggle[this._locale],
                    arguments: {
                        VIDEO_STATE: {
                            type: ArgumentType.STRING,
                            menu: 'videoMenu',
                            defaultValue: 'off'
                        }
                    }
                },
                {
                    opcode: 'setVideoTransparency',
                    text: formatMessage({
                        id: 'videoSensing.setVideoTransparency',
                        default: 'set video transparency to [TRANSPARENCY]',
                        description: 'Controls transparency of the video preview layer'
                    }),
                    arguments: {
                        TRANSPARENCY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50
                        }
                    }
                },  
                {
                    opcode: 'setRatio',
                    blockType: BlockType.COMMAND,
                    text: Message.setRatio[this._locale],
                    arguments: {
                        RATIO: {
                            type: ArgumentType.STRING,
                            menu: 'ratioMenu',
                            defaultValue: '0.75'
                        }
                    }
                }
            ],
            menus: {
              personNumberMenu: {
                acceptReporters: true,
                items: this.PERSON_NUMBER_MENU
              },
              keypointMenu: {
                acceptReporters: true,
                items: this.KEYPOINT_MENU
              },
              videoMenu: {
                acceptReporters: true,
                items: this.VIDEO_MENU
              },
              ratioMenu: {
                acceptReporters: true,
                items: this.RATIO_MENU
              },
              intervalMenu: {
                acceptReporters: true,
                items: this.INTERVAL_MENU
              }
            }
        };
    }

    getX (args) {
      let personNumber = parseInt(args.PERSON_NUMBER, 10) - 1;
      let keypoint = parseInt(args.KEYPOINT, 10) - 1;

      if (this.faces[personNumber].keypoints && this.faces[personNumber].keypoints[keypoint]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.faces[personNumber].keypoints[keypoint][0] * this.ratio);
        } else {
          return 240 - this.faces[personNumber].keypoints[keypoint][0] * this.ratio;
        }
      } else {
        return "";
      }
    }

    getY (args) {
      let personNumber = parseInt(args.PERSON_NUMBER, 10) - 1;
      let keypoint = parseInt(args.KEYPOINT, 10) - 1;

      if (this.faces[personNumber].keypoints && this.faces[personNumber].keypoints[keypoint]) {
        return 180 - this.faces[personNumber].keypoints[keypoint][1] * this.ratio;
      } else {
        return "";
      }
    }

    getPeopleCount () {
      return this.faces.length;
    }

    videoToggle (args) {
      let state = args.VIDEO_STATE;
      if (state === 'off') {
        this.runtime.ioDevices.video.disableVideo();
        this.facemesh.video = null; // Stop the model prediction if video is off
      } else {
        this.runtime.ioDevices.video.enableVideo().then(this.detectFace);
        this.runtime.ioDevices.video.mirror = state === "on";
      }
    }

    /**
     * A scratch command block handle that configures the video preview's
     * transparency from passed arguments.
     * @param {object} args - the block arguments
     * @param {number} args.TRANSPARENCY - the transparency to set the video
     *   preview to
     */
    setVideoTransparency (args) {
        const transparency = Cast.toNumber(args.TRANSPARENCY);
        this.globalVideoTransparency = transparency;
        this.runtime.ioDevices.video.setPreviewGhost(transparency);
    }

    setRatio (args) {
      this.ratio = parseFloat(args.RATIO);
    }

    setLocale() {
      let locale = formatMessage.setup().locale;
      if (AvailableLocales.includes(locale)) {
        return locale;
      } else {
        return 'en';
      }
    }
}

module.exports = Scratch3Facemesh2ScratchBlocks;
