import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AutoCompleteGroupByCheck} from './AutoCompleteGroupByCheck.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/AutoCompleteGroupByCheck',
  component: AutoCompleteGroupByCheck,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AutoCompleteGroupByCheck>;

export const _AutoCompleteCheckTwoTitleKeys: ComponentStory<
  typeof AutoCompleteGroupByCheck
> = () => (
  <AutoCompleteGroupByCheck
    data={[]}
    defaultItem={[]}
    onChange={() => {}}
    onClose={() => {}}
  />
);
