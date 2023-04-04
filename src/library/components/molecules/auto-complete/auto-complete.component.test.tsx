import React from 'react';
import {render} from '@testing-library/react';
import {AutoComplete} from './auto-complete.component';

describe('AutoComplete component', () => {
  it('render autoComplete correctly', () => {
    const autoComplete = render(<AutoComplete onChange={value => jest.fn()} />);
    expect(autoComplete).toMatchSnapshot();
  });
});
