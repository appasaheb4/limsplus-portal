import React from 'react';
import {render} from '@utils';
import {ModalChangePassword} from './modal-change-password.component';

it('render modalChangePassword correctly', () => {
  const modalChangePassword = render(
    <ModalChangePassword
      show={true}
      onClick={() => jest.fn()}
      onClose={() => jest.fn()}
    />,
  );
  expect(modalChangePassword).toMatchSnapshot();
});
