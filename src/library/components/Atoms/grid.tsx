import React from "react";

interface GridProps {
  cols?: number;
}

const Grid: React.FunctionComponent<GridProps> = (props) => (
  <div className={`grid grid-cols-${props.cols || 1} gap-3 flex-1`}>
    {props.children}
  </div>
);

export default Grid;
