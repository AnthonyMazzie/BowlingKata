const Game = require("../game");

describe("Core Bowling Tests", () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  it("Roll 20 gutterballs", () => {
    for (let i = 0; i < 20; i++) {
      game.roll(0);
    }

    expect(game.score()).toBe(0);
  });

  it("Roll 20 1-pin rolls", () => {
    for (let i = 0; i < 20; i++) {
      game.roll(1);
    }

    expect(game.score()).toBe(20);
  });

  it("Spare Bonus", () => {
    game.roll(5);
    game.roll(5);
    game.roll(3);

    for (let i = 0; i < 17; i++) {
      game.roll(0);
    }

    let currentGameScore = game.score();

    expect(currentGameScore).toBe(16);
  });

  it("Strike Bonus", () => {
    game.roll(10); // Strike
    game.roll(3);
    game.roll(4);
    for (let i = 0; i < 17; i++) {
      game.roll(0);
    }

    let value = 10 + 3 + 4 + 3 + 4;
    expect(game.score()).toBe(value);
  });

  it("Roll all spares", () => {
    // Roll all spares
    for (let i = 0; i < 10; i++) {
      game.roll(5);
      game.roll(5); // Spare
    }
    // Roll an extra roll in the tenth frame
    game.roll(5);

    expect(game.score()).toBe(150); // 10 frames * 15 points per frame
  });

  it("Roll all strikes", () => {
    for (let i = 0; i < 12; i++) {
      game.roll(10);
    }

    let value = 300;
    expect(game.score()).toBe(value);
  });
});

describe("Other bowling Tests", () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  it("Roll all 9s", () => {
    // Roll all 9s
    for (let i = 0; i < 10; i++) {
      game.roll(9);
      game.roll(0); // No spare or strike
    }

    expect(game.score()).toBe(90); // 10 frames * 9 points per frame
  });

  it("Roll a spare followed by 3-pin rolls", () => {
    game.roll(5);
    game.roll(5); // Spare
    game.roll(3);
    for (let i = 0; i < 17; i++) {
      game.roll(0);
    }

    expect(game.score()).toBe(16);
  });

  it("Roll a strike followed by 3 and 4-pin rolls", () => {
    game.roll(10); // Strike
    game.roll(3);
    game.roll(4);
    for (let i = 0; i < 16; i++) {
      game.roll(0);
    }

    let value = 10 + 3 + 4 + 3 + 4;
    expect(game.score()).toBe(value);
  });

  it("Roll a spare in the final frame and roll one more", () => {
    for (let i = 0; i < 18; i++) {
      game.roll(0);
    }
    game.roll(5);
    game.roll(5); // Spare
    game.roll(3);

    expect(game.score()).toBe(13);
  });

  it("Roll a strike in the final frame and roll two more", () => {
    for (let i = 0; i < 18; i++) {
      game.roll(0);
    }
    game.roll(10); // Strike
    game.roll(3);
    game.roll(4);

    let value = 10 + 3 + 4;
    expect(game.score()).toBe(value);
  });
});
