import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {AutocompleteGroupBy} from './auto-complete-group-by.component';

describe('AutocompleteGroupBy component', () => {
  it('render autocompleteGroupBy correctly', () => {
    const autocompleteGroupBy = render(<AutocompleteGroupBy />);
    expect(autocompleteGroupBy).toMatchSnapshot();
  });
});
