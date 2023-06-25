/* eslint-disable folders/match-regex */
import React from 'react';
import {render} from '@testing-library/react';
import {ShortcutMenu} from '../screens';

describe('ShortcutMenu Screen', () => {
  it('render shortcutMenu correctly', () => {
    const shortcutMenu = render(<ShortcutMenu />);
    expect(shortcutMenu).toMatchSnapshot();
  });
});
