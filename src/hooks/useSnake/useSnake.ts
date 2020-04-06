import { useState } from 'react';

const baseSpeed = 1.5;

const defaultX = 300;
const defaultY = 300;

export default () => {
  const [speed, setSpeed] = useState(baseSpeed);
  const [xSpeed, setXSpeed] = useState(0);
  const [ySpeed, setYSpeed] = useState(baseSpeed);

  const [x, setX] = useState(defaultX);
  const [y, setY] = useState(defaultY);

  const increaseSpeed = () => {
    setSpeed(speed + 0.5);

    if (xSpeed) {
      setXSpeed((xSpeed / Math.abs(xSpeed)) * speed);
    }

    if (ySpeed) {
      setYSpeed((ySpeed / Math.abs(ySpeed)) * speed);
    }
  };

  const move = () => {
    setX(x + xSpeed);
    setY(y + ySpeed);
  };

  const turnLeft = () => {
    setXSpeed(-1 * speed);
    setYSpeed(0);
  };

  const turnRight = () => {
    setXSpeed(1 * speed);
    setYSpeed(0);
  };

  const turnUp = () => {
    setXSpeed(0);
    setYSpeed(-1 * speed);
  };

  const turnDown = () => {
    setXSpeed(0);
    setYSpeed(1 * speed);
  };

  return {
    speed,
    increaseSpeed,
    x,
    y,
    xSpeed,
    ySpeed,
    move,
    turnLeft,
    turnRight,
    turnUp,
    turnDown,
  };
};
