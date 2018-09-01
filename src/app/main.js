import Player from "./Player";

kontra.init("game");

const player1 = new Player({
  startingX: 10,
  startingY: 10,
  color: "blue",
  speed: 2,
  keys: {
    up: "w",
    down: "s",
    left: "a",
    right: "d"
  }
});

const player2 = new Player({
  startingX: 750,
  startingY: 10,
  color: "red",
  speed: 2,
  keys: {
    up: "up",
    down: "down",
    left: "left",
    right: "right"
  }
});

const loop = kontra.gameLoop({
  update: () => {
    player1.handleControl();
    player2.handleControl();

    player1.update();
    player2.update();
  },

  render: () => {
    player1.render();
    player2.render();
  }
});

loop.start();
