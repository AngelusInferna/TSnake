class SnakeGame {
  private snake: Snake;
  private snakeMap: SnakeMap;
  private pause: boolean = true;
  private snakeIntervalId: number = 0;

  constructor() {
    this.snake = new Snake(10, "#006118");
    this.snakeMap = new SnakeMap(450, 450, "#8ab3ff");

    document.onkeydown = (e: KeyboardEvent) => {
      this.getKeyboardInput(e);
    };
  }

  public startGame(): void {
    this.snakeMap.initializeMap();
  }

  public executeIntervalAction(): void {
    this.snakeMap.addSnakeTailStart(this.snake);
    this.snakeMap.removeSnakeTailEnd(this.snake);
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
          this.snakeIntervalId = setInterval(() => {
            this.executeIntervalAction();
          }, 100);
          this.pause = false;
        } else {
          clearInterval(this.snakeIntervalId);
          this.pause = true;
        }
        break;
      default:
        break;
    }
  }
}
