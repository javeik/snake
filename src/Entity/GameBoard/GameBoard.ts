import Snake from '../Snake/Snake';

export default class GameBoard {
  protected _boardWidth: number;
  protected _boardHeight: number;
  protected _targetX: number;
  protected _targetY: number;

  constructor(boardWidth: number = 700, boardHeight: number = 700) {
    this._boardHeight = boardHeight;
    this._boardWidth = boardWidth;
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

  public setTarget(targetX: number, targetY: number) {
    this._targetX = targetX;
    this._targetY = targetY;
  }

  public checkSnakeBoundaries(snake: Snake) {
    let xSpeed: number;
    let ySpeed: number;

    xSpeed = snake.getSpeed().xSpeed;
    ySpeed = snake.getSpeed().ySpeed;

    if (snake.x >= this._boardWidth || snake.x <= 0) {
      xSpeed = snake.getSpeed().xSpeed * -1;
    }

    if (snake.y >= this.boardHeight || snake.y <= 0) {
      ySpeed = snake.getSpeed().ySpeed * -1;
    }

    snake.setSpeed(xSpeed, ySpeed);
  }

  public checkIfArrivedAtTarget(snake: Snake) {
    if (snake.x === this._targetX && snake.y === this._targetY) {
      snake.setSpeed(0, 0);
    }
  }
}
