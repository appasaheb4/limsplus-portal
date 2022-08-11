import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
