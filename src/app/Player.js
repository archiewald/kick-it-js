export default class Player {
  constructor({ startingX, startingY, color, speed, keys, boardSize }) {
    this.radius = 20;
    this.sprite = kontra.sprite({
      // TODO make it a point
      x: startingX,
      y: startingY,
      color: color,
      radius: this.radius,
      render: function() {
        // TODO replace with nice graphic
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
      }
    });
    this.speed = speed;
    this.keys = keys;
    this.boardSize = boardSize;
  }

  handleControl() {
    if (kontra.keys.pressed(this.keys.up) && !this.checkBoardCollision("up")) {
      this.moveUp();
    }
    if (
      kontra.keys.pressed(this.keys.down) &&
      !this.checkBoardCollision("down")
    ) {
      this.moveDown();
    }
    if (
      kontra.keys.pressed(this.keys.right) &&
      !this.checkBoardCollision("right")
    ) {
      this.moveRight();
    }
    if (
      kontra.keys.pressed(this.keys.left) &&
      !this.checkBoardCollision("left")
    ) {
      this.moveLeft();
    }
  }

  checkBoardCollision(playerDirection) {
    const position = this.getPosition();

    switch (playerDirection) {
      case "up":
        return position.y <= this.radius;
      case "down":
        return position.y >= this.boardSize.height - this.radius;
      case "right":
        return position.x >= this.boardSize.width - this.radius;
      case "left":
        return position.x <= this.radius;
    }
  }

  moveUp() {
    this.sprite.y -= this.speed;
  }
  moveDown() {
    this.sprite.y += this.speed;
  }
  moveRight() {
    this.sprite.x += this.speed;
  }
  moveLeft() {
    this.sprite.x -= this.speed;
  }

  update() {
    this.sprite.update();
  }

  render() {
    this.sprite.render();
  }

  getPosition() {
    return {
      x: this.sprite.x,
      y: this.sprite.y
    };
  }
}
