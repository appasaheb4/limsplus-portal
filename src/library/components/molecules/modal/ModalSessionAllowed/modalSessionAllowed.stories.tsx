import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ModalSessionAllowed} from './ModalSessionAllowed.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Modal/ModalSessionAllowed',
  component: ModalSessionAllowed,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ModalSessionAllowed>;

export const _ModalSessionAllowed: ComponentStory<
  typeof ModalSessionAllowed
> = () => (
  <ModalSessionAllowed
    show={true}
    onClick={() => {}}
    onClose={() => {}}
    title=' Im ModalSession Allowed'
  />
);
