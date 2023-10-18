// eslint-disable-next-line folders/match-regex
import React from 'react';
import { render } from '@testing-library/react';
import { EventLogs } from '../screens';

describe('EventLogs  Screen', () => {
  it('render eventLogs correctly', () => {
    const eventLogs = render(<EventLogs />);
    expect(eventLogs).toMatchSnapshot();
  });
});
