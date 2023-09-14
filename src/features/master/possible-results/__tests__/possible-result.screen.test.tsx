/* eslint-disable folders/match-regex */
import React from 'react';
import { render } from '@testing-library/react';
import { PossibleResults } from '../screens';

describe('PossibleResults Screen', () => {
  it('render possibleResults correctly', () => {
    const possibleResult = render(<PossibleResults />);
    expect(possibleResult).toMatchSnapshot();
  });
});
