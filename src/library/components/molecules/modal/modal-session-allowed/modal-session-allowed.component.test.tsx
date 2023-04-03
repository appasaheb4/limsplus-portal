import React from 'react';
import {render} from '@testing-library/react';
import {ModalSessionAllowed} from './modal-session-allowed.component';

describe('ModalSessionAllowed component', () => {
  it('render modalSessionAllowed correctly', () => {
    const modalSessionAllowed = render(
      <ModalSessionAllowed
        onClick={() => jest.fn()}
        onClose={() => jest.fn()}
      />,
    );
    expect(modalSessionAllowed).toMatchSnapshot();
  });
});
