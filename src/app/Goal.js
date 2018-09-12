export default class Goal {
  constructor({ position, height, width, color }) {
    this.sprite = kontra.sprite({
      x: position.x,
      y: position.y,
      color: color,
      width: width,
      height: height
    });
  }

  update() {
    this.sprite.update();
  }

  render() {
    this.sprite.render();
  }
}
