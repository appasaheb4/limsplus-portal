import React from 'react';
import {render} from '@utils';
import {ModalIdleTimeout} from './modal-idle-timeout.component';

it('render modalIdleTimeout correctly', () => {
  const modalIdleTimeout = render(
    <ModalIdleTimeout show={true} onClick={() => jest.fn()} />,
  );
  expect(modalIdleTimeout).toMatchSnapshot();
});
