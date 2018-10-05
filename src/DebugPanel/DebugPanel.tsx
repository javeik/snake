export interface CanvasState {
  gameBoard: GameBoard;
  distanceToTarget: number;
}

interface DebugPanelProps {
  x: number;
  y: number;
  rectWidth: number;
  rectLength: number;
  speedX: number;
  speedY: number;
  clickX: number;
  clickY: number;
  distanceToClick: number;
}

import * as React from 'react';
import GameBoard from '../Entity/GameBoard/GameBoard';

export default class DebugPanel extends React.Component<DebugPanelProps, {}> {
  constructor(props: DebugPanelProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <div>
          <span>
            x: {this.props.x}, y: {this.props.y}
          </span>
        </div>
        <span>
          Speed X: {this.props.speedX}, Speed Y: {this.props.speedY}
        </span>
        <div>
          canvas width: {this.props.rectWidth}, length: {this.props.rectLength}
        </div>
        <div>
          <span>
            click x: {this.props.clickX}, click y: {this.props.clickY},
            distanceToClick: {this.props.distanceToClick}
          </span>
        </div>
      </div>
    );
  }
}
