import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {List} from './list.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/List',
  component: List,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof List>;

export const _List: ComponentStory<typeof List> = () => (
  <List direction='col' space={2} justify='stretch' fill>
    <h2>Im list</h2>
    <h2>Im list1</h2>
    <h2>Im list2</h2>
  </List>
);
