import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ModalChangePassword} from './ModalChangePassword.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Modal/ModalChangePassword',
  component: ModalChangePassword,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ModalChangePassword>;

export const _ModalChangePassword: ComponentStory<
  typeof ModalChangePassword
> = () => (
  <ModalChangePassword
    show={true}
    onClick={() => {}}
    title='Im ModalChange Password'
    onClose={() => {}}
  />
);
