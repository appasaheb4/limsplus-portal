import React from 'react';
import {render} from '@utils';
import {ModalSessionAllowed} from './ModalSessionAllowed.component';

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
