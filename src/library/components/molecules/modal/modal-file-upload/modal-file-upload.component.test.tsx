import React from 'react';
import {render} from '@testing-library/react';
import {ModalFileUpload} from './modal-file-upload.component';

describe('ModalFileUpload component', () => {
  it('render modalFileUpload correctly', () => {
    const modalFileUpload = render(
      <ModalFileUpload
        onClose={() => jest.fn()}
        show={true}
        onClick={() => jest.fn()}
      />,
    );
    expect(modalFileUpload).toMatchSnapshot();
  });
});
