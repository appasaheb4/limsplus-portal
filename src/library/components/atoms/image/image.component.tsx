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

export const Image = (props: ImageProps) => {
  return (
    <img
      className="m-4 rounded-md object-fill"
      src={props.source}
      style={{
        width: props.widht,
        height: props.height,
        display: "block",
        position: "relative",
        left: "10%",
      }}
      alt="limsplus"
      onClick={() => props.onClick && props.onClick()}
    />
  )
}

interface BgImageProps {
  source: string
  fit: "cover" | "contain" | "auto"
  position:
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
}

export const ImageBackground = (props: BgImageProps) => {
  const backgroundColorClass =
    props.background === "fill" ? "bg-gray-200" : "bg-transparent"
  const backgroundPositionClass = `bg-${props.position}`
  const backgroundSizeClass =
    props.fit === "cover" ? "bg-cover" : props.fit === "contain" ? "bg-contain" : ""
  return (
    <div
      style={{ backgroundImage: `url(${props.source})` }}
      className={`${props.className} bg-no-repeat ${backgroundSizeClass} ${backgroundColorClass} ${backgroundPositionClass}`}
    ></div>
  )
}
