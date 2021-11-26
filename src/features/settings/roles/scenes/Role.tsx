/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"

const Role = observer(() => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()
  const { loginStore, roleStore, routerStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddRole, setHideAddRole] = useState<boolean>(true)
  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      roleStore.updateRole({
        ...roleStore.role,
        environment: loginStore.login.environment,
      })
      setValue("environment", loginStore.login.environment)
    }
  }, [loginStore.login])
  useEffect(() => {
    const environment = routerStore.lookupItems
      .find((fileds) => {
        return fileds.fieldName === "ENVIRONMENT"
      })
      ?.arrValue?.find((environmentItem) => environmentItem.code === "P")
    if (environment) {
      roleStore &&
        roleStore.updateRole({
          ...roleStore.role,
          environment: environment.code as string,
        })
      setValue("environment", environment.code as string)
    }
  }, [routerStore.lookupItems])
  const onSubmitRoles = () => {
    if (!roleStore.checkExitsCode) {
      roleStore.RoleService.addrole({ input: { ...roleStore.role } }).then((res) => {
        if (res.createRole.success) {
          LibraryComponents.Atoms.Toast.success({
            message: `😊 ${res.createRole.message}`,
          })
        }
        setTimeout(() => {
          // roleStore.fetchListRole()
          window.location.reload()
        }, 2000)
      })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: "😔 Please enter all information!",
      })
    }
  }

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddRole}
          onClick={() => setHideAddRole(!hideAddRole)}
        />
      )}
      <div className=" mx-auto  flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl overflow-auto " +
            (hideAddRole ? "hidden" : "shown")
          }
        >
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Code"
                    id="code"
                    hasError={errors.code}
                    placeholder={errors.code ? "Please Enter Code " : "Code"}
                    value={roleStore.role?.code}
                    onChange={(code) => {
                      onChange(code)
                      roleStore.updateRole({
                        ...roleStore.role,
                        code: code.toUpperCase(),
                      })
                    }}
                    onBlur={(code) => {
                      roleStore.RoleService.checkExitsEnvCode({
                        input: {
                          code,
                          env: roleStore.role?.environment,
                        },
                      }).then((res) => {
                        if (res.checkRoleExistsEnvCode.success) {
                          roleStore.setExitsCode(true)
                          LibraryComponents.Atoms.Toast.error({
                            message: `😔 ${res.checkRoleExistsEnvCode.message}`,
                          })
                        } else roleStore.setExitsCode(false)
                      })
                    }}
                  />
                )}
                name="code"
                rules={{ required: true }}
                defaultValue=""
              />
              {roleStore.checkExitsCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Description"
                    name="description"
                    hasError={errors.description}
                    placeholder={
                      errors.description ? "Please Enter Description" : "Description"
                    }
                    value={roleStore.role?.description}
                    onChange={(description) => {
                      onChange(description)
                      roleStore.updateRole({
                        ...roleStore.role,
                        description: description.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="description"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={roleStore.role?.environment}
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
                        roleStore.updateRole({
                          ...roleStore.role,
                          environment,
                        })
                        roleStore.RoleService.checkExitsEnvCode({
                          input: {
                            code: roleStore.role?.code,
                            env: environment,
                          },
                        }).then((res) => {
                          if (res.checkRoleExistsEnvCode.success) {
                            roleStore.setExitsCode(true)
                            LibraryComponents.Atoms.Toast.error({
                              message: `😔 ${res.checkRoleExistsEnvCode.message}`,
                            })
                          } else roleStore.setExitsCode(false)
                        })
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : roleStore.role?.environment || `Select`}
                      </option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
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
              onClick={handleSubmit(onSubmitRoles)}
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
        <div className="p-2 rounded-lg shadow-xl">
          <FeatureComponents.Molecules.RoleList
            data={roleStore.listRole || []}
            totalSize={roleStore.listRoleCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
            }}
            isDelete={RouterFlow.checkPermission(
              routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              routerStore.userPermission,
              "Edit/Modify"
            )}
            onDelete={(selectedItem) => setModalConfirm(selectedItem)}
            onSelectedRow={(rows) => {
              setModalConfirm({
                show: true,
                type: "Delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected items!`,
              })
            }}
            onUpdateItem={(value: any, dataField: string, id: string) => {
              setModalConfirm({
                show: true,
                type: "Update",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update role!`,
              })
            }}
            onPageSizeChange={(page, limit) => {
              roleStore.fetchListRole(page, limit)
            }}
            onFilter={(type, filter, page, limit) => {
              roleStore.RoleService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              roleStore.RoleService.deleterole({
                input: { id: modalConfirm.id },
              }).then((res: any) => {
                if (res.removeRole.success) {
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 ${res.removeRole.message}`,
                  })
                  setModalConfirm({ show: false })
                  roleStore.fetchListRole()
                }
              })
            } else if (type === "Update") {
              roleStore.RoleService.updateSingleFiled({
                input: {
                  _id: modalConfirm.data.id,
                  [modalConfirm.data.dataField]: modalConfirm.data.value,
                },
              }).then((res: any) => {
                if (res.updateRole.success) {
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 ${res.updateRole.message}`,
                  })
                  setModalConfirm({ show: false })
                  roleStore.fetchListRole()
                }
              })
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  )
})

export default Role
