import Snake from '../Snake/Snake';

export class GameBoard {
  protected _boardWidth: number;
  protected _boardHeight: number;
  protected _targetX: number;
  protected _targetY: number;
  protected snakeInGame: Snake;
  private baseSpeed: number;

  constructor(boardWidth: number = 600, boardHeight: number = 600) {
    this.snakeInGame = new Snake(300, 300, 1, 1);

    this._boardHeight = boardHeight;
    this._boardWidth = boardWidth;

    this.baseSpeed = 1;
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

  public setSnakeToLeft() {
    this.snakeInGame.setSpeed(-1, 0);
  }

  public setSnakeToRight() {
    this.snakeInGame.setSpeed(1, 0);
  }

  public setSnakeToUp() {
    this.snakeInGame.setSpeed(0, -1);
  }

  public setSnakeToDown() {
    this.snakeInGame.setSpeed(0, 1);
  }

  public setTarget(targetX: number, targetY: number) {
    this._targetX = targetX;
    this._targetY = targetY;
  }

  public updateSnakeCoords() {
    this.checkSnakeBoundaries();
    this.checkIfArrivedAtTarget();

    if (!!this._targetX || !!this._targetY) {
      this.calculateTrajectory();
    }

    this.snakeInGame.move();
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

  private calculateTrajectory() {
    let dX, dY;
    let distance;

    dX = this._targetX - this.snakeInGame.x;
    dY = this._targetY - this.snakeInGame.y;

    distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

    this.snakeInGame.setSpeed(
      dX < 0 ? this.baseSpeed * -1 : this.baseSpeed,
      dY < 0 ? this.baseSpeed * -1 : this.baseSpeed
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
}

export default GameBoard;
