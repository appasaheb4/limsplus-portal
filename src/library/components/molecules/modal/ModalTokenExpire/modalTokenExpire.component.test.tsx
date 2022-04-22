import React from 'react';
import {render} from '@utils';
import {ModalTokenExpire} from './ModalTokenExpire.component';

it('render modalTokenExpire correctly', () => {
  const modalTokenExpire = render(
    <ModalTokenExpire show={true} onClick={() => jest.fn()} />,
  );
  expect(modalTokenExpire).toMatchSnapshot();
});
