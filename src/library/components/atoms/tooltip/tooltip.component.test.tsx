import React from 'react';
import {render} from '@testing-library/react';
import {Tooltip} from './tooltip.component';

describe('Tooltip component', () => {
  it('render tooltip correctly', () => {
    const tooltip = render(<Tooltip />);
    expect(tooltip).toMatchSnapshot();
  });
});
