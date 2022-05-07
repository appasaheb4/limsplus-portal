import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AutoCompleteFilterSingleSelect} from './AutoCompleteFilterSingleSelect.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/AutoCompleteGroupByCheck',
  component: AutoCompleteFilterSingleSelect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AutoCompleteFilterSingleSelect>;

export const _AutoCompleteFilterSingleSelect: ComponentStory<
  typeof AutoCompleteFilterSingleSelect
> = () => (
  <AutoCompleteFilterSingleSelect
    data={{
      list: [
        {code: 'Lims', name: 'plus'},
        {code: 'Lims', name: 'plus'},
        {code: 'Lims', name: 'plus'},
      ],
      displayKey: ['name'],
    }}
    placeholder='I am Auto CompleteFilterSingleSelect'
    onSelect={() => {}}
    onFilter={() => {}}
    disable={false}
  />
);
