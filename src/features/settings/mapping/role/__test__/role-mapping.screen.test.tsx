// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {RoleMapping} from '../screens';

describe('RoleMapping Screen', () => {
  it('render roleMapping correctly', () => {
    const roleMapping = render(<RoleMapping />);
    expect(roleMapping).toMatchSnapshot();
  });
});
