class SnakeGame {
  private snake: Snake;
  private snakeMap: SnakeMap;
  private pause: boolean = true;
  private snakeMovingIntervalId: number = 0;
  private points: number = 0;

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
      this.increasePoints();
    }

    this.snakeMap.removeSnakeEnd(this.snake);
    this.snakeMap.drawSnakeHead(this.snake);
  }

  private increasePoints() {
    this.points++;
    this.snakeMap.createFood(this.snake);
    this.setScoreText(this.points);
  }

  private setScoreText(score: number): void {
    let pointDiv: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("points")
    );

    pointDiv.innerText = "Punkte: " + score.toString();
  }

  private startSnakeMoving(): void {
    this.snakeMovingIntervalId = setInterval(() => {
      this.executeIntervalAction();
    }, 100);
    this.pause = false;
  }

  private stopSnakeMoving(): void {
    clearInterval(this.snakeMovingIntervalId);
    this.pause = true;
  }

  private restartGame(): void {
    this.points = 0;

    this.stopSnakeMoving();
    this.snake.resetSnake();
    this.snakeMap.resetMap();
    this.snakeMap.resetFood();
    this.snakeMap.createFood(this.snake);
    this.setScoreText(0);
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
