/* eslint-disable */
import React, { useEffect, useMemo } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"

import * as FeatureComponents from "../components"
import "@lp/library/assets/css/accordion.css"
import { useForm, Controller } from "react-hook-form"
import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

interface EnvironmentSettingsProps {
  onModalConfirm?: (item: any) => void
}

export const EnvironmentSettings = observer((props: EnvironmentSettingsProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const {
    loading,
    environmentStore,
    userStore,
    labStore,
    loginStore,
    departmentStore,
    routerStore,
  } = useStores()

  useEffect(() => {
    if (loginStore.login) {
      environmentStore.updateEnvironmentSettings({
        ...environmentStore.environmentSettings,
        environment: loginStore.login.environment,
      })
      setValue("environment", loginStore.login.environment)
    }
  }, [loginStore.login])

  const onSubmitSessionManagement = () => {
    environmentStore.EnvironmentService.addEnvironment({
      input: {
        ...environmentStore.environmentSettings,
        enteredBy: loginStore.login.userId,
        documentType: "environmentSettings",
      },
    }).then((res) => {
      if (res.createEnviroment.success) {
        LibraryComponents.Atoms.Toast.success({
          message: `😊 ${res.createEnviroment.message}`,
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    })
  }

  const table = useMemo(
    () => (
      <FeatureComponents.Molecules.EnvironmentSettingsList
        data={environmentStore.environmentSettingsList}
        totalSize={environmentStore.environmentSettingsListCount}
        extraData={{
          lookupItems: routerStore.lookupItems,
          selectedItems: environmentStore.selectedItems,
          user: errors.user,
          listLabs: labStore.listLabs,
          listDepartment: departmentStore.listDepartment,
          environmentVariableList: environmentStore.environmentVariableList,
        }}
        isDelete={RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
          "Delete"
        )}
        isEditModify={RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
          "Edit/Modify"
        )}
        onDelete={(selectedUser) =>
          props.onModalConfirm && props.onModalConfirm(selectedUser)
        }
        onSelectedRow={(rows) => {
          props.onModalConfirm &&
            props.onModalConfirm({
              show: true,
              type: "delete",
              id: rows,
              title: "Are you sure?",
              body: `Delete selected items!`,
            })
        }}
        onUpdateItem={(value: any, dataField: string, id: string) => {
          props.onModalConfirm &&
            props.onModalConfirm({
              show: true,
              type: "update",
              data: { value, dataField, id },
              title: "Are you sure?",
              body: `Update recoard!`,
            })
        }}
        onPageSizeChange={(page, limit) => {
          environmentStore.fetchEnvironment(
            { documentType: "environmentSettings" },
            page,
            limit
          )
        }}
        onFilter={(type, filter, page, limit) => {
          environmentStore.EnvironmentService.filter(
            {
              input: { type, filter, page, limit },
            },
            "environmentSettings"
          )
        }}
      />
    ),
    [environmentStore.environmentSettingsList]
  )

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
            {((environmentStore.selectedItems &&
              environmentStore.selectedItems?.labs &&
              environmentStore.selectedItems?.labs.length > 0) ||
              labStore.listLabs) && (
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Labs"
                    id="labs"
                    hasError={errors.lab}
                  >
                    <LibraryComponents.Molecules.AutoCompleteFilterMutiSelect
                      loader={loading}
                      data={{
                        list: labStore.listLabs,
                        selected: environmentStore.selectedItems?.labs,
                        displayKey: "name",
                        findKey: "name",
                      }}
                      hasError={errors.labs}
                      onUpdate={(item) => {
                        const items = environmentStore.selectedItems?.labs
                        onChange(items)
                        environmentStore.updateEnvironmentSettings({
                          ...environmentStore.environmentSettings,
                          lab: items,
                        })
                      }}
                      onFilter={(value: string) => {
                        labStore.LabService.filter({
                          input: {
                            filter: {
                              type: "search",
                              ["name"]: value,
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
                          }
                          if (!labs) labs = [item]
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
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="lab"
                rules={{ required: true }}
                defaultValue=""
              />
            )}
            {((environmentStore.selectedItems &&
              environmentStore.selectedItems?.users &&
              environmentStore.selectedItems?.users.length > 0) ||
              userStore.userList) && (
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Users"
                    id="user"
                    hasError={errors.user}
                  >
                    <LibraryComponents.Molecules.AutoCompleteFilterMutiSelect
                      loader={loading}
                      data={{
                        list: userStore.userList,
                        selected: environmentStore.selectedItems?.users,
                        displayKey: "fullName",
                        findKey: "fullName",
                      }}
                      hasError={errors.user}
                      onUpdate={(item) => {
                        const items = environmentStore.selectedItems?.users
                        onChange(items)
                        environmentStore.updateEnvironmentSettings({
                          ...environmentStore.environmentSettings,
                          user: items,
                        })
                      }}
                      onFilter={(value: string) => {
                        userStore.UsersService.filter({
                          input: {
                            filter: {
                              type: "search",
                              ["fullName"]: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        })
                      }}
                      onSelect={(item) => {
                        let users = environmentStore.selectedItems?.users
                        if (!item.selected) {
                          if (users && users.length > 0) {
                            users.push(item)
                          }
                          if (!users) users = [item]
                        } else {
                          users = users.filter((items) => {
                            return items._id !== item._id
                          })
                        }
                        environmentStore.updateSelectedItems({
                          ...environmentStore.selectedItems,
                          users,
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
            {((environmentStore.selectedItems &&
              environmentStore.selectedItems?.department &&
              environmentStore.selectedItems?.department.length > 0) ||
              departmentStore.listDepartment) && (
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Department"
                    id="department"
                    hasError={errors.department}
                  >
                    <LibraryComponents.Molecules.AutoCompleteFilterMutiSelect
                      loader={loading}
                      data={{
                        list: departmentStore.listDepartment,
                        selected: environmentStore.selectedItems?.department,
                        displayKey: "name",
                        findKey: "name",
                      }}
                      hasError={errors.department}
                      onUpdate={(item) => {
                        const items = environmentStore.selectedItems?.department
                        onChange(items)
                        environmentStore.updateEnvironmentSettings({
                          ...environmentStore.environmentSettings,
                          department: items,
                        })
                      }}
                      onFilter={(value: string) => {
                        departmentStore.DepartmentService.filter({
                          input: {
                            filter: {
                              type: "search",
                              ["name"]: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        })
                      }}
                      onSelect={(item) => {
                        let department = environmentStore.selectedItems?.department
                        if (!item.selected) {
                          if (department && department.length > 0) {
                            department.push(item)
                          }
                          if (!department) department = [item]
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
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="department"
                rules={{ required: true }}
                defaultValue=""
              />
            )}

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
                      environmentStore.updateEnvironmentSettings({
                        ...environmentStore.environmentSettings,
                        variable,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {environmentStore.environmentVariableList &&
                      environmentStore.environmentVariableList.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.environmentVariable}>
                            {item.environmentVariable}
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
                    environmentStore.updateEnvironmentSettings({
                      ...environmentStore.environmentSettings,
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
            justify="stretch"
            fill
            space={4}
          >
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.MultilineInput
                  rows={3}
                  label="Description"
                  name="lblDescription"
                  placeholder={
                    errors.descriptions ? "Please Enter descriptions" : "Description"
                  }
                  hasError={errors.descriptions}
                  value={environmentStore.environmentSettings?.descriptions}
                  onChange={(descriptions) => {
                    onChange(descriptions)
                    environmentStore.updateEnvironmentSettings({
                      ...environmentStore.environmentSettings,
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
                    value={environmentStore.environmentSettings?.environment}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.environment ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    disabled={
                      loginStore.login && loginStore.login.role !== "SYSADMIN"
                        ? true
                        : false
                    }
                    onChange={(e) => {
                      const environment = e.target.value
                      onChange(environment)
                      environmentStore.updateEnvironmentSettings({
                        ...environmentStore.environmentSettings,
                        environment,
                      })
                    }}
                  >
                    <option selected>
                      {loginStore.login && loginStore.login.role !== "SYSADMIN"
                        ? `Select`
                        : environmentStore.environmentSettings?.environment ||
                          `Select`}
                    </option>
                    {LibraryUtils.lookupItems(
                      routerStore.lookupItems,
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
      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        {table}
      </div>
    </>
  )
})
