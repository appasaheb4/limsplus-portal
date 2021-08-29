import React, { CSSProperties } from "react";

interface CircleButtonProps {
  style?: CSSProperties;
  onClick: () => void;
}

const CircleButton: React.FunctionComponent<CircleButtonProps> = (props) => (
  <div
    style={props.style}
    className="rounded-full h-7 w-7 border border-gray-300 text-gray-400 flex justify-center items-center"
    onClick={props.onClick}
  >
    {props.children}
  </div>
);

export default CircleButton;
