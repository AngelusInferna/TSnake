class Snake {
  private blockSize: number;
  private color: string;
  private tail: Array<{ x: number; y: number }>;
  private currentDirection: Direction;
  private maxTailLength: number = 10;

  constructor(blockSize: number, color: string) {
    this.blockSize = blockSize;
    this.color = color;

    this.tail = new Array<{ x: number; y: number }>();
    this.tail.push({ x: 0, y: 0 });

    this.currentDirection = Direction.Right;
  }

  public get getColor(): string {
    return this.color;
  }

  public get getBlockSize(): number {
    return this.blockSize;
  }

  public get getTail(): Array<{ x: number; y: number }> {
    return this.tail;
  }

  public get getTailHead(): { x: number; y: number } {
    return this.tail[this.tail.length - 1];
  }

  public get getMaxTailLength(): number {
    return this.maxTailLength;
  }

  public get getTailLength(): number {
    return this.tail.length;
  }

  public set setCurrentDirection(direction: Direction) {
    this.currentDirection = direction;
  }

  public moveSnake(mapHeight: number, mapWidth: number): void {
    let tailHead: { x: number; y: number };
    let newX: number;
    let newY: number;

    tailHead = this.getTailHead;
    newX = tailHead.x;
    newY = tailHead.y;

    if (this.currentDirection == Direction.Up) {
      newY = tailHead.y - this.blockSize;
    } else if (this.currentDirection == Direction.Down) {
      newY = tailHead.y + this.blockSize;
    } else if (this.currentDirection == Direction.Left) {
      newX = tailHead.x - this.blockSize;
    } else if (this.currentDirection == Direction.Right) {
      newX = tailHead.x + this.blockSize;
    }

    if (newX < 0) {
      newX = mapWidth;
    } else if (newX > mapWidth) {
      newX = 0;
    }

    if (newY < 0) {
      newY = mapHeight;
    } else if (newY > mapHeight) {
      newY = 0;
    }

    this.tail.push({ x: newX, y: newY });
  }
}
