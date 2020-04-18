class SnakeGame {
  private snake: Snake;
  private snakeMap: SnakeMap;
  private pause: boolean = true;
  private snakeMovingIntervalId: number = 0;

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
    this.snakeMap.createFood();

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

    this.snakeMap.removeSnakeEnd(this.snake);
    this.snakeMap.drawSnakeHead(this.snake);
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
      default:
        break;
    }
  }
}
