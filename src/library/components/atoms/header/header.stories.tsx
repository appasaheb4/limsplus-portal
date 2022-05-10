import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Header, PageHeading, PageHeadingLabDetails} from './header.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Header',
  component: Header,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Header>;

export const _Header: ComponentStory<typeof Header> = () => (
  <Header>
    <h1>Im Heading</h1>
  </Header>
);

export const _PageHeading: ComponentStory<typeof Header> = () => (
  <PageHeading title='Im Pagetitle' />
);

export const _PageHeadingLabDetails: ComponentStory<typeof Header> = () => (
  <PageHeadingLabDetails store='' />
);
