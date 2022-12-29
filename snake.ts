class Snake {
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
class Apple {
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
var canvas = <HTMLCanvasElement>document.getElementById("canvas");
var snake = new Snake(20, 20, 20);
var apple = new Apple();
var canvasContext = <CanvasRenderingContext2D>canvas.getContext("2d");
window.onload = (): void => {
  gameLoop();
};
const gameLoop = () => {
  setInterval(show, 1000 / 10); // 15 fps value
};
const show = (): void => {
  update();
  draw();
};
const update = (): void => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  eatApple();
  checkHitWall();
};
const eatApple = (): void => {
  if (
    snake.tail[snake.tail.length - 1].x == apple.x &&
    snake.tail[snake.tail.length - 1].y == apple.y
  ) {
    snake.tail[snake.tail.length] = { x: apple.x, y: apple.y };
    apple = new Apple();
  }
};
const checkHitWall = () => {
  let headTail = snake.tail[snake.tail.length - 1];
  if (headTail.x === -snake.size) {
    headTail.x = canvas.width - snake.size;
  } else if (headTail.x === canvas.width) {
    headTail.x = 0;
  } else if (headTail.y === -snake.size) {
    headTail.y = canvas.height - snake.size;
  } else if (headTail.y === canvas.height) {
    headTail.y = 0;
  }
};
const draw = (): void => {
  createRect(0, 0, canvas.width, canvas.height, "black");
  createRect(0, 0, canvas.width, canvas.height);
  snake.tail.map((tail) => {
    createRect(
      tail.x + 2.5,
      tail.y + 2.5,
      snake.size - 5,
      snake.size - 5,
      "white"
    );
  });
  canvasContext.font = "20px Arial";
  canvasContext.fillStyle = "#00FF42";
  canvasContext.fillText(
    "Score: " + (snake.tail.length - 1),
    canvas.width - 120,
    30
  );
  createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
};
const createRect = (
  x: number,
  y: number,
  width: number,
  height: number,
  color?: string
): void => {
  canvasContext.fillStyle = color || "black";
  canvasContext.fillRect(x, y, width, height);
};
window.addEventListener("keydown", (event: KeyboardEvent) => {
  setTimeout(() => {
    if (event.keyCode === 37 && snake.rotateX !== 1) {
      snake.rotateX = -1;
      snake.rotateY = 0;
    } else if (event.keyCode === 38 && snake.rotateY !== 1) {
      snake.rotateX = 0;
      snake.rotateY = -1;
    } else if (event.keyCode === 39 && snake.rotateX !== 1) {
      snake.rotateX = 1;
      snake.rotateY = 0;
    } else if (event.keyCode === 40 && snake.rotateY !== 1) {
      snake.rotateX = 0;
      snake.rotateY = 1;
    }
  }, 1);
});
