///<reference path='../interfaces/interfaces.d.ts' />

import './Canvas.css';

import * as React from 'react';

import { DebugPanel } from '../DebugPanel/DebugPanel';
import { Snake } from '../Entity/Snake/Snake';
import { Header } from '../Header/Header';

export class Canvas extends React.Component<{}, ICanvasState> {
  private drawingCanvas: HTMLCanvasElement | null;
  private drawingCtx: CanvasRenderingContext2D | null;
  private canvasWidth: number;
  private canvasHeight: number;
  private baseSpeed: number;
  private snake: Snake;

  constructor() {
    super();
    this.baseSpeed = 1;
    this.canvasWidth = this.canvasHeight = 700;
    this.snake = new Snake(350, 370, 1, 1);

    this.state = { targetX: 0, targetY: 0, distanceToTarget: 0 };
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
            width={this.canvasWidth}
            height={this.canvasHeight}
            onClick={event => this.handleClicking(event)}
          />
        </div>
        <div>
          <DebugPanel
            x={this.snake.x}
            y={this.snake.y}
            rectLength={this.canvasHeight}
            rectWidth={this.canvasWidth}
            speedX={this.snake.getSpeed().xSpeed}
            speedY={this.snake.getSpeed().ySpeed}
            clickX={this.state.targetX}
            clickY={this.state.targetY}
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
    this.setState({
      targetX: event.clientX - this.drawingCanvas!.getBoundingClientRect().left,
      targetY: event.clientY - this.drawingCanvas!.getBoundingClientRect().top
    });
    this.calculateTrajectory();
  }

  private drawSnake() {
    this.drawingCtx!.fillStyle = 'rgb(20,0,200)';
    this.drawingCtx!.fillRect(this.snake.x, this.snake.y, 5, 5);
  }

  private clearScreen() {
    this.drawingCtx!.clearRect(0, 0, this.canvasHeight, this.canvasWidth);
  }

  private drawTarget() {
    this.drawingCtx!.fillStyle = 'rgb(20,0,200)';
    this.drawingCtx!.fillRect(this.state.targetX, this.state.targetY, 5, 5);
  }

  private updateSnakeCoords() {
    this.checkSnakeBoundaries();
    this.checkIfArrivedAtTarget();

    if (this.state.targetX !== 0 || this.state.targetY !== 0) {
      this.calculateTrajectory();
    }

    this.snake.move();
  }

  private calculateTrajectory() {
    let dX, dY;
    let distance;

    dX = this.state.targetX - this.snake.x;
    dY = this.state.targetY - this.snake.y;
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
    this.drawingCtx!.lineTo(this.state.targetX, this.state.targetY);
    this.drawingCtx!.stroke();

    this.drawingCtx!.beginPath();
    this.drawingCtx!.moveTo(this.snake.x, this.snake.y);
    this.drawingCtx!.lineTo(this.snake.x, this.state.targetY);
    this.drawingCtx!.lineTo(this.state.targetX, this.state.targetY);
    this.drawingCtx!.stroke();
  }

  private checkIfArrivedAtTarget() {
    if (
      this.snake.x === this.state.targetX &&
      this.snake.y === this.state.targetY
    ) {
      this.snake.setSpeed(0, 0);
    }
  }

  private checkSnakeBoundaries() {
    let xSpeed: number;
    let ySpeed: number;

    xSpeed = this.snake.getSpeed().xSpeed;
    ySpeed = this.snake.getSpeed().ySpeed;

    if (this.snake.x >= this.canvasWidth || this.snake.x <= 0) {
      xSpeed = this.snake.getSpeed().xSpeed * -1;
    }

    if (this.snake.y >= this.canvasHeight || this.snake.y <= 0) {
      ySpeed = this.snake.getSpeed().ySpeed * -1;
    }

    this.snake.setSpeed(xSpeed, ySpeed);
  }
}
