import React from 'react';
import {render} from '@testing-library/react';
import DeliveryQueue from './delivery-queue.screen';

describe('DeliveryQueue Screen', () => {
  it('render deliveryQueue correctly', () => {
    const deliveryQueue = render(<DeliveryQueue />);
    expect(deliveryQueue).toMatchSnapshot();
  });
});
