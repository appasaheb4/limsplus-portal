import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Image, ImageBackground} from './image.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Image',
  component: Image,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Image>;

export const _Image: ComponentStory<typeof Image> = () => (
  <Image
    widht={200}
    height={200}
    source='https://cdn.pixabay.com/photo/2019/03/28/22/23/link-4088190_1280.png'
    onClick={() => console.log('Image')}
  />
);

export const _ImageBackground: ComponentStory<typeof Image> = () => (
  <ImageBackground
    position='center'
    fit='cover'
    source='https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'
  />
);
