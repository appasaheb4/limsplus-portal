import React from 'react';
import {render} from '@testing-library/react';
import {GeneralResultEntry} from '.';

describe('GeneralResultEntry Screen', () => {
  it('render generalResultEntry correctly', () => {
    const generalResultEntry = render(<GeneralResultEntry />);
    expect(generalResultEntry).toMatchSnapshot();
  });
});
