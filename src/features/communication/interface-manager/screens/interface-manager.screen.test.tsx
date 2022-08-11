import React from 'react';
import {render} from '@testing-library/react';
import InterfaceManager from './interface-manager.screen';

describe('InterfaceManager Screen', () => {
  it('render interfaceManager correctly', () => {
    const interfaceManager = render(<InterfaceManager />);
    expect(interfaceManager).toMatchSnapshot();
  });
});
