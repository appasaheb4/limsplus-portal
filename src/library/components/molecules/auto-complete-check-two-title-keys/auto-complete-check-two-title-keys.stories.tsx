import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AutoCompleteCheckTwoTitleKeys} from './auto-complete-check-two-title-keys.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/AutoCompleteCheckTwoTitleKeys',
  component: AutoCompleteCheckTwoTitleKeys,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AutoCompleteCheckTwoTitleKeys>;

export const _AutoCompleteCheckTwoTitleKeys: ComponentStory<
  typeof AutoCompleteCheckTwoTitleKeys
> = () => (
  <AutoCompleteCheckTwoTitleKeys
    titleKey='This is AutoComplete CheckTwoTitle Key'
    data={{
      list: [
        {code: 'Lims', name: 'plus'},
        {code: 'Lims', name: 'plus'},
        {code: 'Lims', name: 'plus'},
      ],
      displayKey: ['code'],
    }}
    onUpdate={items => {
      console.log({items});
    }}
  />
);
