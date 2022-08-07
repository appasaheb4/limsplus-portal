import React from 'react';
import {render} from '@testing-library/react';
import {DataConversation} from '.';

describe('DataConversation Screen', () => {
  it('render dataConversation correctly', () => {
    const dataConversation = render(<DataConversation />);
    expect(dataConversation).toMatchSnapshot();
  });
});
