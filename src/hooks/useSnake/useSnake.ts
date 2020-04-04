import { useState } from 'react';

export default () => {
  const [speed, setSpeed] = useState(1);
  const [xSpeed, setXSpeed] = useState(0);
  const [ySpeed, setYSpeed] = useState(1);

  const [x, setX] = useState(300);
  const [y, setY] = useState(300);

  const move = () => {
    setX((prevX) => prevX + xSpeed);
    setY((prevY) => prevY + ySpeed);
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
    x,
    y,
    setX,
    setY,
    xSpeed,
    ySpeed,
    setXSpeed,
    setYSpeed,
    move,
    turnLeft,
    turnRight,
    turnUp,
    turnDown,
  };
};
