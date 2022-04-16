import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ModalTransition} from './ModalTransition.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Modal/ModalTransition',
  component: ModalTransition,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ModalTransition>;

export const _ModalTransition: ComponentStory<typeof ModalTransition> = () => (
  <ModalTransition />
);
