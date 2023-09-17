/* eslint-disable folders/match-regex */
import React from 'react';
import { render } from '@testing-library/react';
import { NoticeBoard } from '../screens';

describe('NoticeBoard Screen', () => {
  it('render noticeBoard correctly', () => {
    const noticeBoard = render(<NoticeBoard />);
    expect(noticeBoard).toMatchSnapshot();
  });
});
