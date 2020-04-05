import React from 'react';

import './StartGame.css';

const StartGame: React.FC<{
  headerClassName?: 'start-header-spinning' | 'start-header-scale' | undefined;
}> = ({ headerClassName = 'start-header-spinning' }) => {
  return (
    <div className="start-container">
      <h2 className={headerClassName}>
        Start a New Game By Pressing Space Bar!
      </h2>
    </div>
  );
};

export default StartGame;
