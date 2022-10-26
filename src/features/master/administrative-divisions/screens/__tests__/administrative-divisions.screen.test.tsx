// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {AdministrativeDivisions} from '..';

describe('Administrative Division Screen', () => {
  it('render administrativeDiv correctly', () => {
    const administrativeDiv = render(<AdministrativeDivisions />);
    expect(administrativeDiv).toMatchSnapshot();
  });
});
