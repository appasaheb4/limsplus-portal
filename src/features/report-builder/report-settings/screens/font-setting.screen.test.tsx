import React from 'react';
import {render} from '@testing-library/react';
import {FontSetting} from './font-setting.screen';

describe('FontSetting Screen', () => {
  it('render fontSetting correctly', () => {
    const fontSetting = render(<FontSetting />);
    expect(fontSetting).toMatchSnapshot();
  });
});
