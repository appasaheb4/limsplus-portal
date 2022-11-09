// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {TestAnalyteMapping as TestAnalyzeMapping} from '..';

describe('TestAnalyteMapping Screen', () => {
  it('render testAnalyteMapping correctly', () => {
    const testAnalyteMapping = render(<TestAnalyzeMapping />);
    expect(testAnalyteMapping).toMatchSnapshot();
  });
});
