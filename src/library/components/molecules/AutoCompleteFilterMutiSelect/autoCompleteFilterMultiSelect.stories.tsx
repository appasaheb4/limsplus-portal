import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AutoCompleteFilterMutiSelect} from './AutoCompleteFilterMutiSelect.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/AutoCompleteFilterMutiSelect',
  component: AutoCompleteFilterMutiSelect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AutoCompleteFilterMutiSelect>;

export const _AutoCompleteFilterMutiSelect: ComponentStory<
  typeof AutoCompleteFilterMutiSelect
> = () => (
  <AutoCompleteFilterMutiSelect
    loader={true}
    placeholder="Im Auto CompleteFilterMultiSelect"
    hasError={false}
    onFilter={() => {}}
    onSelect={() => {}}
    onUpdate={() => {}}
    data=""
  />
);
