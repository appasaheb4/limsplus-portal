import React from 'react';
import {render} from '@testing-library/react';
import {GeneralSettings} from './general-setting.screen';

describe('GeneralSettings Screen', () => {
  it('render generalSettings correctly', () => {
    const generalSettings = render(<GeneralSettings />);
    expect(generalSettings).toMatchSnapshot();
  });
});
