import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"

import * as Models from "../models"
import * as Util from "../util"

import { Stores } from "../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const MasterPanel = observer(() => {
  const [errors, setErrors] = useState<Models.MasterPanel>()
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Lab" id="optionLab">
                <select
                  name="optionLabs"
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const lab = e.target.value as string
                    console.log({ lab })
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
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
              <LibraryComponents.Atoms.Form.Input
                label="Analyte Code"
                name="txtAnalyteCode"
                placeholder="Analyte Code"
                value={Stores.masterAnalyteStore.masterAnalyte?.analyteCode}
                onChange={(analyteCode) => {
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
                rows={3}
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
                label="Price"
                name="txtPrice"
                placeholder="Price"
                type="number"
                value={Stores.masterAnalyteStore.masterAnalyte?.pirce}
                onChange={(pirce) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    pirce,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Schedule"
                name="txtSchedule"
                placeholder="Schedule"
                value={LibraryUtils.moment(
                  Stores.masterAnalyteStore.masterAnalyte?.schedule
                ).format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  const formatDate = LibraryUtils.moment(schedule).format(
                    "YYYY-MM-DD HH:mm"
                  )
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    schedule: new Date(formatDate),
                  })
                }}
              />
              <LibraryComponents.Atoms.Grid cols={4}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Bill"
                  id="modeBill"
                  value={Stores.masterAnalyteStore.masterAnalyte?.bill}
                  onChange={(bill) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      bill,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="AutoRelease"
                  id="modeAutoRelease"
                  value={Stores.masterAnalyteStore.masterAnalyte?.autoRelease}
                  onChange={(autoRelease) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      autoRelease,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Hold OOS"
                  id="modeHoldOOS"
                  value={Stores.masterAnalyteStore.masterAnalyte?.holdOOS}
                  onChange={(holdOOS) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      holdOOS,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="InstantResult"
                  id="modeInstantResult"
                  value={Stores.masterAnalyteStore.masterAnalyte?.instantResult}
                  onChange={(instantResult) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      instantResult,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Grid>
            </LibraryComponents.Atoms.List>

            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.Input
                label="Tube Groups"
                name="txtTubeGroups"
                placeholder="Tube Groups"
                value={Stores.masterAnalyteStore.masterAnalyte?.tubeGroups}
                onChange={(tubeGroups) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    tubeGroups,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Analyte Method"
                name="txtAnalyteMethod"
                placeholder="Analyte Method"
                value={Stores.masterAnalyteStore.masterAnalyte?.analyteMethod}
                onChange={(analyteMethod) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    analyteMethod,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper
                label="Workflow"
                id="optionWrokFlow"
              >
                <select
                  name="optionWrokFlows"
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const workflow = e.target.value as string
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      workflow,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["workflow1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper
                label="Sample Type"
                id="optionSampleType"
              >
                <select
                  name="optionSampleTypes"
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleType = e.target.value as string
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      sampleType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["sampleType1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Grid cols={5}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="PageBreak"
                  id="modePageBreak"
                  value={Stores.masterAnalyteStore.masterAnalyte?.pageBreak}
                  onChange={(pageBreak) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      pageBreak,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Method"
                  id="modeMethod"
                  value={Stores.masterAnalyteStore.masterAnalyte?.method}
                  onChange={(method) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      method,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Display"
                  id="modeDisplay"
                  value={Stores.masterAnalyteStore.masterAnalyte?.display}
                  onChange={(display) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      display,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="CalculationFlag"
                  id="modeCalculationFlag"
                  value={Stores.masterAnalyteStore.masterAnalyte?.calculationFlag}
                  onChange={(calculationFlag) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      calculationFlag,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Repitation"
                  id="modeRepitation"
                  value={Stores.masterAnalyteStore.masterAnalyte?.repetition}
                  onChange={(repetition) => {
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      repetition,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Grid>
              <LibraryComponents.Atoms.Form.Input
                label="Calcy Name"
                name="txtCalcyName"
                placeholder="Calcy Name"
                value={Stores.masterAnalyteStore.masterAnalyte?.calcyName}
                onChange={(calcyName) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    calcyName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="High"
                name="txtHigh"
                placeholder="High"
                value={Stores.masterAnalyteStore.masterAnalyte?.high}
                onChange={(high) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    high,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Low"
                name="txtLow"
                placeholder="Low"
                value={Stores.masterAnalyteStore.masterAnalyte?.low}
                onChange={(low) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    low,
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
              <LibraryComponents.Atoms.Form.InputWrapper
                label="Picture"
                id="optionPicture"
              >
                <select
                  name="optionPicture"
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const picture = e.target.value as "0" | "1" | "2" | "3"
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      picture,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["0", "1", "2", "3"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Units">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const units = e.target.value
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      units,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Units 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Usage">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const usage = e.target.value
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      usage,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Usage 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="CPT Code"
                name="txtCPTCode"
                placeholder="CPT Code"
                value={Stores.masterAnalyteStore.masterAnalyte?.cptCode}
                onChange={(cptCode) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    cptCode,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
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

export default MasterPanel
