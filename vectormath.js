(function (Scratch) {
  'use strict';

  const BlockType = Scratch.BlockType;
  const ArgumentType = Scratch.ArgumentType;

  // ---- helpers ----
  const toNum = v => Number(v) || 0;
  const clamp360 = a => {
    // wrap any number to [0, 360)
    let x = a % 360;
    if (x < 0) x += 360;
    return x;
  };
  const roundTiny = n => {
    // avoid -0 and floating dust
    const r = Math.abs(n) < 1e-12 ? 0 : n;
    return Math.round(r * 1e12) / 1e12;
  };

  class Vectors {
    getInfo() {
      return {
        id: 'kypoVectors',
        name: 'Vector Tools',
        color1: '#1f7ae0',
        color2: '#1760b2',
        color3: '#0f447f',
        docsURI: '',
        blocks: [
          // --- requested blocks ---
          {
            opcode: 'unitPair',
            blockType: BlockType.REPORTER,
            text: 'unit vector of x:[x] y:[y]',
            arguments: {
              x: { type: ArgumentType.NUMBER, defaultValue: 1 },
              y: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'angleFromXY',
            blockType: BlockType.REPORTER,
            text: 'angle (0–360°) of x:[x] y:[y]',
            arguments: {
              x: { type: ArgumentType.NUMBER, defaultValue: 1 },
              y: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },

          // --- extras: components of unit vector ---
          {
            opcode: 'unitX',
            blockType: BlockType.REPORTER,
            text: 'unit x of x:[x] y:[y]',
            arguments: {
              x: { type: ArgumentType.NUMBER, defaultValue: 1 },
              y: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'unitY',
            blockType: BlockType.REPORTER,
            text: 'unit y of x:[x] y:[y]',
            arguments: {
              x: { type: ArgumentType.NUMBER, defaultValue: 1 },
              y: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },

          // --- magnitude ---
          {
            opcode: 'magnitude',
            blockType: BlockType.REPORTER,
            text: 'magnitude of x:[x] y:[y]',
            arguments: {
              x: { type: ArgumentType.NUMBER, defaultValue: 3 },
              y: { type: ArgumentType.NUMBER, defaultValue: 4 }
            }
          },

          // --- polar → cartesian ---
          {
            opcode: 'xFromMagAngle',
            blockType: BlockType.REPORTER,
            text: 'x from mag:[m] angle°:[a]',
            arguments: {
              m: { type: ArgumentType.NUMBER, defaultValue: 1 },
              a: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'yFromMagAngle',
            blockType: BlockType.REPORTER,
            text: 'y from mag:[m] angle°:[a]',
            arguments: {
              m: { type: ArgumentType.NUMBER, defaultValue: 1 },
              a: { type: ArgumentType.NUMBER, defaultValue: 0 }
            }
          },

          // --- rotate vector ---
          {
            opcode: 'rotatePair',
            blockType: BlockType.REPORTER,
            text: 'rotate x:[x] y:[y] by angle°:[a]',
            arguments: {
              x: { type: ArgumentType.NUMBER, defaultValue: 1 },
              y: { type: ArgumentType.NUMBER, defaultValue: 0 },
              a: { type: ArgumentType.NUMBER, defaultValue: 90 }
            }
          },

          // --- dot product ---
          {
            opcode: 'dotProduct',
            blockType: BlockType.REPORTER,
            text: 'dot (x1:[x1] y1:[y1]) · (x2:[x2] y2:[y2])',
            arguments: {
              x1: { type: ArgumentType.NUMBER, defaultValue: 1 },
              y1: { type: ArgumentType.NUMBER, defaultValue: 0 },
              x2: { type: ArgumentType.NUMBER, defaultValue: 0 },
              y2: { type: ArgumentType.NUMBER, defaultValue: 1 }
            }
          },

          // --- angle utilities ---
          {
            opcode: 'wrapAngle',
            blockType: BlockType.REPORTER,
            text: 'wrap angle°:[a] to 0–360',
            arguments: {
              a: { type: ArgumentType.NUMBER, defaultValue: -45 }
            }
          },
          {
            opcode: 'angleDelta',
            blockType: BlockType.REPORTER,
            text: 'shortest delta° from a:[a] to b:[b]',
            arguments: {
              a: { type: ArgumentType.NUMBER, defaultValue: 350 },
              b: { type: ArgumentType.NUMBER, defaultValue: 10 }
            }
          }
        ]
      };
    }

    // --- implementations ---

    unitPair(args) {
      const x = toNum(args.x);
      const y = toNum(args.y);
      const m = Math.hypot(x, y);
      if (m === 0) return '0,0';
      const ux = roundTiny(x / m);
      const uy = roundTiny(y / m);
      return ux + ',' + uy; // "x,y"
    }

    unitX(args) {
      const x = toNum(args.x);
      const y = toNum(args.y);
      const m = Math.hypot(x, y);
      return m === 0 ? 0 : roundTiny(x / m);
    }

    unitY(args) {
      const x = toNum(args.x);
      const y = toNum(args.y);
      const m = Math.hypot(x, y);
      return m === 0 ? 0 : roundTiny(y / m);
    }

    angleFromXY(args) {
      const x = toNum(args.x);
      const y = toNum(args.y);
      if (x === 0 && y === 0) return 0; // define angle of zero vector as 0
      // Scratch/TurboWarp use math where 0° is +x, atan2(y,x) fits that
      const deg = (Math.atan2(y, x) * 180) / Math.PI;
      return roundTiny(clamp360(deg));
    }

    magnitude(args) {
      const x = toNum(args.x);
      const y = toNum(args.y);
      return roundTiny(Math.hypot(x, y));
    }

    xFromMagAngle(args) {
      const m = toNum(args.m);
      const a = clamp360(toNum(args.a));
      const rad = (a * Math.PI) / 180;
      return roundTiny(m * Math.cos(rad));
    }

    yFromMagAngle(args) {
      const m = toNum(args.m);
      const a = clamp360(toNum(args.a));
      const rad = (a * Math.PI) / 180;
      return roundTiny(m * Math.sin(rad));
    }

    rotatePair(args) {
      const x = toNum(args.x);
      const y = toNum(args.y);
      const a = toNum(args.a);
      const rad = (a * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const rx = roundTiny(x * cos - y * sin);
      const ry = roundTiny(x * sin + y * cos);
      return rx + ',' + ry; // "x,y"
    }

    dotProduct(args) {
      const x1 = toNum(args.x1);
      const y1 = toNum(args.y1);
      const x2 = toNum(args.x2);
      const y2 = toNum(args.y2);
      return roundTiny(x1 * x2 + y1 * y2);
    }

    wrapAngle(args) {
      const a = toNum(args.a);
      return roundTiny(clamp360(a));
    }

    angleDelta(args) {
      // return signed shortest delta to rotate a->b in degrees in (-180, 180]
      const a = clamp360(toNum(args.a));
      const b = clamp360(toNum(args.b));
      let d = b - a;
      d = ((d + 180) % 360) - 180;
      return roundTiny(d);
    }
  }

  Scratch.extensions.register(new Vectors());
})(Scratch);
