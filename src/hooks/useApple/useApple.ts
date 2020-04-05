import { useState } from 'react';
import { random } from 'lodash';

export default () => {
  const [x, setX] = useState(random(10, 590));
  const [y, setY] = useState(random(10, 590));

  const placeNewApple = () => {
    setX(random(0, 600));
    setY(random(0, 600));
  };

  return {
    x,
    y,
    placeNewApple,
  };
};
