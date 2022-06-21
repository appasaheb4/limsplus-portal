import React from 'react';
import {render} from '@testing-library/react';
import {ModalClock} from './Modal-clock.component';

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
