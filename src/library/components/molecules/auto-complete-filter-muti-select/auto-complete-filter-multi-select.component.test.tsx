import React from 'react';
import {render} from '@testing-library/react';
import {AutoCompleteFilterMutiSelect} from './auto-complete-filter-muti-select.component';

it('render autoCompleteFilterMutiSelect correctly', () => {
  const autoCompleteFilterMutiSelect = render(
    <AutoCompleteFilterMutiSelect
      data={''}
      hasError={false}
      onFilter={() => jest.fn()}
      onSelect={() => jest.fn()}
      onUpdate={() => jest.fn()}
    />,
  );
  expect(autoCompleteFilterMutiSelect).toMatchSnapshot();
});
