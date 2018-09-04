// TODO share some functionalisties with Player
import { checkIfCirclesIntersect, setNewVelocities } from "../lib/utils";
import Vector from "./Vector";

export default class Ball {
  constructor({ startingPosition, speed, radius }) {
    this.velocityVector = new Vector(0, 0);
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

  getVelocityVector() {
    return this.velocityVector;
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

  handleMotion() {
    this.sprite.x = this.sprite.x + this.velocityVector.x;
    this.sprite.y = this.sprite.y + this.velocityVector.y;
  }

  handlePhysics(players) {
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

  update() {
    this.sprite.update();
  }

  render() {
    this.sprite.render();
  }
}
