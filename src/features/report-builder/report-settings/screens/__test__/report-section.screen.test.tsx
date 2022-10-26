// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {ReportSection} from '../report-section.screen';

describe('ReportSection Screen', () => {
  it('render reportSection correctly', () => {
    const reportSection = render(<ReportSection />);
    expect(reportSection).toMatchSnapshot();
  });
});
