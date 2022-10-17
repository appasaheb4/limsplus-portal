// eslint-disable-next-line folders/match-regex
import React from 'react';
import {render} from '@testing-library/react';
import PanelApproval from '../panel-approval.screen';

describe('PanelApproval Screen', () => {
  it('render PanelApproval correctly', () => {
    const deliveryQueue = render(<PanelApproval />);
    expect(deliveryQueue).toMatchSnapshot();
  });
});
