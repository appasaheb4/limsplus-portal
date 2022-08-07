import React from 'react';
import {render} from '@testing-library/react';
import {Environment} from '.';

describe('Environment Screen', () => {
  it('render environment correctly', () => {
    const environment = render(<Environment />);
    expect(environment).toMatchSnapshot();
  });
});
