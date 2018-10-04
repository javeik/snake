import Entity from '../Entity';

export class Snake extends Entity {
  constructor(x: number = 300, y: number = 300, baseSpeed: number) {
    super(x, y, baseSpeed);
  }

  public move() {
    this.x += this._xSpeed;
    this.y += this._ySpeed;
  }

  public increaseSpeed(speedIncrement: number) {
    this._baseSpeed += speedIncrement;
  }

  public turnLeft() {
    this.setSpeed(-1 * this._baseSpeed, 0);
  }

  public turnRight() {
    this.setSpeed(1 * this._baseSpeed, 0);
  }

  public turnUp() {
    this.setSpeed(0, -1 * this._baseSpeed);
  }

  public turnDown() {
    this.setSpeed(0, 1 * this._baseSpeed);
  }
}

export default Snake;
