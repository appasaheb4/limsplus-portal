import React from 'react';
import {render} from '@utils';
import {Image, ImageBackground} from './image.component';

it('render image correctly', () => {
  const image = render(<Image source="" onClick={() => jest.fn()} />);
  expect(image).toMatchSnapshot();
});
it('render imageBackground correctly', () => {
  const imageBackground = render(
    <ImageBackground source="" position="center" fit="cover" />,
  );
  expect(imageBackground).toMatchSnapshot();
});
