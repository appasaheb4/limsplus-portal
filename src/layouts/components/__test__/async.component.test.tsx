// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import async from '../async.component';
import {act} from 'react-dom/test-utils';

describe('asyncComponent component', () => {
  xit('render asyncComponent correctly', () => {
    act(() => {
      async(() => import('../code.component'));
    });
  });
});
