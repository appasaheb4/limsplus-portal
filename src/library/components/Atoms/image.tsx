import React from "react"

interface ImageProps {
  source: string
  height?: number
  widht?: number
  fit?: "cover" | "contain" | "auto"
  position?:
    | "bottom"
    | "center"
    | "left"
    | "left-bottom"
    | "left-top"
    | "right"
    | "right-bottom"
    | "right-top"
    | "top"
  background?: "fill" | "plain"
  className?: string
  onClick?: () => void
}

const Image = (props: ImageProps) => {
  return (
    <img
      className="m-4 content-center"
      src={props.source}
      style={{
        width: props.widht,
        height: props.height,
        display: "block",
        position: "relative",
        left: "10%",
      }}
      alt="image"
      onClick={() => props.onClick && props.onClick()}
    />
  )
}

export default Image
