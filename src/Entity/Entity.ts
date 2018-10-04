export default abstract class Entity {
  protected _x: number;
  protected _y: number;
  protected _xSpeed: number;
  protected _ySpeed: number;
  protected _baseSpeed: number;

  constructor(x: number, y: number, baseSpeed: number = 1) {
    this._x = x;
    this._y = y;
    this._xSpeed = this._ySpeed = this._baseSpeed = baseSpeed;
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

  get baseSpeed(): number {
    return this._baseSpeed;
  }

  set baseSpeed(baseSpeed: number) {
    this._baseSpeed = baseSpeed;
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
