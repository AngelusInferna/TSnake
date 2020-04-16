class SnakeMap {
  private height: number;
  private width: number;
  private color: string;
  private playAreaCanvas: HTMLCanvasElement;
  private playArea2dContext: CanvasRenderingContext2D;

  constructor(width: number, height: number, blockSize: number, color: string) {
    this.height = height;
    this.width = width;
    this.color = color;

    this.playAreaCanvas = <HTMLCanvasElement>(
      document.getElementById("playArea")
    );

    this.playArea2dContext = <CanvasRenderingContext2D>(
      this.playAreaCanvas.getContext("2d")
    );
  }

  public get getHeight(): number {
    return this.height;
  }

  public get getWidth(): number {
    return this.width;
  }

  public initializeMap() {
    this.playAreaCanvas.width = this.width;
    this.playAreaCanvas.height = this.height;

    this.playArea2dContext.fillStyle = this.color;
    this.playArea2dContext.fillRect(0, 0, this.width, this.height);
  }

  public drawSnakeHead(snake: Snake): void {
    this.playArea2dContext.fillStyle = snake.getColor;

    this.playArea2dContext.fillRect(
      snake.getTailHead.x,
      snake.getTailHead.y,
      snake.getBlockSize,
      snake.getBlockSize
    );
  }

  public removeSnakeEnd(snake: Snake): void {
    if (snake.getMaxTailLength <= snake.getTailLength) {
      this.playArea2dContext.fillStyle = this.color;

      this.playArea2dContext.fillRect(
        snake.getTail[0].x,
        snake.getTail[0].y,
        snake.getBlockSize,
        snake.getBlockSize
      );
    }
  }

  public resetMap() {
    this.playArea2dContext.fillStyle = this.color;
    this.playArea2dContext.clearRect(0, 0, this.width, this.height);
    this.playArea2dContext.fillRect(0, 0, this.width, this.height);
  }
}
