// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import Receipt from '../receipt.screen';

describe('Receipt Screen', () => {
  it('render Receipt correctly', () => {
    const deliveryQueue = render(<Receipt />);
    expect(deliveryQueue).toMatchSnapshot();
  });
});
