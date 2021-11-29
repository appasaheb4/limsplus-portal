/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import { Spinner } from "react-bootstrap"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { useStores } from "@lp/stores"

interface AutoCompleteProps {
  selected: any[]
  onUpdate: (item: any) => void
}

export const AutoCompleteFilterMutiSelectDepartment = observer(({ selected, onUpdate }: AutoCompleteProps)=>{
    const { loading, departmentStore, environmentStore } = useStores()
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
                  onUpdate && onUpdate(environmentStore.selectedItems?.department)
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
        environmentStore.updateSelectedItems({
            ...environmentStore.selectedItems,
            department:selected,
          })
    },[selected])
    useEffect(() => {
        setOriginalOptions(
          getSelectedItem(
            environmentStore.selectedItems?.department,
            departmentStore.listDepartment,
            "name", 
            // "code"
            
          )
        )
        setOptions(
          getSelectedItem(
            environmentStore.selectedItems?.department,
            departmentStore.listDepartment,
            "name"
          )
        )
      }, [departmentStore.listDepartment, environmentStore.selectedItems?.department])

      const onFilter = (value: string) => {
        departmentStore.DepartmentService.filter({
          input: {
            filter: {
              type: "search",
              ["name"]: value,
            },
            page: 0,
            limit: 10,
          },
        })
      }
      const onSelect = (item) => {
        let department = environmentStore.selectedItems?.department
        if (!item.selected) {
          if (department && department.length > 0) {
            department.push(item)
          }
          if (!department) department = [item]
        } else {
            department = department.filter((items) => {
            return items._id !== item._id
          })
        }
        environmentStore.updateSelectedItems({
          ...environmentStore.selectedItems,
          department,
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
    return(
        <>
            <div ref={wrapperRef}>
          <div
            className={`flex items-center leading-4 p-2 focus:outline-none focus:ring  w-full shadow-sm sm:text-base border-2  rounded-md`}
          >
            <input
              placeholder="Search..."
              value={
                !isListOpen
                  ? `${
                      (environmentStore.selectedItems?.department &&
                        environmentStore.selectedItems?.department.length) ||
                      0
                    } Items`
                  : value
              }
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
            ? options?.length > 0 && (
                <div className="mt-1 absolute bg-gray-100 p-2 rounded-sm z-50">
                  <ul>
                    {options?.map((item, index) => (
                      <>
                        <li key={index} className="text-gray-400 flex items-center">
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => onSelect(item)}
                          />{" "}
                          <label className="ml-2 mt-1 text-black">
                            {" "}
                            {item.name}
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