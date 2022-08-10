import React from 'react';
import {render} from '@testing-library/react';
import ReportTemplate from './report-template.screen';

describe('ReportTemplate Screen', () => {
  it('render reportTemplate correctly', () => {
    const reportTemplate = render(<ReportTemplate />);
    expect(reportTemplate).toMatchSnapshot();
  });
});
