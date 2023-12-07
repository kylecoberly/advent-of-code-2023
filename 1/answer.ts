export function sumOutsideNumbers(strings: string[]) {
  return strings.map(getOutsideNumber).reduce((sum, number) => sum + number, 0);
}

export function getOutsideNumber(code: string) {
  const onlyNumbers: string[] = [];

  for (let index = 0; index < code.length; index++) {
    const foundNumber = getNumber(code.substring(index));
    if (foundNumber) onlyNumbers.push(foundNumber);
  }

  const firstNumber = onlyNumbers[0] || 0;
  const secondNumber = onlyNumbers[onlyNumbers.length - 1] || 0;

  return Number(`${firstNumber}${secondNumber}`);
}

const wordMappings = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
} as const;

function getNumber(code: string) {
  if (code[0].match(/\d/)) return code[0];
  let remainingWords = Object.keys(wordMappings);

  for (let index = 0; index < code.length; index++) {
    remainingWords = remainingWords.filter(
      (word) => word[index] === code[index],
    );
    if (remainingWords.length === 0) break;
    if (remainingWords.length === 1 && code.startsWith(remainingWords[0])) {
      return convertNumberWord(remainingWords[0]);
    }
  }
}

export function convertNumberWord(word: string) {
  return wordMappings[word as keyof typeof wordMappings] ?? "";
}
