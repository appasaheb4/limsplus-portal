// eslint-disable-next-line folders/match-regex
import React from 'react';
import { render } from '@testing-library/react';
import { Users } from '../screens';

describe('Users Screen', () => {
  it('render user correctly', () => {
    const user = render(<Users />);
    expect(user).toMatchSnapshot();
  });
});
