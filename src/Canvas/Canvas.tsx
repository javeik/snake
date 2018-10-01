///<reference path='../interfaces/interfaces.d.ts' />

import './Canvas.css';

import * as React from 'react';

import DebugPanel from '../DebugPanel/DebugPanel';
import GameBoard from '../Entity/GameBoard/GameBoard';

import Header from '../Header/Header';

export class Canvas extends React.Component<{}, ICanvasState> {
  private drawingCanvas: HTMLCanvasElement | null;
  private drawingCtx: CanvasRenderingContext2D | null;
  private gameBoard: GameBoard;

  constructor() {
    super();

    this.gameBoard = new GameBoard();

    this.state = { distanceToTarget: 0 };
  }

  public render() {
    return (
      <div>
        <Header />
        <div>
          <canvas
            ref={canvas => {
              this.drawingCanvas = canvas;
            }}
            className="drawingCanvas-canvas"
            width={this.gameBoard.boardWidth}
            height={this.gameBoard.boardHeight}
            onClick={event => this.handleClicking(event)}
            onKeyDown={e => this.handleKeyPress(e)}
            tabIndex={-1}
          />
        </div>
        <div>
          <DebugPanel
            x={this.gameBoard.snake.x}
            y={this.gameBoard.snake.y}
            rectLength={this.gameBoard.boardHeight}
            rectWidth={this.gameBoard.boardWidth}
            speedX={this.gameBoard.snake.getSpeed().xSpeed}
            speedY={this.gameBoard.snake.getSpeed().ySpeed}
            clickX={this.gameBoard.targetX}
            clickY={this.gameBoard.targetY}
            distanceToClick={this.state.distanceToTarget}
          />
        </div>
      </div>
    );
  }

  public componentDidMount() {
    if (this.drawingCanvas !== null) {
      this.drawingCtx = this.drawingCanvas.getContext('2d');

      this.drawingCanvas.focus();
    }

    requestAnimationFrame(() => this.mainGame());
  }

  public handleKeyPress(event: React.KeyboardEvent<HTMLCanvasElement>) {
    switch (event.key) {
      case 'ArrowUp':
        this.gameBoard.setSnakeToUp();
        break;
      case 'ArrowDown':
        this.gameBoard.setSnakeToDown();
        break;
      case 'ArrowLeft':
        this.gameBoard.setSnakeToLeft();
        break;
      case 'ArrowRight':
        this.gameBoard.setSnakeToRight();
        break;

      default:
        break;
    }
  }

  private mainGame() {
    this.clearScreen();
    this.gameBoard.updateSnakeCoords();
    this.drawTrajectory();
    this.drawSnake();
    this.drawTarget();

    requestAnimationFrame(() => this.mainGame());
  }

  private handleClicking(event: React.MouseEvent<HTMLCanvasElement>) {
    this.gameBoard.setTarget(
      event.clientX - this.drawingCanvas!.getBoundingClientRect().left,
      event.clientY - this.drawingCanvas!.getBoundingClientRect().top
    );
  }

  private drawSnake() {
    this.drawingCtx!.fillStyle = 'rgb(20,0,200)';
    this.drawingCtx!.fillRect(
      this.gameBoard.snake.x,
      this.gameBoard.snake.y,
      15,
      15
    );
  }

  private clearScreen() {
    this.drawingCtx!.clearRect(
      0,
      0,
      this.gameBoard.boardHeight,
      this.gameBoard.boardWidth
    );
  }

  private drawTarget() {
    this.drawingCtx!.fillStyle = 'rgb(20,0,200)';
    this.drawingCtx!.fillRect(
      this.gameBoard.targetX,
      this.gameBoard.targetY,
      15,
      15
    );
  }

  private drawTrajectory() {
    this.drawingCtx!.beginPath();
    this.drawingCtx!.moveTo(this.gameBoard.snake.x, this.gameBoard.snake.y);
    this.drawingCtx!.lineTo(this.gameBoard.targetX, this.gameBoard.targetY);
    this.drawingCtx!.stroke();

    this.drawingCtx!.beginPath();
    this.drawingCtx!.moveTo(this.gameBoard.snake.x, this.gameBoard.snake.y);
    this.drawingCtx!.lineTo(this.gameBoard.snake.x, this.gameBoard.targetY);
    this.drawingCtx!.lineTo(this.gameBoard.targetX, this.gameBoard.targetY);
    this.drawingCtx!.stroke();
  }
}

export default Canvas;
