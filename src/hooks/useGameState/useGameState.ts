import { useState, useCallback } from 'react';
import useSnake from '../useSnake/useSnake';
import useApple from '../useApple/useApple';
import useEventListener from '../useEventListener/useEventListener';

type GameState = 'not running' | 'starting' | 'running' | 'out of bounds';

const boardWidth: number = 600;
const boardHeight: number = 600;

export default () => {
  const [gameState, setGameState] = useState<GameState>('not running');
  const [numberOfApplesEaten, setNumberOfApplesEaten] = useState<number>(0);

  const snake = useSnake();
  const apple = useApple();

  const startOrPauseGame = () => {
    if (gameState === 'running') {
      setGameState('not running');
    } else {
      setGameState('starting');
      setTimeout(() => {
        setGameState('running');
      }, 2000);
    }
  };

  const updateGameState = () => {
    checkBoundaries();

    snake.move();

    if (checkCollision()) {
      setNumberOfApplesEaten(numberOfApplesEaten + 1);

      snake.increaseSpeed();

      apple.placeNewApple();
    }
  };

  const checkBoundaries = () => {
    if (snake.x + 10 > boardWidth || snake.x - 10 < 0) {
      setGameState('out of bounds');
    }

    if (snake.y + 10 > boardHeight || snake.y - 10 < 0) {
      setGameState('out of bounds');
    }
  };

  const checkCollision = () => {
    var dx = snake.x - apple.x;
    var dy = snake.y - apple.y;

    var distance = Math.sqrt(dx * dx + dy * dy);

    //check if distance is smaller than sum of radii of the two circles
    if (distance < 10 + 10) {
      return true;
    }

    return false;
  };

  useEventListener(
    'keydown',
    useCallback(
      ({ code }) => {
        switch (code) {
          case 'ArrowUp':
            snake.turnUp();
            break;
          case 'ArrowDown':
            snake.turnDown();
            break;
          case 'ArrowLeft':
            snake.turnLeft();
            break;
          case 'ArrowRight':
            snake.turnRight();
            break;
          case 'Space':
            startOrPauseGame();
        }
      },
      [snake]
    )
  );

  return {
    boardWidth,
    boardHeight,
    snake,
    apple,
    numberOfApplesEaten,
    startOrPauseGame,
    gameState,
    updateGameState,
  };
};
