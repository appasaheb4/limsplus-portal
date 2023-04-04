import React from 'react';
import {render} from '@testing-library/react';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from './auto-complete-filter-single-select-multi-fields-display.component';

describe('AutoCompleteFilterSingleSelectMultiFieldsDisplay component', () => {
  it('render autoCompleteFilterSingleSelectMultiFieldsDisplay correctly', () => {
    const autoCompleteFilterSingleSelectMultiFieldsDisplay = render(
      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
        data={{
          list: [
            {code: 'Lims', name: 'plus'},
            {code: 'Lims', name: 'plus'},
            {code: 'Lims', name: 'plus'},
          ],
          displayKey: ['name'],
        }}
        onSelect={() => jest.fn()}
        onFilter={() => jest.fn()}
      />,
    );
    expect(autoCompleteFilterSingleSelectMultiFieldsDisplay).toMatchSnapshot();
  });
});
