export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getXY() {
    return {
      x: this.x,
      y: this.y
    };
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;
  }
}
