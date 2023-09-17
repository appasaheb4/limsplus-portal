/* eslint-disable folders/match-regex */
import React from 'react';
import { render } from '@testing-library/react';
import { Role } from '../screens';

describe('Role Screen', () => {
  it('render role correctly', () => {
    const role = render(<Role />);
    expect(role).toMatchSnapshot();
  });
});
