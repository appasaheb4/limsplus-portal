import React from 'react';
import {render} from '@testing-library/react';
import {AutoCompleteCheckMultiFilterKeys} from './auto-complete-check-multi-filter-keys.component';

describe('AutoCompleteCheckMultiFilterKeys component', () => {
  it('render autoCompleteCheckMultiFilterKeys correctly', () => {
    const autoCompleteCheckMultiFilterKeys = render(
      <AutoCompleteCheckMultiFilterKeys />,
    );
    expect(autoCompleteCheckMultiFilterKeys).toMatchSnapshot();
  });
});
