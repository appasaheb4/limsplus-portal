// eslint-disable-next-line folders/match-regex
import React from 'react';
import { render } from '@testing-library/react';
import BillSummary from '../bill-summary.screen';

describe('Bill Summary Screen', () => {
  it('render bill summary screen correctly', () => {
    const billSummary = render(<BillSummary />);
    expect(billSummary).toMatchSnapshot();
  });
});
