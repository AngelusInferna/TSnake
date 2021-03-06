class Snake {
  private blockSize: number;
  private color: string;
  private tail: Array<{ x: number; y: number }>;
  private currentDirection: Direction;
  private maxTailLength: number = 8;

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

  public isSnakeTouchingItsOwnTail(head: { x: number; y: number }): boolean {
    let match: boolean = false;

    this.tail.forEach((tailPart) => {
      if (tailPart.x == head.x && tailPart.y == head.y) {
        match = true;
      }
    });

    return match;
  }

  public moveSnake(snakeMap: SnakeMap): boolean {
    let newX: number;
    let newY: number;
    let gameOver: boolean = false;
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
      newX = snakeMap.getWidth - this.blockSize;
    } else if (newX >= snakeMap.getWidth) {
      newX = 0;
    }

    if (newY < 0) {
      newY = snakeMap.getHeight - this.blockSize;
    } else if (newY >= snakeMap.getHeight) {
      newY = 0;
    }

    let newTailHead = { x: newX, y: newY };
    if (this.isSnakeTouchingItsOwnTail(newTailHead)) {
      gameOver = true;
      return gameOver;
    }

    this.tail.push(newTailHead);

    if (this.maxTailLength < this.tail.length) {
      this.tail.shift();
    }

    return gameOver;
  }

  public resetSnake() {
    this.tail = new Array<{ x: number; y: number }>();
    this.tail.push({ x: 0, y: 0 });
    this.currentDirection = Direction.Right;
    this.maxTailLength = 8;
  }

  public increaseMaxTailLength(): void {
    this.maxTailLength++;
  }
}
