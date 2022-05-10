import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ModalClock} from './ModalClock.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Modal/ModalClock',
  component: ModalClock,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ModalClock>;

export const _ModalClock: ComponentStory<typeof ModalClock> = () => (
  <ModalClock
    show={true}
    onClick={() => {}}
    title='Im Modal Click'
    onClose={() => {}}
  />
);
