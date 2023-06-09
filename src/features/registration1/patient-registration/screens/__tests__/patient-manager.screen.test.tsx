// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {PatientManager} from '..';

describe('PatientManager Screen', () => {
  it('render patientManager correctly', () => {
    const patientManager = render(<PatientManager />);
    expect(patientManager).toMatchSnapshot();
  });
});
