import React from 'react';
import {render} from '@testing-library/react';
import {Role} from '.';

describe('Role Screen', () => {
  it('render role correctly', () => {
    const role = render(<Role />);
    expect(role).toMatchSnapshot();
  });
});
