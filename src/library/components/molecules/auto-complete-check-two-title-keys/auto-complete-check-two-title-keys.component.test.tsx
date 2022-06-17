import React from 'react';
import {render} from '@utils';
import {AutoCompleteCheckTwoTitleKeys} from './auto-complete-check-two-title-keys.component';

it('render autoCompleteCheckTwoTitleKeys correctly', () => {
  const autoCompleteCheckTwoTitleKeys = render(
    <AutoCompleteCheckTwoTitleKeys
      hasError={false}
      onUpdate={() => jest.fn()}
    />,
  );
  expect(autoCompleteCheckTwoTitleKeys).toMatchSnapshot();
});
