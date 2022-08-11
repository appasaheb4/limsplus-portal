import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {AutoCompleteGroupByCheck} from './auto-complete-group-by-check.component';

describe('AutoCompleteGroupByCheck component', () => {
  it('render autoCompleteGroupByCheck correctly', () => {
    const autoCompleteGroupByCheck = render(
      <AutoCompleteGroupByCheck
        defaultItem={[{}]}
        onChange={() => jest.fn()}
        onClose={() => jest.fn()}
      />,
    );
    expect(autoCompleteGroupByCheck).toMatchSnapshot();
  });
});
