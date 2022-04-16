import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AutoCompleteFilterMutiSelectMultiFieldsDisplay} from './AutoCompleteFilterMutiSelectMultiFieldsDisplay.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/AutoCompleteFilterMutiSelectMultiFieldsDisplay',
  component: AutoCompleteFilterMutiSelectMultiFieldsDisplay,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AutoCompleteFilterMutiSelectMultiFieldsDisplay>;

export const _AutoCompleteFilterMutiSelectMultiFieldsDisplay: ComponentStory<
  typeof AutoCompleteFilterMutiSelectMultiFieldsDisplay
> = () => (
  <AutoCompleteFilterMutiSelectMultiFieldsDisplay
    loader={true}
    placeholder="Im Auto CompleteFilterMultiSelectMultiFieldsDisplay"
    hasError={false}
    onFilter={() => {}}
    onSelect={() => {}}
    onUpdate={() => {}}
    disable={false}
    data=""
  />
);
