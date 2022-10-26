// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {Banner} from '..';

describe('Banner Screen', () => {
  it('render banner correctly', () => {
    const banner = render(<Banner />);
    expect(banner).toMatchSnapshot();
  });
});
