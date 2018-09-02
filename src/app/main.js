import Player from "./Player";
import Board from "./Board";

const boardId = "game";
const board = new Board({ width: 800, height: 400, canvasId: "game" });

board.init(boardId);
kontra.init(boardId); // kontra imported as a global object

const player1 = new Player({
  startingX: 40,
  startingY: 40,
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
  startingX: 760,
  startingY: 40,
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
