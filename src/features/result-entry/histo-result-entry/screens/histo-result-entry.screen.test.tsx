import React from 'react';
import {render} from '@testing-library/react';
import HistoResultEntry from './histo-result-entry.screen';

describe('HistoResultEntry Screen', () => {
  it('render histoResultEntry correctly', () => {
    const histoResultEntry = render(<HistoResultEntry />);
    expect(histoResultEntry).toMatchSnapshot();
  });
});
