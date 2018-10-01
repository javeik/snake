export default abstract class Entity {
  protected _x: number;
  protected _y: number;
  protected _xSpeed: number;
  protected _ySpeed: number;

  constructor(x: number, y: number, xSpeed: number, ySpeed: number) {
    this._x = x;
    this._y = y;
    this._xSpeed = xSpeed;
    this._ySpeed = ySpeed;
  }

  get x(): number {
    return this._x;
  }

  set x(x: number) {
    this._x = x;
  }

  get y(): number {
    return this._y;
  }

  set y(y: number) {
    this._y = y;
  }

  public setSpeed(xSpeed: number, ySpeed: number) {
    this._xSpeed = xSpeed;
    this._ySpeed = ySpeed;
  }

  public getSpeed() {
    return { xSpeed: this._xSpeed, ySpeed: this._ySpeed };
  }

  public getCoords() {
    return { x: this._x, y: this._y };
  }
}
