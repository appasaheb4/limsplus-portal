// eslint-disable-next-line folders/match-regex
import React from 'react';
import { render } from '@testing-library/react';
import { Company } from '..';

describe('Company Screen', () => {
  it('render company correctly', () => {
    const banner = render(<Company />);
    expect(banner).toMatchSnapshot();
  });
});
