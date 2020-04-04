import './Canvas.css';

import React, { useCallback, useRef, useState, useLayoutEffect } from 'react';

import useEventListener from '../hooks/useEventListener/useEventListener';
import useSnake from '../hooks/useSnake/useSnake';
import useApple from '../hooks/useApple/useApple';

const boardWidth: number = 600;
const boardHeight: number = 600;

const Canvas: React.FC = () => {
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = React.useRef<number>();

  const snake = useSnake();
  const apple = useApple();

  const getCanvasContext = () => {
    if (!drawingCanvasRef.current) {
      return null;
    }

    const canvas: HTMLCanvasElement = drawingCanvasRef.current;

    return canvas.getContext('2d');
  };

  const handler = useCallback(({ code }) => {
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
        setGameIsRunning(!gameIsRunning);
    }
  }, []);

  useEventListener('keydown', handler);

  const mainGame = () => {
    clearScreen();

    snake.move();

    drawSnake();
    drawApple();

    requestRef.current = requestAnimationFrame(mainGame);
  };

  const drawSnake = () => {
    const context = getCanvasContext();

    if (context) {
      context.fillStyle = 'rgb(20,0,200)';

      context.fillRect(snake.x, snake.y, 10, 10);
    }
  };

  const drawApple = () => {
    const context = getCanvasContext();

    if (context) {
      context.fillStyle = 'rgb(0,0,0)';
      context.fillRect(apple.x, apple.y, 10, 10);
    }
  };

  const clearScreen = () => {
    const context = getCanvasContext();

    if (context) {
      context.clearRect(0, 0, boardHeight, boardWidth);
    }
  };

  useLayoutEffect(() => {
    if (gameIsRunning) {
      requestRef.current = requestAnimationFrame(mainGame);
    }

    return () => cancelAnimationFrame(requestRef.current);
  });

  return (
    <>
      <canvas
        ref={drawingCanvasRef}
        className="drawingCanvas-canvas"
        width={boardWidth}
        height={boardHeight}
      />

      <ul>
        <li>Animation Id:{requestRef.current}</li>
        <li>{`Snake position: x: ${snake.x}, y: ${snake.y}`}</li>
        <li>{`Snake speed: x: ${snake.xSpeed}, y: ${snake.ySpeed}`}</li>
      </ul>
    </>
  );
};

export default Canvas;
