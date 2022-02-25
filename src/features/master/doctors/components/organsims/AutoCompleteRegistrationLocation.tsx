/* eslint-disable  */
import React, { useState } from "react"
import _ from "lodash"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import { AutoCompleteFilterSingleSelectMultiFieldsDisplay } from "@/library/components"

interface AutoCompleteRegistrationLocationProps {
  onSelect: (item: any) => void
}

export const AutoCompleteRegistrationLocation = observer(
  ({ onSelect }: AutoCompleteRegistrationLocationProps) => {
    const { loading, registrationLocationsStore } = useStores()


    //setList(list.concat({ locationCode: "removeItem", locationName: "Remove Item" }))

    return (
      <>
        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
          posstion="sticky"
          loader={loading}
          placeholder="Search by locationCode or locationName"
          data={{
            list: [{ locationCode: "RemoveItem", locationName: "Remove Item" }].concat(registrationLocationsStore.listRegistrationLocations),
            displayKey: ["locationCode", "locationName"],
          }}
          onFilter={(value: string) => {
            registrationLocationsStore.registrationLocationsService.filterByFields({
              input: {
                filter: {
                  fields: ["locationCode", "locationName"],
                  srText: value,
                },
                page: 0,
                limit: 10,
              },
            })
          }}
          onSelect={(item) => {
            onSelect && onSelect(item.locationCode)
            registrationLocationsStore.updateRegistrationLocationsList(
              registrationLocationsStore.listRegistrationLocationsCopy
            )
          }}
        />
      </>
    )
  }
)
