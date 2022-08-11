import React from 'react';
import {render} from '@testing-library/react';
import {Loader, ModalLoader} from './loader.component';

describe('Loader component', () => {
  it('render loader correctly', () => {
    const loader = render(<Loader />);
    expect(loader).toMatchSnapshot();
  });
});

describe('Modal Loader component', () => {
  it('render modal loader correctly', () => {
    const modalLoader = render(<ModalLoader />);
    expect(modalLoader).toMatchSnapshot();
  });
});
