/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import { observer } from "mobx-react"
import {Icons} from ".."

interface AutoCompleteCheckMultiFilterKeysProps {
  placeholder?: string
  hasError?: boolean
  data?: {
    defulatValues?: any[]
    list?: any[]
    displayKey?: string[]
    findKey?: string[]
  }
  defaultData?: any[]
  onUpdate?: (item: any) => void
  onFilter?: (value: string) => void
}

export const AutoCompleteCheckMultiFilterKeys = observer(
  (props: AutoCompleteCheckMultiFilterKeysProps) => {
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

    const getSelectedItem = (
      defulatValues: any[],
      list?: any[],
      findKey?: string[]
    ) => {
      if (count === 0 && list && findKey) {
        //console.log({ defulatValues, list })
        const finalList = list.filter((item, index) => {
          defulatValues.length > 0 &&
            defulatValues.find((rItem, index) => {
              findKey.filter((findItem) => {
                if (rItem[findItem] === item[findItem]) {
                  item.selected = true
                }
              })
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
      if (props) {
        setOriginalOptions(
          getSelectedItem(
            (props.data && props.data.defulatValues) || [],
            props.data && props.data.list,
            props.data && props.data.findKey
          )
        )
        setOptions(
          getSelectedItem(
            (props.data && props.data.defulatValues) || [],
            props.data && props.data.list,
            props.data && props.data.findKey
          )
        )
      }
    }, [props])

    const onChangeItem = (item: any, index: number) => {
      if (options) {
        options[index].selected = item.selected ? false : true
      }
      setIsListOpen(true)
      setOptions(options)
    }

    // const filter = (search, data) => {
    //   if (search) {
    //     const filterArray = data.filter((item) => {
    //       const filed: any = props.data?.findKey?.filter((findKey) => {
    //         const value = item[findKey]
    //         return value.toLowerCase().indexOf(search.toLowerCase()) > -1
    //       })
    //       const value = item[filed[0]]
    //       console.log({ value })
    //       if (value) {
    //         return value.toLowerCase().indexOf(search.toLowerCase()) > -1
    //       } else {
    //         return
    //       }
    //     })

    //     console.log({ filterArray })
    //     setOptions(filterArray)
    //   } else {
    //     setOptions(originalOptions)
    //   }
    // }

    const onChange = (e) => {
      const search = e.target.value
      setValue(search)
      props.onFilter && props.onFilter(search)
    }

    const onKeyUp = (e) => {
      const charCode = e.which ? e.which : e.keyCode
      if (charCode === 8) {
        const search = e.target.value
        props.onFilter && props.onFilter(search)
      }
    }

    return (
      <>
        <div ref={wrapperRef}>
          <div
            className={`flex items-center leading-4 p-2 focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2 ${
              props.hasError ? "border-red-500" : "border-gray-300"
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
              className="w-full focus:outline-none bg-none"
              onKeyUp={onKeyUp}
              onChange={onChange}
              onClick={() => setIsListOpen(true)}
            />
            {isListOpen ? (
              <Icons.IconFa.FaChevronUp />
            ) : (
              <Icons.IconFa.FaChevronDown />
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
                            {props.data?.displayKey
                              ?.map((findKey) => item[findKey])
                              .join(" - ")}
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
)
