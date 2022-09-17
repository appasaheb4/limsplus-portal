// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {PriceList} from '..';

describe('PriceList Screen', () => {
  it('render priceList correctly', () => {
    const priceList = render(<PriceList />);
    expect(priceList).toMatchSnapshot();
  });
});
