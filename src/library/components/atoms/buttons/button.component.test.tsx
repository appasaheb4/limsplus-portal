import React from 'react';
import {render} from '@utils';
import {
  Button,
  ButtonCircleAddRemove,
  ButtonCircleAddRemoveBottom,
} from './button.component';

it('render button correctly', () => {
  const button = render(
    <Button className="w-40" onClick={() => jest.fn()}>
      Permanent Address
    </Button>,
  );
  expect(button).toMatchSnapshot();
});

it('render buttonCircleAddRemove correctly ', () => {
  const buttonCircleAddRemove = render(
    <ButtonCircleAddRemove show={true} onClick={() => jest.fn()} />,
  );
  expect(buttonCircleAddRemove).toMatchSnapshot();
});

it('render buttonCircleAddRemoveBottom correctly ', () => {
  const buttonCircleAddRemoveBottom = render(
    <ButtonCircleAddRemoveBottom show={true} onClick={() => jest.fn()} />,
  );
  expect(buttonCircleAddRemoveBottom).toMatchSnapshot();
});
