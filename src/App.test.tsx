import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('render App correctly', () => {
    const app = render(<App />);
    expect(app).toMatchSnapshot();
  });
});
