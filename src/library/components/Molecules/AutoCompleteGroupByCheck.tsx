/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import {Icons} from ".."
import _ from "lodash"

interface AutoCompleteGroupByCheckProps {
  data?: any[]
  defaultItem: Array<any>
  onChange?: (item: any) => void
  hasError?: boolean
  onClose?: () => void
}

export const AutoCompleteGroupByCheck = (props: AutoCompleteGroupByCheckProps) => {
  //const [userRouter, setUserRouter] = useState<any>()
  const [data, setData] = useState<any[]>()
  const [options, setOptions] = useState<any[]>()
  const [isListOpen, setIsListOpen] = useState<boolean>(false)
  const selectedOptionsRef = useRef<Array<any>>([])

  const valueRef = useRef("")

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && isListOpen) {
          setIsListOpen(false)
          props.onChange && props.onChange(selectedOptionsRef.current)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [ref, isListOpen])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  useEffect(() => {
    if (props.data && props.defaultItem.length === 0) {
      var result = props.data.map((item) => {
        var item = Object.assign({}, item)
        const childrenItem = item.children.map((children) => {
          var record = Object.assign({}, children)
          record.selected = false
          return record
        })
        item.children = childrenItem
        return item
      })
      setData(result)
      setOptions(result)
    } else if (props.data && props.defaultItem.length > 0) {
      var result = props.data.map((item) => {
        var item = Object.assign({}, item)
        const childrenItem = item.children.map((children) => {
          children.selected = false
          props.defaultItem.filter((el) => {
            el.children.forEach((element) => {
              if (element.name == children.name) {
                children.selected = true
              }
            })
          })
          return children
        })
        item.children = childrenItem
        return item
      })
      setData(result)
      setOptions(result)
    }
  }, [props])

  const uniqByKeepFirst = (a, key) => {
    const seen = new Set()
    return a.filter((item) => {
      const k = key(item)
      return seen.has(k) ? false : seen.add(k)
    })
  }

  const filter = (search, data) => {
    if (search !== "") {
      let filterArray: any[] = []
      data.filter((item) => {
        item.children.filter((children) => {
          const childrenItem =
            children.title &&
            children.title.toLowerCase().indexOf(search.toLowerCase()) > -1
          if (childrenItem) {
            const isSameArray = filterArray.filter((filterItem, index) => {
              if (filterItem.name === item.name) {
                const newChildren = filterArray[index].children.concat(children)
                filterArray[index] = {
                  ...filterArray[index],
                  children: newChildren,
                }
              }
            })
            if (isSameArray.length < 1) {
              filterArray.push({ ...item, children: [children] })
            }
            const uniqueChars = uniqByKeepFirst(filterArray, (it) => it.name)
            filterArray = uniqueChars
          }
        })
      })
      setOptions(filterArray)
    } else {
      setOptions(data)
    }
  }

  // const onChange = (e) => {
  //   const search = e.target.value
  //   valueRef.current = search
  //   filter(search, data)
  // }

  // const onKeyUp = (e) => {
  //   const charCode = e.which ? e.which : e.keyCode
  //   if (charCode === 8) {
  //     const search = e.target.value
  //     filter(search, data)
  //   }
  // }

  const onChangeItem = (index: number, childrenIndex: number) => {
    if (options) {
      options[index].children[childrenIndex].selected = !options[index].children[
        childrenIndex
      ].selected
      let valueItem: Array<string> = []
      let selectedOptions: Array<any> = []
      options?.forEach((item) => {
        let childrenItem: Array<any> = []
        item.children.forEach((record) => {
          if (record.selected) {
            valueItem.push(record.title)
            childrenItem.push(record)
            selectedOptions.push({ ...item, children: childrenItem })
          }
        })
      })
      selectedOptions = _.uniqWith(selectedOptions, _.isEqual)
      valueRef.current = valueItem.join(", ")
      selectedOptionsRef.current = selectedOptions
    }
    setOptions(JSON.parse(JSON.stringify(options)))
    setIsListOpen(true)
  }

  return (
    <>
      <div ref={wrapperRef}>
        <div
          className={`flex items-center leading-4 p-2 bg-white focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2  ${
            props.hasError ? "border-red-500 " : "border-gray-300"
          } rounded-md`}
        >
          <input
            placeholder="Select item"
            value={valueRef.current}
            className="w-full focus:outline-none"
            //onKeyUp={onKeyUp}
            //onChange={onChange}
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
              <div className="mt-1 absolute z-50 border-gray-500 rounded-md bg-gray-200">
                <ul className="p-2 rounded-sm ">
                <div className='overflow-y-auto' style={{height:'auto',maxHeight:'350px'}}>
                {options?.map((item, index) => (
                    <>
                      <li key={index} className="text-gray-400">
                        {item.title}
                      </li>
                      <ul className="ml-4">
                        {item.children.map(
                          (children, childrenIndex) =>
                            children.title && (
                              <li
                                key={childrenIndex}
                                className="hover:bg-gray-200 focus:outline-none cursor-pointer"
                                onClick={async () => {
                                  onChangeItem(index, childrenIndex)
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={children.selected}
                                  className="mr-2"
                                />
                                {children.title}
                              </li>
                            )
                        )}
                      </ul>
                    </>
                  ))}
                </div>
                </ul>
              </div>
            )
          : null}
      </div>
    </>
  )
}   
