import React, { useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as FeatureComponents from "../components"

import * as Models from "../models"
import * as Utils from "../util"
import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

const SampleContainer = observer(() => {
  const [errors, setErrors] = useState<Models.SampleContainer>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddBanner, setHideAddBanner] = useState<boolean>(true)

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={RootStore.routerStore.selectedComponents?.title || ""}
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
              <LibraryComponents.Atoms.Form.Input
                label="Container Code"
                placeholder="Container Code"
                value={Stores.sampleContainerStore.sampleContainer?.containerCode}
                onChange={(containerCode) => {
                  setErrors({
                    ...errors,
                    containerCode: Utils.validate.single(
                      containerCode,
                      Utils.sampleContainer.containerCode
                    ),
                  })
                  Stores.sampleContainerStore.updateSampleContainer({
                    ...Stores.sampleContainerStore.sampleContainer,
                    containerCode,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Container Name"
                placeholder="Container Name"
                value={Stores.sampleContainerStore.sampleContainer?.containerName}
                onChange={(containerName) => {
                  setErrors({
                    ...errors,
                    containerName: Utils.validate.single(
                      containerName,
                      Utils.sampleContainer.containerName
                    ),
                  })
                  Stores.sampleContainerStore.updateSampleContainer({
                    ...Stores.sampleContainerStore.sampleContainer,
                    containerName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputFile
                label="Image"
                placeholder="Image"
                onChange={(e) => {
                  const image = e.target.files[0]
                  Stores.sampleContainerStore.updateSampleContainer({
                    ...Stores.sampleContainerStore.sampleContainer,
                    image,
                  })
                }}
              />
            </LibraryComponents.Atoms.List>

            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={5}
                label="Description"
                placeholder="Description"
                value={Stores.sampleContainerStore.sampleContainer?.description}
                onChange={(description) => {
                  Stores.sampleContainerStore.updateSampleContainer({
                    ...Stores.sampleContainerStore.sampleContainer,
                    description,
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
                const error = Utils.validate(
                  Stores.sampleContainerStore.sampleContainer,
                  Utils.sampleContainer
                )  
                setErrorsMsg(error)
                if (error === undefined) {
                  RootStore.rootStore.setProcessLoading(true)
                  Stores.sampleContainerStore.sampleContainerService
                    .addSampleContainer(Stores.sampleContainerStore.sampleContainer)
                    .then((res) => {
                      RootStore.rootStore.setProcessLoading(false)
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
          <div>
            {errorsMsg &&
              Object.entries(errorsMsg).map((item, index) => (
                <h6 className="text-red-700" key={index}>{_.upperFirst(item.join(" : "))}</h6>
              ))}
          </div>
        </div>
        <br />  
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.SampleContainerList
            data={Stores.sampleContainerStore.listSampleContainer || []}
            isDelete={RouterFlow.checkPermission(
              RootStore.routerStore.userPermission,
              "Delete"
            )}
            // isEditModify={RouterFlow.checkPermission(
            //   RootStore.routerStore.userPermission,
            //   "Edit/Modify"
            // )}
            isEditModify={false}
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
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type: string) => {
            if (type === "Delete") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.sampleContainerStore.sampleContainerService.deleteSampleContainer(modalConfirm.id).then(
                (res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({message:`😊 Records deleted.`})
                    setModalConfirm({ show: false })
                    Stores.sampleContainerStore.fetchListSampleContainer()
                  }
                }
              )
            } else if (type === "Update") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.sampleContainerStore.sampleContainerService.updateSingleFiled(
                modalConfirm.data
              ).then((res: any) => {
                RootStore.rootStore.setProcessLoading(false)
                if (res.status === 200) {
                  LibraryComponents.Atoms.Toast.success({message:`😊 Record updated.`})
                  setModalConfirm({ show: false })
                  Stores.sampleContainerStore.fetchListSampleContainer()
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
