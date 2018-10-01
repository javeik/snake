import { mount } from 'enzyme';
import * as React from 'react';
import Canvas from './Canvas';

it('renders', () => {
  const component = mount(<Canvas />);

  expect(component).toMatchSnapshot();
});
