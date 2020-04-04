import { useState } from 'react';
import { random } from 'lodash';

export default () => {
  const [x, setX] = useState(random(0, 600));
  const [y, setY] = useState(random(0, 600));

  return {
    x,
    y,
    setX,
    setY,
  };
};
