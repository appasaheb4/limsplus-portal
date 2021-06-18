/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
// import * as FeatureComponents from "../components"

import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"

import { Stores } from "../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as RootStore } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const MasterPanel = observer(() => {
  const [errors, setErrors] = useState<Models.MasterPanel>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  const [lookupItems, setLookupItems] = useState<any[]>([])

  const getLookupValues = async () => {
    const listLookup = LookupStore.lookupStore.listLookup
    if (listLookup.length > 0) {
      const selectedCategory: any = await Storage.getItem(
        `__persist_mobx_stores_routerStore_SelectedCategory__`
      )
      const items = listLookup.filter((item: any) => {
        if (
          item.documentName.name === selectedCategory.category &&
          item.documentName.children.name === selectedCategory.item
        )
          return item
      })
      setLookupItems(items)
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])

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
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Creation"
                placeholder="Date Creation"
                value={LibraryUtils.moment
                  .unix(Stores.masterPanelStore.masterPanel?.dateCreation || 0)
                  .format("YYYY-MM-DD")}
                disabled={true}
                // onChange={(e) => {
                //   const schedule = new Date(e.target.value)
                //   const formatDate = LibraryUtils.moment(schedule).format(
                //     "YYYY-MM-DD HH:mm"
                //   )
                //   Stores.masterAnalyteStore.updateMasterAnalyte({
                //     ...Stores.masterAnalyteStore.masterAnalyte,
                //     schedule: new Date(formatDate),
                //   })
                // }}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active"
                placeholder="Date Creation"
                value={LibraryUtils.moment
                  .unix(Stores.masterPanelStore.masterPanel?.dateCreation || 0)
                  .format("YYYY-MM-DD")}
                disabled={true}
                // onChange={(e) => {
                //   const schedule = new Date(e.target.value)
                //   const formatDate = LibraryUtils.moment(schedule).format(
                //     "YYYY-MM-DD HH:mm"
                //   )
                //   Stores.masterAnalyteStore.updateMasterAnalyte({
                //     ...Stores.masterAnalyteStore.masterAnalyte,
                //     schedule: new Date(formatDate),
                //   })
                // }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Version"
                placeholder="Version"
                value={Stores.masterPanelStore.masterPanel?.version}
                disabled={true}
                // onChange={(analyteCode) => {
                //   Stores.masterAnalyteStore.updateMasterAnalyte({
                //     ...Stores.masterAnalyteStore.masterAnalyte,
                //     analyteCode,
                //   })
                // }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Key Num"
                placeholder="Key Num"
                value={Stores.masterPanelStore.masterPanel?.keyNum}
                disabled={true}
                // onChange={(analyteCode) => {
                //   Stores.masterAnalyteStore.updateMasterAnalyte({
                //     ...Stores.masterAnalyteStore.masterAnalyte,
                //     analyteCode,
                //   })
                // }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Entered By"
                placeholder="Entered By"
                value={LoginStore.loginStore.login?.userId}
                disabled={true}
                // onChange={(analyteCode) => {
                //   Stores.masterAnalyteStore.updateMasterAnalyte({
                //     ...Stores.masterAnalyteStore.masterAnalyte,
                //     analyteCode,
                //   })
                // }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="RLab">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const rLab = e.target.value as string
                    setErrors({
                      ...errors,
                      rLab: Utils.validate.single(rLab, Utils.masterPanel.rLab),
                    })
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      rLab,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="PLab">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const pLab = e.target.value as string
                    setErrors({
                      ...errors,
                      pLab: Utils.validate.single(pLab, Utils.masterPanel.pLab),
                    })
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      pLab,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Department">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const department = e.target.value as string
                    setErrors({
                      ...errors,
                      department: Utils.validate.single(
                        department,
                        Utils.masterPanel.department
                      ),
                    })
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      department,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {DepartmentStore.departmentStore.listDepartment.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.code} - ${item.name}`}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Section">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const section = e.target.value as string
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      section,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Section 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>

              <LibraryComponents.Atoms.Form.Input
                label="Panel Code"
                placeholder="Panel Code"
                value={Stores.masterPanelStore.masterPanel?.panelCode}
                onChange={(panelCode) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    panelCode,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Panel Name"
                placeholder="Panel Name"
                value={Stores.masterPanelStore.masterPanel?.panelName}
                onChange={(panelName) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    panelName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Description"
                placeholder="Description"
                value={Stores.masterPanelStore.masterPanel?.description}
                onChange={(description) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    description,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Short Name"
                placeholder="Short Name"
                value={Stores.masterPanelStore.masterPanel?.shortName}
                onChange={(shortName) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    shortName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Price"
                placeholder="Price"
                type="number"
                value={Stores.masterPanelStore.masterPanel?.price}
                onChange={(price) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    price,
                  })
                }}
              />
              <LibraryComponents.Atoms.Grid cols={5}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Bill"
                  id="modeBill"
                  value={Stores.masterPanelStore.masterPanel?.bill}
                  onChange={(bill) => {
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      bill,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="AutoRelease"
                  id="modeAutoRelease"
                  value={Stores.masterPanelStore.masterPanel?.autoRelease}
                  onChange={(autoRelease) => {
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      autoRelease,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Hold OOS"
                  id="modeHoldOOS"
                  value={Stores.masterPanelStore.masterPanel?.holdOOS}
                  onChange={(holdOOS) => {
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      holdOOS,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Confidential"
                  value={Stores.masterPanelStore.masterPanel?.confidential}
                  onChange={(confidential) => {
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      confidential,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Urgent"
                  value={Stores.masterPanelStore.masterPanel?.urgent}
                  onChange={(urgent) => {
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      urgent,
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
                label="Schedule"
                placeholder="Schedule"
                value={Stores.masterPanelStore.masterPanel?.schedule}
                onChange={(schedule) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    schedule,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="TAT"
                placeholder="TAT"
                value={Stores.masterPanelStore.masterPanel?.tat}
                onChange={(tat) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    tat,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Validation Level">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const validationLevel: any = e.target.value
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      validationLevel,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>

              <LibraryComponents.Atoms.Form.Input
                label="Report Groups"
                placeholder="Report Groups"
                value={Stores.masterPanelStore.masterPanel?.reportGroup}
                onChange={(reportGroup) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    reportGroup,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Report Order"
                placeholder="Report Order"
                value={Stores.masterPanelStore.masterPanel?.reportOrder}
                onChange={(reportOrder) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    reportOrder,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Sex">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sex = e.target.value as string
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      sex,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "SEX"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Hi Age"
                placeholder="Hi Age"
                value={Stores.masterPanelStore.masterPanel?.hiAge}
                onChange={(hiAge) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    hiAge,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Lo Age"
                placeholder="Lo Age"
                value={Stores.masterPanelStore.masterPanel?.loAge}
                onChange={(loAge) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    loAge,
                  })
                }}
              />

              <LibraryComponents.Atoms.Form.InputWrapper label="Processing">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const processing = e.target.value as string
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      processing,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "PROCESSING"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Category">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const category = e.target.value as string
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      category,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "CATEGORY"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Suffix">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const suffix = e.target.value as string
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      suffix,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "SUFFIX"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Service Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const serviceType = e.target.value as string
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      serviceType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "SERVICE_TYPE"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Panel Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const panelType = e.target.value as string
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      panelType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "PANEL_TYPE"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>

              <LibraryComponents.Atoms.Grid cols={5}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Instant Result"
                  value={Stores.masterPanelStore.masterPanel?.instantResult}
                  onChange={(instantResult) => {
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      instantResult,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Sex Action"
                  value={Stores.masterPanelStore.masterPanel?.sexAction}
                  onChange={(sexAction) => {
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      sexAction,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Repetition"
                  value={Stores.masterPanelStore.masterPanel?.repitation}
                  onChange={(repitation) => {
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      repitation,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Print Label"
                  value={Stores.masterPanelStore.masterPanel?.printLabel}
                  onChange={(printLabel) => {
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      printLabel,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Method"
                  value={Stores.masterPanelStore.masterPanel?.method}
                  onChange={(method) => {
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      method,
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
                placeholder="Tube Groups"
                value={Stores.masterPanelStore.masterPanel?.tubeGroup}
                onChange={(tubeGroup) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    tubeGroup,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Label Instruction"
                placeholder="Label Instruction"
                value={Stores.masterPanelStore.masterPanel?.labelInstruction}
                onChange={(labelInstruction) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    labelInstruction,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Page Break"
                placeholder="Page Break"
                value={Stores.masterPanelStore.masterPanel?.pageBreak}
                onChange={(pageBreak) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    pageBreak,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Panel Method"
                placeholder="Panel Method"
                value={Stores.masterPanelStore.masterPanel?.panelMethod}
                onChange={(panelMethod) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    panelMethod,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Workflow"
                placeholder="Workflow"
                value={Stores.masterPanelStore.masterPanel?.workflow}
                onChange={(workflow) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    workflow,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Report Template"
                placeholder="Report Template"
                value={Stores.masterPanelStore.masterPanel?.reportTemplate}
                onChange={(reportTemplate) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    reportTemplate,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Sample Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleType = e.target.value as string
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      sampleType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Sample Type 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Special Instructions"
                placeholder="Special Instruction"
                value={Stores.masterPanelStore.masterPanel?.specalInstructions}
                onChange={(specalInstructions) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    specalInstructions,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value as string
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
                      status,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "STATUS"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Toggle
                label="Cumulative"
                value={Stores.masterPanelStore.masterPanel?.cumulative}
                onChange={(cumulative) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    cumulative,
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
                  Stores.masterPanelStore.masterPanel,
                  Utils.masterPanel
                )
                setErrorsMsg(error)
                if (error === undefined) {
                  // RootStore.rootStore.setProcessLoading(true)
                  // Stores.labStore.LabService.addLab(Stores.labStore.labs).then(
                  //   () => {
                  //     RootStore.rootStore.setProcessLoading(false)
                  //     LibraryComponents.Atoms.ToastsStore.success(`Lab created.`)
                  //     Stores.labStore.fetchListLab()
                  //     Stores.labStore.clear()
                  //   }
                  // )
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
                //rootStore.labStore.clear();
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
          <div>
            {errorsMsg &&
              Object.entries(errorsMsg).map((item, index) => (
                <h6 className="text-red-700">{_.upperFirst(item.join(" : "))}</h6>
              ))}
          </div>
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
            console.log({ type })

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
