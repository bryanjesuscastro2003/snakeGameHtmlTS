var Snake = /** @class */ (function () {
    function Snake(x, y, size) {
        var _this = this;
        this.move = function () {
            var newRect;
            if (_this.rotateX === 1) {
                newRect = {
                    x: _this.tail[_this.tail.length - 1].x + _this.size,
                    y: _this.tail[_this.tail.length - 1].y
                };
            }
            else if (_this.rotateX === -1) {
                newRect = {
                    x: _this.tail[_this.tail.length - 1].x - _this.size,
                    y: _this.tail[_this.tail.length - 1].y
                };
            }
            else if (_this.rotateY === 1) {
                newRect = {
                    x: _this.tail[_this.tail.length - 1].x,
                    y: _this.tail[_this.tail.length - 1].y + _this.size
                };
            }
            else {
                newRect = {
                    x: _this.tail[_this.tail.length - 1].x,
                    y: _this.tail[_this.tail.length - 1].y - _this.size
                };
            }
            _this.tail.shift();
            _this.tail.push(newRect);
        };
        this.x = x;
        this.y = y;
        this.size = size;
        this.tail = [{ x: this.x, y: this.y }];
        this.rotateX = 0;
        this.rotateY = 1;
    }
    return Snake;
}());
var Apple = /** @class */ (function () {
    function Apple() {
        var isTouching;
        while (true) {
            isTouching = false;
            this.x =
                Math.floor((Math.random() * canvas.width) / snake.size) * snake.size;
            this.y =
                Math.floor((Math.random() * canvas.height) / snake.size) * snake.size;
            for (var i = 0; i < snake.tail.length; i++) {
                if (snake.tail[i].x === this.x && snake.tail[i].y === this.y) {
                    isTouching = true;
                }
            }
            this.color = "red";
            this.size = snake.size;
            if (!isTouching)
                break;
        }
    }
    return Apple;
}());
var canvas = document.getElementById("canvas");
var snake = new Snake(20, 20, 20);
var apple = new Apple();
var canvasContext = canvas.getContext("2d");
window.onload = function () {
    gameLoop();
};
var gameLoop = function () {
    setInterval(show, 1000 / 10); // 15 fps value
};
var show = function () {
    update();
    draw();
};
var update = function () {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    snake.move();
    eatApple();
    checkHitWall();
};
var eatApple = function () {
    if (snake.tail[snake.tail.length - 1].x == apple.x &&
        snake.tail[snake.tail.length - 1].y == apple.y) {
        snake.tail[snake.tail.length] = { x: apple.x, y: apple.y };
        apple = new Apple();
    }
};
var checkHitWall = function () {
    var headTail = snake.tail[snake.tail.length - 1];
    if (headTail.x === -snake.size) {
        headTail.x = canvas.width - snake.size;
    }
    else if (headTail.x === canvas.width) {
        headTail.x = 0;
    }
    else if (headTail.y === -snake.size) {
        headTail.y = canvas.height - snake.size;
    }
    else if (headTail.y === canvas.height) {
        headTail.y = 0;
    }
};
var draw = function () {
    createRect(0, 0, canvas.width, canvas.height, "black");
    createRect(0, 0, canvas.width, canvas.height);
    snake.tail.map(function (tail) {
        createRect(tail.x + 2.5, tail.y + 2.5, snake.size - 5, snake.size - 5, "white");
    });
    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "#00FF42";
    canvasContext.fillText("Score: " + (snake.tail.length - 1), canvas.width - 120, 30);
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
};
var createRect = function (x, y, width, height, color) {
    canvasContext.fillStyle = color || "black";
    canvasContext.fillRect(x, y, width, height);
};
window.addEventListener("keydown", function (event) {
    setTimeout(function () {
        if (event.keyCode === 37 && snake.rotateX !== 1) {
            snake.rotateX = -1;
            snake.rotateY = 0;
        }
        else if (event.keyCode === 38 && snake.rotateY !== 1) {
            snake.rotateX = 0;
            snake.rotateY = -1;
        }
        else if (event.keyCode === 39 && snake.rotateX !== 1) {
            snake.rotateX = 1;
            snake.rotateY = 0;
        }
        else if (event.keyCode === 40 && snake.rotateY !== 1) {
            snake.rotateX = 0;
            snake.rotateY = 1;
        }
    }, 1);
});
