import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Tooltip} from './tooltip.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Tooltip>;

export const _ToolTip: ComponentStory<typeof Tooltip> = () => (
  <Tooltip tooltipText='Im ToolTip' position='bottom'>
    ToolTip
  </Tooltip>
);
