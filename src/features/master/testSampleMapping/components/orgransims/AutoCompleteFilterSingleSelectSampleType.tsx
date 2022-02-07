/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import { Spinner } from "react-bootstrap"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import {Icons} from "@lp/library/components"

interface AutoCompleteFilterSingleSelectSampleTypeProps {
  onSelect: (item: any) => void
}

export const AutoCompleteFilterSingleSelectSampleType = observer(
  ({ onSelect }: AutoCompleteFilterSingleSelectSampleTypeProps) => {
    const { loading, sampleTypeStore } = useStores()
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
      setOptions(sampleTypeStore.listSampleType)
    }, [sampleTypeStore.listSampleType])

    const onFilter = (value: string) => {
        sampleTypeStore.sampleTypeService.filter({
        input: {
          type: "filter",
          filter: {
            
            sampleType: value,
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
              placeholder="Search by sample type"
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
                <div className="mt-1 absolute bg-gray-100 p-2 rounded-sm z-50">
                  <ul>
                    {options?.map((item, index) => (
                      <>
                        <li
                          key={index}
                          className="text-gray-400 flex items-center"
                          onClick={() => {
                            setValue(item.sampleType)
                            setIsListOpen(false)
                            sampleTypeStore.updateSampleTypeList(
                                sampleTypeStore.listSampleTypeCopy
                              )
                            onSelect(item)
                          }}
                        >
                          {" "}
                          <label className="ml-2 mt-1 text-black">
                            {" "}
                            {item.sampleType}
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
