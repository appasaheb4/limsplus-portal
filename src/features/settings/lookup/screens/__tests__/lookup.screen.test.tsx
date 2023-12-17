// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {Lookup} from '..';

describe('Lookup Screen', () => {
  it('render lookup correctly', () => {
    const lookup = render(<Lookup />);
    expect(lookup).toMatchSnapshot();
  });
});
