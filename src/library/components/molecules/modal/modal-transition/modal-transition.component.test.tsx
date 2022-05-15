import React from 'react';
import {render} from '@utils';
import {ModalTransition} from './moda-transition.component';

it('render modalTransition correctly', () => {
  const modalTransition = render(
    <ModalTransition show={true} onClick={() => jest.fn()} />,
  );
  expect(modalTransition).toMatchSnapshot();
});
