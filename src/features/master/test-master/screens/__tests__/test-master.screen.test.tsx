// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {TestMater} from '..';

describe('TestMater Screen', () => {
  it('render testMater correctly', () => {
    const testMater = render(<TestMater />);
    expect(testMater).toMatchSnapshot();
  });
});
