import React from 'react';
import {render} from '@testing-library/react';
import {Department} from '.';

describe('Department Screen', () => {
  it('render department correctly', () => {
    const department = render(<Department />);
    expect(department).toMatchSnapshot();
  });
});
