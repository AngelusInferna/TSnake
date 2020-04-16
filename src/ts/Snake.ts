class Snake {
  private blockSize: number;
  private color: string;
  private tail: Array<{ x: number; y: number }>;
  private currentDirection: Direction;
  private maxTailLength: number = 20;

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
    if (this.currentDirection == Direction.Up && direction == Direction.Down) {
    } else if (
      this.currentDirection == Direction.Down &&
      direction == Direction.Up
    ) {
    } else if (
      this.currentDirection == Direction.Left &&
      direction == Direction.Right
    ) {
    } else if (
      this.currentDirection == Direction.Right &&
      direction == Direction.Left
    ) {
    } else {
      this.currentDirection = direction;
    }
  }

  public moveSnake(snakeMap: SnakeMap): void {
    let newX: number;
    let newY: number;
    let tailHead: { x: number; y: number };

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
      newX = snakeMap.getWidth;
    } else if (newX > snakeMap.getWidth) {
      newX = 0;
    }

    if (newY < 0) {
      newY = snakeMap.getHeight;
    } else if (newY > snakeMap.getHeight) {
      newY = 0;
    }

    this.tail.push({ x: newX, y: newY });

    if (this.maxTailLength < this.tail.length) {
      this.tail.shift();
    }
  }
}
