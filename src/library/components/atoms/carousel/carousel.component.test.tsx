import React from 'react';
import {render} from '@testing-library/react';
import {Carousel} from './carousel.component';

describe('Carousel component', () => {
  it('render Carousel correctly', () => {
    const carousel = render(<Carousel />);
    expect(carousel).toMatchSnapshot();
  });
});
