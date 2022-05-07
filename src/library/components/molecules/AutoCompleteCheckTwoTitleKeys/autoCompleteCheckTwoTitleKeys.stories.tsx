import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AutoCompleteCheckTwoTitleKeys} from './AutoCompleteCheckTwoTitleKeys.component';

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
    // data={{
    //   defulatValues: [],
    //   list: props.extraData.listMasterPanel || [],
    //   displayKey: ["panelName", "panelCode"],
    //   findKey: ["panelName", "panelCode"],
    // }}
    onUpdate={items => {
      console.log({items});
    }}
  />
);
