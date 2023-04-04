import React from 'react';
import {render} from '@testing-library/react';
import {AutoCompleteCheckTwoTitleKeys} from './auto-complete-check-two-title-keys.component';

describe('AutoCompleteCheckTwoTitleKeys component', () => {
  it('render autoCompleteCheckTwoTitleKeys correctly', () => {
    const autoCompleteCheckMultiFilterKeys = render(
      <AutoCompleteCheckTwoTitleKeys
        data={[]}
        defaultData={[]}
        onUpdate={items => {
          jest.fn();
        }}
      />,
    );
    expect(autoCompleteCheckMultiFilterKeys).toMatchSnapshot();
  });
});
