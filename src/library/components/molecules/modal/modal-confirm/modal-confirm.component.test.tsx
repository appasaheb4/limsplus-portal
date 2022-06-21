import React from 'react';
import {render} from '@testing-library/react';
import {ModalConfirm} from './modal-confirm.component';

it('render modalConfirm correctly', () => {
  const modalConfirm = render(
    <ModalConfirm
      show={true}
      click={() => jest.fn()}
      onClose={() => jest.fn()}
    />,
  );
  expect(modalConfirm).toMatchSnapshot();
});
