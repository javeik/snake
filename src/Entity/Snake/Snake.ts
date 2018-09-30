import Entity from '../Entity';

export default class Snake extends Entity {
  constructor(
    x: number = 350,
    y: number = 370,
    xSpeed: number = 1,
    ySpeed: number = 1
  ) {
    super(x, y, xSpeed, ySpeed);
  }

  move() {
    this.x += this._xSpeed;
    this.y += this._ySpeed;
  }
}
