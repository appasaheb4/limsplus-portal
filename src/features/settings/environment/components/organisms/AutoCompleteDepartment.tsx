/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { useStores } from "@lp/stores"

interface AutoCompleteProps {
  selected: any
  onUpdate: (item: any) => void
}

export const AutoCompleteDepartment = observer(
  ({ selected, onUpdate }: AutoCompleteProps) => {
    const { loading, departmentStore, environmentStore } = useStores()
    const [defaultData, setDefaultData] = useState(selected)
    const [data, setData] = useState<any>(selected)

    useEffect(() => {
      environmentStore.updateSelectedItems({
        ...environmentStore.selectedItems,
        department: data?.department,
      })
    }, [data, selected])

    return (
      <>
        <div className="flex flex-row gap-2 w-full">
          <LibraryComponents.Atoms.Form.Toggle
            value={data?.allDepartment || false}
            onChange={(allDepartment) => {
              if (!defaultData?.allDepartment) {
                if (allDepartment) {
                  onUpdate({ allDepartment })
                }
              }
              setData({
                ...data,
                allDepartment,
              })
            }}
          />

          <LibraryComponents.Molecules.AutoCompleteFilterMutiSelectMultiFieldsDisplay
             loader={loading}
             disable={
              data?.allDepartment || false
             }
             placeholder="Search by code or name"
             data={{
               list: departmentStore.listDepartment,
               selected: environmentStore.selectedItems?.department,
               displayKey: ["code", "name"],
             }}
       
             onUpdate={(item) => {
               const items =
                 environmentStore.selectedItems?.department
                  departmentStore.updateDepartmentList(
                 departmentStore.listDepartmentCopy
               )
               onUpdate({department:items})
             }}
             onFilter={(value: string) => {
               departmentStore.DepartmentService.filterByFields({
                 input: {
                   filter: {
                     fields: ["code", "name"],
                     srText: value,
                   },
                   page: 0,
                   limit: 10,
                 },
               })
             }}
             onSelect={(item) => {
               let department =
                 environmentStore.selectedItems?.department
               if (!item.selected) {
                 if (department && department.length > 0) {
                   department.push(item)
                 } else department = [item]
               } else {
                 department = department.filter((items) => {
                   return items._id !== item._id
                 })
               }
               environmentStore.updateSelectedItems({
                 ...environmentStore.selectedItems,
                 department,
               })
             }}
           />                               
        </div>
      </>
    )
  }
)
