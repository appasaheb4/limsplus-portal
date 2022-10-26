import React from 'react';
import {render} from '@testing-library/react';
import {PossibleResults} from '.';

describe('PossibleResults Screen', () => {
  it('render possibleResults correctly', () => {
    const possibleResult = render(<PossibleResults />);
    expect(possibleResult).toMatchSnapshot();
  });
});
