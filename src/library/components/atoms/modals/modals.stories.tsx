import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ModalConfirm, ModalImportFile} from './modals.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Modals',
  component: ModalConfirm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ModalConfirm>;

export const _ModalConfirm: ComponentStory<typeof ModalConfirm> = () => (
  <ModalConfirm
    show={true}
    click={() => {}}
    close={() => {}}
    type="im modal"
    body="Are You Sure You Want Be a Modal"
  />
);

export const _ModalImportFile: ComponentStory<typeof ModalConfirm> = () => (
  <ModalImportFile
    show={true}
    click={status => console.log({status})}
    close={() => {}}
    accept="Yes"
    body="Are You Sure You Want to Import Something"
  />
);
