import React, { useState } from "react"

export const NumberFilter = (props) => {
  const [number, setNumber] = useState("")
  const [comparator, setComparator] = useState("=")

  const filter = (number, comparator) => {
    props.onFilter({
      number,
      comparator,
    })
  }
  const comparatorList = [
    { value: "=" },
    { value: "!=" },
    { value: ">" },
    { value: ">=" },
    { value: "<" },
    { value: "<=" },
  ]

  return (
    <>
      <div className="flex-row gap-2 inline">
        {!/[.,]/.test(number) && (
          <select
            value={comparator}
            className={`leading-4 p-2 focus:outline-none focus:ring shadow-sm sm:text-base border-2 border-gray-300 rounded-md text-black w-25`}
            onChange={(e) => {
              const comp = e.target.value
              setComparator(comp)
              filter(number, comp)
            }}
          >
            <option selected>Select</option>
            {comparatorList.map((item: any) => (
              <option key={item.value} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        <input
          type="text"
          placeholder="Enter value..."
          value={number}
          className="leading-4 p-2 focus:outline-none focus:ring shadow-sm sm:text-base border-2 border-gray-300 rounded-md text-black ml-1"
          onChange={(e) => {
            const num = e.target.value
            console.log({ num })
            const re = /^[0-9.,]+$|^$/
            if (re.test(num)) {
              setNumber(num)
              filter(num, comparator)
            } else {
              setNumber(number)
            }
          }}
        />
      </div>
    </>
  )
}
