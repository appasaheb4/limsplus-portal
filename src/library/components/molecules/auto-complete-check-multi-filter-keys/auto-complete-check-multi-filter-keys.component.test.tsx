import React from 'react';
import {render} from '@utils';
import {AutoCompleteCheckMultiFilterKeys} from './auto-complete-check-multi-filter-keys.component';

it('render autoCompleteCheckMultiFilterKeys correctly', () => {
  const autoCompleteCheckMultiFilterKeys = render(
    <AutoCompleteCheckMultiFilterKeys
      hasError={false}
      onUpdate={() => jest.fn()}
    />,
  );
  expect(autoCompleteCheckMultiFilterKeys).toMatchSnapshot();
});
