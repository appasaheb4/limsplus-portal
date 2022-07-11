// eslint-disable-next-line folders/match-regex
import React, {Component} from 'react';
import {render, cleanup} from '@testing-library/react';
import ReactDOM from 'react-dom';
import async from '../async.component';
import Footer from '../footer.component';
import {act} from 'react-dom/test-utils';

describe('asyncComponent component', () => {
  it('should render correct', () => {
    act(() => {
      jest.mock('', () => {
        return {
          State: {
            component: jest.fn(),
          },
          component: jest.fn(),
        };
      });
      const hocAsyncComp = async(() => import('../footer.component'));

      expect(hocAsyncComp).toBeDefined();
      expect(hocAsyncComp).toMatchSnapshot();
    });
  });
});
