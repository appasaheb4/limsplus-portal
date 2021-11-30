/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import { Spinner } from "react-bootstrap"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import * as LibraryComponents from "@lp/library/components"

interface AutoCompleteFilterSingleSelectProps {
  selected: any[]
  onSelect: (item: any) => void
}

export const AutoCompleteFilterSingleSelect = observer(({
  selected, onSelect
}: AutoCompleteFilterSingleSelectProps) => {
  const { loading, labStore,administrativeDivisions } = useStores()
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
              administrativeDivisions.updateAdministrativeDivList(administrativeDivisions.listAdministrativeDiv)
              onSelect && onSelect(labStore.selectedItems?.country)
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
  const getSelectedItem = (selectedItem: any[], list: any[], findKey: string) => {
    if (count === 0) {
      const finalList = list.filter((item, index) => {
        item.selected = false
        selectedItem && selectedItem.length > 0
          ? selectedItem.find((sItem, index) => {
              if (sItem._id === item._id) {
                item.selected = true
              }
            })
          : (item.selected = false)
        count++
        return item
      })
      list = finalList
    }
    return list
  }

  useEffect(()=>{
    labStore.updateSelectedItems({
        ...labStore.selectedItems,
        country:selected,
      })
},[selected])
useEffect(() => {
  setOriginalOptions(getSelectedItem(
    labStore.selectedItems?.country,
    administrativeDivisions.listAdministrativeDiv,
    "country"
  ))
  setOptions(getSelectedItem(
    labStore.selectedItems?.country,
    administrativeDivisions.listAdministrativeDiv,
    "country"
  ))
  //console.log('renader');
}, [administrativeDivisions.listAdministrativeDiv,labStore.selectedItems?.country])

const onFilter = (value: string) => {
  administrativeDivisions.administrativeDivisionsService.filter({
    input: {
      filter: {
        type: "search",
        ["country"]: value,
      },
      page: 0,
      limit: 10,
    },
  })
}
// const onSelect = (item) => {
//   let country = labStore.selectedItems?.country
//   if (!item.country) {
//     if (country && country.length > 0) {
//       country.push(item)
//     }
//     if (!country) country = [item]
//   } else {
//     country = country.filter((items) => {
//       return items._id !== item._id
//     })
//   }
//   labStore.updateSelectedItems({
//     ...labStore.selectedItems,
//     country,
//   })
// }
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
            placeholder="Search...."
            value={!isListOpen ? value : value}
            className={`w-full focus:outline-none bg-none`}
            onKeyUp={onKeyUp}
            onChange={onChange}
            onClick={() => setIsListOpen(true)}
          />
          {loading && <Spinner animation="border" className="mr-2 h-4 w-4" />}
          {isListOpen ? (
            <LibraryComponents.Atoms.Icons.IconFa.FaChevronUp />
          ) : (
            <LibraryComponents.Atoms.Icons.IconFa.FaChevronDown />
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
                          setValue(item.country)
                          setIsListOpen(false)
                          onSelect(item)
                        }}
                      >
                        {" "}
                        <label className="ml-2 mt-1 text-black">
                          {" "}
                          {item.country}
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
