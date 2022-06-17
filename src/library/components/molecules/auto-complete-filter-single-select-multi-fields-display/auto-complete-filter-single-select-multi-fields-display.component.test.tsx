import React from 'react';
import {render} from '@utils';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from './auto-complete-filter-single-select-multi-fields-display.component';

it('render autoCompleteFilterSingleSelectMultiFieldsDisplay correctly', () => {
  const autoCompleteFilterSingleSelectMultiFieldsDisplay = render(
    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
      data={''}
      hasError={false}
      onFilter={() => jest.fn()}
      onSelect={() => jest.fn()}
    />,
  );
  expect(autoCompleteFilterSingleSelectMultiFieldsDisplay).toMatchSnapshot();
});
