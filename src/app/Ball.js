// TODO share some functionalisties with Player
export default class Ball {
  constructor({ startingPosition, speed, radius }) {
    this.radius = radius;
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
    this.speed = speed;
  }

  update() {
    this.sprite.update();
  }

  render() {
    this.sprite.render();
  }
}
