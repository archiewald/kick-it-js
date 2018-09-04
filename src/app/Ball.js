// TODO share some functionalisties with Player
import { checkIfCirclesIntersect } from "../lib/utils";

export default class Ball {
  constructor({ startingPosition, speed, radius }) {
    this.radius = radius;
    this.speed = speed;
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

  getPosition() {
    return {
      x: this.sprite.x,
      y: this.sprite.y
    };
  }

  // playerDatas =
  //   {
  //     position: __,
  //     radius: __,
  //     velocityVector: __
  //   }[]
  //

  handlePhysics(playerDatas) {
    playerDatas.forEach(playerData => {
      if (
        checkIfCirclesIntersect({
          position1: playerData.position,
          radius1: playerData.radius,
          position2: this.getPosition(),
          radius2: this.radius
        })
      ) {
        console.log(
          this._calculateVelocityVector({
            playerVelocityVector: playerData.velocityVector,
            ballVelocityVector: { x: 0, y: 0 },
            playerRadius: playerData.radius,
            ballRadius: this.radius
          })
        );
      }
    });
  }

  _calculateVelocityVector({
    playerVelocityVector,
    playerRadius,
    ballVelocityVector,
    ballRadius
  }) {
  }

  update() {
    this.sprite.update();
  }

  render() {
    this.sprite.render();
  }
}
