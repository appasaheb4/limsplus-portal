/* eslint-disable folders/match-regex */
import React from 'react';
import {render} from '@testing-library/react';
import {LoginActivity} from '..';

describe('LoginActivity Screen', () => {
  it('render loginActivity correctly', () => {
    const loginActivity = render(<LoginActivity />);
    expect(loginActivity).toMatchSnapshot();
  });
});
