class AppleClass {
    x: number;
    y: number;
    color: string;
    size: number;
    constructor() {
      let isTouching: boolean;
      while (true) {
        isTouching = false;
        this.x =
          Math.floor((Math.random() * canvas.width) / snake.size) * snake.size;
        this.y =
          Math.floor((Math.random() * canvas.height) / snake.size) * snake.size;
        for (let i = 0; i < snake.tail.length; i++) {
          if (snake.tail[i].x === this.x && snake.tail[i].y === this.y) {
            isTouching = true;
          }
        }
        this.color = "red";
        this.size = snake.size;
        if (!isTouching) break;
      }
    }
  }