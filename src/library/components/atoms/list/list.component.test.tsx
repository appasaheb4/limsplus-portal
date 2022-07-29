import React from 'react';
import {render} from '@testing-library/react';
import {List} from './list.component';

describe('List component', () => {
  it('render list correctly', () => {
    const list = render(<List />);
    expect(list).toMatchSnapshot();
  });
});
