import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AutoComplete} from './auto-complete.component';

describe('AutoComplete component', () => {
  it('render autoComplete correctly', () => {
    const autoComplete = render(<AutoComplete onChange={value => jest.fn()} />);
    expect(autoComplete).toMatchSnapshot();
  });
});
