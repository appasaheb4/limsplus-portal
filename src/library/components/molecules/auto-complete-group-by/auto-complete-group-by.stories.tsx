import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AutocompleteGroupBy} from './auto-complete-group-by.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/AutocompleteGroupBy',
  component: AutocompleteGroupBy,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AutocompleteGroupBy>;

export const _AutocompleteGroupBy: ComponentStory<
  typeof AutocompleteGroupBy
> = () => (
  <AutocompleteGroupBy
    data={[{name: 'malav', code: 'naagr'}]}
    hasError={true}
    onChange={() => {}}
    onClose={() => {}}
  />
);
