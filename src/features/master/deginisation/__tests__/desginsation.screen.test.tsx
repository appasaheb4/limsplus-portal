// eslint-disable-next-line folders/match-regex
import React from 'react';
import { render } from '@testing-library/react';
import { Deginisation } from '../screens';

describe('Deginisation Screen', () => {
  it('render deginisation correctly', () => {
    const deginisation = render(<Deginisation />);
    expect(deginisation).toMatchSnapshot();
  });
});
