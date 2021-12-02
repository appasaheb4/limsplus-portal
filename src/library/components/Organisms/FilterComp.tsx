import React from "react"
export const NumberFilter = (props) => {
  const filter = (value) => {
    props.onFilter(value)
  }
  return (
    <>
      <input
        key="input"
        type="text"
        placeholder="Input price"
        onChange={(value) => filter(value)}
      />
    </>
  )
}
