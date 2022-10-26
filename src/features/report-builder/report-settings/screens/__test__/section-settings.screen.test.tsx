// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {SectionSettings} from '../section-settings.screen';

describe('SectionSettings Screen', () => {
  it('render sectionSettings correctly', () => {
    const sectionSettings = render(<SectionSettings />);
    expect(sectionSettings).toMatchSnapshot();
  });
});
