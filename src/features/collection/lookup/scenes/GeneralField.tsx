/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { useForm, Controller } from "react-hook-form"
import _ from "lodash"

import * as LibraryComponents from "@lp/library/components"

import { dashboardRouter as dashboardRoutes } from "@lp/routes"
let router = dashboardRoutes

import { Stores } from "../stores"
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

  const onSubmitGeneralFiled = (data: any) => {
    Stores.lookupStore.LookupService.generalFiledUpdate({
      router,
      fieldName: Stores.lookupStore.lookup.fieldName,
      code: Stores.lookupStore.lookup.code,
      value: Stores.lookupStore.lookup.value,
    }).then((res) => {
      if (res.success) {
        LibraryComponents.Atoms.Toast.success({
          message: `😊 ${res.message}`,
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    })
  }

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange } }) => (
          <LibraryComponents.Atoms.Form.InputWrapper
            hasError={errors.filedName}
            label="Global Filed"
          >
            <LibraryComponents.Molecules.AutoComplete
              hasError={errors.filedName}
              data={{
                list: toJS(LookupStore.lookupStore.listLookup).filter(
                  (a, i) =>
                    toJS(LookupStore.lookupStore.listLookup).findIndex(
                      (s) => a.fieldName === s.fieldName
                    ) === i
                ),
                displayKey: ["fieldName"],
                findKey: ["fieldName"],
              }}
              onChange={(item: any) => {
                console.log({item});
                
                onChange(item.toUpperCase())
                Stores.lookupStore.updateLookup({
                  ...Stores.lookupStore.lookup,
                  fieldName: item.toUpperCase(),
                })
              }}
            />
          </LibraryComponents.Atoms.Form.InputWrapper>
        )}
        name="filedName"
        rules={{ required: true }}
        defaultValue=""
      />
      <br />
      <LibraryComponents.Atoms.Form.InputWrapper label="Code & Value">
        <LibraryComponents.Atoms.Grid cols={3}>
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                placeholder="Code"
                hasError={errors.code}
                value={Stores.lookupStore.lookup?.code}
                onChange={(code) => {
                  onChange(code.toUpperCase())
                  Stores.lookupStore.updateLookup({
                    ...Stores.lookupStore.lookup,
                    code: code.toUpperCase(),
                  })
                }}
              />
            )}
            name="code"
            rules={{ required: true }}
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                placeholder="Value"
                hasError={errors.value}
                value={Stores.lookupStore.lookup?.value}
                onChange={(value) => {
                  onChange(value)
                  Stores.lookupStore.updateLookup({
                    ...Stores.lookupStore.lookup,
                    value,
                  })
                }}
              />
            )}
            name="value"
            rules={{ required: true }}
            defaultValue=""
          />
        </LibraryComponents.Atoms.Grid>
      </LibraryComponents.Atoms.Form.InputWrapper>
      <br />
      <LibraryComponents.Atoms.List direction="row" space={3} align="center">
        <LibraryComponents.Atoms.Buttons.Button
          size="medium"
          type="solid"
          icon={LibraryComponents.Atoms.Icon.Save}
          onClick={handleSubmit(onSubmitGeneralFiled)}
        >
          Update
        </LibraryComponents.Atoms.Buttons.Button>
        <LibraryComponents.Atoms.Buttons.Button
          size="medium"
          type="outline"
          icon={LibraryComponents.Atoms.Icon.Remove}
          onClick={() => {
            window.location.reload()
          }}
        >
          Clear
        </LibraryComponents.Atoms.Buttons.Button>
      </LibraryComponents.Atoms.List>
    </>
  )
})
