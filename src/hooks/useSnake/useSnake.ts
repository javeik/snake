import { useState } from 'react';

type CoordsType = { x: number; y: number };

const baseSpeed = 1.5;

const defaultX = 300;
const defaultY = 300;

export default () => {
  const [speed, setSpeed] = useState(baseSpeed);
  const [xSpeed, setXSpeed] = useState(0);
  const [ySpeed, setYSpeed] = useState(baseSpeed);

  const [length, setLength] = useState(1);

  const [bodyCoords, setBodyCoords] = useState<CoordsType[]>([
    {
      x: defaultX,
      y: defaultY,
    },
  ]);

  const [x, setX] = useState(defaultX);
  const [y, setY] = useState(defaultY);

  const eatApple = () => {
    setSpeed(speed + 0.5);
    setLength(length + 1);

    if (xSpeed) {
      setXSpeed((xSpeed / Math.abs(xSpeed)) * speed);
    }

    if (ySpeed) {
      setYSpeed((ySpeed / Math.abs(ySpeed)) * speed);
    }
  };

  const move = () => {
    setBodyCoords([
      {
        x: x + xSpeed,
        y: y + ySpeed,
      },
      ...bodyCoords.slice(0, length - 1),
    ]);

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
    eatApple,
    length,
    x,
    y,
    xSpeed,
    ySpeed,
    move,
    turnLeft,
    turnRight,
    turnUp,
    turnDown,
    bodyCoords,
  };
};
