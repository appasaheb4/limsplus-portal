import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {ModalClock} from './Modal-clock.component';

describe('ModalClock component', () => {
  it('render modalClock correctly', () => {
    const modalClock = render(
      <ModalClock
        onClick={() => jest.fn()}
        onClose={() => jest.fn()}
        show={true}
      />,
    );
    expect(modalClock).toMatchSnapshot();
  });
});
