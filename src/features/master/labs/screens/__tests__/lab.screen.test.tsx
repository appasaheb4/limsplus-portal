// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {Lab} from '..';

describe('Lab Screen', () => {
  it('render lab correctly', () => {
    const lab = render(<Lab />);
    expect(lab).toMatchSnapshot();
  });
});
