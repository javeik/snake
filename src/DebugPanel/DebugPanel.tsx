import React from 'react';

const DebugPanel: React.FC<{
  x: number;
  y: number;
}> = ({ x, y }) => {
  return (
    <div>
      <span>
        x: {x}, y: {y}
      </span>
    </div>
  );
};

export default DebugPanel;
