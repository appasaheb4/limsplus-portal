import React from 'react';
import {render} from '@utils';
import {AutocompleteGroupBy} from './auto-complete-group-by.component';

it('render autocompleteGroupBy correctly', () => {
  const autocompleteGroupBy = render(
    <AutocompleteGroupBy hasError={false} onChange={() => jest.fn()} />,
  );
  expect(autocompleteGroupBy).toMatchSnapshot();
});
