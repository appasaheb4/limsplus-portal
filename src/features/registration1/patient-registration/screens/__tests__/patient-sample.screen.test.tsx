// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {PatientSample} from '..';

describe('PatientSample Screen', () => {
  it('render patientSample correctly', () => {
    const patientSample = render(<PatientSample />);
    expect(patientSample).toMatchSnapshot();
  });
});
