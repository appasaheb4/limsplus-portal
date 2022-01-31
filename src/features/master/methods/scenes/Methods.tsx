/* eslint-disable */
import React, {  useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import {MethodsList} from "../components"
import {lookupItems} from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import {MethodsHoc} from "../hoc"
import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"

const Methods = MethodsHoc(observer(() => {
  const { loginStore, methodsStore, routerStore } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  setValue("environment", loginStore.login.environment)
  setValue("status",methodsStore.methods?.status)
  setValue("environment", methodsStore.methods?.environment)
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)
  const onSubmitMethods = () => {
    if (!methodsStore.checkExitsEnvCode) {
      methodsStore.methodsService
        .addMethods({ input: { ...methodsStore.methods } })
        .then((res) => {
          if (res.createMethod.success) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 ${res.createMethod.message}`,
            })
          }
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: `😔 Please enter diff code`,
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
          show={hideAddSection}
          onClick={() => setHideAddSection(!hideAddSection)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddSection ? "hidden" : "shown")
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
                    label="Method Code"
                    placeholder={
                      errors.methodsCode ? "Please Enter Method Code" : "Method Code"
                    }
                    hasError={errors.methodsCode}
                    value={methodsStore.methods?.methodsCode}
                    onChange={(methodsCode) => {
                      onChange(methodsCode)
                      methodsStore.updateMethods({
                        ...methodsStore.methods,
                        methodsCode: methodsCode.toUpperCase(),
                      })
                    }}
                    onBlur={(code) => {
                      methodsStore.methodsService
                        .checkExitsEnvCode({
                          input: {
                            code,
                            env: methodsStore.methods?.environment,
                          },
                        })
                        .then((res) => {
                          if (res.checkMethodsExistsRecord.success) {
                            methodsStore.updateExitsEnvCode(true)
                            LibraryComponents.Atoms.Toast.error({
                              message: `😔 ${res.checkMethodsExistsRecord.message}`,
                            })
                          } else methodsStore.updateExitsEnvCode(false)
                        })
                    }}
                  />
                )}
                name="methodsCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {methodsStore.checkExitsEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Method Name"
                    placeholder={
                      errors.methodName
                        ? "Please Enter Methods Name"
                        : "Methods Name"
                    }
                    hasError={errors.methodName}
                    value={methodsStore.methods?.methodsName}
                    onChange={(methodsName) => {
                      onChange(methodsName)
                      methodsStore.updateMethods({
                        ...methodsStore.methods,
                        methodsName: methodsName.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="methodName"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={4}
                    label="Description"
                    placeholder={
                      errors.description
                        ? "Please Enter  Description"
                        : "Description"
                    }
                    hasError={errors.description}
                    value={methodsStore.methods?.description}
                    onChange={(description) => {
                      onChange(description)
                      methodsStore.updateMethods({
                        ...methodsStore.methods,
                        description: description.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="description"
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Status"
                    hasError={errors.status}
                  >
                    <select
                      value={methodsStore && methodsStore.methods?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        methodsStore.updateMethods({
                          ...methodsStore.methods,
                          status,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        routerStore.lookupItems,
                        "STATUS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="status"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={methodsStore.methods?.environment}
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
                        methodsStore.updateMethods({
                          ...methodsStore.methods,
                          environment,
                        })
                        methodsStore.methodsService
                          .checkExitsEnvCode({
                            input: {
                              code: methodsStore.methods?.methodsCode,
                              env: environment,
                            },
                          })
                          .then((res) => {
                            if (res.checkMethodsExistsRecord.success) {
                              methodsStore.updateExitsEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkMethodsExistsRecord.message}`,
                              })
                            } else methodsStore.updateExitsEnvCode(false)
                          })
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : methodsStore.methods?.environment || `Select`}
                      </option>
                      {lookupItems(
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
              onClick={handleSubmit(onSubmitMethods)}
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
          <MethodsList
            data={methodsStore.listMethods || []}
            totalSize={methodsStore.listMethodsCount}
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
                body: `Update Section!`,
              })
            }}
            onPageSizeChange={(page, limit) => {
              methodsStore.fetchMethods(page, limit)
            }}  
            onFilter={(type, filter, page, limit) => {
              methodsStore.methodsService.filter({
                input: { type, filter, page, limit },
              })
            }}  
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              methodsStore.methodsService
                .deleteMethods({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeMethod.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeMethod.message}`,
                    })
                    setModalConfirm({ show: false })
                    methodsStore.fetchMethods()
                  }
                })
            } else if (type === "Update") {
              methodsStore.methodsService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateMethod.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateMethod.message}`,
                    })
                    setModalConfirm({ show: false })
                    methodsStore.fetchMethods()
                  }
                })
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  )
}))

export default Methods
