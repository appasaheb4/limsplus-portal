/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import { Spinner } from "react-bootstrap"
import {Icons} from ".."

interface AutoCompleteFilterSingleSelectProps {
  loader?: boolean
  disable?: boolean
  displayValue?: string
  placeholder?: string
  data: any
  hasError?: boolean
  onFilter: (item: any) => void
  onSelect: (item: any) => any
}

export const AutoCompleteFilterSingleSelect = ({
  disable = false,
  loader = false,
  displayValue = "",
  placeholder = "Search...",
  data,
  hasError = false,
  onFilter,
  onSelect,
}: AutoCompleteFilterSingleSelectProps) => {
  const [value, setValue] = useState<string>(displayValue)
  const [options, setOptions] = useState<any[]>()
  const [isListOpen, setIsListOpen] = useState<boolean>(false)

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && isListOpen) {
          setIsListOpen(false)
          setValue("")
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [ref, isListOpen])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  useEffect(() => {
    setOptions(data.list)
  }, [data])

  useEffect(() => {
    setValue(displayValue)
  }, [displayValue])

  const onChange = (e) => {
    const search = e.target.value
    setValue(search)
    onFilter(search)
  }

  const onKeyUp = (e) => {
    const charCode = e.which ? e.which : e.keyCode
    if (charCode === 8) {
      const search = e.target.value
      onFilter(search)
    }
  }

  return (
    <>
      <div ref={wrapperRef}>
        <div
          className={`flex items-center leading-4 p-2 focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2 ${
            hasError ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        >
          <input
            placeholder={placeholder}
            value={!isListOpen ? value : value}
            className={`w-full focus:outline-none bg-none`}
            onKeyUp={onKeyUp}
            onChange={onChange}
            onClick={() => setIsListOpen(true)}
            disabled={disable}
          />
          {loader && <Spinner animation="border" className="mr-2 h-4 w-4" />}
          {isListOpen ? (
            <Icons.IconFa.FaChevronUp />
          ) : (
            <Icons.IconFa.FaChevronDown />
          )}
        </div>

        {options && isListOpen
          ? options.length > 0 && (
              <div className="mt-1 absolute bg-gray-100 p-2 rounded-sm z-50">
                <ul>
                  {options?.map((item, index) => (
                    <>
                      <li
                        key={index}
                        className="text-gray-400 flex items-center"
                        onClick={() => {
                          setValue(item[data.displayKey])
                          setIsListOpen(false)
                          onSelect(item)
                        }}
                      >
                        {" "}
                        <label className="ml-2 mt-1 text-black">
                          {" "}
                          {item[data.displayKey]}
                        </label>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            )
          : null}
      </div>
    </>
  )
}
