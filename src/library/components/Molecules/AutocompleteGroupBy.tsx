/* eslint-disable  */
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { observer } from "mobx-react"

import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
interface AutocompleteGroupByProps {
  data?: any[]
  onChange?: () => void
  onClose?: () => void
}

const AutocompleteGroupBy = observer((props: AutocompleteGroupByProps) => {
  const history = useHistory()
  //const [userRouter, setUserRouter] = useState<any>()
  const [data, setData] = useState<any[]>()
  const [options, setOptions] = useState<any[]>()
  useEffect(() => {
    setData(props.data)
    //setOptions(props.data)
  }, [props])

  // useEffect(() => {
  //   setUserRouter(RootStore.routerStore.userRouter)
  // }, [])

  const uniqByKeepFirst = (a, key) => {
    const seen = new Set()
    return a.filter((item) => {
      const k = key(item)
      return seen.has(k) ? false : seen.add(k)
    })
  }

  const filter = (search, data) => {
    if (search) {
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
      //RootStore.routerStore.updateUserRouter(filterArray)
    } else {
      setOptions([])
      //RootStore.routerStore.updateUserRouter(userRouter)
    }
  }

  const onChange = (e) => {
    const search = e.target.value
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
      <div className="p-2">
        <input
          placeholder="Search Menu Item"
          //   value={props.value}
          className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
          onKeyUp={onKeyUp}
          onChange={onChange}
        />
        {options
          ? options?.length > 0 && (
              <div className="mt-1">
                <ul className="bg-white p-2 rounded-sm">
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
                              await RouterFlow.updateSelectedCategory(
                                RootStore,
                                item.name,
                                children.name
                              )
                              history.push(children.path)
                              //RootStore.routerStore.updateUserRouter(userRouter)
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
export default AutocompleteGroupBy
