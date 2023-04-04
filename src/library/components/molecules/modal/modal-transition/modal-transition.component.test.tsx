import React from 'react';
import {render} from '@testing-library/react';
import {ModalTransition} from './modal-transition.component';

describe('ModalTransition component', () => {
  it('render modalTransition correctly', () => {
    const modalTransition = render(
      <ModalTransition show={true} onClose={() => jest.fn()} />,
    );
    expect(modalTransition).toMatchSnapshot();
  });
});
