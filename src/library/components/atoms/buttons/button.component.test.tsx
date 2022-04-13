import React from 'react';
import {render} from '@utils';
import {Button} from './button.component';

it('render button correctly', () => {
  const button = render(
    <Button className="w-40" onClick={() => jest.fn()}>
      Permanent Address
    </Button>,
  );
  expect(button).toMatchSnapshot();
});
