/* eslint-disable folders/match-regex */
import React from 'react';
import { render } from '@testing-library/react';
import { SalesTeam } from '../screens';

describe('SalesTeam Screen', () => {
  it('render salesTeam correctly', () => {
    const salesTeam = render(<SalesTeam />);
    expect(salesTeam).toMatchSnapshot();
  });
});
