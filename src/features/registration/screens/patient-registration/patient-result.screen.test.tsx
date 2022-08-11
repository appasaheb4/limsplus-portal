import React from 'react';
import {render} from '@testing-library/react';
import {PatientResult} from '..';

describe('PatientResult Screen', () => {
  it('render patientResult correctly', () => {
    const patientResult = render(<PatientResult />);
    expect(patientResult).toMatchSnapshot();
  });
});
