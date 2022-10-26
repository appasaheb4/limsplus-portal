import React from 'react';
import {render} from '@testing-library/react';
import {ModalConfirm, ModalImportFile} from './modals.component';

describe('Modals Confirm component', () => {
  it('render modal confirm correctly', () => {
    const modalConfirm = render(
      <ModalConfirm click={() => jest.fn()} close={() => jest.fn()} />,
    );
    expect(modalConfirm).toMatchSnapshot();
  });
});

describe('Modals Confirm component', () => {
  it('render modal import correctly', () => {
    const modalImportFile = render(
      <ModalImportFile click={() => jest.fn()} close={() => jest.fn()} />,
    );
    expect(modalImportFile).toMatchSnapshot();
  });
});
