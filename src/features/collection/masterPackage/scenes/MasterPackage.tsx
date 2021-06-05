import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
// import * as LibraryUtils from "@lp/library/utils"
// import * as FeatureComponents from "../components"

// import * as Models from "../models"
// import * as Util from "../util"

import { Stores } from "../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const MasterPackage = observer(() => {
 // const [errors, setErrors] = useState<Models.MasterPackage>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={RootStore.routerStore.selectedComponents?.title || ""}
        />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(
        toJS(RootStore.routerStore.userPermission),
        "Add"
      ) && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddLab}
          onClick={() => setHideAddLab(!hideAddLab)}
        />
      )}
      <div className="mx-auto flex-wrap">
        <div
          className={"p-2 rounded-lg shadow-xl " + (hideAddLab ? "shown" : "shown")}
        >
          <LibraryComponents.Atoms.Grid cols={2}>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.InputWrapper label="Lab" id="optionLab">
                <select
                  name="optionLabs"
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const lab = e.target.value as string
                    Stores.masterPackageStore.updateMasterPackage({
                      ...Stores.masterPackageStore.masterPackage,
                      lab,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LabStores.labStore.listLabs.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Package Code">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const packageCode = e.target.value as string
                    Stores.masterPackageStore.updateMasterPackage({
                      ...Stores.masterPackageStore.masterPackage,
                      packageCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Package Code 1"].map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Package Name">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const packageName = e.target.value as string
                    Stores.masterPackageStore.updateMasterPackage({
                      ...Stores.masterPackageStore.masterPackage,
                      packageName,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Package Name 1"].map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Panel Code">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const panelCode = e.target.value as string
                    Stores.masterPackageStore.updateMasterPackage({
                      ...Stores.masterPackageStore.masterPackage,
                      panelCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Panel Code 1"].map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>

              <LibraryComponents.Atoms.Form.InputWrapper label="Panel Name">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const panelName = e.target.value as string
                    Stores.masterPackageStore.updateMasterPackage({
                      ...Stores.masterPackageStore.masterPackage,
                      panelName,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Panel Name 1"].map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </LibraryComponents.Atoms.List>

            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
               <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    Stores.masterPackageStore.updateMasterPackage({
                      ...Stores.masterPackageStore.masterPackage,
                      status,  
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Status 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              {/* <LibraryComponents.Atoms.Grid cols={5}> */}
              <LibraryComponents.Atoms.Form.Toggle
                label="Bill"
                id="modeBill"
                value={Stores.masterPackageStore.masterPackage?.bill}
                onChange={(bill) => {
                  Stores.masterPackageStore.updateMasterPackage({
                    ...Stores.masterPackageStore.masterPackage,
                    bill,
                  })
                }}
              />  
              {/* </LibraryComponents.Atoms.Grid> */}
             
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={() => {
                // if (
                //   Util.validate(Stores.labStore.labs, Util.constraintsLabs) ===
                //     undefined &&
                //   !Stores.labStore.checkExitsCode
                // ) {
                //   RootStore.rootStore.setProcessLoading(true)
                //   Stores.labStore.LabService.addLab(Stores.labStore.labs).then(
                //     () => {
                //       RootStore.rootStore.setProcessLoading(false)
                //       LibraryComponents.Atoms.ToastsStore.success(`Lab created.`)
                //       Stores.labStore.fetchListLab()
                //       Stores.labStore.clear()
                //     }
                //   )
                // } else {
                //   LibraryComponents.Atoms.ToastsStore.warning(
                //     "Please enter all information!"
                //   )
                // }
              }}
            >
              Save
            </LibraryComponents.Atoms.Buttons.Button>
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Atoms.Icon.Remove}
              onClick={() => {
                //rootStore.labStore.clear();
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          {/* <FeatureComponents.Molecules.LabList
            data={Stores.masterAnalyteStore.masterAnalyte || []}
            isDelete={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
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
                body: `Update lab!`,
              })
            }}
          /> */}
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            console.log({type});
            
            // if (type === "Delete") {
            //   RootStore.rootStore.setProcessLoading(true)
            //   Stores.labStore.LabService.deleteLab(modalConfirm.id).then(
            //     (res: any) => {
            //       RootStore.rootStore.setProcessLoading(false)
            //       if (res.status === 200) {
            //         LibraryComponents.Atoms.ToastsStore.success(`Lab deleted.`)
            //         setModalConfirm({ show: false })
            //         Stores.labStore.fetchListLab()
            //       }
            //     }
            //   )
            // } else if (type === "Update") {
            //   RootStore.rootStore.setProcessLoading(true)
            //   Stores.labStore.LabService.updateSingleFiled(modalConfirm.data).then(
            //     (res: any) => {
            //       RootStore.rootStore.setProcessLoading(false)
            //       if (res.status === 200) {
            //         LibraryComponents.Atoms.ToastsStore.success(`Lab updated.`)
            //         setModalConfirm({ show: false })
            //         Stores.labStore.fetchListLab()
            //       }
            //     }
            //   )
            // }
          }}
          onClose={() => {
            setModalConfirm({ show: false })
          }}
        />
      </div>
    </>
  )
})

export default MasterPackage
