import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from './AutoCompleteFilterSingleSelectMultiFieldsDisplay.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/AutoCompleteFilterSingleSelectMultiFieldsDisplay',
  component: AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AutoCompleteFilterSingleSelectMultiFieldsDisplay>;

export const _AutoCompleteFilterSingleSelectMultiFieldsDisplay: ComponentStory<
  typeof AutoCompleteFilterSingleSelectMultiFieldsDisplay
> = () => (
  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
    loader={true}
    placeholder='Im AutoCompleteFilterSingleSelectMultiFieldsDisplay'
    hasError={false}
    onFilter={() => {}}
    onSelect={() => {}}
    data={{
      list: [
        {code: 'Lims', name: 'plus'},
        {code: 'Lims', name: 'plus'},
        {code: 'Lims', name: 'plus'},
      ],
      displayKey: ['code', 'name'],
    }}
  />
);
