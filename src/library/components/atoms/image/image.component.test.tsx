import React from 'react';
import {render} from '@testing-library/react';
import {Image, ImageBackground} from './image.component';

describe('Image component', () => {
  it('render image correctly', () => {
    const image = render(<Image source='csdfrf' />);
    expect(image).toMatchSnapshot();
  });
});

describe('Image Background component', () => {
  it('render imagebackground correctly', () => {
    const image = render(
      <ImageBackground fit='auto' position='bottom' source='nowec' />,
    );
    expect(image).toMatchSnapshot();
  });
});
