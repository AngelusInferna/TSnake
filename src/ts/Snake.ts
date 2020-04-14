class Snake {
  private blockSize: number;
  private color: string;

  constructor(blockSize: number, color: string) {
    this.blockSize = blockSize;
    this.color = color;
  }

  public get getColor(): string {
    return this.color;
  }

  public get getBlockSize(): number {
    return this.blockSize;
  }
}
