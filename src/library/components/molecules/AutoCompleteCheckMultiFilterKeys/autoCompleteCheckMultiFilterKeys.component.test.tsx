import React from 'react';
import {render} from '@utils';
import {AutoCompleteCheckMultiFilterKeys} from './AutoCompleteCheckMultiFilterKeys.component';

it('render autoCompleteCheckMultiFilterKeys correctly', () => {
  const autoCompleteCheckMultiFilterKeys = render(
    <AutoCompleteCheckMultiFilterKeys
      hasError={false}
      onUpdate={() => jest.fn()}
    />,
  );
  expect(autoCompleteCheckMultiFilterKeys).toMatchSnapshot();
});
