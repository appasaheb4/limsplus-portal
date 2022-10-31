// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {Doctors} from '..';

describe('Doctors Screen', () => {
  it('render doctor correctly', () => {
    const doctor = render(<Doctors />);
    expect(doctor).toMatchSnapshot();
  });
});
