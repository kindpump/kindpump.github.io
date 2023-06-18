//made by kindpump aka dillyd
class IFTTTExtension {
  constructor(runtime) {
    this.runtime = runtime;
  }

  getInfo() {
    return {
      id: 'ifttt',
      name: 'IFTTT Extension',
      color1: '#333333', // lighter black color
      blocks: [
        {
          opcode: 'sendWebhook',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Send Webhook to IFTTT with event [event] and key [key]',
          arguments: {
            event: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'my_event'
            },
            key: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'my_key'
            }
          }
        }
      ]
    };
  }

  sendWebhook(args) {
    const event = args.event;
    const key = args.key;

    // Make a POST request to IFTTT Webhooks URL
    const url = `https://maker.ifttt.com/trigger/${event}/with/key/${key}`;
    fetch(url, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          console.log('Webhook sent successfully!');
        } else {
          console.error('Failed to send webhook:', response.status);
        }
      })
      .catch(error => {
        console.error('Error sending webhook:', error);
      });
  }
}

Scratch.extensions.register(new IFTTTExtension());
