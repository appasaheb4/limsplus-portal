import React from 'react';
import {render} from '@testing-library/react';
import {ReferenceRanges} from '.';

describe('ReferenceRange Screen', () => {
  it('render referenceRange correctly', () => {
    const referenceRange = render(<ReferenceRanges />);
    expect(referenceRange).toMatchSnapshot();
  });
});
