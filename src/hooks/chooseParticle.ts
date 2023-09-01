export function chooseParticle(word: string): string {
    const lastChar = word.charAt(word.length - 1);
    const unicode = lastChar.charCodeAt(0) - 44032;

    return (/^[가-힣]$/.test(lastChar) && unicode % 28 !== 0) ?
    "을" : "를";
  }