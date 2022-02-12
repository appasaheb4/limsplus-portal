/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react"
import _ from "lodash"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import { AutoCompleteFilterSingleSelectMultiFieldsDisplay } from "@/library/components"

interface AutoCompleteEquipmentTypeProps {
  onSelect: (item: any) => void
}

export const AutoCompleteEquipmentType = observer(
  ({ onSelect }: AutoCompleteEquipmentTypeProps) => {
    const { loading, interfaceManagerStore } = useStores()
    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          posstion="relative"
          loader={loading}
          placeholder="Search by Equipment Type"
          data={{
            list: interfaceManagerStore.listInterfaceManager,
            displayKey: ["instrumentType"],
          }}
          onFilter={(value: string) => {
            interfaceManagerStore.interfaceManagerService.filterByFields({
              input: {
                filter: {
                  fields: ["instrumentType"],
                  srText: value,
                },
                page: 0,
                limit: 10,
              },
            })
          }}
          onSelect={(item) => {
            onSelect && onSelect(item.instrumentType)
          }}
        />
      </>
    )
  }
)
