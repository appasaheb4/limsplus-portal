/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"

import { useForm, Controller } from "react-hook-form"
import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"

const SampleContainer = observer(() => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  const { loginStore, sampleContainerStore, routerStore } = useStores()

  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddBanner, setHideAddBanner] = useState<boolean>(true)

  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      sampleContainerStore.updateSampleContainer({
        ...sampleContainerStore.sampleContainer,
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
      sampleContainerStore && sampleContainerStore.updateSampleContainer({
        ...sampleContainerStore.sampleContainer,
        environment: environment.code as string
      })
      setValue("environment",environment.code as string)
    }
  },[routerStore.lookupItems])

  const onSubmitSampleContainer = () => {
    if (!sampleContainerStore.checkExitsEnvCode) {
      sampleContainerStore.sampleContainerService
        .addSampleContainer({ input: { ...sampleContainerStore.sampleContainer } })
        .then((res) => {
          if (res.createSampleContainer.success) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 ${res.createSampleContainer.message}`,
            })
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          }
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
          show={hideAddBanner}
          onClick={() => setHideAddBanner(!hideAddBanner)}
        />
      )}
      <div className="mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddBanner ? "hidden" : "shown")
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
                    label="Container Code"
                    hasError={errors.containerCode}
                    placeholder={
                      errors.containerCode
                        ? "Please Enter Container Code "
                        : "Conatiner Code"
                    }
                    value={sampleContainerStore.sampleContainer?.containerCode}
                    onChange={(containerCode) => {
                      onChange(containerCode)
                      sampleContainerStore.updateSampleContainer({
                        ...sampleContainerStore.sampleContainer,
                        containerCode: containerCode.toUpperCase(),
                      })
                    }}
                    onBlur={(code) => {
                      sampleContainerStore.sampleContainerService
                        .checkExitsEnvCode({
                          input: {
                            code,
                            env: sampleContainerStore.sampleContainer?.environment,
                          },
                        })
                        .then((res) => {
                          if (res.checkSampleContainersExistsRecord.success) {
                            sampleContainerStore.updateExitsEnvCode(true)
                            LibraryComponents.Atoms.Toast.error({
                              message: `😔 ${res.checkSampleContainersExistsRecord.message}`,
                            })
                          } else sampleContainerStore.updateExitsEnvCode(false)
                        })
                    }}
                  />
                )}
                name="containerCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {sampleContainerStore.checkExitsEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Container Name"
                    hasError={errors.containerName}
                    placeholder={
                      errors.containerName
                        ? "Please Enter Container Name"
                        : "Container Name"
                    }
                    value={sampleContainerStore.sampleContainer?.containerName}
                    onChange={(containerName) => {
                      onChange(containerName)
                      sampleContainerStore.updateSampleContainer({
                        ...sampleContainerStore.sampleContainer,
                        containerName: containerName.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="containerName"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputFile
                    label="Image"
                    placeholder={errors.image ? "Please Insert Image" : "Image"}
                    hasError={errors.image}
                    onChange={(e) => {
                      const image = e.target.files[0]
                      onChange(image)
                      sampleContainerStore.updateSampleContainer({
                        ...sampleContainerStore.sampleContainer,
                        image,
                      })
                    }}
                  />
                )}
                name="image"
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
                    rows={5}
                    label="Description"
                    hasError={errors.description}
                    placeholder={
                      errors.description ? "Please Enter Description" : "Description"
                    }
                    value={sampleContainerStore.sampleContainer?.description}
                    onChange={(description) => {
                      onChange(description)
                      sampleContainerStore.updateSampleContainer({
                        ...sampleContainerStore.sampleContainer,
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
                      value={sampleContainerStore.sampleContainer?.environment}
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
                        sampleContainerStore.updateSampleContainer({
                          ...sampleContainerStore.sampleContainer,
                          environment,
                        })
                        sampleContainerStore.sampleContainerService
                          .checkExitsEnvCode({
                            input: {
                              code:
                                sampleContainerStore.sampleContainer?.containerCode,
                              env: environment,
                            },
                          })  
                          .then((res) => {
                            if (res.checkSampleContainersExistsRecord.success) {
                              sampleContainerStore.updateExitsEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkSampleContainersExistsRecord.message}`,
                              })
                            } else sampleContainerStore.updateExitsEnvCode(false)
                          })
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : sampleContainerStore.sampleContainer?.environment ||
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
              onClick={handleSubmit(onSubmitSampleContainer)}
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.SampleContainerList
            data={sampleContainerStore.listSampleContainer || []}
            totalSize={sampleContainerStore.listSampleContainerCount}
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
                body: `Update item!`,
              })
            }}
            onUpdateImage={(value: any, dataField: string, id: string) => {
              setModalConfirm({
                show: true,
                type: "UpdateImage",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Record update!`,
              })
            }}    
            onPageSizeChange={(page, limit) => {
              sampleContainerStore.fetchListSampleContainer(page, limit)
            }}   
            onFilter={(type, filter, page, limit) => {
              sampleContainerStore.sampleContainerService.filter({
                input: { type, filter, page, limit },
              })
            }}  
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type: string) => {
            if (type === "Delete") {
              sampleContainerStore.sampleContainerService
                .deleteSampleContainer({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeSampleContainer.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeSampleContainer.message}`,
                    })
                    setModalConfirm({ show: false })
                    sampleContainerStore.fetchListSampleContainer()
                  }
                })
            } else if (type === "Update") {
              sampleContainerStore.sampleContainerService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateSampleContainer.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateSampleContainer.message}`,
                    })
                    setModalConfirm({ show: false })
                    sampleContainerStore.fetchListSampleContainer()
                  }
                })
            } else {
              sampleContainerStore.sampleContainerService
                .updateImage({
                  input: {
                    _id: modalConfirm.data.id,
                    image: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateSampleContainersImage.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateSampleContainersImage.message}`,
                    })
                    setTimeout(() => {
                      window.location.reload()
                    }, 2000)
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

export default SampleContainer
