import Entity from '../Entity';

export class Snake extends Entity {
  constructor(
    x: number = 300,
    y: number = 300,
    xSpeed: number,
    ySpeed: number
  ) {
    super(x, y, xSpeed, ySpeed);
  }

  move() {
    this.x += this._xSpeed;
    this.y += this._ySpeed;
  }
}

export default Snake;
