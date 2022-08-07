import React from 'react';
import {render} from '@testing-library/react';
import {Library} from '.';

describe('Library Screen', () => {
  it('render library correctly', () => {
    const library = render(<Library />);
    expect(library).toMatchSnapshot();
  });
});
