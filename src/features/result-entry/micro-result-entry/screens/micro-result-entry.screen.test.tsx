import React from 'react';
import {render} from '@testing-library/react';
import MicroResultEntry from './micro-result-entry.screen';

describe('MicroResultEntry Screen', () => {
  it('render microResultEntry correctly', () => {
    const microResultEntry = render(<MicroResultEntry />);
    expect(microResultEntry).toMatchSnapshot();
  });
});
