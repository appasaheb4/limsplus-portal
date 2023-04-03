import React from 'react';
import {render} from '@testing-library/react';
import {ModalChangePassword} from './modal-change-password.component';

describe('ModalChangePassword component', () => {
  it('render modalChangePassword correctly', () => {
    const modalChangePassword = render(
      <ModalChangePassword
        onClick={() => jest.fn()}
        onClose={() => jest.fn()}
        show={true}
      />,
    );
    expect(modalChangePassword).toMatchSnapshot();
  });
});
