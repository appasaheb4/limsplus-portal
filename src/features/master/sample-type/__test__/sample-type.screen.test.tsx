/* eslint-disable folders/match-regex */
import React from 'react';
import { render } from '@testing-library/react';
import { SampleType } from '../screens';

describe('SampleType Screen', () => {
  it('render sampleType correctly', () => {
    const sampleType = render(<SampleType />);
    expect(sampleType).toMatchSnapshot();
  });
});
