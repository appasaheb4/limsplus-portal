/* eslint-disable folders/match-regex */
import React from 'react';
import { render } from '@testing-library/react';
import { DeliverySchedule } from '../screens';

describe('DeliverySchedule Screen', () => {
  it('render deliverySchedule correctly', () => {
    const deliverySchedule = render(<DeliverySchedule />);
    expect(deliverySchedule).toMatchSnapshot();
  });
});
