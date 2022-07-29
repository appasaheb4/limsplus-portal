import React from 'react';
import {render} from '@testing-library/react';
import {Grid} from './grid.component';

describe('Grid component', () => {
  it('render Grid correctly', () => {
    const grid = render(<Grid />);
    expect(grid).toMatchSnapshot();
  });
});
