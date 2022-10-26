import React from 'react';
import {render} from '@testing-library/react';
import {TestAnalyteMapping} from '.';

describe('TestAnalyteMapping Screen', () => {
  it('render testAnalyteMapping correctly', () => {
    const testAnalyteMapping = render(<TestAnalyteMapping />);
    expect(testAnalyteMapping).toMatchSnapshot();
  });
});
