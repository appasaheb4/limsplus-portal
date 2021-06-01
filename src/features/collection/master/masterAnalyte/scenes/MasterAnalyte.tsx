import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"

import * as Models from "../models"
import * as Util from "../util"

import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const MasterAnatyte = observer(() => {
  const [errors, setErrors] = useState<Models.MasterAnalyte>()
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
          <LibraryComponents.Atoms.Grid cols={3}>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.Input
                label="Lab"
                id="txtLab"
                placeholder="Lab"
                value={Stores.masterAnalyteStore.masterAnalyte?.lab}
                onChange={(lab) => {
                  setErrors({
                    ...errors,
                    lab: Util.validate.single(lab, Util.masterAnalyte.lab),
                  })
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    lab,
                  })
                }}
              />
              {errors?.lab && (
                <span className="text-red-600 font-medium relative">
                  {errors.lab}
                </span>
              )}
              <LibraryComponents.Atoms.Form.Input
                label="Analyte Code"
                name="txtAnalyteCode"
                placeholder="Analyte Code"
                value={Stores.masterAnalyteStore.masterAnalyte?.analyteCode}
                onChange={(analyteCode) => {
                  // setErrors({
                  //   ...errors,
                  //   analyteCode: Util.validate.single(
                  //     analyteCode,
                  //     Util.masterAnalyte.analyteCode
                  //   ),
                  // })
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    analyteCode,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Analyte Name"
                name="txtAnalyteName"
                placeholder="Analyte Name"
                value={Stores.masterAnalyteStore.masterAnalyte?.analyteName}
                onChange={(analyteName) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    analyteName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={4}
                label="Description"
                name="txtDescription"
                placeholder="Description"
                value={Stores.masterAnalyteStore.masterAnalyte?.description}
                onChange={(description) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    description,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Short Name"
                name="txtShortName"
                placeholder="Short Name"
                value={Stores.masterAnalyteStore.masterAnalyte?.shortName}
                onChange={(shortName) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    shortName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Bill"
                name="txtBill"
                placeholder="Bill"
                value={Stores.masterAnalyteStore.masterAnalyte?.bill}
                onChange={(bill) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    bill,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Price"
                name="txtPrice"
                placeholder="Price"
                type="number"
                value={Stores.masterAnalyteStore.masterAnalyte?.price}
                onChange={(price) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    price,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Schedule"
                name="txtSchedule"
                placeholder="Schedule"
                value={Stores.masterAnalyteStore.masterAnalyte?.schedule}
                onChange={(schedule) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    schedule,
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
            data={Stores.labStore.listLabs || []}
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
        {/* <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.labStore.LabService.deleteLab(modalConfirm.id).then(
                (res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.ToastsStore.success(`Lab deleted.`)
                    setModalConfirm({ show: false })
                    Stores.labStore.fetchListLab()
                  }
                }
              )
            } else if (type === "Update") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.labStore.LabService.updateSingleFiled(modalConfirm.data).then(
                (res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.ToastsStore.success(`Lab updated.`)
                    setModalConfirm({ show: false })
                    Stores.labStore.fetchListLab()
                  }
                }
              )
            }
          }}
          onClose={() => {
            setModalConfirm({ show: false })
          }}
        /> */}
      </div>
    </>
  )
})

export default MasterAnatyte
