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

export const AutoCompleteFilterMutiSelectRoles = observer(
  ({ selected, onUpdate }: AutoCompleteProps) => {
    const { loading, userStore, roleStore } = useStores()
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
                roleStore.updateRoleList(roleStore.listRoleCopy)
                onUpdate && onUpdate(userStore.selectedItems?.roles)
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
        console.log({ finalList })

        list = finalList
      }
      return list
    }

    useEffect(() => {
      userStore.updateSelectedItems({
        ...userStore.selectedItems,
        roles: selected,
      })
    }, [selected])

    useEffect(() => {
      setOriginalOptions(
        getSelectedItem(
          userStore.selectedItems?.roles,
          roleStore.listRole,
          "description"
        )
      )
      setOptions(
        getSelectedItem(
          userStore.selectedItems?.roles,
          roleStore.listRole,
          "description"
        )
      )
    }, [roleStore.listRole, userStore.selectedItems])

    const onFilter = (value: string) => {
      roleStore.RoleService.filter({
        input: {
          filter: {
            type: "search",
            ["description"]: value,
          },
          page: 0,
          limit: 10,
        },
      })
    }
    const onSelect = (item) => {
      console.log({ item })

      let roles = userStore.selectedItems?.roles
      if (!item.selected) {
        if (roles && roles.length > 0) {
          roles.push(item)
        }
        if (!roles) roles = [item]
      } else {
        roles = roles.filter((items) => {
          return items._id !== item._id
        })
      }
      userStore.updateSelectedItems({
        ...userStore.selectedItems,
        roles,
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
              placeholder="Search..."
              value={
                !isListOpen
                  ? `${
                      (userStore.selectedItems?.roles &&
                        userStore.selectedItems?.roles.length) ||
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
                <div className="mt-1 bg-gray-100 p-2 rounded-sm">
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
                            {item.description}
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
