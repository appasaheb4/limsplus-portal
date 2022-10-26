// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {PageSetting} from '../page-setting.screen';

describe('PageSetting Screen', () => {
  it('render pageSetting correctly', () => {
    const pageSetting = render(<PageSetting />);
    expect(pageSetting).toMatchSnapshot();
  });
});
