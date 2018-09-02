export default class Board {
  constructor({ width, height }) {
    this.width = width;
    this.height = height;
  }

  init(canvasId) {
    this.element = document.getElementById(canvasId);
    this.element.height = this.height;
    this.element.width = this.width;
  }

  getSize() {
    return {
      width: this.width,
      height: this.height
    };
  }
}
