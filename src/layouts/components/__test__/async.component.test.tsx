// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import async from '../async.component';
import {act} from 'react-dom/test-utils';

describe('asyncComponent component', () => {
  it('render asyncComponent correctly', () => {
    act(() => {
      //   const button = render(async(() => import('../code.component')));
      //   expect(button).toMatchSnapshot();
    });
  });
});
