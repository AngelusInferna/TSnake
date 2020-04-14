class SnakeGame {
  private snake: Snake;
  private snakeMap: SnakeMap;

  constructor() {
    this.snake = new Snake(10, "#006118");
    this.snakeMap = new SnakeMap(450, 450, "#8ab3ff");
  }

  public StartGame(): void {
    this.snakeMap.initializeMap();
    this.snakeMap.drawSnake(this.snake);
  }
}
