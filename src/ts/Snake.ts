class Snake {
  private blockSize: number;
  private color: string;
  private tail: Array<{ x: number; y: number }>;

  constructor(blockSize: number, color: string) {
    this.blockSize = blockSize;
    this.color = color;

    this.tail = new Array<{ x: number; y: number }>();
    this.tail.push({ x: 0, y: 0 });
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
}
