import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Canvas } from './canvas/Canvas';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Canvas />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
