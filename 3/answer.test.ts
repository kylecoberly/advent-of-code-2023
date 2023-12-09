import { describe, test, expect } from "vitest";
import { getSumFromSchematic } from "./answer";

describe("Gear ratios part 1 given examples", () => {
	test("getSumFromSchematic returns sum", () => {
		const sampleSchematic = `
467..114..
..._......
..35..633.
......#...
617_......
.....+.58.
..592.....
......755.
...$.\*....
.664.598..
		`.trim();

		expect(getSumFromSchematic(sampleSchematic)).toBe(4361);
	});
});
