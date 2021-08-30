import React, { useState } from "react"
import { observer } from "mobx-react"

import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { RouterFlow } from "@lp/flows"
import { AssetsService } from "@lp/features/assets/services"

import { useStores } from "@lp/library/stores"
import { useEffect } from "react"

const Banner = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const { loginStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddBanner, setHideAddBanner] = useState<boolean>(true)

  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.bannerStore.updateBanner({
        ...Stores.bannerStore.banner,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  const onSubmitBanner = () => {
    Stores.bannerStore.BannerService.addBanner(Stores.bannerStore.banner).then(
      (res) => {
        if (res.success) {
          LibraryComponents.Atoms.Toast.success({
            message: `😊 ${res.message}`,
          })
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      }
    )
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
                    label="Title"
                    placeholder={errors.title ? "Please Enter Title" : "Title"}
                    hasError={errors.title}
                    value={Stores.bannerStore.banner?.title}
                    onChange={(title) => {
                      onChange(title)
                      Stores.bannerStore.updateBanner({
                        ...Stores.bannerStore.banner,
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
                      Stores.bannerStore.updateBanner({
                        ...Stores.bannerStore.banner,
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
                      value={Stores.bannerStore.banner?.environment}
                      disabled={
                        stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const environment = e.target.value
                        onChange(environment)
                        Stores.bannerStore.updateBanner({
                          ...Stores.bannerStore.banner,
                          environment,
                        })
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.bannerStore.banner?.environment}
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
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.BannerList
            data={Stores.bannerStore.listBanner || []}
            totlaSize={Stores.bannerStore.listBannerCount}
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
              Stores.bannerStore.fetchListBanner(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type: string) => {
            if (type === "Delete") {
              Stores.bannerStore.BannerService.deleteBanner(modalConfirm.id).then(
                (res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Banner deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.bannerStore.fetchListBanner()
                  }
                }
              )
            } else if (type === "Update") {
              Stores.bannerStore.BannerService.updateSingleFiled(
                modalConfirm.data
              ).then((res: any) => {
                if (res.status === 200) {
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 ${res.message}`,
                  })
                  setModalConfirm({ show: false })
                  Stores.bannerStore.fetchListBanner()
                }
              })
            } else {
              const path = `https://limsplus.blob.core.windows.net/banner/${modalConfirm.data.value.name}`
              new AssetsService()
                .uploadFile(
                  modalConfirm.data.value,
                  "banner",
                  modalConfirm.data.value.name
                )
                .then((res) => {
                  if (res.success) {
                    Stores.bannerStore.BannerService.updateSingleFiled({
                      ...modalConfirm.data,
                      value: path,
                    }).then((res: any) => {
                      if (res.success) {
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 ${res.message}`,
                        })
                        setModalConfirm({ show: false })
                        setTimeout(() => {
                          window.location.reload()
                        }, 2000)
                      }
                    })
                  } else {
                    alert(res.message)
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
