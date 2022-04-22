import React from 'react';
import {render} from '@utils';
import {AutoCompleteGroupByCheck} from './AutoCompleteGroupByCheck.component';

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
