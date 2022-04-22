import React from 'react';
import {render} from '@utils';
import {ModalChangePasswordByAdmin} from './ModalChangePasswordByAdmin.component';

it('render modalChangePasswordByAdmin correctly', () => {
  const modalChangePasswordByAdmin = render(
    <ModalChangePasswordByAdmin
      show={true}
      onClick={() => jest.fn()}
      onClose={() => jest.fn()}
    />,
  );
  expect(modalChangePasswordByAdmin).toMatchSnapshot();
});
