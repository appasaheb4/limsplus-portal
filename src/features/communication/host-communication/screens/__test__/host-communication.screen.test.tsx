// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import HostCommunication from '../host-communication.screen';

describe('HostCommunication Screen', () => {
  it('render hostCommunication correctly', () => {
    const hostCommunication = render(<HostCommunication />);
    expect(hostCommunication).toMatchSnapshot();
  });
});
