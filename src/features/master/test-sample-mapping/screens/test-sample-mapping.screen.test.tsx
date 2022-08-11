import React from 'react';
import {render} from '@testing-library/react';
import {TestSampleMapping} from '.';

describe('TestSampleMapping Screen', () => {
  it('render testSampleMapping correctly', () => {
    const testSampleMapping = render(<TestSampleMapping />);
    expect(testSampleMapping).toMatchSnapshot();
  });
});
