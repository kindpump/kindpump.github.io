(function(Scratch) {
    'use strict';

    class SmartPalette {
        getInfo() {
            return {
                id: 'smartpalette',
                name: 'Smart Palette',
                blocks: [
                    {
                        opcode: 'generatePalette',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'generate palette from hex [HEX]',
                        arguments: {
                            HEX: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '#3498db'
                            }
                        }
                    },
                    {
                        opcode: 'paletteIndex',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'palette color [INDEX] from hex [HEX]',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            HEX: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '#3498db'
                            }
                        }
                    }
                ]
            };
        }

        // --- Color Conversion Utilities ---

        hexToRgb(hex) {
            hex = hex.replace('#', '');
            const bigint = parseInt(hex, 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            };
        }

        rgbToHex(r, g, b) {
            return "#" + [r, g, b]
                .map(x => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? "0" + hex : hex;
                })
                .join('');
        }

        rgbToHsl(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }

            return {
                h: h * 360,
                s: s * 100,
                l: l * 100
            };
        }

        hslToRgb(h, s, l) {
            h /= 360;
            s /= 100;
            l /= 100;

            let r, g, b;

            if (s === 0) {
                r = g = b = l;
            } else {
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };

                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;

                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }

            return {
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255)
            };
        }

        shiftHue(h, amount) {
            return (h + amount + 360) % 360;
        }

        clamp(val, min, max) {
            return Math.min(Math.max(val, min), max);
        }

        generateColors(hex) {
            const rgb = this.hexToRgb(hex);
            const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);

            const baseH = hsl.h;
            const baseS = hsl.s;
            const baseL = hsl.l;

            const paletteHSL = [
                {h: baseH, s: baseS, l: baseL}, // base
                {h: this.shiftHue(baseH, 180), s: baseS, l: baseL}, // complementary
                {h: this.shiftHue(baseH, -30), s: baseS, l: baseL}, // analogous 1
                {h: this.shiftHue(baseH, 30), s: baseS, l: baseL}, // analogous 2
                {h: this.shiftHue(baseH, 150), s: baseS, l: baseL}, // split comp 1
                {h: this.shiftHue(baseH, -150), s: baseS, l: baseL}, // split comp 2
                {h: this.shiftHue(baseH, 120), s: baseS, l: baseL}, // triadic 1
                {h: this.shiftHue(baseH, -120), s: baseS, l: baseL}, // triadic 2
                {h: baseH, s: baseS, l: this.clamp(baseL + 20, 0, 100)}, // lighter UI
                {h: baseH, s: this.clamp(baseS - 30, 0, 100), l: baseL} // muted UI
            ];

            return paletteHSL.map(c => {
                const rgb = this.hslToRgb(c.h, c.s, c.l);
                return this.rgbToHex(rgb.r, rgb.g, rgb.b);
            });
        }

        generatePalette(args) {
            return JSON.stringify(this.generateColors(args.HEX));
        }

        paletteIndex(args) {
            const palette = this.generateColors(args.HEX);
            const index = Math.max(1, Math.min(10, Math.floor(args.INDEX)));
            return palette[index - 1];
        }
    }

    Scratch.extensions.register(new SmartPalette());

})(Scratch);
