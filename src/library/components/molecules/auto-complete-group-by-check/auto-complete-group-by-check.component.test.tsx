import React from 'react';
import {render} from '@testing-library/react';
import {AutoCompleteGroupByCheck} from './auto-complete-group-by-check.component';

it('render autoCompleteGroupByCheck correctly', () => {
  const autoCompleteGroupByCheck = render(
    <AutoCompleteGroupByCheck
      defaultItem={[]}
      hasError={false}
      onChange={() => jest.fn()}
    />,
  );
  expect(autoCompleteGroupByCheck).toMatchSnapshot();
});
