import Entity from '../Entity';
import { random } from 'lodash';

export class Apple extends Entity {
  constructor(maxX: number, maxY: number) {
    super(random(0, maxX), random(0, maxY), 0);
  }
}

export default Apple;
