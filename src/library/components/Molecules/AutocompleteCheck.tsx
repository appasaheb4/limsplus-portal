/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import { observer } from "mobx-react"
import lodash from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"

interface AutocompleteCheckProps {
  placeholder?: string
  data?: any
  defaultData?: any[]
  hasError?: boolean
  onUpdate?: (item: any) => void
}

export const AutocompleteCheck = observer((props: AutocompleteCheckProps) => {
  const [value, setValue] = useState<string>("")
  const [options, setOptions] = useState<any[]>()
  const [originalOptions, setOriginalOptions] = useState<any[]>()
  const [isListOpen, setIsListOpen] = useState<boolean>(false)

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && isListOpen) {
          if (originalOptions && options) {
            if (isListOpen) {
              props.onUpdate &&
                props.onUpdate(options.filter((item) => item.selected === true))
            }
          }
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
  let count = 0
  const getSelectedItem = (defulatValues: any, list: any[], findKey: string) => {
    if (count === 0) {
      //console.log({ defulatValues, list })
      const finalList = list.filter((item, index) => {
        defulatValues.length > 0 &&
          defulatValues.find((rItem, index) => {
            if (rItem[findKey] === item[findKey]) {
              item.selected = true
            }
          })
        count++
        return item
      })
      // console.log({ finalList })
      list = finalList
    }
    return list
  }

  useEffect(() => {
    setOriginalOptions(
      getSelectedItem(props.data.defulatValues, props.data.list, props.data.findKey)
    )
    setOptions(
      getSelectedItem(props.data.defulatValues, props.data.list, props.data.findKey)
    )
  }, [props])

  const onChangeItem = (item: any, index: number) => {
    if (options) {
      options[index].selected = item.selected ? false : true
    }
    setIsListOpen(true)
    setOptions(options)
  }

  const filter = (search, data) => {
    if (search) {
      const filterArray = data.filter((item) => {
        const value = item.name || item.description
        return value.toLowerCase().indexOf(search.toLowerCase()) > -1
      })
      setOptions(filterArray)
    } else {
      setOptions(originalOptions)
    }
  }

  const onChange = (e) => {
    const search = e.target.value
    setValue(search)
    filter(search, options)
  }

  const onKeyUp = (e) => {
    const charCode = e.which ? e.which : e.keyCode
    if (charCode === 8) {
      const search = e.target.value
      filter(search, originalOptions)
    }
  }

  return (
    <>
      <div ref={wrapperRef}>
        <div
          className={`flex items-center leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500  w-full shadow-sm sm:text-base border-2 ${
            props.hasError
              ? "border-red-500  focus:border-red-500"
              : "border-gray-300"
          } rounded-md`}
        >
          <input
            placeholder={props.placeholder || "Search ..."}
            value={
              !isListOpen
                ? `${
                    options?.filter((item) => item.selected === true).length || 0
                  } Items`
                : value
            }
            className={`w-full focus:outline-none bg-none`}
            onKeyUp={onKeyUp}
            onChange={onChange}
            onClick={() => setIsListOpen(true)}
          />
          {isListOpen ? (
            <LibraryComponents.Atoms.Icons.IconFa.FaChevronUp />
          ) : (
            <LibraryComponents.Atoms.Icons.IconFa.FaChevronDown />
          )}
        </div>

        {options && isListOpen
          ? options?.length > 0 && (
              <div className="mt-1 absolute bg-gray-100 p-2 rounded-sm z-50">
                <ul>
                  {options?.map((item, index) => (
                    <>
                      <li key={index} className="text-gray-400 flex items-center">
                        <input
                          type="checkbox"
                          name={item.code}
                          value={item.code}
                          checked={item.selected}
                          onChange={() => onChangeItem(item, index)}
                        />{" "}
                        <label className="ml-2 mt-1 text-black">
                          {" "}
                          {item[props.data.displayKey]}
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
})
