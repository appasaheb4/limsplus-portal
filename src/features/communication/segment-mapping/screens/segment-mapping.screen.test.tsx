import React from 'react';
import {render} from '@testing-library/react';
import SegmentMapping from './segment-mapping.screen';

describe('SegmentMapping Screen', () => {
  it('render segmentMapping correctly', () => {
    const segmentMapping = render(<SegmentMapping />);
    expect(segmentMapping).toMatchSnapshot();
  });
});
