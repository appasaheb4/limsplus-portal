import React from 'react';
import {render} from '@testing-library/react';
import {ModalConfirm} from './modal-confirm.component';

describe('ModalConfirm component', () => {
  it('render modalConfirm correctly', () => {
    const modalConfirm = render(
      <ModalConfirm
        onClose={() => jest.fn()}
        show={true}
        click={() => jest.fn()}
      />,
    );
    expect(modalConfirm).toMatchSnapshot();
  });
});
