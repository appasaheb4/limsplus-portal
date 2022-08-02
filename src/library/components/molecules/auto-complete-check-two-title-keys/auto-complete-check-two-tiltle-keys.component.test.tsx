import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {AutoCompleteCheckTwoTitleKeys} from './auto-complete-check-two-title-keys.component';

describe('AutoCompleteCheckTwoTitleKeys component', () => {
  it('render autoCompleteCheckTwoTitleKeys correctly', () => {
    const autoCompleteCheckMultiFilterKeys = render(
      <AutoCompleteCheckTwoTitleKeys
        data={{
          list: [
            {code: 'Lims', name: 'plus'},
            {code: 'Lims', name: 'plus'},
            {code: 'Lims', name: 'plus'},
          ],
          displayKey: ['code'],
        }}
        onUpdate={items => {
          jest.fn();
        }}
      />,
    );
    expect(autoCompleteCheckMultiFilterKeys).toMatchSnapshot();
  });
});
