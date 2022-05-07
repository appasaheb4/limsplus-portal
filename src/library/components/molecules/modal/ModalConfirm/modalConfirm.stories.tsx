import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ModalConfirm} from './ModalConfirm.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Modal/ModalConfirm',
  component: ModalConfirm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ModalConfirm>;

export const _ModalConfirm: ComponentStory<typeof ModalConfirm> = () => (
  <ModalConfirm
    show={true}
    onClose={() => {}}
    title='Im Modal Confirm'
    type='Modal Confirm'
    click={() => {}}
    body='Are You Sure You Want to Quit'
  />
);
