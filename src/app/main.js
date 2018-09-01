import Player from "./Player";

kontra.init("game");

const player1 = new Player({
  startingX: 10,
  startingY: 10,
  color: "blue",
  speed: 2
});

const player2 = new Player({
  startingX: 750,
  startingY: 10,
  color: "red",
  speed: 2
});

const loop = kontra.gameLoop({
  update: () => {
    if (kontra.keys.pressed("up")) {
      player1.moveUp();
    }
    if (kontra.keys.pressed("down")) {
      player1.moveDown();
    }
    if (kontra.keys.pressed("right")) {
      player1.moveRight();
    }
    if (kontra.keys.pressed("left")) {
      player1.moveLeft();
    }

    if (kontra.keys.pressed("w")) {
      player2.moveUp();
    }
    if (kontra.keys.pressed("s")) {
      player2.moveDown();
    }
    if (kontra.keys.pressed("a")) {
      player2.moveRight();
    }
    if (kontra.keys.pressed("d")) {
      player2.moveLeft();
    }

    player1.update();
    player2.update();
  },

  render: () => {
    player1.render();
    player2.render();
  }
});

loop.start();
