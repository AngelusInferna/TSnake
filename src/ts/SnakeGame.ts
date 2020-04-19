class SnakeGame {
  private snake: Snake;
  private snakeMap: SnakeMap;
  private pause: boolean = true;
  private snakeMovingIntervalId: number = 0;
  private score: number = 0;
  private snakeMovingInterval: number = 100;
  private level: number = 1;

  constructor() {
    let defaultBlockSize = 10;
    let defaultMapWith = 300;
    let defaultMapHeight = 300;

    this.snake = new Snake(defaultBlockSize, "#006118");

    this.snakeMap = new SnakeMap(
      defaultMapWith,
      defaultMapHeight,
      defaultBlockSize,
      "#8ab3ff"
    );
  }

  public intializeGame() {
    this.snakeMap.initializeMap();
    this.snakeMap.createFood(this.snake);

    document.onkeydown = (e: KeyboardEvent) => {
      this.getKeyboardInput(e);
    };
  }

  private executeIntervalAction(): void {
    let gameOver: boolean;
    gameOver = this.snake.moveSnake(this.snakeMap);
    if (gameOver == true) {
      this.stopSnakeMoving();
      return;
    }

    if (this.snakeMap.isSnakeEatingFood(this.snake)) {
      this.increaseScore();
    }

    this.snakeMap.removeSnakeEnd(this.snake);
    this.snakeMap.drawSnakeHead(this.snake);
  }

  private increaseScore() {
    this.score++;
    this.snakeMap.createFood(this.snake);
    this.setScoreText();

    if (this.score % 3 == 0) {
      this.snake.increaseMaxTailLength();
    }

    if (this.score % 5 == 0) {
      this.increaseMovingInterval();
      this.increaseLevel();
    }
  }

  private increaseLevel() {
    this.level++;
    this.setLevelText();
  }

  private setLevelText() {
    let levelDiv: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("level")
    );

    levelDiv.innerText = `Level: + ${this.level.toString()}`;
  }

  private increaseMovingInterval() {
    this.stopSnakeMoving();
    this.snakeMovingInterval = Math.floor(this.snakeMovingInterval * 0.9);
    this.setSpeedText(this.snakeMovingInterval);
    this.startSnakeMoving();
  }

  private setSpeedText(speed: number): void {
    let speedDiv: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("speed")
    );

    let movingSpeed: number = 100 - this.snakeMovingInterval;

    speedDiv.innerText = `Geschwindigkeit: ${movingSpeed.toString()}`;
  }

  private setScoreText(): void {
    let pointDiv: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("points")
    );

    pointDiv.innerText = `Punkte: ${this.score.toString()}`;
  }

  private startSnakeMoving(): void {
    this.snakeMovingIntervalId = setInterval(() => {
      this.executeIntervalAction();
    }, this.snakeMovingInterval);
    this.pause = false;
  }

  private stopSnakeMoving(): void {
    clearInterval(this.snakeMovingIntervalId);
    this.pause = true;
  }

  private restartGame(): void {
    this.level = 1;
    this.score = 0;
    this.snakeMovingInterval = 100;

    this.stopSnakeMoving();
    this.setSpeedText(this.snakeMovingInterval);
    this.snake.resetSnake();
    this.snakeMap.resetMap();
    this.snakeMap.resetFood();
    this.snakeMap.createFood(this.snake);
    this.setScoreText();
    this.startSnakeMoving();
  }

  public getKeyboardInput(this: SnakeGame, e: KeyboardEvent): void {
    switch (e.keyCode) {
      case Keys.Up:
        this.snake.setCurrentDirection = Direction.Up;
        break;
      case Keys.Down:
        this.snake.setCurrentDirection = Direction.Down;
        break;
      case Keys.Left:
        this.snake.setCurrentDirection = Direction.Left;
        break;
      case Keys.Right:
        this.snake.setCurrentDirection = Direction.Right;
        break;
      case Keys.Space:
        if (this.pause) {
          this.startSnakeMoving();
        } else {
          this.stopSnakeMoving();
        }
        break;
      case Keys.R:
        this.restartGame();
        break;
      default:
        break;
    }
  }
}
