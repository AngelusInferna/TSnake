class Snake {
  private blockSize: number;
  private color: string;
  private tail: Array<{ x: number; y: number }>;
  private currentDirection: Direction;

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

  public set setCurrentDirection(direction: Direction) {
    this.currentDirection = direction;
  }

  public moveSnake(): void {
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
    console.log({ x: newX, y: newY });
    this.tail.push({ x: newX, y: newY });
    console.log(this.tail);
  }
}
