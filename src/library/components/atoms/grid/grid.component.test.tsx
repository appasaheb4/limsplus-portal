import React from 'react';
import {render} from '@testing-library/react';
import {Grid} from './grid.component';

it('render grid correctly', () => {
  const grid = render(<Grid cols={3} />);
  expect(grid).toMatchSnapshot();
});
