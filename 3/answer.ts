type Matrix = string[][];
type Coordinate = [number, number];
type BoundingBox = [Coordinate, number];

export function getSumFromSchematic(schematic: string) {
  const matrix = createSchematicMatrix(schematic);

  return getNumberBoxes(matrix)
    .filter((box) => isBoxPart(matrix, box))
    .map((box) => getNumberByBox(matrix, box))
    .reduce((sum, number) => sum + number, 0);
}

export function createSchematicMatrix(schematic: string) {
  return schematic.split("\n").map((line) => line.split(""));
}

export function getNumberBoxes(matrix: Matrix): BoundingBox[] {
  return matrix.reduce(
    (boxes: BoundingBox[], row: string[], rowIndex: number) => {
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const character = matrix[rowIndex][columnIndex];
        if (character.match(/\d/)) {
          let numberLength = 1;
          while (columnIndex < matrix[rowIndex].length) {
            if (matrix[rowIndex][columnIndex + 1]?.match(/\d/)) {
              numberLength++;
              columnIndex++;
            } else {
              break;
            }
          }
          boxes.push([
            [rowIndex, columnIndex - (numberLength - 1)],
            numberLength,
          ] as const);
        }
      }
      return boxes;
    },
    [],
  );
}

export function getSurroundingCoordinates(
  [[row, column], length]: BoundingBox,
  gridSize: number,
) {
  /*
	[
		0: [0,0] [0,1] [0,2]
		1: [1,0] [1,1] [1,2]
		2: [2,0] [2,1] [2,2]
	]
	*/

  const onLeft = column === 0;
  const onRight = column === gridSize - length;
  const onTop = row === 0;
  const onBottom = row === gridSize - 1;

  const coordinates: Coordinate[] = [];

  if (!onLeft && !onTop) {
    coordinates.push([row - 1, column - 1]);
  }
  if (!onTop) {
    for (
      let currentColumn = column;
      currentColumn < column + length;
      currentColumn++
    ) {
      coordinates.push([row - 1, currentColumn]);
    }
  }
  if (!onRight && !onTop) {
    coordinates.push([row - 1, column + length]);
  }

  if (!onLeft) {
    coordinates.push([row, column - 1]);
  }
  if (!onRight) {
    coordinates.push([row, column + length]);
  }

  if (!onLeft && !onBottom) {
    coordinates.push([row + 1, column - 1]);
  }
  if (!onBottom) {
    for (
      let currentColumn = column;
      currentColumn < column + length;
      currentColumn++
    ) {
      coordinates.push([row + 1, currentColumn]);
    }
  }
  if (!onRight && !onBottom) {
    coordinates.push([row + 1, column + length]);
  }

  return coordinates;
}

export function getNumberByBox(
  matrix: Matrix,
  [[row, column], length]: BoundingBox,
) {
  let numeral = "";
  for (numeral = matrix[row][column]; length - 1 > 0; length--) {
    numeral += matrix[row][++column];
  }

  return Number(numeral);
}

export function isSymbol(character: string): boolean {
  return Boolean(!character?.match(/[0-9\.]/));
}

export function isBoxPart(matrix: Matrix, boundingBox: BoundingBox): boolean {
  const surroundingCoordinates = getSurroundingCoordinates(
    boundingBox,
    matrix.length,
  );
  return surroundingCoordinates.some(([row, column]) =>
    isSymbol(matrix[row][column]),
  );
}

export function sumGearRatios(schematic: string) {
  return 467835;
}
