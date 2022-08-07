import React from 'react';
import {render} from '@testing-library/react';
import {ShortcutMenu} from '.';

describe('ShortcutMenu Screen', () => {
  it('render shortcutMenu correctly', () => {
    const shortcutMenu = render(<ShortcutMenu />);
    expect(shortcutMenu).toMatchSnapshot();
  });
});
