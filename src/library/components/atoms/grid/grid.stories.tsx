import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Grid} from './grid.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Grid',
  component: Grid,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Grid>;

export const _Grid: ComponentStory<typeof Grid> = () => (
  <Grid cols={3}>
    <h1>Im grid</h1>
  </Grid>
);
