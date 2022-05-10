import React from 'react';
import {render} from '@utils';
import {AutoCompleteFilterSingleSelect} from './AutoCompleteFilterSingleSelect.component';

it('render autoCompleteFilterSingleSelect correctly', () => {
  const autoCompleteFilterSingleSelect = render(
    <AutoCompleteFilterSingleSelect
      data={''}
      hasError={false}
      onFilter={() => jest.fn()}
      onSelect={() => jest.fn()}
    />,
  );
  expect(autoCompleteFilterSingleSelect).toMatchSnapshot();
});
