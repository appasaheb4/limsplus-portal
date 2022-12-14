// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {PatientTest} from '..';

describe('PatientTest Screen', () => {
  it('render patientTest correctly', () => {
    const patientTest = render(<PatientTest />);
    expect(patientTest).toMatchSnapshot();
  });
});
