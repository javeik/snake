import inRange from 'lodash/inRange';

import Apple from '../Apple/Apple';
import Snake from '../Snake/Snake';

export class GameBoard {
  protected _boardWidth: number;
  protected _boardHeight: number;

  protected _targetX: number = 0;
  protected _targetY: number = 0;

  public snakeInGame: Snake;
  private appleInGame: Array<Apple>;

  private baseSpeed: number;
  private speedIncreaseIncrement: number;

  constructor(boardWidth: number = 600, boardHeight: number = 600) {
    this.baseSpeed = 1;
    this.speedIncreaseIncrement = 1;

    this.snakeInGame = new Snake(300, 300, this.baseSpeed);

    this._boardHeight = boardHeight;
    this._boardWidth = boardWidth;

    this.appleInGame = [];
  }

  get boardWidth(): number {
    return this._boardWidth;
  }

  get boardHeight(): number {
    return this._boardHeight;
  }

  get targetX(): number {
    return this._targetX;
  }

  get targetY(): number {
    return this._targetY;
  }

  get snake(): Snake {
    return this.snakeInGame;
  }

  get apples(): Array<Apple> {
    return this.appleInGame;
  }

  public setTarget(targetX: number, targetY: number) {
    this._targetX = targetX;
    this._targetY = targetY;
  }

  public updateSnakeCoords() {
    this.checkSnakeBoundaries();
    this.addAppleIntoBoard();
    this.checkIfArrivedAtTarget();

    if (!!this._targetX || !!this._targetY) {
      this.calculateTrajectory();
    }

    this.snakeInGame.move();

    this.eatApple();
  }

  private checkSnakeBoundaries() {
    let xSpeed: number;
    let ySpeed: number;

    xSpeed = this.snakeInGame.getSpeed().xSpeed;
    ySpeed = this.snakeInGame.getSpeed().ySpeed;

    if (this.snakeInGame.x > this._boardWidth || this.snakeInGame.x < 0) {
      xSpeed = xSpeed * -1;
    }

    if (this.snakeInGame.y > this._boardHeight || this.snakeInGame.y < 0) {
      ySpeed = ySpeed * -1;
    }

    this.snakeInGame.setSpeed(xSpeed, ySpeed);
  }

  private eatApple() {
    if (
      (inRange(
        this.snakeInGame.x,
        this.appleInGame[0].x,
        this.appleInGame[0].x + 16
      ) ||
        inRange(
          this.snakeInGame.x,
          this.appleInGame[0].x,
          this.appleInGame[0].x - 16
        )) &&
      (inRange(
        this.snakeInGame.y,
        this.appleInGame[0].y,
        this.appleInGame[0].y + 16
      ) ||
        inRange(
          this.snakeInGame.y,
          this.appleInGame[0].y,
          this.appleInGame[0].y - 16
        ))
    ) {
      this.appleInGame = [];

      this.snakeInGame.increaseSpeed(this.speedIncreaseIncrement);
    }
  }

  private calculateTrajectory() {
    let dX, dY;
    let distance;

    dX = this._targetX - this.snakeInGame.x;
    dY = this._targetY - this.snakeInGame.y;

    distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

    this.snakeInGame.setSpeed(
      dX < 0 ? this.snakeInGame.baseSpeed * -1 : this.snakeInGame.baseSpeed,
      dY < 0 ? this.snakeInGame.baseSpeed * -1 : this.snakeInGame.baseSpeed
    );

    return { distanceToTarget: distance };
  }

  private checkIfArrivedAtTarget() {
    if (
      this.snakeInGame.x === this._targetX &&
      this.snakeInGame.y === this._targetY
    ) {
      this.snakeInGame.setSpeed(0, 0);
    }
  }

  private addAppleIntoBoard() {
    this.appleInGame.push(new Apple(this._boardWidth, this._boardHeight));
  }
}

export default GameBoard;
