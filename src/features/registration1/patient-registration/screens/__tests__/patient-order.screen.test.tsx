// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import {PatientOrder} from '..';

describe('PatientOrder Screen', () => {
  it('render patientOrder correctly', () => {
    const patientOrder = render(<PatientOrder />);
    expect(patientOrder).toMatchSnapshot();
  });
});
