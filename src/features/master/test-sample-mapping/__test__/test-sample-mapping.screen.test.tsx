/* eslint-disable folders/match-regex */
import React from 'react';
import { render } from '@testing-library/react';
import { TestSampleMapping } from '../screens';

describe('TestSampleMapping Screen', () => {
  it('render testSampleMapping correctly', () => {
    const testSampleMapping = render(<TestSampleMapping />);
    expect(testSampleMapping).toMatchSnapshot();
  });
});
