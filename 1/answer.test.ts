import { getOutsideNumber, sumOutsideNumbers } from "./1";
import { expect, describe, test } from "vitest";

test("no numbers returns 0", () => {
	expect(getOutsideNumber("abc")).toBe(0);
});
test("some numbers works", () => {
	expect(getOutsideNumber("1abc2")).toBe(12);
});
test("lots of numbers works", () => {
	expect(getOutsideNumber("1asdfab345asdfc2")).toBe(12);
});

describe("final checks", () => {
	test("1abc2 becomes 12", () => {
		expect(getOutsideNumber("1abc2")).toBe(12);
	});
	test("pqr3stu8vwx becomes ", () => {
		expect(getOutsideNumber("pqr3stu8vwx")).toBe(38);
	});
	test("a1b2c3d4e5f becomes ", () => {
		expect(getOutsideNumber("a1b2c3d4e5f")).toBe(15);
	});
	test("treb7uchet becomes ", () => {
		expect(getOutsideNumber("treb7uchet")).toBe(77);
	});

	test("total sum", () => {
		const inputs = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
		expect(sumOutsideNumbers(inputs)).toBe(142);
	});
});
