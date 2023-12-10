type Matrix = string[][];
type Coordinate = [number, number];
type BoundingBox = [Coordinate, number];

export function getSumFromSchematic(schematic: string) {
  const matrix = createSchematicMatrix(schematic);

  return getAllNumberBoxes(matrix)
    .filter((box) => isBoxPart(matrix, box))
    .map((box) => getNumberByBox(matrix, box))
    .reduce((sum, number) => sum + number, 0);
}

export function createSchematicMatrix(schematic: string) {
  return schematic.split("\n").map((line) => line.split(""));
}

export function getAllNumberBoxes(matrix: Matrix): BoundingBox[] {
  return matrix.reduce(
    (boxes: BoundingBox[], row: string[], rowIndex: number) => {
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const numberBox = getNumberBox(matrix, [rowIndex, columnIndex]);
        if (numberBox) {
          columnIndex += numberBox[1] - 1;
          boxes.push(numberBox);
        }
      }
      return boxes;
    },
    [],
  );
}

export function getSymbolCoordinates(matrix: Matrix): Coordinate[] {
  return matrix.reduce(
    (coordinates: Coordinate[], row: string[], rowIndex: number) => {
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const character = matrix[rowIndex][columnIndex];
        if (isSymbol(character)) {
          coordinates.push([rowIndex, columnIndex] as const);
        }
      }
      return coordinates;
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

export function isNumber(matrix: Matrix, [row, column]: Coordinate) {
  return matrix[row][column]?.match(/\d/);
}

export function getGearValue(matrix: Matrix, coordinate: Coordinate) {
  const surroundingCoordinates = getSurroundingCoordinates(
    [coordinate, 1],
    matrix.length,
  );
  const surroundingPartNumbers = surroundingCoordinates
    .filter((coordinate) => isNumber(matrix, coordinate))
    .reduce<number[]>((partNumbers, [row, column]) => {
      let previousCharacter = column > 0 ? matrix[row][column - 1] : null;
      if (column === coordinate[1] - 1 && previousCharacter?.match(/\d/)) {
        while (previousCharacter?.match(/\d/)) {
          column--;
          previousCharacter = column > 0 ? matrix[row][column - 1] : null;
        }
      }

      if (!previousCharacter?.match(/\d/)) {
        const numberBox = getNumberBox(matrix, [row, column]);
        const number = getNumberByBox(matrix, numberBox!);
        partNumbers.push(number);
      }
      return partNumbers;
    }, []);

  return surroundingPartNumbers.length === 2
    ? surroundingPartNumbers.reduce((product, number) => product * number, 1)
    : 0;
}

export function sumGearRatios(schematic: string) {
  const matrix = createSchematicMatrix(schematic);
  const symbolLocations = getSymbolCoordinates(matrix);

  return symbolLocations
    .map((symbolLocation) => getGearValue(matrix, symbolLocation))
    .reduce((sum, number) => sum + number, 0);
}

function getNumberBox(
  matrix: Matrix,
  [row, column]: Coordinate,
): BoundingBox | null {
  const character = matrix[row][column];
  if (character?.match(/\d/)) {
    let numberLength = 1;
    while (column < matrix[row].length) {
      if (matrix[row][column + 1]?.match(/\d/)) {
        numberLength++;
        column++;
      } else {
        break;
      }
    }
    return [[row, column - (numberLength - 1)], numberLength];
  }
  return null;
}
