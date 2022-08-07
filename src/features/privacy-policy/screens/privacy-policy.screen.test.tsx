import React from 'react';
import {render} from '@testing-library/react';
import {PrivacyPolicy} from '.';

describe('PrivacyPolicy Screen', () => {
  it('render privacyPolicy correctly', () => {
    const privacyPolicy = render(<PrivacyPolicy />);
    expect(privacyPolicy).toMatchSnapshot();
  });
});
