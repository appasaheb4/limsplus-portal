import React from 'react';
import {render} from '@utils';
import {AutocompleteCheck} from './auto-complete-check.component';

it('render autocompleteCheck correctly', () => {
  const autocompleteCheck = render(
    <AutocompleteCheck hasError={false} onUpdate={() => jest.fn()} />,
  );
  expect(autocompleteCheck).toMatchSnapshot();
});
