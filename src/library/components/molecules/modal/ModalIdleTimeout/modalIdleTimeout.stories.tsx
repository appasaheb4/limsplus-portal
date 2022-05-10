import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ModalIdleTimeout} from './ModalIdleTimeout.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Modal/ModalIdleTimeout',
  component: ModalIdleTimeout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ModalIdleTimeout>;

export const _ModalIdleTimeout: ComponentStory<
  typeof ModalIdleTimeout
> = () => (
  <ModalIdleTimeout
    show={true}
    onClick={() => {}}
    title='Im ModalIdle TimeOut'
    subTitle='YOur Session TimeOut'
  />
);
