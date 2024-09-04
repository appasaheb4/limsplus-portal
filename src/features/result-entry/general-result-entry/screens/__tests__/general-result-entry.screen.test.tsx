// eslint-disable-next-line folders/match-regex
import React from 'react';
import { render } from '@testing-library/react';
import GeneralResultEntry from '../general-result-entry.screen2';

describe('GeneralResultEntry Screen', () => {
  it('render generalResultEntry correctly', () => {
    const generalResultEntry = render(<GeneralResultEntry />);
    expect(generalResultEntry).toMatchSnapshot();
  });
});
