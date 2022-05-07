import React from 'react';
import {render} from '@utils';
import {AutoCompleteFilterMutiSelectMultiFieldsDisplay} from './AutoCompleteFilterMutiSelectMultiFieldsDisplay.component';

it('render autoCompleteFilterMutiSelectMultiFieldsDisplay correctly', () => {
  const autoCompleteFilterMutiSelectMultiFieldsDisplay = render(
    <AutoCompleteFilterMutiSelectMultiFieldsDisplay
      hasError={false}
      data=''
      onFilter={() => jest.fn()}
      onSelect={() => jest.fn()}
      onUpdate={() => jest.fn()}
    />,
  );
  expect(autoCompleteFilterMutiSelectMultiFieldsDisplay).toMatchSnapshot();
});
