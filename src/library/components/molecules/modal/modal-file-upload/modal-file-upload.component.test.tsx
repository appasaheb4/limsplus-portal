import React from 'react';
import {render} from '@utils';
import {ModalFileUpload} from './modal-file-upload.component';

it('render modalFileUpload correctly', () => {
  const modalFileUpload = render(
    <ModalFileUpload
      show={true}
      onClick={() => jest.fn()}
      onClose={() => jest.fn()}
    />,
  );
  expect(modalFileUpload).toMatchSnapshot();
});
