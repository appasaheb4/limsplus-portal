import React, { useState } from "react"
import { observer } from "mobx-react"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as FeatureComponents from "../components"
import * as Services from "../services"

import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

const Banner = observer(() => {
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddBanner, setHideAddBanner] = useState<boolean>(true)

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={RootStore.routerStore.selectedComponents?.title || ""}
          subTitle="Add, Edit & Delete"
        />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(RootStore.routerStore.userPermission, "Add") && (
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
              <LibraryComponents.Atoms.Form.Input
                label="Title"
                id="title"
                placeholder="Title"
                value={Stores.bannerStore.banner?.title}
                onChange={(title) => {
                  Stores.bannerStore.updateBanner({
                    ...Stores.bannerStore.banner,
                    title,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputFile
                label="File"
                id="file"
                placeholder="File"
                //value={rootStore.bannerStore.banner?.image}
                onChange={(e) => {
                  const image = e.target.files[0]
                  Stores.bannerStore.updateBanner({
                    ...Stores.bannerStore.banner,
                    image,
                  })
                }}
              />
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />

          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icons.Save}
              onClick={() => {
                if (Stores.bannerStore.banner !== undefined) {
                  RootStore.rootStore.setProcessLoading(true)
                  Services.addBanner(Stores.bannerStore.banner).then((res) => {
                    RootStore.rootStore.setProcessLoading(false)
                    if (res.status === LibraryModels.StatusCode.CREATED) {
                      LibraryComponents.Atoms.ToastsStore.success(`Banner created.`)
                      setTimeout(() => {
                        window.location.reload()
                      }, 2000)
                    }
                  })
                } else {
                  alert("Please select image.")
                }
              }}
            >
              Save
            </LibraryComponents.Atoms.Buttons.Button>
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Atoms.Icons.Remove}
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
            isDelete={RouterFlow.checkPermission(
              RootStore.routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              RootStore.routerStore.userPermission,
              "Edit/Modify"
            )}
            onDelete={(selectedItem) => setModalConfirm(selectedItem)}
            onSelectedRow={(rows) => {
              setModalConfirm({
                show: true,
                type: "Delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected banners!`,
              })
            }}
            onUpdateItem={(value: any, dataField: string, id: string) => {
              console.log(value, dataField, id)
              setModalConfirm({
                show: true,
                type: "Update",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update banner!`,
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type: string) => {
            if (type === "Delete") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.bannerStore.BannerService.deleteBanner(modalConfirm.id).then(
                (res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.ToastsStore.success(`Banner deleted.`)
                    setModalConfirm({ show: false })
                    Stores.bannerStore.fetchListBanner()
                  }
                }
              )
            } else if (type === "Update") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.bannerStore.BannerService.updateSingleFiled(
                modalConfirm.data
              ).then((res: any) => {
                RootStore.rootStore.setProcessLoading(false)
                if (res.status === 200) {
                  LibraryComponents.Atoms.ToastsStore.success(`Banner updated.`)
                  setModalConfirm({ show: false })
                  Stores.bannerStore.fetchListBanner()
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
