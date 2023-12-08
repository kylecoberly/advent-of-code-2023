import { describe, test, expect } from "vitest";
import { sumPossibleGameIds, validateGame, getGameRounds } from "./answer";

describe("day 2 part 1 given examples", () => {
  test("possible game example 1", () => {
    const game = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
    expect(validateGame(game)).toBe(true);
  });
  test("possible game example 2", () => {
    const game =
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue";
    expect(validateGame(game)).toBe(true);
  });
  test("possible game example 3", () => {
    const game =
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red";
    expect(validateGame(game)).toBe(false);
  });
  test("possible game example 4", () => {
    const game =
      "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red";
    expect(validateGame(game)).toBe(false);
  });
  test("possible game example 5", () => {
    const game = "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";
    expect(validateGame(game)).toBe(true);
  });
  test("Final answer", () => {
    const sampleInput = [
      "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
      "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
      "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
    ];

    expect(sumPossibleGameIds(sampleInput)).toBe(8);
  });
});

test("getGameObject returns a game object", () => {
  const game = "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";
  expect(getGameRounds(game)).toEqual([
    {
      red: 6,
      blue: 1,
      green: 3,
    },
    {
      red: 1,
      blue: 2,
      green: 2,
    },
  ]);
});
