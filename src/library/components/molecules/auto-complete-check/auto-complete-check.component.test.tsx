import React from 'react';
import {render} from '@testing-library/react';
import {AutocompleteCheck} from './auto-complete-check.component';

describe('AutocompleteCheck component', () => {
  it('render autocompleteCheck correctly', () => {
    const autoCompleteCheck = render(
      <AutocompleteCheck onUpdate={() => jest.fn()} />,
    );
    expect(autoCompleteCheck).toMatchSnapshot();
  });
});
