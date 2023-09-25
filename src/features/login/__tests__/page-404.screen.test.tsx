// eslint-disable-next-line folders/match-regex
import React from 'react';
import { render } from '@testing-library/react';
import { Page404 } from '../screens';

describe('Page404 Screen', () => {
  it('render Page404 correctly', () => {
    const page404 = render(<Page404 />);
    expect(page404).toMatchSnapshot();
  });
});
