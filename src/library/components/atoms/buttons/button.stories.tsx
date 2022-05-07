/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-console */
import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {
  Button,
  ButtonCircleAddRemove,
  ButtonCircleAddRemoveBottom,
  ButtonIcon,
} from './button.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Buttons',
  component: Button,
} as ComponentMeta<typeof Button>;

export const _Button: ComponentStory<typeof Button> = () => (
  <Button onClick={() => {}}>LimsPlus</Button>
);

export const _ButtonCircleAddRemove: ComponentStory<typeof Button> = () => (
  <ButtonCircleAddRemove
    show={true}
    onClick={status => console.log({status})}
  />
);

export const _ButtonCircleAddRemoveBottom: ComponentStory<
  typeof Button
> = () => (
  <ButtonCircleAddRemoveBottom
    show={true}
    onClick={status => console.log({status})}
  />
);

export const _ButtonIcon: ComponentStory<typeof Button> = () => (
  <ButtonIcon title="" icon="" onClick={() => {}} />
);
