import React from 'react';
import {render} from '@testing-library/react';
import {AutoCompleteFilterSingleSelect} from './auto-complete-filter-single-select.component';

describe('AutoCompleteFilterSingleSelect component', () => {
  it('render autoCompleteFilterSingleSelect correctly', () => {
    const autoCompleteFilterSingleSelect = render(
      <AutoCompleteFilterSingleSelect
        data={{
          list: [
            {code: 'Lims', name: 'plus'},
            {code: 'Lims', name: 'plus'},
            {code: 'Lims', name: 'plus'},
          ],
          displayKey: ['name'],
        }}
        placeholder='I am Auto CompleteFilterSingleSelect'
        onSelect={() => jest.fn()}
        onFilter={() => jest.fn()}
      />,
    );
    expect(autoCompleteFilterSingleSelect).toMatchSnapshot();
  });
});
