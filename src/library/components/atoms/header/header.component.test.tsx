import React from 'react';
import {render} from '@utils';
import {Header, PageHeading, PageHeadingLabDetails} from './header.component';

it('render header correctly', () => {
  const header = render(<Header> Im Heading</Header>);
  expect(header).toMatchSnapshot();
});

it('render pageHeading correctly', () => {
  const pageHeading = render(<PageHeading title="Im Page Title" />);
  expect(pageHeading).toMatchSnapshot();
});
it('render pageHeadingLabDetails correctly', () => {
  const pageHeadingLabDetails = render(<PageHeadingLabDetails store={''} />);
  expect(pageHeadingLabDetails).toMatchSnapshot();
});
