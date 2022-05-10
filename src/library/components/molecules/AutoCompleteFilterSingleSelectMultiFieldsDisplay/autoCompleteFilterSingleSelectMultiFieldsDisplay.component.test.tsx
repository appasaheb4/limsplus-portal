import React from 'react';
import {render} from '@utils';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from './AutoCompleteFilterSingleSelectMultiFieldsDisplay.component';

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
