import React from 'react';
import {render} from '@testing-library/react';
import {AutoCompleteFilterMutiSelect} from './auto-complete-filter-muti-select.component';

describe('AutoCompleteFilterMutiSelect component', () => {
  it('render autoCompleteFilterMutiSelect correctly', () => {
    const autoCompleteFilterMutiSelect = render(
      <AutoCompleteFilterMutiSelect
        data={{
          list: [
            {code: 'Lims', name: 'plus'},
            {code: 'Lims', name: 'plus'},
            {code: 'Lims', name: 'plus'},
          ],
          displayKey: ['code'],
        }}
        onFilter={() => jest.fn()}
        onSelect={() => jest.fn()}
        onUpdate={() => jest.fn()}
      />,
    );
    expect(autoCompleteFilterMutiSelect).toMatchSnapshot();
  });
});
