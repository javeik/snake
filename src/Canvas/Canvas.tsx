import './Canvas.css';

import React, { useCallback, useEffect, useRef } from 'react';

import GameBoard from '../Entity/GameBoard/GameBoard';
import useEventListener from './useEventListener';

const Canvas: React.FC = () => {
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);

  let gameBoard: GameBoard = new GameBoard();

  useEffect(() => {
    requestAnimationFrame(() => mainGame());
  });

  const getCanvasContext = () => {
    if (!drawingCanvasRef.current) {
      return null;
    }

    const canvas: HTMLCanvasElement = drawingCanvasRef.current;

    canvas.focus();

    return canvas.getContext('2d');
  };

  const handler = useCallback(
    ({ key }) => {
      switch (key) {
        case 'ArrowUp':
          gameBoard.snake.turnUp();
          break;
        case 'ArrowDown':
          gameBoard.snake.turnDown();
          break;
        case 'ArrowLeft':
          gameBoard.snake.turnLeft();
          break;
        case 'ArrowRight':
          gameBoard.snake.turnRight();
          break;

        default:
          break;
      }
    },
    [gameBoard.snake]
  );

  useEventListener('keydown', handler);

  const mainGame = () => {
    clearScreen();
    gameBoard.updateSnakeCoords();
    drawTrajectory();
    drawSnake();
    drawApple();
    drawTarget();

    requestAnimationFrame(() => mainGame());
  };

  const handleClicking = (event: React.MouseEvent<HTMLCanvasElement>) => {
    gameBoard.setTarget(
      event.clientX - drawingCanvasRef.current.getBoundingClientRect().left,
      event.clientY - drawingCanvasRef.current.getBoundingClientRect().top
    );
  };

  const drawSnake = () => {
    const context = getCanvasContext();

    if (context) {
      context.fillStyle = 'rgb(20,0,200)';
      context.fillRect(gameBoard.snake.x, gameBoard.snake.y, 10, 10);
    }
  };

  const drawApple = () => {
    const context = getCanvasContext();

    if (context) {
      if (gameBoard.apples.length !== 0) {
        context.fillStyle = 'rgb(20,0,200)';
        context.fillRect(gameBoard.apples[0].x, gameBoard.apples[0].y, 10, 10);
      }
    }
  };

  const clearScreen = () => {
    const context = getCanvasContext();

    if (context) {
      context.clearRect(0, 0, gameBoard.boardHeight, gameBoard.boardWidth);
    }
  };

  const drawTarget = () => {
    const context = getCanvasContext();

    if (context) {
      context.fillStyle = 'rgb(20,0,200)';
      context.fillRect(gameBoard.targetX, gameBoard.targetY, 15, 15);
    }
  };

  const drawTrajectory = () => {
    const context = getCanvasContext();

    if (context) {
      context.beginPath();
      context.moveTo(gameBoard.snake.x, gameBoard.snake.y);
      context.lineTo(gameBoard.targetX, gameBoard.targetY);
      context.stroke();

      context.beginPath();
      context.moveTo(gameBoard.snake.x, gameBoard.snake.y);
      context.lineTo(gameBoard.snake.x, gameBoard.targetY);
      context.lineTo(gameBoard.targetX, gameBoard.targetY);
      context.stroke();
    }
  };

  return (
    <canvas
      ref={drawingCanvasRef}
      className="drawingCanvas-canvas"
      width={gameBoard.boardWidth}
      height={gameBoard.boardHeight}
      onClick={event => handleClicking(event)}
    />
  );
};

export default Canvas;
