import { checkIfCirclesIntersect } from "../lib/utils";
import Vector from "./Vector";

export default class Player {
  constructor({ startingPosition, color, speed, keys, radius }) {
    this.radius = radius;
    this.startingPosition = startingPosition;
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
    this.velocityVector = new Vector(0, 0);
    this.points = 0;
  }

  getPosition() {
    return {
      x: this.sprite.x,
      y: this.sprite.y
    };
  }

  setPosition(position) {
    this.sprite.x = position.x;
    this.sprite.y = position.y;
  }

  getVelocityVector() {
    return this.velocityVector.getXY();
  }

  handleControl(playerPositions, boardSize) {
    this.velocityVector.setXY(0, 0);
    if (
      kontra.keys.pressed(this.keys.up) &&
      this.checkIfCanMove("up", playerPositions, boardSize)
    ) {
      this.moveUp(this.sprite);
      this.velocityVector.y = -this.speed;
    }
    if (
      kontra.keys.pressed(this.keys.down) &&
      this.checkIfCanMove("down", playerPositions, boardSize)
    ) {
      this.moveDown(this.sprite);
      this.velocityVector.y = this.speed;
    }
    if (
      kontra.keys.pressed(this.keys.right) &&
      this.checkIfCanMove("right", playerPositions, boardSize)
    ) {
      this.moveRight(this.sprite);
      this.velocityVector.x = this.speed;
    }
    if (
      kontra.keys.pressed(this.keys.left) &&
      this.checkIfCanMove("left", playerPositions, boardSize)
    ) {
      this.moveLeft(this.sprite);
      this.velocityVector.x = -this.speed;
    }
  }

  checkIfCanMove(direction, playerPositions, boardSize) {
    return !(
      this.checkPlayersCollision(direction, playerPositions) ||
      this.checkBoardCollision(direction, boardSize)
    );
  }
  // TODO move to some collision handler?
  // TODO move switch to checkIfCanMove()
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
      checkIfCirclesIntersect({
        position1: position,
        radius1: this.radius,
        position2: nextPosition,
        radius2: this.radius
      })
    );
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
}
