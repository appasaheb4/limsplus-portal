import React from 'react';
import {render} from '@utils';
import {AutoCompleteFilterMutiSelect} from './AutoCompleteFilterMutiSelect.component';

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
