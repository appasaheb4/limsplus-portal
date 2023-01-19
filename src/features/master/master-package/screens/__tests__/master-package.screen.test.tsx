// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {MasterPackage} from '..';

describe('MasterPackage Screen', () => {
  it('render masterPackage correctly', () => {
    const masterPackage = render(<MasterPackage />);
    expect(masterPackage).toMatchSnapshot();
  });
});
