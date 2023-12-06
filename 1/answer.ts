export function sumOutsideNumbers(strings: string[]) {
  return strings.map(getOutsideNumber).reduce((sum, number) => sum + number, 0);
}

export function getOutsideNumber(string: string) {
  const onlyNumbers = string
    .split("")
    .filter((value) => value.match(/\d/))
    .map(Number);

  const firstNumber = onlyNumbers[0] || 0;
  const secondNumber = onlyNumbers[onlyNumbers.length - 1] || 0;

  return Number(`${firstNumber}${secondNumber}`);
}
