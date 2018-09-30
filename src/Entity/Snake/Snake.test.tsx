import Snake from './Snake';

describe('Snake', () => {
  let entity: Snake;
  let xStub: number;
  let yStub: number;
  let xSpeedStub: number;
  let ySpeedStub: number;

  beforeEach(() => {
    xStub = 0;
    yStub = 0;
    xSpeedStub = 1;
    ySpeedStub = 1;

    entity = new Snake(xStub, yStub, xSpeedStub, ySpeedStub);
  });

  it('can move in x axis', () => {
    entity.move();

    expect(entity.x).toBe(xStub + xSpeedStub);
  });

  it('can move in y axis', () => {
    entity.move();

    expect(entity.y).toBe(yStub + ySpeedStub);
  });
});
