export function sumPossibleGameIds(games: string[]) {
  return games.filter(validateGame).reduce((sum, game) => {
    return sum + getId(game);
  }, 0);
}

export function validateGame(gameString: string) {
  const RED_MAX_COUNT = 12;
  const GREEN_MAX_COUNT = 13;
  const BLUE_MAX_COUNT = 14;

  const rounds = getGameRounds(gameString);

  return rounds.every(({ red, green, blue }) => {
    return (
      red <= RED_MAX_COUNT && green <= GREEN_MAX_COUNT && blue <= BLUE_MAX_COUNT
    );
  });
}

export function getGameRounds(game: string) {
  const [_, roundsString] = game.split(":");
  return roundsString
    .split(";")
    .map((string) => string.trim())
    .map((round) => {
      const cubes = round.split(",");
      let redCount = 0;
      let greenCount = 0;
      let blueCount = 0;
      cubes.forEach((cube) => {
        if (cube.match("red")) redCount = Number(cube.match(/\d+/)?.[0]);
        if (cube.match("green")) greenCount = Number(cube.match(/\d+/)?.[0]);
        if (cube.match("blue")) blueCount = Number(cube.match(/\d+/)?.[0]);
      });

      return {
        red: redCount,
        green: greenCount,
        blue: blueCount,
      };
    });
}

function getId(game: string) {
  const [idString] = game.split(":");
  return Number(idString.match(/\d+/)?.[0]);
}
