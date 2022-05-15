import React from 'react';
import {render} from '@utils';
import {ModalSessionAllowed} from './modal-session-allowed.component';

it('render modalSessionAllowed correctly', () => {
  const modalSessionAllowed = render(
    <ModalSessionAllowed
      show={true}
      onClick={() => jest.fn()}
      onClose={() => jest.fn()}
    />,
  );
  expect(modalSessionAllowed).toMatchSnapshot();
});
