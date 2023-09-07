/* eslint-disable folders/match-regex */
import React from 'react';
import { render } from '@testing-library/react';
import { Section } from '../screens';

describe('Section Screen', () => {
  it('render section correctly', () => {
    const section = render(<Section />);
    expect(section).toMatchSnapshot();
  });
});
