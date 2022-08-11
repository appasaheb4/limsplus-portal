import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {AutoCompleteFilterMutiSelectMultiFieldsDisplay} from './auto-complete-filter-muti-select-multi-fields-display.component';

describe('AutoCompleteFilterMutiSelectMultiFieldsDisplay component', () => {
  it('render autoCompleteFilterMutiSelectMultiFieldsDisplay correctly', () => {
    const autoCompleteFilterMutiSelectMultiFieldsDisplay = render(
      <AutoCompleteFilterMutiSelectMultiFieldsDisplay
        data={{
          list: [
            {code: 'Lims', name: 'plus'},
            {code: 'Lims', name: 'plus'},
            {code: 'Lims', name: 'plus'},
          ],
          displayKey: ['code', 'name'],
        }}
        onFilter={() => jest.fn()}
        onSelect={() => jest.fn()}
        onUpdate={() => jest.fn()}
      />,
    );
    expect(autoCompleteFilterMutiSelectMultiFieldsDisplay).toMatchSnapshot();
  });
});
