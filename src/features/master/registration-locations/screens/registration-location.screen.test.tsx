import React from 'react';
import {render} from '@testing-library/react';
import {RegistrationLocation} from '.';

describe('RegistrationLocation Screen', () => {
  it('render registrationLocation correctly', () => {
    const registrationLocation = render(<RegistrationLocation />);
    expect(registrationLocation).toMatchSnapshot();
  });
});
