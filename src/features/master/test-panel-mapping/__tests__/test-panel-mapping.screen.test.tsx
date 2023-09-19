// eslint-disable-next-line folders/match-regex
import React from 'react';
import { render } from '@testing-library/react';
import { TestPanelMapping } from '../screens';

describe('TestPanelMapping Screen', () => {
  it('render testPanelMapping correctly', () => {
    const testPanelMapping = render(<TestPanelMapping />);
    expect(testPanelMapping).toMatchSnapshot();
  });
});
