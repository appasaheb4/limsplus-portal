import React from 'react';
import {render} from '@utils';
import {AutocompleteCheck} from './AutocompleteCheck.component';

it('render autocompleteCheck correctly', () => {
  const autocompleteCheck = render(
    <AutocompleteCheck hasError={false} onUpdate={() => jest.fn()} />,
  );
  expect(autocompleteCheck).toMatchSnapshot();
});
