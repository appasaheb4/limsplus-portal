import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ModalTokenExpire} from './ModalTokenExpire.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Modal/ModalTokenExpire',
  component: ModalTokenExpire,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ModalTokenExpire>;

export const _ModalTokenExpire: ComponentStory<
  typeof ModalTokenExpire
> = () => (
  <ModalTokenExpire
    show={true}
    onClick={() => {}}
    title="Im Modal TokenExpire"
  />
);
