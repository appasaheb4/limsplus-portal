import React from 'react';
import {render} from '@testing-library/react';
import {SalesTeam} from '.';

describe('SalesTeam Screen', () => {
  it('render salesTeam correctly', () => {
    const salesTeam = render(<SalesTeam />);
    expect(salesTeam).toMatchSnapshot();
  });
});
