import React from 'react';

import Canvas from './Canvas/Canvas';
import Header from './Header/Header';

const App: React.FC = () => {
  return (
    <div>
      <Header />

      <Canvas />
    </div>
  );
};

export default App;
