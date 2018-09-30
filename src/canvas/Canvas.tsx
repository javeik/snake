///<reference path='../interfaces/interfaces.d.ts' />

import './Canvas.css';

import * as React from 'react';

import DebugPanel from '../DebugPanel/DebugPanel';
import GameBoard from '../Entity/GameBoard/GameBoard';
import Snake from '../Entity/Snake/Snake';
import Header from '../Header/Header';

export class Canvas extends React.Component<{}, ICanvasState> {
  private drawingCanvas: HTMLCanvasElement | null;
  private drawingCtx: CanvasRenderingContext2D | null;
  private baseSpeed: number;
  private gameBoard: GameBoard;
  private snake: Snake;

  constructor() {
    super();

    this.baseSpeed = 1;

    this.gameBoard = new GameBoard();
    this.snake = new Snake();

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
          />
        </div>
        <div>
          <DebugPanel
            x={this.snake.x}
            y={this.snake.y}
            rectLength={this.gameBoard.boardHeight}
            rectWidth={this.gameBoard.boardWidth}
            speedX={this.snake.getSpeed().xSpeed}
            speedY={this.snake.getSpeed().ySpeed}
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
    }
    requestAnimationFrame(() => this.mainGame());
  }

  private mainGame() {
    this.clearScreen();
    this.updateSnakeCoords();
    this.drawSnake();
    this.drawTarget();

    requestAnimationFrame(() => this.mainGame());
  }

  private handleClicking(event: React.MouseEvent<HTMLCanvasElement>) {
    this.gameBoard.setTarget(
      event.clientX - this.drawingCanvas!.getBoundingClientRect().left,
      event.clientY - this.drawingCanvas!.getBoundingClientRect().top
    );

    this.calculateTrajectory();
  }

  private drawSnake() {
    this.drawingCtx!.fillStyle = 'rgb(20,0,200)';
    this.drawingCtx!.fillRect(this.snake.x, this.snake.y, 5, 5);
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
      5,
      5
    );
  }

  private updateSnakeCoords() {
    this.gameBoard.checkSnakeBoundaries(this.snake);
    this.gameBoard.checkIfArrivedAtTarget(this.snake);

    if (this.gameBoard.targetX !== 0 || this.gameBoard.targetY !== 0) {
      this.calculateTrajectory();
    }

    this.snake.move();
  }

  private calculateTrajectory() {
    let dX, dY;
    let distance;

    dX = this.gameBoard.targetX - this.snake.x;
    dY = this.gameBoard.targetY - this.snake.y;

    distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

    this.drawTrajectory();
    this.setState({ distanceToTarget: distance });
    this.snake.setSpeed(
      dX < 0 ? this.baseSpeed * -1 : this.baseSpeed,
      dY < 0 ? this.baseSpeed * -1 : this.baseSpeed
    );
  }

  private drawTrajectory() {
    this.drawingCtx!.beginPath();
    this.drawingCtx!.moveTo(this.snake.x, this.snake.y);
    this.drawingCtx!.lineTo(this.gameBoard.targetX, this.gameBoard.targetY);
    this.drawingCtx!.stroke();

    this.drawingCtx!.beginPath();
    this.drawingCtx!.moveTo(this.snake.x, this.snake.y);
    this.drawingCtx!.lineTo(this.snake.x, this.gameBoard.targetY);
    this.drawingCtx!.lineTo(this.gameBoard.targetX, this.gameBoard.targetY);
    this.drawingCtx!.stroke();
  }
}
