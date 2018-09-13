import "../lib/kontra"; // initialize kontra as a global object

import Player from "./Player";
import Board from "./Board";
import Ball from "./Ball";
import Goal from "./Goal";

const BOARD_SIZE = {
  width: 800,
  height: 400
};
const BOARD_ID = "game";
const PLAYERS_RADIUS = 20;
const BALL_RADIUS = 10;
const POINTS_TO_WIN = 3;
const GOAL_HEIGHT = 150;
const GOAL_WIDTH = 3;

const board = new Board(BOARD_SIZE);
board.init(BOARD_ID);
const player1points = document.getElementById("player1-points");
const player2points = document.getElementById("player2-points");
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

const goals = [
  new Goal({
    position: { x: 0, y: BOARD_SIZE.height / 2 - GOAL_HEIGHT / 2 },
    width: GOAL_WIDTH,
    height: GOAL_HEIGHT,
    color: "blue"
  }),
  new Goal({
    position: {
      x: BOARD_SIZE.width - GOAL_WIDTH,
      y: BOARD_SIZE.height / 2 - GOAL_HEIGHT / 2
    },
    width: GOAL_WIDTH,
    height: GOAL_HEIGHT,
    color: "red"
  })
];

const sprites = [...goals, player1, player2, ball];

const loop = kontra.gameLoop({
  update: () => {
    player1.handleControl([player2.getPosition()], BOARD_SIZE);
    player2.handleControl([player1.getPosition()], BOARD_SIZE);

    ball.handlePlayersCollision([player1, player2]);
    ball.handleBoardCollision(BOARD_SIZE);
    ball.handleMotion();

    const ballPosition = ball.getPosition();

    if (player1scores(ballPosition)) {
      player1.points += 1;
      restartPositions([player1, player2, ball]);
      showPoints();
      ball.stop();
      if (player1.points >= POINTS_TO_WIN) {
        clearPoints();
      }
    }

    if (player2scores(ballPosition)) {
      player2.points += 1;
      restartPositions([player1, player2, ball]);
      showPoints();
      ball.stop();
      if (player2.points >= POINTS_TO_WIN) {
        clearPoints();
      }
    }

    sprites.forEach(sprite => sprite.update());
  },

  render: () => {
    sprites.forEach(sprite => sprite.render());
  }
});

loop.start();

function showPoints() {
  player1points.textContent = player1.points;
  player2points.textContent = player2.points;
}

function clearPoints() {
  player1.points = 0;
  player2.points = 0;
  player1points.textContent = player1.points;
  player2points.textContent = player2.points;
}

function restartPositions(sprites) {
  sprites.forEach(sprite => sprite.setPosition(sprite.startingPosition));
}

function player1scores(ballPosition) {
  return (
    ballPosition.x >= BOARD_SIZE.width - BALL_RADIUS &&
    (ballPosition.y <= BOARD_SIZE.height / 2 + GOAL_HEIGHT / 2 &&
      ballPosition.y >= BOARD_SIZE.height / 2 - GOAL_HEIGHT / 2)
  );
}

function player2scores(ballPosition) {
  return (
    ballPosition.x <= BALL_RADIUS &&
    (ballPosition.y <= BOARD_SIZE.height / 2 + GOAL_HEIGHT / 2 &&
      ballPosition.y >= BOARD_SIZE.height / 2 - GOAL_HEIGHT / 2)
  );
}
