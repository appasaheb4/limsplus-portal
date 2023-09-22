// eslint-disable-next-line folders/match-regex
import React from 'react';
import { render } from '@testing-library/react';
import { Department } from '../screens';

describe('Department Screen', () => {
  it('render department correctly', () => {
    const department = render(<Department />);
    expect(department).toMatchSnapshot();
  });
});
