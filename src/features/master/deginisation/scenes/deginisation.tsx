/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"
import {Toast,Header,PageHeading,PageHeadingLabDetails,Buttons,Grid,List
  ,Form,Svg,ModalConfirm} 
  from "@/library/components"
import {DeginisationList} from "../components"
import {lookupItems} from "@/library/utils"
import { useForm, Controller } from "react-hook-form"
import {DeginisationHoc} from "../hoc"
import {  useStores } from "@/stores"

import { RouterFlow } from "@/flows"

const Deginisation = DeginisationHoc(observer(() => {
  const { loginStore,deginisationStore,routerStore } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  setValue("environment",deginisationStore.deginisation?.environment)
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddDeginisation, setHideAddDeginisation] = useState<boolean>(true)
  const onSubmitDesginiation = () => {
    if (!deginisationStore.checkExitsCode) {
      deginisationStore.DeginisationService.addDeginisation({
        input: { ...deginisationStore.deginisation },
      }).then((res) => {
        if (res.createDesignation.success) {
          Toast.success({
            message: `😊 ${res.createDesignation.message}`,
          })
          setTimeout(()=>{
            // deginisationStore.fetchListDeginisation()
            window.location.reload()
          },2000)
        } else {
          Toast.error({ message: "😔 Please try again" })
        }
      })
    } else {
      Toast.warning({
        message: "😔 Please enter diff code",
      })
    }
  }

  return (
    <>
      <Header>
        <PageHeading
          title={routerStore.selectedComponents?.title || ""}
        />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      {RouterFlow.checkPermission(routerStore.userPermission, "Add") && (
        <Buttons.ButtonCircleAddRemove
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
          <Grid cols={2}>
            <List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.Input
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
                          Toast.error({
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
                  <Form.Input
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
                  <Form.InputWrapper label="Environment">
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
                            Toast.error({
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
                      {lookupItems(
                        routerStore.lookupItems,
                        "ENVIRONMENT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name="environment"
                rules={{ required: true }}
                defaultValue=""
              />
            </List>
          </Grid>
          <br />

          <List direction="row" space={3} align="center">
            <Buttons.Button
              size="medium"
              type="solid"
              icon={Svg.Save}
              onClick={handleSubmit(onSubmitDesginiation)}
            >
              Save
            </Buttons.Button>
            <Buttons.Button
              size="medium"
              type="outline"
              icon={Svg.Remove}
              onClick={() => {
                window.location.reload()
              }}
            >
              Clear
            </Buttons.Button>
          </List>
        </div>
        <div className="p-2 rounded-lg shadow-xl">
          <DeginisationList
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
            onFilter={(type, filter, page, limit) => {
              deginisationStore.DeginisationService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
        </div>
        <ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              deginisationStore.DeginisationService.deleteDeginisation({
                input: { id: modalConfirm.id },
              }).then((res: any) => {
                if (res.removeDesignation.success) {
                  Toast.success({
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
                  Toast.success({
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
}))

export default Deginisation
