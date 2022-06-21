import React from 'react';
import {render} from '@testing-library/react';
import {ModalChangePasswordByAdmin} from './modal-change-password-by-admin.component';

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
