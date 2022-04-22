import React from 'react';
import {render} from '@utils';
import {ModalChangePassword} from './ModalChangePassword.component';

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
