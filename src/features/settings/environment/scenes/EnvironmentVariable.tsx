/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"

import * as FeatureComponents from "../components"
import "@lp/library/assets/css/accordion.css"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

interface EnvironmentVariableProps {
  onModalConfirm?: (item: any) => void
}

export const EnvironmentVariable = observer((props: EnvironmentVariableProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const { loginStore, environmentStore, routerStore } = useStores()
  const [hideInputView, setHideInputView] = useState<boolean>(true)

  const onSubmitEnvironmentVariable = () => {
    if (!environmentStore.checkExistsEnvVariable) {
      environmentStore.EnvironmentService.addEnvironment({
        input: {
          ...environmentStore.environmentVariable,
          enteredBy: loginStore.login.userId,
          documentType: "environmentVariable",
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
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: "😔 Please enter diff variable",
      })
    }
  }
  return (
    <>
      {RouterFlow.checkPermission(routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemoveBottom
          style={{ bottom: 40 }}
          show={hideInputView}
          onClick={() => setHideInputView(!hideInputView)}
        />
      )}

      <div
        className={
          "p-2 rounded-lg shadow-xl " + (hideInputView ? "hidden" : "shown")
        }
      >
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Environment Variables"
                    name="txtEnvironmentVariable"
                    value={environmentStore.environmentVariable?.environmentVariable}
                    hasError={errors.environmentVariable}
                    placeholder={
                      errors.environmentVariable
                        ? "Please Enter Environment Variable"
                        : "Environment Variable"
                    }
                    onChange={(environmentVariable) => {
                      onChange(environmentVariable)
                      environmentStore.updatEnvironmentVariable({
                        ...environmentStore.environmentVariable,
                        environmentVariable: environmentVariable.toUpperCase(),
                      })
                    }}
                    onBlur={(environmentVariable) => {
                      if (environmentVariable)
                        environmentStore.EnvironmentService.checkExistsRecord({
                          input: {
                            filter: {
                              environmentVariable,
                              documentType: "environmentVariable",
                            },
                          },
                        }).then((res) => {
                          if (res.checkExistsEnviromentRecord.success) {
                            environmentStore.updateExistsEnvVariable(true)
                            LibraryComponents.Atoms.Toast.error({
                              message: `😔 ${res.checkExistsEnviromentRecord.message}`,
                            })
                          } else environmentStore.updateExistsEnvVariable(false)
                        })
                    }}
                  />
                )}
                name="environmentVariable"
                rules={{ required: true }}
                defaultValue=""
              />
              {environmentStore.checkExistsEnvVariable && (
                <span className="text-red-600 font-medium relative">
                  Environment variable already exits. Please use other variable.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Category"
                    hasError={errors.category}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.category ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const category = e.target.value as string
                        onChange(category)
                        environmentStore.updatEnvironmentVariable({
                          ...environmentStore.environmentVariable,
                          category,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "ENVIRONMENT_VARIABLES_CATEGORY"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {LibraryUtils.lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="category"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={3}
                    label="Description"
                    name="lblDescription"
                    placeholder={
                      errors.descriptions
                        ? "Please Enter descriptions"
                        : "Description"
                    }
                    hasError={errors.descriptions}
                    //value={userStore.user.password}
                    onChange={(descriptions) => {
                      onChange(descriptions)
                      environmentStore.updatEnvironmentVariable({
                        ...environmentStore.environmentVariable,
                        descriptions,
                      })
                    }}
                  />
                )}
                name="descriptions"
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Entered By"
                    placeholder={
                      errors.userId ? "Please Enter Entered By" : "Entered By"
                    }
                    hasError={errors.userId}
                    value={loginStore.login?.userId}
                    disabled={true}
                  />
                )}
                name="userId"
                rules={{ required: false }}
                defaultValue=""
              />

              <LibraryComponents.Atoms.Form.InputWrapper label="Scope">
                <LibraryComponents.Atoms.Grid cols={4}>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Toggle
                        label="Lab"
                        hasError={errors.lab}
                        value={environmentStore.environmentVariable?.allLabs}
                        onChange={(allLabs) => {
                          onChange(allLabs)
                          environmentStore.updatEnvironmentVariable({
                            ...environmentStore.environmentVariable,
                            allLabs,
                          })
                        }}
                      />
                    )}
                    name="lab"
                    rules={{ required: false }}
                    defaultValue=""
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Toggle
                        label="User"
                        value={environmentStore.environmentVariable?.allUsers}
                        onChange={(allUsers) => {
                          onChange(allUsers)
                          environmentStore.updatEnvironmentVariable({
                            ...environmentStore.environmentVariable,
                            allUsers,
                          })
                        }}
                      />
                    )}
                    name="user"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Toggle
                        label="Departmetn"
                        value={environmentStore.environmentVariable?.allDepartment}
                        onChange={(allDepartment) => {
                          onChange(allDepartment)
                          environmentStore.updatEnvironmentVariable({
                            ...environmentStore.environmentVariable,
                            allDepartment,
                          })
                        }}
                      />
                    )}
                    name="department"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                </LibraryComponents.Atoms.Grid>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={handleSubmit(onSubmitEnvironmentVariable)}
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
      </div>

      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        <FeatureComponents.Molecules.EnvironmentVariableList
          data={environmentStore.environmentVariableList}
          totalSize={environmentStore.environmentVariableListCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
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
              { documentType: "environmentVariable" },
              page,
              limit
            )
          }}
          onFilter={(type, filter, page, limit) => {
            environmentStore.EnvironmentService.filter(
              {
                input: { type, filter, page, limit },
              },
              "environmentVariable"
            )
          }}
        />
      </div>
    </>
  )
})
