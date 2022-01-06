/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import { Spinner } from "react-bootstrap"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { useStores } from "@lp/stores"

interface AutoCompleteProps {
  selected: any
  onUpdate: (item: any) => void
}

export const AutoCompleteLabs = observer(
  ({ selected, onUpdate }: AutoCompleteProps) => {
    const { loading, labStore, environmentStore } = useStores()
    const [defaultData, setDefaultData] = useState(selected)
    const [data, setData] = useState<any>(selected)

    useEffect(() => {
      environmentStore.updateSelectedItems({
        ...environmentStore.selectedItems,
        labs: data?.lab,
      })
    }, [data, selected])

    return (
      <>
        <div className="flex flex-row gap-2 w-full">
          <LibraryComponents.Atoms.Form.Toggle
            label="All"
            value={data?.allLabs || false}
            onChange={(allLabs) => {
              if (!defaultData?.allLabs) {
                if (allLabs) {
                  onUpdate({ allLabs })
                }
              }
              setData({
                ...data,
                allLabs,
              })
            }}
          />

          <LibraryComponents.Molecules.AutoCompleteFilterMutiSelectMultiFieldsDisplay
            loader={loading}
            disable={data?.allLabs || false}
            placeholder="Search by code or name"
            data={{
              list: labStore.listLabs,
              selected: environmentStore.selectedItems?.labs,
              displayKey: ["code", "name"],
            }}
            onUpdate={(item) => {
              const items = environmentStore.selectedItems?.labs
              labStore.updateLabList(labStore.listLabsCopy)
              onUpdate({ lab: items })
            }}
            onFilter={(value: string) => {
              labStore.LabService.filterByFields({
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
              let labs = environmentStore.selectedItems?.labs
              if (!item.selected) {
                if (labs && labs.length > 0) {
                  labs.push(item)
                } else labs = [item]
              } else {
                labs = labs.filter((items) => {
                  return items._id !== item._id
                })
              }
              environmentStore.updateSelectedItems({
                ...environmentStore.selectedItems,
                labs,
              })
            }}
          />
        </div>
      </>
    )
  }
)
