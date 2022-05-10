import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ModalChangePasswordByAdmin} from './ModalChangePasswordByAdmin.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Modal/ModalChangePasswordByAdmin',
  component: ModalChangePasswordByAdmin,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ModalChangePasswordByAdmin>;

export const _ModalChangePassword: ComponentStory<
  typeof ModalChangePasswordByAdmin
> = () => (
  <ModalChangePasswordByAdmin
    show={true}
    onClick={() => {}}
    title='Im ModalChange Password By Admin'
    onClose={() => {}}
  />
);
