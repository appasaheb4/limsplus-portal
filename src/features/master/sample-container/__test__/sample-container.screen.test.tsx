/* eslint-disable folders/match-regex */
import React from 'react';
import { render } from '@testing-library/react';
import { SampleContainer } from '../screens';

describe('SampleContainer Screen', () => {
  it('render sampleContainer correctly', () => {
    const sampleContainer = render(<SampleContainer />);
    expect(sampleContainer).toMatchSnapshot();
  });
});
