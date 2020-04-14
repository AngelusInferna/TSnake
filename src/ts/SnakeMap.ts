class SnakeMap {
  private height: number;
  private width: number;
  private color: string;
  private playAreaCanvas: HTMLCanvasElement;
  private playArea2dContext: CanvasRenderingContext2D;

  constructor(width: number, height: number, color: string) {
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

  public initializeMap() {
    this.playAreaCanvas.width = this.width;
    this.playAreaCanvas.height = this.height;

    this.playArea2dContext.fillStyle = this.color;
    this.playArea2dContext.fillRect(0, 0, this.width, this.height);
  }
}
