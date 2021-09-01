/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"

import * as FeatureComponents from "../components"
import { Accordion, AccordionItem } from "react-sanfona"
import "@lp/library/assets/css/accordion.css"
import * as Utils from "../utils"
import * as Models from "../models"
import { useForm, Controller } from "react-hook-form"
import { Stores } from "../stores"
import { Stores as UserStore } from "@lp/features/users/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

interface SessionManagementProps {
  onModalConfirm?: (item: any) => void
}

const SessionManagement = observer((props: SessionManagementProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.enviromentSettingsStore.updateSessionManagement({
        ...Stores.enviromentSettingsStore.sessionManagement,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])
  const onSubmitSessionManagement = () => {
    Stores.enviromentSettingsStore.EnvironmentSettingsService.addSessionManagement(
      Stores.enviromentSettingsStore.sessionManagement as Models.SessionManagement
    ).then((res) => {
      if (res.success) {
        LibraryComponents.Atoms.Toast.success({ message: `😊 ${res.message}` })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    })
  }

  return (
    <>
      <div className="p-2 rounded-lg shadow-xl">
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
                  label="Lab"
                  id="labs"
                  hasError={errors.lab}
                >
                  <LibraryComponents.Molecules.AutocompleteCheck
                    data={{
                      defulatValues: [],
                      list: LabStore.labStore.listLabs,
                      displayKey: "name",
                      findKey: "code",
                    }}
                    hasError={errors.lab}
                    onUpdate={(items) => {
                      onChange(items)
                      Stores.enviromentSettingsStore.updateSessionManagement({
                        ...Stores.enviromentSettingsStore.sessionManagement,
                        lab: items,
                      })
                    }}
                  />
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="lab"
              rules={{ required: true }}
              defaultValue=""
            />

            {UserStore.userStore.userList && (
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Users"
                    id="user"
                    hasError={errors.user}
                  >
                    <LibraryComponents.Molecules.AutocompleteCheck
                      data={{
                        defulatValues: [],
                        list: UserStore.userStore.userList,
                        displayKey: "fullName",
                        findKey: "fullName",
                      }}
                      hasError={errors.user}
                      onUpdate={(items) => {
                        onChange(items)
                        console.log({ items })

                        Stores.enviromentSettingsStore.updateSessionManagement({
                          ...Stores.enviromentSettingsStore.sessionManagement,
                          user: items,
                        })
                      }}
                    />
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="user"
                rules={{ required: true }}
                defaultValue=""
              />
            )}

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Department"
                  id="department"
                  hasError={errors.department}
                >
                  <LibraryComponents.Molecules.AutocompleteCheck
                    data={{
                      defulatValues: [],
                      list: DepartmentStore.departmentStore.listDepartment,
                      displayKey: "name",
                      findKey: "code",
                    }}
                    hasError={errors.department}
                    onUpdate={(items) => {
                      onChange(items)
                      Stores.enviromentSettingsStore.updateSessionManagement({
                        ...Stores.enviromentSettingsStore.sessionManagement,
                        department: items,
                      })
                    }}
                  />
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="department"
              rules={{ required: true }}
              defaultValue=""
            />

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Variable"
                  id="lblVariable"
                  hasError={errors.variable}
                >
                  <select
                    name="variable"
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.variable ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const variable = e.target.value as string
                      onChange(variable)
                      Stores.enviromentSettingsStore.updateSessionManagement({
                        ...Stores.enviromentSettingsStore.sessionManagement,
                        variable,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {["SESSION_TIMEOUT", "SESSION_ALLOWED"].map(
                      (item: any, index: number) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="variable"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Input
                  label="Value"
                  name="lblValue"
                  hasError={errors.value}
                  placeholder={errors.value ? "Please Enter Value" : "Value"}
                  type="number"
                  onChange={(value) => {
                    onChange(value)
                    Stores.enviromentSettingsStore.updateSessionManagement({
                      ...Stores.enviromentSettingsStore.sessionManagement,
                      value,
                    })
                  }}
                />
              )}
              name="value"
              rules={{ required: true }}
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
                  rows={7}
                  label="Description"
                  name="lblDescription"
                  placeholder={
                    errors.descriptions ? "Please Enter descriptions" : "Description"
                  }
                  hasError={errors.descriptions}
                  //value={Stores.userStore.user.password}
                  onChange={(descriptions) => {
                    onChange(descriptions)
                    Stores.enviromentSettingsStore.updateSessionManagement({
                      ...Stores.enviromentSettingsStore.sessionManagement,
                      descriptions,
                    })
                  }}
                />
              )}
              name="descriptions"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                  <select
                    value={
                      Stores.enviromentSettingsStore.sessionManagement?.environment
                    }
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.environment
                        ? "border-red-500  focus:border-red-500"
                        : "border-gray-300"
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
                      Stores.enviromentSettingsStore.updateSessionManagement({
                        ...Stores.enviromentSettingsStore.sessionManagement,
                        environment,
                      })
                    }}
                  >
                    <option selected>
                      {stores.loginStore.login &&
                      stores.loginStore.login.role !== "SYSADMIN"
                        ? `Select`
                        : Stores.enviromentSettingsStore.sessionManagement
                            ?.environment || `Select`}
                    </option>
                    {LibraryUtils.lookupItems(
                      stores.routerStore.lookupItems,
                      "SESSION_ENVIRONMENT"
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
            onClick={handleSubmit(onSubmitSessionManagement)}
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
      <br />

      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        <FeatureComponents.Molecules.SessionManagementList
          data={Stores.enviromentSettingsStore.sessionManagementList}
          totalSize={Stores.enviromentSettingsStore.sessionManagementListCount}
          extraData={{
            lookupItems: stores.routerStore.lookupItems,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(stores.routerStore.userPermission),
            "Delete"
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(stores.routerStore.userPermission),
            "Edit/Modify"
          )}
          onDelete={(selectedUser) =>
            props.onModalConfirm && props.onModalConfirm(selectedUser)
          }
          onSelectedRow={(rows) => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: "Delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected items!`,
              })
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: "Update",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update recoard!`,
              })
          }}
          onPageSizeChange={(page, limit) => {
            Stores.enviromentSettingsStore.fetchSessionManagementList(page, limit)
          }}
        />
      </div>
    </>
  )
})
export default SessionManagement
