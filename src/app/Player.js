export default class Player {
  constructor({ startingX, startingY, color, speed }) {
    this.sprite = kontra.sprite({
      // TODO make it a point
      x: startingX,
      y: startingY,
      color: color,
      width: 40,
      height: 40
    });
    this.speed = speed;
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
}
