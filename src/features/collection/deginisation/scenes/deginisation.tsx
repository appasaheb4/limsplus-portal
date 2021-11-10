/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"

import {  useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"

const Deginisation = observer(() => {
  const { loginStore,deginisationStore,routerStore } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
 
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddDeginisation, setHideAddDeginisation] = useState<boolean>(true)

  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      deginisationStore.updateDescription({
        ...deginisationStore.deginisation,
        environment: loginStore.login.environment,
      })
      setValue("environment", loginStore.login.environment)
    }
  }, [loginStore.login])

  useEffect(()=>{
    const environment = routerStore.lookupItems.find((fileds)=>{
      return fileds.fieldName === 'ENVIRONMENT'
    })?. arrValue?.find((environmentItem)=>environmentItem.code === 'P')
    if(environment){
      deginisationStore && deginisationStore.updateDescription({
        ...deginisationStore.deginisation,
        environment: environment.code as string
      })
      setValue("environment",environment.code as string)
    }
  },[routerStore.lookupItems])

  const onSubmitDesginiation = () => {
    if (!deginisationStore.checkExitsCode) {
      deginisationStore.DeginisationService.addDeginisation({
        input: { ...deginisationStore.deginisation },
      }).then((res) => {
        if (res.createDesignation.success) {
          LibraryComponents.Atoms.Toast.success({
            message: `😊 ${res.createDesignation.message}`,
          })
          setTimeout(()=>{
            // deginisationStore.fetchListDeginisation()
            window.location.reload()
          },2000)
        } else {
          LibraryComponents.Atoms.Toast.error({ message: "😔 Please try again" })
        }
      })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: "😔 Please enter diff code",
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
          show={hideAddDeginisation}
          onClick={() => setHideAddDeginisation(!hideAddDeginisation)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddDeginisation ? "hidden" : "shown")
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
                    placeholder={errors.code ? "Please Enter Code" : "Code"}
                    hasError={errors.code}
                    value={deginisationStore.deginisation?.code}
                    onChange={(code) => {
                      onChange(code)
                      deginisationStore.updateDescription({
                        ...deginisationStore.deginisation,
                        code: code.toUpperCase(),
                      })
                    }}
                    onBlur={(code) => {
                      deginisationStore.DeginisationService.checkExitsEnvCode(
                        {
                          input: {
                            code,
                            env: deginisationStore.deginisation?.environment,
                          },
                        }
                      ).then((res) => {
                        if (res.checkDesignationsExistsRecord.success) {
                          deginisationStore.setExitsCode(true)
                          LibraryComponents.Atoms.Toast.error({
                            message: `😔 ${res.checkDesignationsExistsRecord.message}`,
                          })
                        } else deginisationStore.setExitsCode(false)
                      })
                    }}
                  />
                )}
                name="code"
                rules={{ required: true }}
                defaultValue=""
              />

              {deginisationStore.checkExitsCode && (
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
                    placeholder={
                      errors.description ? "Please Enter Description" : "Description"
                    }
                    hasError={errors.description}
                    value={deginisationStore.deginisation?.description}
                    onChange={(description) => {
                      onChange(description)
                      deginisationStore.updateDescription({
                        ...deginisationStore.deginisation,
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
                      value={deginisationStore.deginisation?.environment}
                      disabled={
                        loginStore.login &&
                        loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const environment = e.target.value
                        onChange(environment)
                        deginisationStore.updateDescription({
                          ...deginisationStore.deginisation,
                          environment,
                        })
                        deginisationStore.DeginisationService.checkExitsEnvCode(
                          {
                            input: {
                              code: deginisationStore.deginisation?.code,
                              env: environment,
                            },
                          }
                        ).then((res) => {
                          if (res.checkDesignationsExistsRecord.success) {
                            deginisationStore.setExitsCode(true)
                            LibraryComponents.Atoms.Toast.error({
                              message: `😔 ${res.checkDesignationsExistsRecord.message}`,
                            })
                          } else deginisationStore.setExitsCode(false)
                        })
                      }}
                    >
                      <option selected>
                        {loginStore.login &&
                        loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : deginisationStore.deginisation?.environment ||
                            `Select`}
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
              onClick={handleSubmit(onSubmitDesginiation)}
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
        <div className="p-2 rounded-lg shadow-xl">
          <FeatureComponents.Molecules.DeginisationList
            data={deginisationStore.listDeginisation || []}
            totalSize={deginisationStore.listDeginisationCount}
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
                body: `Update deginisation!`,
              })
            }}
            onPageSizeChange={(page, limit) => {
              deginisationStore.fetchListDeginisation(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              deginisationStore.DeginisationService.deleteDeginisation({
                input: { id: modalConfirm.id },
              }).then((res: any) => {
                if (res.removeDesignation.success) {
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 ${res.removeDesignation.message}`,
                  })
                  setModalConfirm({ show: false })
                  deginisationStore.fetchListDeginisation()
                }
              })
            } else if (type === "Update") {
              deginisationStore.DeginisationService.updateSingleFiled({
                input: {
                  _id: modalConfirm.data.id,
                  [modalConfirm.data.dataField]: modalConfirm.data.value,
                },
              }).then((res: any) => {
                if (res.updateDesignation.success) {
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 ${res.updateDesignation.message}`,
                  })
                  setModalConfirm({ show: false })
                  deginisationStore.fetchListDeginisation()
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

export default Deginisation
