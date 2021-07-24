/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"

import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
interface AutocompleteGroupByProps {
  data?: any[]
  onChange?: (item: any, children: any) => void
  onClose?: () => void
}
   
export const AutocompleteGroupBy = observer((props: AutocompleteGroupByProps) => {
  //const [userRouter, setUserRouter] = useState<any>()
  const [value, setValue] = useState<string>("")
  const [data, setData] = useState<any[]>()
  const [options, setOptions] = useState<any[]>()
  const [isListOpen, setIsListOpen] = useState<boolean>(false)

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && isListOpen) {
          setIsListOpen(false)
          setValue("")
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
    setData(props.data)
    setOptions(props.data)
  }, [props])

  // useEffect(() => {
  //   setUserRouter(stores.routerStore.userRouter)
  // }, [])

  const uniqByKeepFirst = (a, key) => {
    const seen = new Set()
    return a.filter((item) => {
      const k = key(item)
      return seen.has(k) ? false : seen.add(k)
    })
  }

  const filter = (search, data) => {
    console.log({ search })
    if (search !== "") {
      // const filteredOptions = options?.filter(
      //   (option) => option.title.toLowerCase().indexOf(search.toLowerCase()) > -1
      // )
      let filterArray: any[] = []
      data.filter((item) => {
        item.children.filter((children) => {
          const childrenItem =
            children.title.toLowerCase().indexOf(search.toLowerCase()) > -1
          if (childrenItem) {
            const isSameArray = filterArray.filter((filterItem, index) => {
              if (filterItem.name === item.name) {
                const newChildren = filterArray[index].children.concat(children)
                filterArray[index] = { ...filterArray[index], children: newChildren }
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
      //stores.routerStore.updateUserRouter(filterArray)
    } else {
      setOptions(data)
      //stores.routerStore.updateUserRouter(userRouter)
    }
  }

  const onChange = (e) => {
    const search = e.target.value
    setValue(search)
    filter(search, data)
  }

  const onKeyUp = (e) => {
    const charCode = e.which ? e.which : e.keyCode
    if (charCode === 8) {
      const search = e.target.value
      filter(search, data)
    }
  }

  return (
    <>
      <div ref={wrapperRef}>
        <div className="flex items-center leading-4 p-2 bg-white focus:ring-indigo-500 focus:border-indigo-500  w-full shadow-sm sm:text-base border border-gray-300 rounded-md">
          <input
            placeholder="Search..."
            value={value}
            className="w-full focus:outline-none"
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
              <div className="mt-1 absolute z-50 border-gray-500 rounded-md bg-gray-200">
                <ul className="p-2 rounded-sm">
                  {options?.map((item, index) => (
                    <>
                      <li key={index} className="text-gray-400">
                        {item.title}
                      </li>
                      <ul className="ml-4">
                        {item.children.map((children, childrenIndex) => (
                          <li
                            key={childrenIndex}
                            className="hover:bg-gray-200 focus:outline-none cursor-pointer"
                            onClick={async () => {
                              props.onChange && props.onChange(item, children)
                              //stores.routerStore.updateUserRouter(userRouter)
                              setIsListOpen(false)
                              setValue(children.title)
                              setOptions([])
                            }}
                          >
                            {children.title}
                          </li>
                        ))}
                      </ul>
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
