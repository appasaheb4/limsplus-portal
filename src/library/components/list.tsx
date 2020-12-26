import React from "react";

interface ListProps {
  direction?: "row" | "col";
  space?: number;
  padding?: boolean;
  background?: boolean;
  align?: "start" | "between" | "center" | "end";
  justify?: "start" | "end" | "center" | "stretch";
  fill?: boolean;
}

const List: React.FunctionComponent<ListProps> = (props) => {
  const spacingClass = props.space
    ? `space-${props.direction === "col" ? "y" : "x"}-${props.space}`
    : "";

  const paddingClass = props.padding ? `p-${props.space}` : "";

  const backgroundClass = props.background ? "bg-gray-100" : "";

  const alignClass = props.align ? `justify-${props.align}` : "";
  const justifyClass = props.justify ? `items-${props.justify}` : "items-center";

  const fillClass = props.fill ? "flex-1" : "";
  return (
    <span
      className={`flex flex-${
        props.direction || "row"
      } ${spacingClass} ${paddingClass} ${backgroundClass} ${alignClass} ${fillClass} ${justifyClass}`}
    >
      {props.children}
    </span>
  );
};

export default List;
