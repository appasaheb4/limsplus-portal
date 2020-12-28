import React from "react";

interface ImageProps {
  source: string;
  fit: "cover" | "contain" | "auto";
  position:
    | "bottom"
    | "center"
    | "left"
    | "left-bottom"
    | "left-top"
    | "right"
    | "right-bottom"
    | "right-top"
    | "top";
  background?: "fill" | "plain";
  className?: string
}

const Image = (props: ImageProps) => {
  const backgroundColorClass =
    props.background === "fill" ? "bg-gray-200" : "bg-transparent";
  const backgroundPositionClass = `bg-${props.position}`;
  const backgroundSizeClass =
    props.fit === "cover"
      ? "bg-cover"
      : props.fit === "contain"
      ? "bg-contain"
      : "";

  return (
    <div
      style={{ backgroundImage: `url(${props.source})` }}
      className={`${props.className} bg-no-repeat ${backgroundSizeClass} ${backgroundColorClass} ${backgroundPositionClass}`}
    ></div>
  );
};

export default Image;
