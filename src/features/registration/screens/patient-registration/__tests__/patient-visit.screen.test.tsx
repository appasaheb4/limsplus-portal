// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {PatientVisit} from '../..';

describe('PatientVisit Screen', () => {
  it('render patientVisit correctly', () => {
    const patientVisit = render(<PatientVisit />);
    expect(patientVisit).toMatchSnapshot();
  });
});
