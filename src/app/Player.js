export default class Player {
  constructor({ startingX, startingY, color, speed, keys }) {
    this.sprite = kontra.sprite({
      // TODO make it a point
      x: startingX,
      y: startingY,
      color: color,
      width: 40,
      height: 40
    });
    this.speed = speed;
    this.keys = keys;
  }

  handleControl() {
    if (kontra.keys.pressed(this.keys.up)) {
      this.moveUp();
    }
    if (kontra.keys.pressed(this.keys.down)) {
      this.moveDown();
    }
    if (kontra.keys.pressed(this.keys.right)) {
      this.moveRight();
    }
    if (kontra.keys.pressed(this.keys.left)) {
      this.moveLeft();
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
}
