const blocksIcon = "data:image/svg+xml;base64,IDxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTUuOCIgaGVpZ2h0PSI1NS44IiB2aWV3Qm94PSIwLDAsNTUuOCw1NS44Ij48ZGVmcz48cmFkaWFsR3JhZGllbnQgY3g9IjI0MCIgY3k9IjE4MCIgcj0iMjcuOSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMTAwNTAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMTAwNTAiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTIuMSwtMTUyLjEpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIxMi4xLDE4MGMwLC0xNS40MDg3NCAxMi40OTEyNiwtMjcuOSAyNy45LC0yNy45YzE1LjQwODc0LDAgMjcuOSwxMi40OTEyNiAyNy45LDI3LjljMCwxNS40MDg3NCAtMTIuNDkxMjYsMjcuOSAtMjcuOSwyNy45Yy0xNS40MDg3NCwwIC0yNy45LC0xMi40OTEyNiAtMjcuOSwtMjcuOXoiIGZpbGw9InVybCgjY29sb3ItMSkiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yMTkuOCwxODBjMCwtMTEuMTU2MTUgOS4wNDM4NSwtMjAuMiAyMC4yLC0yMC4yYzExLjE1NjE1LDAgMjAuMiw5LjA0Mzg1IDIwLjIsMjAuMmMwLDExLjE1NjE1IC05LjA0Mzg1LDIwLjIgLTIwLjIsMjAuMmMtMTEuMTU2MTUsMCAtMjAuMiwtOS4wNDM4NSAtMjAuMiwtMjAuMnoiIGZpbGw9IiMwNDAwZmYiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNTMuMywxNzUuNTY2NjdoLTI2LjZjMC4wMDM2NiwtMy4wNTkwNiAyLjQ4MjYxLC01LjUzOCA1LjU0MTY3LC01LjU0MTY3aDE1LjUxNjY3YzMuMDU5MDYsMC4wMDM2NiA1LjUzOCwyLjQ4MjYxIDUuNTQxNjcsNS41NDE2N3oiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMjYuNywxNzcuNzgzMzNoMjYuNnY2LjY1Yy0wLjAwMzY2LDMuMDU5MDYgLTIuNDgyNjEsNS41MzggLTUuNTQxNjcsNS41NDE2N2gtMTUuNTE2NjdjLTMuMDU5MDYsLTAuMDAzNjYgLTUuNTM4LC0yLjQ4MjYxIC01LjU0MTY3LC01LjU0MTY3ek0yMzQuNDU4MzMsMTgzLjg3OTE3YzAsLTAuOTE4MTcgLTAuNzQ0MzMsLTEuNjYyNSAtMS42NjI1LC0xLjY2MjVjLTAuOTE4MTcsMCAtMS42NjI1LDAuNzQ0MzMgLTEuNjYyNSwxLjY2MjVjMCwwLjkxODE3IDAuNzQ0MzMsMS42NjI1IDEuNjYyNSwxLjY2MjVjMC45MTgxNywwIDEuNjYyNSwtMC43NDQzMyAxLjY2MjUsLTEuNjYyNSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MjcuOTAwMDAwMDAwMDAwMDA2OjI3Ljg5OTk5OTk5OTk5OTk3Ny0tPg==";


class CardValidationExtension {
  getInfo() {
    return {
      id: 'cardvalidationexample',
      name: 'Card Validation',
      blocks: [
        {
          opcode: 'isValidCardNumber',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Card number [CARD] is valid',
          arguments: {
            CARD: {
              type: Scratch.ArgumentType.STRING
            }
          }
        }
      ]
    };
  }

  isValidCardNumber(args) {
    const cardNumber = String(args.CARD).replace(/\s/g, ''); // Convert to string and remove whitespace

    if (!/^\d+$/.test(cardNumber)) {
      // Card number should only contain digits
      return false;
    }

    // Luhn algorithm implementation
    let sum = 0;
    let doubleUp = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);
      if (doubleUp) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      doubleUp = !doubleUp;
    }

    return sum % 10 === 0;
  }
}

Scratch.extensions.register(new CardValidationExtension());
