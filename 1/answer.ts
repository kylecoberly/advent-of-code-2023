export function sumOutsideNumbers(strings: string[]) {
	return strings.map(getOutsideNumber).reduce((sum, number) => sum + number, 0);
}

export function getOutsideNumber(code: string) {
	const onlyNumbers: string[] = [];

	let inProgress = code;
	do {
		const [nextNumber, remaining] = chompNextNumber(inProgress);
		if (nextNumber) {
			onlyNumbers.push(nextNumber);
		}
		inProgress = remaining;
	} while (inProgress);

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
const words = Object.keys(wordMappings);

export function chompNextNumber(word: string): [string, string] {
	const characters = word.split("");
	let cumulativeText = "";

	while (characters.length) {
		cumulativeText += characters.shift();

		if (cumulativeText.match(/\d/)) {
			return [cumulativeText, characters.join("")];
		}
		if (words.includes(cumulativeText)) {
			return [convertNumberWord(cumulativeText), characters.join("")];
		}
		if (
			!words.some((word) => word.startsWith(cumulativeText + characters[0]))
		) {
			cumulativeText = "";
			continue;
		}
		// if (characters[0]?.match(/\d/)) {
		// 	continue;
		// }
	}

	return ["", ""];
}

export function convertNumberWord(word: string) {
	return wordMappings[word as keyof typeof wordMappings] ?? "";
}
