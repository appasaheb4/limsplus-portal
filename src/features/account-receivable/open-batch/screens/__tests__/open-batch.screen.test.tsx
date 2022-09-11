// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import OpenBatch from '../open-batch.screen';

describe('OpenBatch Screen', () => {
  it('render OpenBatch correctly', () => {
    const deliveryQueue = render(<OpenBatch />);
    expect(deliveryQueue).toMatchSnapshot();
  });
});
