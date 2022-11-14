//eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {MasterAnalyte} from '..';

describe('MasterAnalyte Screen', () => {
  it('render masterAnalyte correctly', () => {
    const masterAnalyte = render(<MasterAnalyte />);
    expect(masterAnalyte).toMatchSnapshot();
  });
});
