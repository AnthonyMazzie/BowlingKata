class Game {
  // Private variables to track the total score and pins knocked down in each roll
  _totalScore;
  _pinsKnockedDown;

  // Constructor initializes the game with zero total score and an empty array for pins knocked down
  constructor() {
    this._totalScore = 0;
    this._pinsKnockedDown = [];
  }

  // Record the number of pins knocked down in a roll and update the total score
  roll(pins) {
    // Validate that the number of pins is within a valid range (0 to 10)
    if (pins < 0 || pins > 10) {
      throw new Error("Invalid number of pins!");
    }

    this._totalScore += pins;
    this._pinsKnockedDown.push(pins);
  }

  // Calculate the score for a specific frame based on the pins knocked down
  calculateFrameScore(frameIndex) {
    if (this.isStrike(frameIndex)) {
      // Strike: 10 points plus the sum of the next two rolls
      return (
        10 +
        this._pinsKnockedDown[frameIndex + 1] +
        this._pinsKnockedDown[frameIndex + 2]
      );
    } else if (this.isSpare(frameIndex)) {
      // Spare: 10 points plus the next roll
      return 10 + this._pinsKnockedDown[frameIndex + 2];
    } else {
      // Open frame: Sum of the two rolls in the frame
      return (
        this._pinsKnockedDown[frameIndex] +
        this._pinsKnockedDown[frameIndex + 1]
      );
    }
  }

  // Check if a frame is a strike
  isStrike(frameIndex) {
    return this._pinsKnockedDown[frameIndex] === 10;
  }

  // Check if a frame is a spare
  isSpare(frameIndex) {
    return (
      this._pinsKnockedDown[frameIndex] +
        this._pinsKnockedDown[frameIndex + 1] ===
      10
    );
  }

  // Calculate the total score for the entire game
  score() {
    let totalScore = 0;
    let currentFrameIndex = 0;

    // Iterate through each frame and update the total score
    for (let currentFrame = 0; currentFrame < 10; currentFrame++) {
      totalScore += this.calculateFrameScore(currentFrameIndex);
      currentFrameIndex += this.isStrike(currentFrameIndex) ? 1 : 2;
    }

    return totalScore;
  }
}

module.exports = Game;
