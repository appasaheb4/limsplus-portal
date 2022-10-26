// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {MasterPanel} from '..';

describe('MasterPanel Screen', () => {
  it('render masterPanel correctly', () => {
    const masterPanel = render(<MasterPanel />);
    expect(masterPanel).toMatchSnapshot();
  });
});
