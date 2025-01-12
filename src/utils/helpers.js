export function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
  
  export function columnIndexToLetter(index) {
    let temp, letter = '';
    while (index >= 0) {
      temp = (index % 26) + 65;
      letter = String.fromCharCode(temp) + letter;
      index = (index / 26) - 1;
    }
    return letter;
  }
  
  export function letterToColumnIndex(letter) {
    let column = 0;
    for (let i = 0; i < letter.length; i++) {
      column += (letter.charCodeAt(i) - 64) * Math.pow(26, letter.length - i - 1);
    }
    return column - 1;
  }
  
  