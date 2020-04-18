class SnakeMap {
  private height: number;
  private width: number;
  private color: string;
  private playAreaCanvas: HTMLCanvasElement;
  private playArea2dContext: CanvasRenderingContext2D;
  private foods: Array<{ x: number; y: number }>;
  private maxPointCount: number;
  private blockSize: number;

  constructor(width: number, height: number, blockSize: number, color: string) {
    this.height = height;
    this.width = width;
    this.color = color;
    this.foods = new Array<{ x: number; y: number }>();
    this.maxPointCount = 5;
    this.blockSize = blockSize;

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

  public createFood(): void {
    while (this.foods.length < this.maxPointCount) {
      var newFoodPoint = this.GenerateRandomPointOnMap();
      this.foods.push(newFoodPoint);

      this.playArea2dContext.fillStyle = "#fc0307";

      this.playArea2dContext.fillRect(newFoodPoint.x, newFoodPoint.y, 10, 10);
    }
  }

  public resetFood(): void {
    this.foods = new Array<{ x: number; y: number }>();
  }

  public GenerateRandomPointOnMap(): { x: number; y: number } {
    var pointX: number =
      (Math.floor(Math.random() * (this.width / this.blockSize)) + 1) * 10;
    var pointY: number =
      (Math.floor(Math.random() * (this.height / this.blockSize)) + 1) * 10;

    return { x: pointX, y: pointY };
  }

  public resetMap() {
    this.playArea2dContext.fillStyle = this.color;
    this.playArea2dContext.clearRect(0, 0, this.width, this.height);
    this.playArea2dContext.fillRect(0, 0, this.width, this.height);
  }

  public isSnakeEatingFood(snake: Snake): boolean {
    let snakeHead: { x: number; y: number } = snake.getTailHead;
    let index: number;

    let matchingFood = this.foods.filter(
      (food) => food.x == snakeHead.x && food.y == snakeHead.y
    );

    if (matchingFood != undefined) {
      index = this.foods.indexOf(matchingFood[0]);
      if (index != -1) {
        this.foods.splice(index, 1);
        return true;
      }
    }

    return false;
  }
}
