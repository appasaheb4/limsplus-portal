import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AutoComplete} from './AutoComplete.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/AutoComplete',
  component: AutoComplete,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AutoComplete>;

export const _AutoComplete: ComponentStory<typeof AutoComplete> = () => (
  <AutoComplete
    hasError={false}
    onChange={(item: any) => {
      console.log({item});
    }}
  />
);
