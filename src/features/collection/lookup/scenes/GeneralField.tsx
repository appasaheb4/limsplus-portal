/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { useForm, Controller } from "react-hook-form"
import _ from "lodash"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"

import { dashboardRouter as dashboardRoutes } from "@lp/routes"
let router = dashboardRoutes

import { stores, useStores } from "@lp/stores"
import { toJS } from "mobx"

interface GeneralFieldProps {
  onModalConfirm?: (item: any) => void
}

export const GeneralField = observer((props: GeneralFieldProps) => {
  const { lookupStore } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      lookupStore.LookupService.generalSettingsUpdate({
        ...lookupStore.globalSettings,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  const onSubmitGeneralFiled = (data: any) => {   
    lookupStore.LookupService.generalSettingsUpdate({
      input: {
        ...lookupStore.globalSettings,
        router,
      },
    }).then((res) => {  
      if (res.lookupGeneralSettingsUpdate.success) {
        LibraryComponents.Atoms.Toast.success({
          message: `😊 ${res.lookupGeneralSettingsUpdate.message}`,
        })   
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    })
  }

  return (
    <>
      <LibraryComponents.Atoms.Grid cols={2}>
        <LibraryComponents.Atoms.List
          direction="col"
          space={4}
          justify="stretch"
          fill
        >
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper
                hasError={errors.documentList}
                label="Document Name"
              >
                <LibraryComponents.Molecules.AutoCompleteGroupByCheck
                  hasError={errors.documentList}
                  data={router}
                  defaultItem={
                    toJS(
                      lookupStore.globalSettings &&
                        lookupStore.globalSettings.documentList
                    ) || []
                  }
                  onChange={async (item: any) => {
                    onChange(item)
                    lookupStore.updateGlobalSettings({
                      ...lookupStore.globalSettings,
                      documentList: item,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="documentList"
            rules={{ required: true }}
            defaultValue=""
          />
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
                    list: toJS(lookupStore.listLookup).filter(
                      (a, i) =>
                        toJS(lookupStore.listLookup).findIndex(
                          (s) => a.fieldName === s.fieldName
                        ) === i
                    ),
                    displayKey: ["fieldName"],
                    findKey: ["fieldName"],
                  }}
                  onChange={(item: any) => {
                    onChange(item.toUpperCase())
                    lookupStore.updateGlobalSettings({
                      ...lookupStore.globalSettings,
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
          <LibraryComponents.Atoms.Form.InputWrapper label="Code & Value">
            <LibraryComponents.Atoms.Grid cols={3}>
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Code"
                    hasError={errors.code}
                    value={lookupStore.localInput.code}
                    onChange={(code) => {
                      onChange(code.toUpperCase())
                      lookupStore.updateLocalInput({
                        ...lookupStore.localInput,
                        code: code.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="code"
                rules={{ required: false }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Value"
                    hasError={errors.value}
                    value={lookupStore.localInput.value}
                    onChange={(value) => {
                      onChange(value)
                      lookupStore.updateLocalInput({
                        ...lookupStore.localInput,
                        value,
                      })
                    }}
                  />
                )}
                name="value"
                rules={{ required: false }}
                defaultValue=""
              />
              <div className="mt-2">
                <LibraryComponents.Atoms.Buttons.Button
                  size="medium"
                  type="solid"
                  onClick={() => {
                    const value = lookupStore.localInput.value
                    const code = lookupStore.localInput.code
                    let arrValue = lookupStore.globalSettings?.arrValue || []
                    if (value === undefined || code === undefined)
                      return alert("Please enter value and code.")
                    if (value !== undefined) {
                      console.log({ len: arrValue.length })
                      arrValue !== undefined
                        ? arrValue.push({
                            value,
                            code,
                          })
                        : (arrValue = [
                            {
                              value,
                              code,
                            },
                          ])
                      lookupStore.updateGlobalSettings({
                        ...lookupStore.globalSettings,
                        arrValue,
                      })
                      lookupStore.updateLocalInput({
                        ...lookupStore.localInput,
                        value: "",
                        code: "",
                      })
                    }
                  }}
                >
                  <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                  {`Add`}
                </LibraryComponents.Atoms.Buttons.Button>
              </div>
            </LibraryComponents.Atoms.Grid>
            <LibraryComponents.Atoms.List space={2} direction="row" justify="center">
              <div className="mt-2">
                {lookupStore.globalSettings?.arrValue?.map((item, index) => (
                  <div className="mb-2" key={index}>
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      icon={LibraryComponents.Atoms.Icon.Remove}
                      onClick={() => {
                        const firstArr =
                          lookupStore.globalSettings?.arrValue?.slice(0, index) || []
                        const secondArr =
                          lookupStore.globalSettings?.arrValue?.slice(index + 1) ||
                          []
                        const finalArray = [...firstArr, ...secondArr]
                        lookupStore.updateGlobalSettings({
                          ...lookupStore.globalSettings,
                          arrValue: finalArray,
                        })
                      }}
                    >
                      {`${item.value} - ${item.code}`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                ))}
              </div>
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Form.InputWrapper>
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper
                hasError={errors.defaulItem}
                label="Default Item"
              >
                <select
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.defaultLab ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  onChange={(e) => {
                    let defaultItem = JSON.parse(e.target.value)
                    defaultItem = [
                      {
                        code: defaultItem.code,
                        value: defaultItem.value,
                      },
                    ]
                    onChange(defaultItem)
                    lookupStore.updateGlobalSettings({
                      ...lookupStore.globalSettings,
                      defaultItem,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupStore.globalSettings &&
                    lookupStore.globalSettings.arrValue &&
                    lookupStore.globalSettings.arrValue.map(
                      (item: any, index: number) => (
                        <option key={item.name} value={JSON.stringify(item)}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="defaulItem"
            rules={{ required: false }}
            defaultValue=""
          />
        </LibraryComponents.Atoms.List>
        <LibraryComponents.Atoms.List
          direction="col"
          space={4}
          justify="stretch"
          fill
        >
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={4}
                label="Description"
                name="txtDescription"
                placeholder="Description"
                value={lookupStore.globalSettings?.description}
                onChange={(description) => {
                  onChange(description)
                  lookupStore.updateGlobalSettings({
                    ...lookupStore.globalSettings,
                    description,
                  })
                }}
              />
            )}
            name="description"
            rules={{ required: false }}
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper
                label="Environment"
                hasError={errors.environment}
              >
                <select
                  value={lookupStore.globalSettings?.environment}
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.environment ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  disabled={
                    stores.loginStore.login &&
                    stores.loginStore.login.role !== "SYSADMIN"
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    const environment = e.target.value
                    onChange(environment)
                    lookupStore.updateGlobalSettings({
                      ...lookupStore.globalSettings,
                      environment,
                    })
                  }}
                >
                  <option selected>
                    {stores.loginStore.login &&
                    stores.loginStore.login.role !== "SYSADMIN"
                      ? `Select`
                      : lookupStore.globalSettings?.environment || `Select`}
                  </option>
                  {LibraryUtils.lookupItems(
                    stores.routerStore.lookupItems,
                    "ENVIRONMENT"
                  ).map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="environment"
            rules={{ required: true }}
            defaultValue=""
          />
        </LibraryComponents.Atoms.List>
      </LibraryComponents.Atoms.Grid>
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
