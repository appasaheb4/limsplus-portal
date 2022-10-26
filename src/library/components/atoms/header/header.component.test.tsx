import React from 'react';
import {render} from '@testing-library/react';
import {
  Header,
  Heading,
  PageHeading,
  PageHeadingLabDetails,
} from './header.component';

describe('Header component', () => {
  it('render header correctly', () => {
    const head = render(<Header />);
    expect(head).toMatchSnapshot();
  });
});

describe('Heading component', () => {
  it('render imagebackground correctly', () => {
    const heading = render(<Heading title='frefg' />);
    expect(heading).toMatchSnapshot();
  });
});

describe('PageHeading component', () => {
  it('render pageHeading correctly', () => {
    const pageHeading = render(<PageHeading title='frefg' />);
    expect(pageHeading).toMatchSnapshot();
  });
});

describe('PageHeadingLabDetails component', () => {
  it('render pageHeadingLabDetails correctly', () => {
    const pageHeadingLab = render(<PageHeadingLabDetails store={[]} />);
    expect(pageHeadingLab).toMatchSnapshot();
  });
});
