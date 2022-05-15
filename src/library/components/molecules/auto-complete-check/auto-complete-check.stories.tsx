import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AutocompleteCheck} from './auto-complete-check.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/AutocompleteCheck',
  component: AutocompleteCheck,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AutocompleteCheck>;

export const _AutocompleteCheck: ComponentStory<
  typeof AutocompleteCheck
> = () => (
  <AutocompleteCheck
    hasError={false}
    data={[]}
    onUpdate={() => {}}
    placeholder='Im Auto CompleteCheck'
  />
);
