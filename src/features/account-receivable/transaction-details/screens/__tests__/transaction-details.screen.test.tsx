// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import TransactionDetails from '../transaction-details.screen';

describe('TransactionDetails Screen', () => {
  it('render TransactionDetails correctly', () => {
    const deliveryQueue = render(<TransactionDetails />);
    expect(deliveryQueue).toMatchSnapshot();
  });
});
