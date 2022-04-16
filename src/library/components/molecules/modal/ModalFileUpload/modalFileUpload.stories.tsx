import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ModalFileUpload} from './ModalFileUpload.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Modal/ModalFileUpload',
  component: ModalFileUpload,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ModalFileUpload>;

export const _ModalFileUpload: ComponentStory<typeof ModalFileUpload> = () => (
  <ModalFileUpload
    show={true}
    onClick={() => {}}
    onClose={() => {}}
    title=" Im Modal File Upload"
  />
);
