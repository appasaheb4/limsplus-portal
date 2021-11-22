/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"

import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import { RouterFlow } from "@lp/flows"

import { useStores } from "@lp/stores"
import { useEffect } from "react"

const Banner = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const { loginStore, routerStore, bannerStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddBanner, setHideAddBanner] = useState<boolean>(true)

  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      bannerStore.updateBanner({
        ...bannerStore.banner,
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
      bannerStore.updateBanner({
        ...bannerStore.banner,
        environment: environment.code as string,
      })
      setValue("environment", environment.code as string)
    }
  }, [routerStore.lookupItems])

  const onSubmitBanner = () => {
    bannerStore.BannerService.addBanner(bannerStore.banner).then((res) => {
      if (res.createBanner.success) {
        LibraryComponents.Atoms.Toast.success({
          message: `😊 ${res.createBanner.message}`,
        })
      }
      setTimeout(() => {
        // bannerStore.fetchListBanner()
        window.location.reload()
      }, 1000)
    })
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
                    label="Title"
                    placeholder={errors.title ? "Please Enter Title" : "Title"}
                    hasError={errors.title}
                    value={bannerStore.banner?.title}
                    onChange={(title) => {
                      onChange(title)
                      bannerStore.updateBanner({
                        ...bannerStore.banner,
                        title,
                      })
                    }}
                  />
                )}
                name="title"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputFile
                    label="File"
                    placeholder={errors.image ? "Please insert image" : "File"}
                    hasError={errors.image}
                    onChange={(e) => {
                      const image = e.target.files[0]
                      onChange(image)
                      bannerStore.updateBanner({
                        ...bannerStore.banner,
                        image,
                      })
                    }}
                  />
                )}
                name="image"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={bannerStore.banner?.environment}
                      disabled={
                        loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const environment = e.target.value
                        onChange(environment)
                        bannerStore.updateBanner({
                          ...bannerStore.banner,
                          environment,
                        })
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : bannerStore.banner?.environment || `Select`}
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
              onClick={handleSubmit(onSubmitBanner)}
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
          <FeatureComponents.Molecules.BannerList
            data={bannerStore.listBanner || []}
            totlaSize={bannerStore.listBannerCount}
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
                body: `Update banner!`,
              })
            }}
            onUpdateImage={(value: any, dataField: string, id: string) => {
              setModalConfirm({
                show: true,
                type: "UpdateImage",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update banner!`,
              })
            }}
            onPageSizeChange={(page, limit) => {
              bannerStore.fetchListBanner(page, limit)
            }}
            onFilter={(type, filter, page, limit) => {
              bannerStore.BannerService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type: string) => {
            if (type === "Delete") {
              bannerStore.BannerService.deleteBanner({
                input: { id: modalConfirm.id },
              }).then((res: any) => {
                if (res.removeBanner.success) {
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 ${res.removeBanner.message}`,
                  })
                  setModalConfirm({ show: false })
                  bannerStore.fetchListBanner()
                }
              })
            } else if (type === "Update") {
              bannerStore.BannerService.updateSingleFiled({
                input: {
                  _id: modalConfirm.data.id,
                  [modalConfirm.data.dataField]: modalConfirm.data.value,
                },
              }).then((res: any) => {
                if (res.updateBanner.success) {
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 ${res.updateBanner.message}`,
                  })
                  bannerStore.fetchListBanner()
                  // setModalConfirm({ show: false })
                }
              })
            } else {
              bannerStore.BannerService.updateBannerImage({
                input: {
                  _id: modalConfirm.data.id,
                  file: modalConfirm.data.value,
                  containerName: "banner",
                },
              }).then((res: any) => {
                if (res.updateBannerImage.success) {
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 ${res.updateBannerImage.message}`,
                  })
                  setTimeout(() => {
                    bannerStore.fetchListBanner()
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

export default Banner
