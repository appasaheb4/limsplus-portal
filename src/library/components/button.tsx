import React from "react";
import { IconProps } from "./icon";

interface ButtonProps {
  type?: "solid" | "outline";
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  icon?: React.FunctionComponent<IconProps>;
  pill?: boolean;
  disabled?: string;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const buttonSizeClass =
    props.size === "small"
      ? `px-2 py-1 text-xs`
      : props.size === "large"
      ? `px-4 py-2 text-base`
      : "px-3 py-2 text-sm";

  const buttonColorClass =
    props.type === "solid"
      ? "text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
      : "text-gray-600 border border-gray-400 hover:shadow-lg";

  const roundedClass = props.pill ? "rounded-full" : "rounded-lg";

  const Icon = props.icon;

  return (
    <button
      onClick={props.onClick}
      type="button"
      disabled={!!props.disabled}
      title={props.disabled}
      className={`inline-flex items-center ${buttonSizeClass} ${roundedClass} shadow-sm  font-medium ${buttonColorClass} disabled:opacity-50 disabled:cursor-not-allowed text-center`}
    >
      {Icon && (
        <Icon
          size={props.size}
          type={props.type === "solid" ? "inverse" : "solid"}
          buttonOffset
        />
      )}
      {props.children}
    </button>
  );
};

export default Button;
