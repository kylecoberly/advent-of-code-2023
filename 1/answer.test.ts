import {
  getOutsideNumber,
  sumOutsideNumbers,
  convertNumberWord,
  chompNextNumber,
} from "./answer";
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
test("one word works", () => {
  expect(getOutsideNumber("one")).toBe(11);
});
test("two words works", () => {
  expect(getOutsideNumber("onetwo")).toBe(12);
});
test("mixed words works", () => {
  expect(getOutsideNumber("one2")).toBe(12);
});
test("multiple words works", () => {
  expect(getOutsideNumber("asdfoneasdfas2lkjlthree")).toBe(13);
});

describe("number conversions", () => {
  const tests = [
    {
      input: "one",
      output: "1",
    },
    {
      input: "two",
      output: "2",
    },
    {
      input: "three",
      output: "3",
    },
    {
      input: "four",
      output: "4",
    },
    {
      input: "five",
      output: "5",
    },
    {
      input: "six",
      output: "6",
    },
    {
      input: "seven",
      output: "7",
    },
    {
      input: "eight",
      output: "8",
    },
    {
      input: "nine",
      output: "9",
    },
  ];

  tests.forEach(({ input, output }) => {
    test(`${input} becomes ${output}`, () => {
      expect(convertNumberWord(input)).toBe(output);
    });
  });
});

test("chompNextNumber chomps a number", () => {
  expect(chompNextNumber("4")).toEqual(["4", ""]);
});
test("chompNextNumber chomps a word number", () => {
  expect(chompNextNumber("four")).toEqual(["4", ""]);
});
test("chompNextNumber chomps two numbers", () => {
  expect(chompNextNumber("four3")).toEqual(["4", "3"]);
});
test("chompNextNumber chomps through trash", () => {
  expect(chompNextNumber("trash3")).toEqual(["3", ""]);
});
test("chompNextNumber chomps around trash", () => {
  expect(chompNextNumber("tra1sh")).toEqual(["1", "sh"]);
});

describe("part 1 examples", () => {
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

describe("part 2 examples", () => {
  test("two1nine becomes 29", () => {
    expect(getOutsideNumber("two1nine")).toBe(29);
  });
  test("eightwothree becomes 83", () => {
    expect(getOutsideNumber("eightwothree")).toBe(83);
  });
  test("abcone2threexyz becomes 13", () => {
    expect(getOutsideNumber("abcone2threexyz")).toBe(13);
  });
  test("xtwone3four becomes 24", () => {
    expect(getOutsideNumber("xtwone3four")).toBe(24);
  });
  test("4nineeightseven2 becomes 42", () => {
    expect(getOutsideNumber("4nineeightseven2")).toBe(42);
  });
  test("zoneight234 becomes 14", () => {
    expect(getOutsideNumber("zoneight234")).toBe(14);
  });
  test("7pqrstsixteen becomes 76", () => {
    expect(getOutsideNumber("7pqrstsixteen")).toBe(76);
  });

  test("total sum", () => {
    const inputs = [
      "two1nine",
      "eightwothree",
      "abcone2threexyz",
      "xtwone3four",
      "4nineeightseven2",
      "zoneight234",
      "7pqrstsixteen",
    ];
    expect(sumOutsideNumbers(inputs)).toBe(281);
  });
});
