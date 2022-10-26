import React from 'react';
import {render} from '@testing-library/react';
import {Methods} from '.';

describe('Method Screen', () => {
  it('render Method correctly', () => {
    const method = render(<Methods />);
    expect(method).toMatchSnapshot();
  });
});
