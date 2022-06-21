import React from 'react';
import {render} from '@testing-library/react';
import {ModalTokenExpire} from './modal-token-expire.component';

it('render modalTokenExpire correctly', () => {
  const modalTokenExpire = render(
    <ModalTokenExpire show={true} onClick={() => jest.fn()} />,
  );
  expect(modalTokenExpire).toMatchSnapshot();
});
