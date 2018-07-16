import React from 'react';
import ReactDOM from 'react-dom';
import Appliances from './Schedules';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Appliances />, div);
  ReactDOM.unmountComponentAtNode(div);
});
