import React from 'react';
import {render} from '@testing-library/react';
import {ReportSettings} from './report-settings.screen';

describe('ReportSettings Screen', () => {
  it('render reportSettings correctly', () => {
    const reportSettings = render(<ReportSettings />);
    expect(reportSettings).toMatchSnapshot();
  });
});
