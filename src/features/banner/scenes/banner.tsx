import React, { useState } from "react"
import { observer } from "mobx-react"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as FeatureComponents from "../components"

import { Stores } from "../stores"
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

const Banner = observer(() => {
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddBanner, setHideAddBanner] = useState<boolean>(true)

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
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
            "p-2 rounded-lg shadow-xl " + (hideAddBanner ? "hidden" : "shown")
          }
        >
          <LibraryComponents.Atoms.Grid cols={2} >
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
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={() => {
                if (Stores.bannerStore.banner !== undefined) {
                  Stores.bannerStore.BannerService.addBanner(
                    Stores.bannerStore.banner
                  ).then((res) => {
                    if (res.status === LibraryModels.StatusCode.CREATED) {
                      LibraryComponents.Atoms.Toast.success({message:`😊 Banner created.`})
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
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type: string) => {
            if (type === "Delete") {
              Stores.bannerStore.BannerService.deleteBanner(modalConfirm.id).then(
                (res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({message:`😊Banner deleted.`})
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
                  LibraryComponents.Atoms.Toast.success({message:`😊Banner updated.`})
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
