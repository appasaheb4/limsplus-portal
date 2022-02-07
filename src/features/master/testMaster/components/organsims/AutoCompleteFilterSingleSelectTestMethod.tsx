/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import { Spinner } from "react-bootstrap"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import {Icons} from "@lp/library/components"

interface AutoCompleteFilterSingleSelectTestMethodProps {
  onSelect: (item: any) => void
}

export const AutoCompleteFilterSingleSelectTestMethod = observer(
  ({ onSelect }: AutoCompleteFilterSingleSelectTestMethodProps) => {
    const { loading, methodsStore } = useStores()
    const [value, setValue] = useState<string>("")
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
      setOptions(methodsStore.listMethods)
    }, [methodsStore.listMethods])

    const onFilter = (value: string) => {
      methodsStore.methodsService.filterByFields({
        input: {
          filter: {
            fields: ["methodsCode", "methodsName"],
            srText: value,
          },
          page: 0,
          limit: 10,
        },
      })
    }

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
            className={`flex items-center leading-4 p-2 focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2  rounded-md`}
          >
            <input
              placeholder="Search by method name"
              value={!isListOpen ? value : value}
              className={`w-full focus:outline-none bg-none`}
              onKeyUp={onKeyUp}
              onChange={onChange}
              onClick={() => setIsListOpen(true)}
            />
            {loading && <Spinner animation="border" className="mr-2 h-4 w-4" />}
            {isListOpen ? (
              <Icons.IconFa.FaChevronUp />
            ) : (
              <Icons.IconFa.FaChevronDown />
            )}
          </div>

          {options && isListOpen
            ? options.length > 0 && (
                <div className="mt-1  bg-gray-100 p-2 rounded-sm z-50">
                  <ul>
                    {options?.map((item, index) => (
                      <>
                        <li
                          key={index}
                          className="text-gray-400 flex items-center"
                          onClick={() => {
                            setValue(item.methodsCode)
                            setIsListOpen(false)
                            methodsStore.updateMethodsList(
                                methodsStore.listMethodsCopy
                            )
                            onSelect(item)
                          }}
                        >
                          {" "}
                          <label className="ml-2 mt-1 text-black">
                            {" "}
                            {item.methodsCode} -{item.methodsName}
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
