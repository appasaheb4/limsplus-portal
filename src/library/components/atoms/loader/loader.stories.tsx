import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Loader, ModalLoader} from './loader.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Loader',
  component: Loader,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Loader>;

export const _Loader: ComponentStory<typeof Loader> = () => <Loader />;

export const _ModalLoader: ComponentStory<typeof Loader> = () => (
  <ModalLoader />
);
