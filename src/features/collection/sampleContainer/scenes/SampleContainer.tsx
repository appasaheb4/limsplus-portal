/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"

import { useForm, Controller } from "react-hook-form"
import { useStores } from "@lp/library/stores"
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

const SampleContainer = observer(() => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  const { loginStore } = useStores()

  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddBanner, setHideAddBanner] = useState<boolean>(true)

  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.sampleContainerStore.updateSampleContainer({
        ...Stores.sampleContainerStore.sampleContainer,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  const onSubmitSampleContainer = () => {
    if (Stores.sampleContainerStore.sampleContainer) {
      Stores.sampleContainerStore.sampleContainerService
        .addSampleContainer(Stores.sampleContainerStore.sampleContainer)
        .then((res) => {
          if (res.status === LibraryModels.StatusCode.CREATED) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Sample container created.`,
            })
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          }
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: `😔 Please enter all information!`,
      })
    }
  }

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(stores.routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddBanner}
          onClick={() => setHideAddBanner(!hideAddBanner)}
        />
      )}
      <div className="mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddBanner ? "shown" : "shown")
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
                    value={
                      Stores.sampleContainerStore.sampleContainer?.containerCode
                    }
                    onChange={(containerCode) => {
                      onChange(containerCode)
                      Stores.sampleContainerStore.updateSampleContainer({
                        ...Stores.sampleContainerStore.sampleContainer,
                        containerCode: containerCode.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="containerCode"
                rules={{ required: true }}
                defaultValue=""
              />

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
                    value={
                      Stores.sampleContainerStore.sampleContainer?.containerName
                    }
                    onChange={(containerName) => {
                      onChange(containerName)
                      Stores.sampleContainerStore.updateSampleContainer({
                        ...Stores.sampleContainerStore.sampleContainer,
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
                      Stores.sampleContainerStore.updateSampleContainer({
                        ...Stores.sampleContainerStore.sampleContainer,
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
                    value={Stores.sampleContainerStore.sampleContainer?.description}
                    onChange={(description) => {
                      onChange(description)
                      Stores.sampleContainerStore.updateSampleContainer({
                        ...Stores.sampleContainerStore.sampleContainer,
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
                      value={
                        Stores.sampleContainerStore.sampleContainer?.environment
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
                        Stores.sampleContainerStore.updateSampleContainer({
                          ...Stores.sampleContainerStore.sampleContainer,
                          environment,
                        })
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.sampleContainerStore.sampleContainer?.environment || `Select`}
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
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.SampleContainerList
            data={Stores.sampleContainerStore.listSampleContainer || []}
            totalSize={Stores.sampleContainerStore.listSampleContainerCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems,
            }}
            isDelete={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
              "Edit/Modify"
            )}
            // isEditModify={false}
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
            onPageSizeChange={(page, limit) => {
              Stores.sampleContainerStore.fetchListSampleContainer(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type: string) => {
            if (type === "Delete") {
              Stores.sampleContainerStore.sampleContainerService
                .deleteSampleContainer(modalConfirm.id)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Records deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.sampleContainerStore.fetchListSampleContainer()
                  }
                })
            } else if (type === "Update") {
              Stores.sampleContainerStore.sampleContainerService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.sampleContainerStore.fetchListSampleContainer()
                    window.location.reload()
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
