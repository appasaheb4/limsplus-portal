import React from 'react';
import {render} from '@testing-library/react';
import {AutoComplete} from './auto-complete.component';

it('render autoComplete correctly', () => {
  const autoComplete = render(
    <AutoComplete hasError={false} onChange={() => jest.fn()} />,
  );
  expect(autoComplete).toMatchSnapshot();
});
