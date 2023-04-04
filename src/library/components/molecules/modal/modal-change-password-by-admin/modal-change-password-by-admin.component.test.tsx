import React from 'react';
import {render} from '@testing-library/react';
import {ModalChangePasswordByAdmin} from './modal-change-password-by-admin.component';

describe('ModalChangePassword component', () => {
  it('render modalChangePassword correctly', () => {
    const modalChangePasswordByAdmin = render(
      <ModalChangePasswordByAdmin
        onClick={() => jest.fn()}
        onClose={() => jest.fn()}
        show={true}
      />,
    );
    expect(modalChangePasswordByAdmin).toMatchSnapshot();
  });
});
