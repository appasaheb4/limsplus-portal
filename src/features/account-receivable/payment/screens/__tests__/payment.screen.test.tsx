// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import Payment from '../payment.screen';

describe('Payment Screen', () => {
  it('render Payment correctly', () => {
    const deliveryQueue = render(<Payment />);
    expect(deliveryQueue).toMatchSnapshot();
  });
});
