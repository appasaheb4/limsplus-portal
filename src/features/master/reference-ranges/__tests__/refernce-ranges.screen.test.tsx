// eslint-disable-next-line folders/match-regex
import React from 'react';
import { render } from '@testing-library/react';
import { ReferenceRanges } from '../screens';

describe('ReferenceRange Screen', () => {
  it('render referenceRange correctly', () => {
    const referenceRange = render(<ReferenceRanges />);
    expect(referenceRange).toMatchSnapshot();
  });
});
