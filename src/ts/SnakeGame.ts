class SnakeGame {
  private snake: Snake;
  private snakeMap: SnakeMap;

  constructor() {
    this.snake = new Snake(10, "#006118");
    this.snakeMap = new SnakeMap(450, 450, "#8ab3ff");
  }

  public startGame(): void {
    this.snakeMap.initializeMap();
    this.executeIntervalAction();
  }

  public executeIntervalAction(): void {
    this.snakeMap.addSnakeTailStart(this.snake);
    this.snakeMap.removeSnakeTailEnd(this.snake);
  }
}
