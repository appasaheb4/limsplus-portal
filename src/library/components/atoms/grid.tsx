import React from 'react';

interface GridProps {
  cols?: number;
  children?: React.ReactNode;
}

export const Grid: React.FunctionComponent<GridProps> = props => (
  <div
    className={`xl:grid sm:inline-block grid-cols-${
      props.cols || 1
    } gap-3 flex-1`}
  >
    {props.children}
  </div>
);
