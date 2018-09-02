import Player from "./Player";
import Board from "./Board";

const boardId = "game";
const board = new Board({ width: 800, height: 400 });

board.init(boardId);
kontra.init(boardId); // kontra imported as a global object

const player1 = new Player({
  startingPosition: {
    x: 40,
    y: 40
  },
  color: "blue",
  speed: 2,
  keys: {
    up: "w",
    down: "s",
    left: "a",
    right: "d"
  },
  boardSize: board.getSize()
});

const player2 = new Player({
  startingPosition: {
    x: 760,
    y: 40
  },
  color: "red",
  speed: 2,
  keys: {
    up: "up",
    down: "down",
    left: "left",
    right: "right"
  },
  boardSize: board.getSize()
});

const player3 = new Player({
  startingPosition: {
    x: 100,
    y: 100
  },
  color: "yellow",
  speed: 2,
  keys: {
    up: "y",
    down: "h",
    left: "g",
    right: "j"
  },
  boardSize: board.getSize()
});

const loop = kontra.gameLoop({
  update: () => {
    player1.handleControl([player2.getPosition(), player3.getPosition()]);
    player2.handleControl([player1.getPosition(), player3.getPosition()]);
    player3.handleControl([player1.getPosition(), player2.getPosition()]);

    player1.update();
    player2.update();
    player3.update();
  },

  render: () => {
    player1.render();
    player2.render();
    player3.render();
  }
});

loop.start();
