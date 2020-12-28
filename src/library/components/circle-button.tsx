import React from "react";

interface CircleButtonProps {
  backgroundColor?: string;
}

const CircleButton: React.FunctionComponent<CircleButtonProps> = (props) => (
  <div
    style={{ backgroundColor: props.backgroundColor }}
    className="rounded-full h-7 w-7 border border-gray-200 text-gray-400 flex justify-center items-center"
  >
    {props.children}
  </div>
);

export default CircleButton;
