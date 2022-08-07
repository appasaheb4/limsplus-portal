import React from 'react';
import {render} from '@testing-library/react';
import {SampleContainer} from '.';

describe('SampleContainer Screen', () => {
  it('render sampleContainer correctly', () => {
    const sampleContainer = render(<SampleContainer />);
    expect(sampleContainer).toMatchSnapshot();
  });
});
