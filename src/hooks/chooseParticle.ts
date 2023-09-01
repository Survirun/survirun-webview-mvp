export function chooseParticle(word: string): string {
    const lastChar = word.charAt(word.length - 1);
  
    if (/^[가-힣]$/.test(lastChar)) {
      const unicode = lastChar.charCodeAt(0) - 44032;
  
      if (unicode % 28 !== 0) {
        return "을";
      } else {
        return "를";
      }
    } else {
      return "을";
    }
  }