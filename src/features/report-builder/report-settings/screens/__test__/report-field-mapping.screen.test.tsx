// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {ReportFieldMapping} from '../report-field-mapping.screen';

describe('ReportFieldMapping Screen', () => {
  it('render reportFieldMapping correctly', () => {
    const reportFieldMapping = render(<ReportFieldMapping />);
    expect(reportFieldMapping).toMatchSnapshot();
  });
});
