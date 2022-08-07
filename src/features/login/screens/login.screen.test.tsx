import React from 'react';
import {render} from '@testing-library/react';
import {Login} from '.';

describe('Login Screen', () => {
  it('render login correctly', () => {
    const login = render(<Login />);
    expect(login).toMatchSnapshot();
  });
});
