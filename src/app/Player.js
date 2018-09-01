export default class Player {
  constructor({ startingX, startingY, color, speed, keys }) {
    this.sprite = kontra.sprite({
      // TODO make it a point
      x: startingX,
      y: startingY,
      color: color,
      radius: 20,
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

  getPosition() {
    return {
      x: this.sprite.x,
      y: this.sprite.y
    };
  }
}
