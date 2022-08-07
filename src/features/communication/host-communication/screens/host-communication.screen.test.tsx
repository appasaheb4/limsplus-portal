import React from 'react';
import {render} from '@testing-library/react';
import {HostCommunication} from '.';

describe('HostCommunication Screen', () => {
  it('render hostCommunication correctly', () => {
    const hostCommunication = render(<HostCommunication />);
    expect(hostCommunication).toMatchSnapshot();
  });
});
