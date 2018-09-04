import "../lib/kontra"; // initialize kontra as a global object </3

import Player from "./Player";
import Board from "./Board";
import Ball from "./Ball";

const BOARD_SIZE = {
  width: 800,
  height: 400
};
const BOARD_ID = "game";
const PLAYERS_RADIUS = 20;
const BALL_RADIUS = 10;

const board = new Board(BOARD_SIZE);
board.init(BOARD_ID);
kontra.init(BOARD_ID);

const player1 = new Player({
  startingPosition: {
    x: 100,
    y: BOARD_SIZE.height / 2 - BALL_RADIUS
  },
  color: "blue",
  speed: 2,
  keys: {
    up: "w",
    down: "s",
    left: "a",
    right: "d"
  },
  radius: PLAYERS_RADIUS
});

const player2 = new Player({
  startingPosition: {
    x: BOARD_SIZE.width - 100,
    y: BOARD_SIZE.height / 2 - BALL_RADIUS
  },
  color: "red",
  speed: 2,
  keys: {
    up: "up",
    down: "down",
    left: "left",
    right: "right"
  },
  radius: PLAYERS_RADIUS
});

const ball = new Ball({
  startingPosition: {
    x: BOARD_SIZE.width / 2 - BALL_RADIUS,
    y: BOARD_SIZE.height / 2 - BALL_RADIUS
  },
  radius: BALL_RADIUS
});

const loop = kontra.gameLoop({
  update: () => {
    player1.handleControl([player2.getPosition()], BOARD_SIZE);
    player2.handleControl([player1.getPosition()], BOARD_SIZE);
    ball.handlePhysics([player1, player2]);
    ball.handleMotion();

    player1.update();
    player2.update();
    ball.update();
  },

  render: () => {
    player1.render();
    player2.render();
    ball.render();
  }
});

loop.start();
