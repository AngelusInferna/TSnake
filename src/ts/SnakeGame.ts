class SnakeGame {
  private snakeMap: SnakeMap;

  constructor() {
    this.snakeMap = new SnakeMap(450, 450, "#1073eb");
  }

  public StartGame(): void {
    this.snakeMap.initializeMap();
  }
}
