class SnakeClass {
    x: number;
    y: number;
    size: number;
    tail: Array<{ x: number; y: number }>;
    rotateX: number;
    rotateY: number;
    constructor(x: number, y: number, size: number) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.tail = [{ x: this.x, y: this.y }];
      this.rotateX = 0;
      this.rotateY = 1;
    }
    move = (): void => {
      let newRect: { x: number; y: number };
      if (this.rotateX === 1) {
        newRect = {
          x: this.tail[this.tail.length - 1].x + this.size,
          y: this.tail[this.tail.length - 1].y,
        };
      } else if (this.rotateX === -1) {
        newRect = {
          x: this.tail[this.tail.length - 1].x - this.size,
          y: this.tail[this.tail.length - 1].y,
        };
      } else if (this.rotateY === 1) {
        newRect = {
          x: this.tail[this.tail.length - 1].x,
          y: this.tail[this.tail.length - 1].y + this.size,
        };
      } else {
        newRect = {
          x: this.tail[this.tail.length - 1].x,
          y: this.tail[this.tail.length - 1].y - this.size,
        };
      }
      this.tail.shift();
      this.tail.push(newRect);
    };
  }