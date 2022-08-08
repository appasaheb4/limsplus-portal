import React from 'react';
import {render} from '@testing-library/react';
import {MicroResultEntry} from '.';

describe('MicroResultEntry Screen', () => {
  it('render microResultEntry correctly', () => {
    const microResultEntry = render(<MicroResultEntry />);
    expect(microResultEntry).toMatchSnapshot();
  });
});
