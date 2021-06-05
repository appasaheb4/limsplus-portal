import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
// import * as FeatureComponents from "../components"

// import * as Models from "../models"
// import * as Util from "../util"

import { Stores } from "../stores"
//import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as RootStore } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const TestMater = observer(() => {
  //const [errors, setErrors] = useState<Models.TestMaster>()
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
               <LibraryComponents.Atoms.Form.InputDate
                label="Date Creation"
                placeholder="Date Creation"
                value={LibraryUtils.moment(new Date()).format("YYYY-MM-DD")}
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
                value={LibraryUtils.moment(new Date()).format("YYYY-MM-DD")}
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
                value="1"
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
                value="1"
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
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      rLab,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["RLab 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="PLab">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const pLab = e.target.value as string
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      pLab,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["PLab 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Department">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const department = e.target.value as string
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      department,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Department 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Section">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const section = e.target.value as string
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
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
                label="Test Code"
                placeholder="Test Code"
                value={Stores.testMasterStore.testMaster?.testCode}
                onChange={(testCode) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    testCode,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Test Name"
                placeholder="Test Name"
                value={Stores.testMasterStore.testMaster?.testName}
                onChange={(testName) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    testName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Description"
                placeholder="Description"
                value={Stores.testMasterStore.testMaster?.description}
                onChange={(description) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    description,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Short Name"
                placeholder="Short Name"
                value={Stores.testMasterStore.testMaster?.shortName}
                onChange={(shortName) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    shortName,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Price"
                placeholder="Price"
                type="number"
                value={Stores.testMasterStore.testMaster?.price}
                onChange={(price) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    price,
                  })
                }}
              />

              
              <LibraryComponents.Atoms.Form.Input
                label="Schedule"
                placeholder="Schedule"
                value={Stores.testMasterStore.testMaster?.schedule}
                onChange={(schedule) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    schedule,
                  })
                }}
              />
             
              <LibraryComponents.Atoms.Grid cols={5}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Bill"
                  id="modeBill"
                  value={Stores.testMasterStore.testMaster?.bill}
                  onChange={(bill) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      bill,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="AutoFinish"
                  id="modeAutoFinish"
                  value={Stores.testMasterStore.testMaster?.autoFinish}
                  onChange={(autoFinish) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      autoFinish,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Hold OOS"
                  id="modeHoldOOS"
                  value={Stores.testMasterStore.testMaster?.holdOOS}
                  onChange={(holdOOS) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      holdOOS,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Confidential"
                  value={Stores.testMasterStore.testMaster?.confidential}
                  onChange={(confidential) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      confidential,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Urgent"
                  value={Stores.testMasterStore.testMaster?.urgent}
                  onChange={(urgent) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
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
                label="TAT"
                placeholder="TAT"
                value={Stores.testMasterStore.testMaster?.tat}
                onChange={(tat) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    tat,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Validation Level">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const validationLevel: any = e.target.value
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
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
                label="Report Group"
                placeholder="Report Group"
                value={Stores.testMasterStore.testMaster?.reportGroup}
                onChange={(reportGroup) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    reportGroup,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Result Order"
                placeholder="Result Order"
                value={Stores.testMasterStore.testMaster?.resultOrder}
                onChange={(resultOrder) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    resultOrder,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Processing">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const processing = e.target.value as
                      | "MANUAL"
                      | "AEMI"
                      | "AUTOMATIC"
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      processing,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["MANUAL", "AEMI", "AUTOMATIC"].map(
                    (item: any, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>

            
              <LibraryComponents.Atoms.Form.Input
                label="Tube Groups"
                placeholder="Tube Groups"
                value={Stores.testMasterStore.testMaster?.tubeGroup}
                onChange={(tubeGroup) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    tubeGroup,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Label Instruction"
                placeholder="Label Instruction"
                value={Stores.testMasterStore.testMaster?.labelInstruction}
                onChange={(labelInstruction) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    labelInstruction,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Panel Method"
                placeholder="Panel Method"
                value={Stores.testMasterStore.testMaster?.panelMethod}
                onChange={(panelMethod) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    panelMethod,
                  })
                }}
              />
                <LibraryComponents.Atoms.Form.InputWrapper label="Sample Run On">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleRunOn = e.target.value as "LABID" | "SAMPLEID"
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      sampleRunOn,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["LABID", "SAMPLEID"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>

              <LibraryComponents.Atoms.Form.Input
                label="Workflow"
                placeholder="Workflow"
                value={Stores.testMasterStore.testMaster?.workflow}
                onChange={(workflow) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    workflow,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Sample Type"
                placeholder="Sample Type"
                value={Stores.testMasterStore.testMaster?.sampleType}
                onChange={(sampleType) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    sampleType,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Speical Instruction"
                placeholder="Speical Instrcution"
                value={Stores.testMasterStore.testMaster?.speicalInstructions}
                onChange={(speicalInstructions) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    speicalInstructions,
                  })
                }}
              />
                   <LibraryComponents.Atoms.Form.Input
                label="Disease"
                placeholder="Disease"
                value={Stores.testMasterStore.testMaster?.disease}
                onChange={(disease) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    disease,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Category">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const category = e.target.value as string
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      category,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Category 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Test Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const testType = e.target.value as string
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      testType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Test Type 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                <LibraryComponents.Atoms.Grid cols={5}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Instant Result"
                  value={Stores.testMasterStore.testMaster?.instantResult}
                  onChange={(instantResult) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      instantResult,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Accredited"
                  value={Stores.testMasterStore.testMaster?.accredited}
                  onChange={(accredited) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      accredited,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Cretical"
                  value={Stores.testMasterStore.testMaster?.cretical}
                  onChange={(cretical) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      cretical,
                    })
                  }}
                />

                <LibraryComponents.Atoms.Form.Toggle
                  label="Repetition"
                  value={Stores.testMasterStore.testMaster?.repitation}
                  onChange={(repitation) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      repitation,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Print Label"
                  value={Stores.testMasterStore.testMaster?.printLabel}
                  onChange={(printLabel) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      printLabel,
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
             
            
         
              <LibraryComponents.Atoms.Form.InputWrapper label="Workflow Code">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const workflowCode = e.target.value as string
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      workflowCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Workflow Code 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Worklist Code">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const worklistCode = e.target.value as string
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      worklistCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Worklist Code 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>

              <LibraryComponents.Atoms.Form.Input
                label="CPT Code"
                placeholder="CPT Code"
                value={Stores.testMasterStore.testMaster?.cptCode}
                onChange={(cptCode) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    cptCode,
                  })
                }}
              />

            

              <LibraryComponents.Atoms.Form.InputWrapper label="Prefix">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const prefix = e.target.value
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      prefix,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Prefix 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>

              <LibraryComponents.Atoms.Form.InputWrapper label="Sufix">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sufix = e.target.value
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      sufix,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Sufix 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Delevery Schedule"
                placeholder="Delevery Schedule"
                value={Stores.testMasterStore.testMaster?.deleverySchedule}
                onChange={(deleverySchedule) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    deleverySchedule,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Collection Container">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const collectionContainer = e.target.value
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      collectionContainer,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Collection Container 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Holding Days"
                placeholder="Holding Days"
                value={Stores.testMasterStore.testMaster?.holdingDays}
                onChange={(holdingDays) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    holdingDays,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
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
              <LibraryComponents.Atoms.Grid cols={6}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Method"
                  value={Stores.testMasterStore.testMaster?.method}
                  onChange={(method) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      method,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Cumulative"
                  value={Stores.testMasterStore.testMaster?.cumulative}
                  onChange={(cumulative) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      cumulative,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="QC Hold"
                  value={Stores.testMasterStore.testMaster?.qcHold}
                  onChange={(qcHold) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      qcHold,
                    })
                  }}
                />

                <LibraryComponents.Atoms.Form.Toggle
                  label="OOS Hold"
                  value={Stores.testMasterStore.testMaster?.oosHold}
                  onChange={(oosHold) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      oosHold,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Delta Hold"
                  value={Stores.testMasterStore.testMaster?.deltaHold}
                  onChange={(deltaHold) => {
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      deltaHold,
                    })
                  }}
                />
                  <LibraryComponents.Atoms.Form.Toggle
                label="Allow Partial"
                value={Stores.testMasterStore.testMaster?.allowPartial}
                onChange={(allowPartial) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    allowPartial,
                  })
                }}
              />
              </LibraryComponents.Atoms.Grid>

            
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

export default TestMater
