import React from "react"

interface PageHeadingProps {
    title: string
  }
export const Heading: React.FunctionComponent<PageHeadingProps> = (props) => (
  <div className="text-center border-b border-gray-300 bg-white sticky top-14 z-20 font-FugazOne">
    <h2 className="text-lg font-bold leading-4 text-gray-900 mt-0">{props.title}</h2>
  </div>
)
  