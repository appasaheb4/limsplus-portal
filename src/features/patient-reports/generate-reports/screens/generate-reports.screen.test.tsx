import React from 'react';
import {render} from '@testing-library/react';
import GenerateReport from './generate-reports.screen';

describe('GenerateReport Screen', () => {
  it('render generateReport correctly', () => {
    const generateReport = render(<GenerateReport />);
    expect(generateReport).toMatchSnapshot();
  });
});
