import { describe, test, expect } from "vitest";
import {
  createSchematicMatrix,
  getSumFromSchematic,
  getNumberBoxes,
  getSurroundingCoordinates,
  isSymbol,
  getNumberByBox,
  isBoxPart,
} from "./answer";

describe("Gear ratios part 1 given examples", () => {
  test("getSumFromSchematic returns sum", () => {
    // 114 and 58 aren't parts
    // 467, 35, 633, 617, 58, 592, 755, 664, and 598 are parts
    const sampleSchematic = `
467..114..
..._......
..35..633.
......#...
617_......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
		`.trim();

    expect(getSumFromSchematic(sampleSchematic)).toBe(4361);
  });

  test("getSumFromSchematic extra example # 1", () => {
    const sampleSchematic = `
25.....!25
!...1.....
.........1
..1...!..$
.\\.100..._
.......1..
..10001..2
.!.....!..
......22.!
25!.....25
		`.trim();

    expect(getSumFromSchematic(sampleSchematic)).toBe(10225);
  });

  test("getSumFromSchematic extra example #2, sides", () => {
    const sampleSchematic = `
.2..2..2..
....%....2
2.........
..........
.........2
2@.......!
..........
2.........
....#....2
..2..2.2..
		`.trim();

    expect(getSumFromSchematic(sampleSchematic)).toBe(8);
  });
});

test("createSchematicMatrix creates a matrix from a schematic", () => {
  const schematic = `
123
456
789
	`.trim();

  const matrix = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  expect(createSchematicMatrix(schematic)).toEqual(matrix);
});

describe("getNumberBoxes", () => {
  test("getNumberBoxes returns bounding boxes for 1 number", () => {
    const matrix = [
      [".", ".", "."],
      [".", "5", "."],
      [".", ".", "."],
    ];
    expect(getNumberBoxes(matrix)).toEqual([[[1, 1], 1]]);
  });

  test("getNumberBoxes returns bounding boxes for multiple numbers", () => {
    const matrix = [
      ["1", ".", "."],
      [".", "5", "."],
      [".", ".", "9"],
    ];
    expect(getNumberBoxes(matrix)).toEqual([
      [[0, 0], 1],
      [[1, 1], 1],
      [[2, 2], 1],
    ]);
  });

  test("getNumberBoxes returns bounding boxes for multi digit numbers", () => {
    const matrix = [
      ["1", "2", "."],
      [".", ".", "."],
      [".", ".", "."],
    ];
    expect(getNumberBoxes(matrix)).toEqual([[[0, 0], 2]]);
  });

  test("getNumberBoxes returns bounding boxes for multi digit numbers", () => {
    const matrix = [
      ["1", "2", "."],
      [".", ".", "."],
      ["7", "8", "9"],
    ];
    expect(getNumberBoxes(matrix)).toEqual([
      [[0, 0], 2],
      [[2, 0], 3],
    ]);
  });
});

test("getSurroundingCoordinates returns the surrounding coordinates for a number", () => {
  const surroundingCoordinates = [
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    // [2, 2] is the center
    [2, 3],
    [3, 1],
    [3, 2],
    [3, 3],
  ] as const;
  const centerBox: [[number, number], number] = [[2, 2], 1];
  const gridSize = 5;

  expect(getSurroundingCoordinates(centerBox, gridSize)).toEqual(
    surroundingCoordinates,
  );
});

test("getSurroundingCoordinates returns the surrounding coordinates for a number on the right", () => {
  const surroundingCoordinates = [
    [1, 3],
    [1, 4],
    [2, 3],
    // [2, 4] is the center
    [3, 3],
    [3, 4],
  ] as const;
  const centerBox: [[number, number], number] = [[2, 4], 1];
  const gridSize = 5;

  expect(getSurroundingCoordinates(centerBox, gridSize)).toEqual(
    surroundingCoordinates,
  );
});

test("getSurroundingCoordinates returns the surrounding coordinates for a multi-digit number", () => {
  /*
	. . . . . .
	. X X X X .
	. X 9 9 X .
	. X X X X .
	. . . . . .
	. . . . . .
	*/
  const surroundingCoordinates = [
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 1],
    // [2, 2] is the first digit
    // [2, 3] is the second digit
    [2, 4],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
  ] as const;
  const centerBox: [[number, number], number] = [[2, 2], 2];
  const gridSize = 6;

  expect(getSurroundingCoordinates(centerBox, gridSize)).toEqual(
    surroundingCoordinates,
  );
});

describe("isSymbol", () => {
  ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "\\", "/"].forEach(
    (symbol) => {
      test(`Yes: ${symbol}`, () => {
        expect(isSymbol(symbol)).toBe(true);
      });
    },
  );
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].forEach(
    (character) => {
      test(`No: ${character}`, () => {
        expect(isSymbol(character)).toBe(false);
      });
    },
  );
});

test("getNumberByBox gets a single digit number", () => {
  const matrix = [
    [".", ".", "."],
    [".", "5", "."],
    [".", ".", "."],
  ];
  const coordinateBox = [[1, 1], 1];
  expect(getNumberByBox(matrix, coordinateBox)).toBe(5);
});

test("getNumberByBox gets a multiple digit number", () => {
  const matrix = [
    [".", ".", "."],
    ["4", "5", "."],
    [".", ".", "."],
  ];
  const coordinateBox = [[1, 0], 2];
  expect(getNumberByBox(matrix, coordinateBox)).toBe(45);
});

test("isBoxPart identifies part", () => {
  const matrix = [
    ["!", ".", "."],
    [".", "5", "."],
    [".", ".", "."],
  ];

  expect(isBoxPart(matrix, [[1, 1], 1])).toBe(true);
});

test("isBoxPart rejects non-part", () => {
  const matrix = [
    [".", ".", "."],
    [".", "5", "."],
    [".", ".", "."],
  ];

  expect(isBoxPart(matrix, [[1, 1], 1])).toBe(false);
});

test("isBoxPart rejects non-part", () => {
  const matrix = [
    [".", ".", "."],
    [".", ".", "5"],
    [".", ".", "."],
  ];

  expect(isBoxPart(matrix, [[1, 2], 1])).toBe(false);
});
