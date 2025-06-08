(function (Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('WebScraper extension must run unsandboxed');
  }
  const vm = Scratch.vm;

  class WebScraper {
    getInfo() {
      return {
        id: 'webscraper',
        name: 'Web Scraper',
        color1: '#4a90e2', color2: '#357ABD', color3: '#2C5F9E',
        docsURI: 'http://localhost:8000/webscraper-docs.html',
        blocks: [
          {
            opcode: 'scrapeURL',
            blockType: Scratch.BlockType.REPORTER,
            text: 'scrape [URL] and get HTML',
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: 'https://example.com' }
            }
          },
          {
            opcode: 'getInnerText',
            blockType: Scratch.BlockType.REPORTER,
            text: 'text of element matching [SELECTOR] in [HTML]',
            arguments: {
              SELECTOR: { type: Scratch.ArgumentType.STRING, defaultValue: 'h1' },
              HTML: { type: Scratch.ArgumentType.STRING }
            }
          },
          {
            opcode: 'getAttribute',
            blockType: Scratch.BlockType.REPORTER,
            text: 'value of [ATTR] in element matching [SELECTOR] of [HTML]',
            arguments: {
              ATTR: { type: Scratch.ArgumentType.STRING, defaultValue: 'href' },
              SELECTOR: { type: Scratch.ArgumentType.STRING, defaultValue: 'a' },
              HTML: { type: Scratch.ArgumentType.STRING }
            }
          },
          {
            opcode: 'countElements',
            blockType: Scratch.BlockType.REPORTER,
            text: 'count elements matching [SELECTOR] in [HTML]',
            arguments: {
              SELECTOR: { type: Scratch.ArgumentType.STRING, defaultValue: 'p' },
              HTML: { type: Scratch.ArgumentType.STRING }
            }
          },
          {
            opcode: 'reportError',
            blockType: Scratch.BlockType.REPORTER,
            text: 'last error'
          }
        ]
      };
    }

    async scrapeURL({ URL }) {
      this._lastError = '';
      try {
        if (!(await Scratch.canFetch(URL))) {
          this._lastError = 'Permission denied for URL';
          return '';
        }
        const resp = await Scratch.fetch(URL);
        const text = await resp.text();
        return text;
      } catch (e) {
        this._lastError = e.toString();
        return '';
      }
    }

    getInnerText({ SELECTOR, HTML }) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(HTML, 'text/html');
        const el = doc.querySelector(SELECTOR);
        return el ? el.textContent.trim() : '';
      } catch (e) {
        this._lastError = e.toString();
        return '';
      }
    }

    getAttribute({ ATTR, SELECTOR, HTML }) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(HTML, 'text/html');
        const el = doc.querySelector(SELECTOR);
        return el ? el.getAttribute(ATTR) || '' : '';
      } catch (e) {
        this._lastError = e.toString();
        return '';
      }
    }

    countElements({ SELECTOR, HTML }) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(HTML, 'text/html');
        return doc.querySelectorAll(SELECTOR).length;
      } catch (e) {
        this._lastError = e.toString();
        return 0;
      }
    }

    reportError() {
      return this._lastError || '';
    }
  }

  Scratch.extensions.register(new WebScraper());
})(Scratch);
