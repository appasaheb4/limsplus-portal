import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {ModalTokenExpire} from './modal-token-expire.component';

describe('ModalTokenExpire component', () => {
  it('render modalTokenExpire correctly', () => {
    const modalTokenExpire = render(
      <ModalTokenExpire onClick={() => jest.fn()} />,
    );
    expect(modalTokenExpire).toMatchSnapshot();
  });
});
