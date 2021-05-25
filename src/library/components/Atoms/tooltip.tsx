import React, { useRef } from "react"

interface TooltipProps {
  tooltipText?: any
}

const Tooltip: React.FunctionComponent<TooltipProps> = (props) => {
  const tipRef = useRef(null)

  const handleMouseEnter = (tipRef) => {
    tipRef.current.style.opacity = 1
    // tipRef.current.style.marginLeft = "20px"
  }
  function handleMouseLeave(tipRef) {
    tipRef.current.style.opacity = 0
    // tipRef.current.style.marginLeft = "10px"
  }
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => handleMouseEnter(tipRef)}
      onMouseLeave={() => handleMouseLeave(tipRef)}
    >
      <div
        className="absolute whitespace-no-wrap bg-gradient-to-r from-black to-gray-700 text-white px-4 py-2 rounded flex items-center transition-all duration-150 z-50"
        style={{ left: -20, bottom: -50, opacity: 0 }}
        ref={tipRef}
      >
        <div
          className="bg-black h-3 w-3 absolute"
          style={{ top: "-6px", transform: "rotate(45deg)" }}
        />
        <div dangerouslySetInnerHTML={{ __html: props.tooltipText }} />
      </div>
      {props.children}
    </div>
  )
}
export default Tooltip
