/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { useForm, Controller } from "react-hook-form"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"

import { dashboardRouter as dashboardRoutes } from "@lp/routes"
let router = dashboardRoutes

import { Stores } from "../stores"

import { stores, useStores } from "@lp/library/stores"

interface NewFieldProps {
  onModalConfirm?: (item: any) => void
}

export const NewField = observer((props: NewFieldProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.lookupStore.updateLookup({
        ...Stores.lookupStore.lookup,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])
  const onSubmitNewField = (data: any) => {
    if (
      Stores.lookupStore.lookup?.value === "" &&
      Stores.lookupStore.lookup.value === ""
    ) {
      Stores.lookupStore.LookupService.addLookup(Stores.lookupStore.lookup).then(
        (res) => {
          if(res.success){
            LibraryComponents.Atoms.Toast.success({
              message: `😊 ${res.message}`,
            })
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          }
        }
      )
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: `😔 Please add code and value then submit.`,
      })
    }
  }

  return (
    <div className={"p-2 rounded-lg shadow-xl"}>
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
                hasError={errors.documentName}
                label="Document Name"
              >
                <LibraryComponents.Molecules.AutocompleteGroupBy
                  hasError={errors.documentName}
                  data={router}
                  onChange={async (item: any, children: any) => {
                    const documentName = {
                      name: item.name,
                      title: item.title,
                      path: item.path,
                      children,
                    }
                    onChange(documentName)
                    Stores.lookupStore.updateLookup({
                      ...Stores.lookupStore.lookup,
                      documentName,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="documentName"
            rules={{ required: true }}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Field Name"
                placeholder="Field Name"
                hasError={errors.fieldName}
                value={Stores.lookupStore.lookup?.fieldName}
                onChange={(fieldName) => {
                  onChange(fieldName.toUpperCase())
                  Stores.lookupStore.updateLookup({
                    ...Stores.lookupStore.lookup,
                    fieldName: fieldName.toUpperCase(),
                  })
                }}
              />
            )}
            name="fieldName"
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
                rules={{ required: false }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Value"
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
                rules={{ required: false }}
                defaultValue=""
              />
              <div className="mt-2">
                <LibraryComponents.Atoms.Buttons.Button
                  size="medium"
                  type="solid"
                  onClick={() => {
                    const value = Stores.lookupStore.lookup?.value
                    const code = Stores.lookupStore.lookup?.code
                    let arrValue = Stores.lookupStore.lookup?.arrValue || []
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
                      Stores.lookupStore.updateLookup({
                        ...Stores.lookupStore.lookup,
                        arrValue,
                      })
                      Stores.lookupStore.updateLookup({
                        ...Stores.lookupStore.lookup,
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
              <div className="clearfix"></div>
            
            </LibraryComponents.Atoms.Grid>
           
            <LibraryComponents.Atoms.List space={2} direction="row" justify="center">
              <div>
                {Stores.lookupStore.lookup?.arrValue?.map((item, index) => (
                  <div className="mb-2" key={index}>
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      icon={LibraryComponents.Atoms.Icon.Remove}
                      onClick={() => {
                        const firstArr =
                          Stores.lookupStore.lookup?.arrValue?.slice(0, index) || []
                        const secondArr =
                          Stores.lookupStore.lookup?.arrValue?.slice(index + 1) || []
                        const finalArray = [...firstArr, ...secondArr]
                        Stores.lookupStore.updateLookup({
                          ...Stores.lookupStore.lookup,
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
                          defaultItem = [{code:defaultItem.code,value:defaultItem.value}]
                          onChange(defaultItem)
                          Stores.lookupStore.updateLookup({
                            ...Stores.lookupStore.lookup,
                            defaultItem,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {Stores.lookupStore.lookup && Stores.lookupStore.lookup.arrValue && Stores.lookupStore.lookup.arrValue.map(
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
                value={Stores.lookupStore.lookup?.description}
                onChange={(description) => {
                  onChange(description)
                  Stores.lookupStore.updateLookup({
                    ...Stores.lookupStore.lookup,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                <select
                  value={Stores.lookupStore.lookup?.environment}
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
                    Stores.lookupStore.updateLookup({
                      ...Stores.lookupStore.lookup,
                      environment,
                    })
                  }}
                >
                  <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.lookupStore.lookup?.environment}
                      </option>
                  {LibraryUtils.lookupItems(stores.routerStore.lookupItems, "ENVIRONMENT").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
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
          onClick={handleSubmit(onSubmitNewField)}
        >
          Save
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
    </div>
  )
})
