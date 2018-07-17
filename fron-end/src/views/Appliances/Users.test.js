import React from 'react';
import ReactDOM from 'react-dom';
import Appliances from './Appliances';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Appliances />, div);
  ReactDOM.unmountComponentAtNode(div);
});
