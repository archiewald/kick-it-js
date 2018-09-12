// TODO share some functionalisties with Player
import { checkIfCirclesIntersect, setNewVelocities } from "../lib/utils";
import Vector from "./Vector";

export default class Ball {
  constructor({ startingPosition, speed, radius }) {
    this.velocityVector = new Vector(0, 0);
    this.radius = radius;
    this.speed = speed;
    this.startingPosition = startingPosition;
    this.sprite = kontra.sprite({
      x: startingPosition.x,
      y: startingPosition.y,
      color: "white",
      radius: this.radius,
      render: function() {
        // TODO replace with nice graphic
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
      }
    });
  }

  getVelocityVector() {
    return this.velocityVector;
  }

  stop() {
    this.velocityVector.x = 0;
    this.velocityVector.y = 0;
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

  // playerDatas =
  //   {
  //     position: __,
  //     radius: __,
  //     velocityVector: __
  //   }[]
  //

  handleMotion() {
    this.sprite.x = this.sprite.x + this.velocityVector.x;
    this.sprite.y = this.sprite.y + this.velocityVector.y;
  }

  handlePlayersCollision(players) {
    players.forEach(player => {
      if (
        checkIfCirclesIntersect({
          position1: player.getPosition(),
          radius1: player.radius,
          position2: this.getPosition(),
          radius2: this.radius
        })
      ) {
        this.velocityVector = setNewVelocities(player, this).v2;
      }
    });
  }

  handleBoardCollision(boardSize) {
    const position = this.getPosition();
    if (
      position.x <= 0 + this.radius ||
      position.x >= boardSize.width - this.radius
    ) {
      this.velocityVector.x = -this.velocityVector.x;
    }

    if (
      position.y <= 0 + this.radius ||
      position.y >= boardSize.height - this.radius
    ) {
      this.velocityVector.y = -this.velocityVector.y;
    }
  }

  update() {
    this.sprite.update();
  }

  render() {
    this.sprite.render();
  }
}
