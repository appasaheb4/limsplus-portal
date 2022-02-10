/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import _ from 'lodash'
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import {AutoCompleteFilterMutiSelectMultiFieldsDisplay} from "@/library/components"

interface AutoCompleteDepartmentProps {
  onSelect: (item: any) => void
}
  
export const AutoCompleteDepartment = observer(
  ({ onSelect }: AutoCompleteDepartmentProps) => {
      const {loading,departmentStore,masterAnalyteStore} = useStores()
    return (
      <>
        <AutoCompleteFilterMutiSelectMultiFieldsDisplay
          loader={loading}
          placeholder="Search by code or name"
          data={{
            list: departmentStore.listDepartment,
            selected: masterAnalyteStore.selectedItems?.department,
            displayKey: ["code", "name"],
          }}
          onUpdate={(item) => {
            const items = masterAnalyteStore.selectedItems?.department
            console.log({ items })
            onSelect && onSelect(_.union(_.map(items, "code")))
            departmentStore.updateDepartmentList(departmentStore.listDepartmentCopy)
            masterAnalyteStore.updateSelectedItems(undefined)
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
            let department = masterAnalyteStore.selectedItems?.department
            if (!item.selected) {
              if (department && department.length > 0) {
                department.push(item)
              } else department = [item]
            } else {
              department = department.filter((items) => {
                return items._id !== item._id
              })
            }
            masterAnalyteStore.updateSelectedItems({
              ...masterAnalyteStore.selectedItems,
              department,
            })
          }}
        />
      </>
    )
  }
)
