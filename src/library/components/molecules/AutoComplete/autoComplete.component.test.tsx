import React from 'react';
import {render} from '@utils';
import {AutoComplete} from './AutoComplete.component';

it('render autoComplete correctly', () => {
  const autoComplete = render(
    <AutoComplete hasError={false} onChange={() => jest.fn()} />,
  );
  expect(autoComplete).toMatchSnapshot();
});
