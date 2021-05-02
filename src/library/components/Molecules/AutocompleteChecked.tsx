/* eslint-disable  */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import lodash from "lodash"
import * as LibraryUtils from "@lp/library/utils"

interface AutocompleteCheckedProps {
  data?: any
  defaultData?: any[]
  onUpdate?: (item: any) => void
}

const AutocompleteChecked = observer((props: AutocompleteCheckedProps) => {
  const [data, setData] = useState<any[]>()
  const [options, setOptions] = useState<any[]>()
  const [originalOptions, setOriginalOptions] = useState<any[]>()
  const [isChangesItem, setIsChangesItem] = useState<boolean>(false)
  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false)
  let count = 0
  const getSelectedItem = (defulatValues: any, list: any[], findKey: string) => {
    if (count === 0) {
      const finalList = list.filter((item, index) => {
        defulatValues.find((rItem, index) => {
          if (rItem[findKey] === item[findKey]) {
            item.selected = true
          }
        })
        count++
        return item
      })
      console.log({ finalList })
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
    setIsChangesItem(!isChangesItem)
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
    setIsShowDropDown(true)
    const search = e.target.value
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
      <div
        className="p-2"
        onMouseLeave={() => {
          if (originalOptions && options) {
            if (isChangesItem) {
              props.onUpdate &&
                props.onUpdate(options.filter((item) => item.selected === true))
            }
          }
        }}
      >
        <input
          placeholder="Search ..."
          //   value={props.value}
          className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
          onKeyUp={onKeyUp}
          onChange={onChange}
          onClick={() => setIsShowDropDown(true)}
        />
        {options && isShowDropDown
          ? options?.length > 0 && (
              <div className="mt-1">
                <ul className="bg-white p-2 rounded-sm">
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
                          {item.name || item.description}
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
export default AutocompleteChecked
