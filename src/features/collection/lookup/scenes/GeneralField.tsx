/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { useForm, Controller } from "react-hook-form"
import _ from "lodash"

import * as LibraryComponents from "@lp/library/components"

import { useStores } from "@lp/library/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import { toJS } from "mobx"

interface GeneralFieldProps {
  onModalConfirm?: (item: any) => void
}

export const GeneralField = observer((props: GeneralFieldProps) => {
  const { loginStore, lookupStore } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    console.log({ store: LookupStore.lookupStore.listLookup })
  }, [LookupStore.lookupStore.listLookup])

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange } }) => (
          <LibraryComponents.Atoms.Form.InputWrapper
            hasError={errors.filedName}
            label="Filed Name"
          >
            <LibraryComponents.Molecules.AutoComplete
              hasError={errors.filedName}
              data={{
                list:  toJS(LookupStore.lookupStore.listLookup).filter((a, i) => toJS(LookupStore.lookupStore.listLookup).findIndex((s) => a.fieldName === s.fieldName) === i),
                displayKey: ["fieldName"],
                findKey: ["fieldName"],
              }}
              // onChange={async (item: any, children: any) => {
              //   // const documentName = {
              //   //   name: item.name,
              //   //   title: item.title,
              //   //   path: item.path,
              //   //   children,
              //   // }
              //   // onChange(documentName)
              //   // Stores.lookupStore.updateLookup({
              //   //   ...Stores.lookupStore.lookup,
              //   //   documentName,
              //   // })
              // }}
            />
          </LibraryComponents.Atoms.Form.InputWrapper>
        )}
        name="filedName"
        rules={{ required: true }}
        defaultValue=""
      />
    </>
  )
})
