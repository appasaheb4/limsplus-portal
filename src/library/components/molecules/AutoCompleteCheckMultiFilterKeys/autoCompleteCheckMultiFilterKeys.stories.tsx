import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AutoCompleteCheckMultiFilterKeys} from './AutoCompleteCheckMultiFilterKeys.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/AutoCompleteCheckMultiFilterKeys',
  component: AutoCompleteCheckMultiFilterKeys,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AutoCompleteCheckMultiFilterKeys>;

export const _AutoCompleteCheckMultiFilterKeys: ComponentStory<
  typeof AutoCompleteCheckMultiFilterKeys
> = () => (
  <AutoCompleteCheckMultiFilterKeys
    placeholder='Search by panel name or panel code'
    data={{
      list: [
        {name: 'Lims', code: 'plus'},
        {name: 'Lims', code: 'plus'},
        {name: 'Lims', code: 'plus'},
      ],
      displayKey: ['name', 'code'],
      findKey: ['code', 'name'],
    }}
    onUpdate={items => {
      console.log({items});
    }}
  />
);
