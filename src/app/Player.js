export default class Player {
  constructor({ startingPosition, color, speed, keys, radius }) {
    this.radius = radius;
    this.sprite = kontra.sprite({
      x: startingPosition.x,
      y: startingPosition.y,
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
  }

  handleControl(playerPositions, boardSize) {
    if (
      kontra.keys.pressed(this.keys.up) &&
      this.checkIfCanMove("up", playerPositions, boardSize)
    ) {
      this.moveUp(this.sprite);
    }
    if (
      kontra.keys.pressed(this.keys.down) &&
      this.checkIfCanMove("down", playerPositions, boardSize)
    ) {
      this.moveDown(this.sprite);
    }
    if (
      kontra.keys.pressed(this.keys.right) &&
      this.checkIfCanMove("right", playerPositions, boardSize)
    ) {
      this.moveRight(this.sprite);
    }
    if (
      kontra.keys.pressed(this.keys.left) &&
      this.checkIfCanMove("left", playerPositions, boardSize)
    ) {
      this.moveLeft(this.sprite);
    }
  }

  checkIfCanMove(direction, playerPositions, boardSize) {
    return !(
      this.checkPlayersCollision(direction, playerPositions) ||
      this.checkBoardCollision(direction, boardSize)
    );
  }
  // TODO: move some collision handler?
  checkBoardCollision(direction, boardSize) {
    const position = this.getPosition();
    switch (direction) {
      case "up":
        return position.y <= this.radius;
      case "down":
        return position.y >= boardSize.height - this.radius;
      case "right":
        return position.x >= boardSize.width - this.radius;
      case "left":
        return position.x <= this.radius;
    }
  }

  checkPlayersCollision(direction, playerPositions) {
    let nextPosition = this.getPosition();

    switch (direction) {
      case "up":
        nextPosition = this.moveUp(nextPosition);
        break;
      case "down":
        nextPosition = this.moveDown(nextPosition);
        break;
      case "right":
        nextPosition = this.moveRight(nextPosition);
        break;
      case "left":
        nextPosition = this.moveLeft(nextPosition);
        break;
    }

    return playerPositions.some(position =>
      this.checkIfCirclesIntersect(position, 20, nextPosition, 20)
    );
  }

  checkIfCirclesIntersect(position1, radius1, position2, radius2) {
    const distance = Math.sqrt(
      Math.pow(position1.x - position2.x, 2) +
        Math.pow(position1.y - position2.y, 2)
    );
    return distance < radius1 + radius2;
  }

  moveUp(position) {
    position.y -= this.speed;
    return position;
  }
  moveDown(position) {
    position.y += this.speed;
    return position;
  }
  moveRight(position) {
    position.x += this.speed;
    return position;
  }
  moveLeft(position) {
    position.x -= this.speed;
    return position;
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
