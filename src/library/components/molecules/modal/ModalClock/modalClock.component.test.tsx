import React from 'react';
import {render} from '@utils';
import {ModalClock} from './ModalClock.component';

it('render modalClock correctly', () => {
  const modalClock = render(
    <ModalClock
      show={true}
      onClick={() => jest.fn()}
      onClose={() => jest.fn()}
    />,
  );
  expect(modalClock).toMatchSnapshot();
});
