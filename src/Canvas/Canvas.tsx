import './Canvas.css';

import React, { useRef, useLayoutEffect } from 'react';

import StartGame from '../StartGame/StartGame';
import useGameState from '../hooks/useGameState/useGameState';
import GameOver from '../GameOver/GameOver';

const Canvas: React.FC = () => {
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = React.useRef<number>();

  const {
    boardWidth,
    boardHeight,
    snake,
    apple,
    numberOfApplesEaten,
    updateGameState,
    gameState,
  } = useGameState();

  const getCanvasContext = () => {
    if (!drawingCanvasRef.current) {
      return null;
    }

    const canvas: HTMLCanvasElement = drawingCanvasRef.current;

    return canvas.getContext('2d');
  };

  const mainGame = () => {
    clearScreen();

    updateGameState();

    drawSnake();
    drawApple();

    requestRef.current = requestAnimationFrame(mainGame);
  };

  const drawSnake = () => {
    const context = getCanvasContext();

    if (context) {
      context.fillStyle = 'rgb(20,0,200)';

      snake.bodyCoords.forEach(({ x, y }) => {
        context.beginPath();
        context.arc(x, y, 10, 0, 2 * Math.PI);
        context.fill();
      });
    }
  };

  const drawApple = () => {
    const context = getCanvasContext();

    if (context) {
      context.fillStyle = 'rgb(255,0,0)';

      context.beginPath();
      context.arc(apple.x, apple.y, 10, 0, 2 * Math.PI);
      context.fill();
    }
  };

  const clearScreen = () => {
    const context = getCanvasContext();

    if (context) {
      context.clearRect(0, 0, boardHeight, boardWidth);
    }
  };

  useLayoutEffect(() => {
    if (gameState === 'running') {
      requestRef.current = requestAnimationFrame(mainGame);
    }

    return () => cancelAnimationFrame(requestRef.current);
  });

  return (
    <div className="canvas-container">
      {gameState === 'not running' && (
        <StartGame headerClassName={'start-header-spinning'} />
      )}

      {gameState === 'starting' && (
        <StartGame headerClassName={'start-header-scale'} />
      )}

      {gameState === 'running' && (
        <canvas
          className="canvas-area"
          ref={drawingCanvasRef}
          width={boardWidth}
          height={boardHeight}
        />
      )}

      {gameState === 'out of bounds' && <GameOver />}

      <ul style={{ position: 'absolute', bottom: '0' }}>
        <li>Animation Id:{requestRef.current}</li>
        <li>{`Snake position: x: ${snake.x}, y: ${snake.y}`}</li>
        <li>{`Snake speed: x: ${snake.xSpeed}, y: ${snake.ySpeed}`}</li>
        <li>{`Snake speed: ${snake.speed}`}</li>
        <li>{`Snake body: ${JSON.stringify(snake.bodyCoords)}`}</li>
        <li>{`Apple position: x: ${apple.x}, y: ${apple.y}`}</li>
        <li>{`Number of Apples eaten: ${numberOfApplesEaten}`}</li>
      </ul>
    </div>
  );
};

export default Canvas;
