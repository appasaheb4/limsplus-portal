/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"

import {Toast,Header,PageHeading,PageHeadingLabDetails, Buttons, Grid, List, Form, Svg, ModalConfirm} from "@/library/components"
import {BannerList} from "../components"
import {lookupItems,lookupValue} from "@/library/utils"
import { useForm, Controller } from "react-hook-form"
import { RouterFlow } from "@/flows"

import { BannerHoc } from "../hoc"
import { useStores } from "@/stores"

const Banner = BannerHoc(
  observer(() => {
    const { loginStore, routerStore, bannerStore } = useStores()
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm()
    setValue("environment", bannerStore.banner?.environment)

    const [modalConfirm, setModalConfirm] = useState<any>()
    const [hideAddBanner, setHideAddBanner] = useState<boolean>(true)

    const onSubmitBanner = () => {
      bannerStore.BannerService.addBanner(bannerStore.banner).then((res) => {
        if (res.createBanner.success) {
          Toast.success({
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
        <Header>
          <PageHeading
            title={routerStore.selectedComponents?.title || ""}
          />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(routerStore.userPermission, "Add") && (
          <Buttons.ButtonCircleAddRemove
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
                    <Form.InputFile
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
                    <Form.InputWrapper label="Environment">
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
                        {lookupItems(
                          routerStore.lookupItems,
                          "ENVIRONMENT"
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
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
                onClick={handleSubmit(onSubmitBanner)}
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
          <div className="p-2 rounded-lg shadow-xl overflow-auto">
            <BannerList
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
          <ModalConfirm
            {...modalConfirm}
            click={(type: string) => {
              if (type === "Delete") {
                bannerStore.BannerService.deleteBanner({
                  input: { id: modalConfirm.id },
                }).then((res: any) => {
                  if (res.removeBanner.success) {
                    Toast.success({
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
                    Toast.success({
                      message: `😊 ${res.updateBanner.message}`,
                    })
                    setModalConfirm({ show: false })
                    bannerStore.fetchListBanner()
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
                    Toast.success({
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
)

export default Banner
