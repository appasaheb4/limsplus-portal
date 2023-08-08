// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {CorporateClients} from '../screens';

describe('Corporate Client Screen', () => {
  it('render corporateClient correctly', () => {
    const corporateClient = render(<CorporateClients />);
    expect(corporateClient).toMatchSnapshot();
  });
});
