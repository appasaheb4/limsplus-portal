/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"

import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"

import { Stores } from "../stores"
//import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as RootStore } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as LoginStores } from "@lp/features/login/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const TestMater = observer(() => {
  const [errors, setErrors] = useState<Models.TestMaster>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  const [lookupItems, setLookupItems] = useState<any[]>([])

  console.log({ LoginStores })

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
      if (items) {
        const status = items
          .find((fileds) => {
            return fileds.fieldName === "STATUS"
          })
          ?.arrValue?.find((statusItem) => statusItem.code === "A")
        if (status) {
          Stores.testMasterStore.updateTestMaster({
            ...Stores.testMasterStore.testMaster,
            status: status.code,
          })
        }
        setLookupItems(items)
      }
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
                  .unix(Stores.testMasterStore.testMaster?.dateCreation || 0)
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active From"
                placeholder="Date Active From"
                value={LibraryUtils.moment
                  .unix(Stores.testMasterStore.testMaster?.dateActiveFrom || 0)
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active To"
                placeholder="Date Active T0"   
                value={LibraryUtils.moment
                  .unix(Stores.testMasterStore.testMaster?.dateActiveTo || 0)
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    dateActiveTo: LibraryUtils.moment(schedule).unix(),
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Version"
                placeholder="Version"
                value={Stores.testMasterStore.testMaster?.version}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Key Num"
                placeholder="Key Num"
                value={Stores.testMasterStore.testMaster?.keyNum}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Entered By"
                placeholder="Entered By"
                value={LoginStore.loginStore.login?.userId}
                disabled={true}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="RLab">
                <select
                  value={LoginStores.loginStore.login?.lab}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const rLab = e.target.value as string
                    setErrors({
                      ...errors,
                      rLab: Utils.validate.single(rLab, Utils.testMaster.rLab),
                    })
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      rLab,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LoginStores.loginStore.login?.labList &&
                    LoginStores.loginStore.login?.labList.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.name}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="PLab">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const pLab = e.target.value as string
                    setErrors({
                      ...errors,
                      pLab: Utils.validate.single(pLab, Utils.testMaster.pLab),
                    })
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      pLab,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LabStore.labStore.listLabs.map((item: any, index: number) => (
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
                        Utils.testMaster.department
                      ),
                    })
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      department,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {DepartmentStore.departmentStore.listDepartment.map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.code} - ${item.name}`}
                      </option>
                    )
                  )}
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

              {/* <LibraryComponents.Atoms.Form.Input
                label="Report Group"
                placeholder="Report Group"
                value={Stores.testMasterStore.testMaster?.reportGroup}
                onChange={(reportGroup) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    reportGroup,
                  })
                }}
              /> */}
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

              {/* <LibraryComponents.Atoms.Form.Input
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
              /> */}
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Workflow">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const workflow = e.target.value as string
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      workflow,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "WORKFLOW"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              {/* <LibraryComponents.Atoms.Form.Input
                label="Sample Type"
                placeholder="Sample Type"
                value={Stores.testMasterStore.testMaster?.sampleType}
                onChange={(sampleType) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    sampleType,
                  })
                }}
              /> */}
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
              {/* <LibraryComponents.Atoms.Form.Input
                label="Disease"
                placeholder="Disease"
                value={Stores.testMasterStore.testMaster?.disease}
                onChange={(disease) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    disease,
                  })
                }}
              /> */}
              <LibraryComponents.Atoms.Form.InputWrapper label="Disease">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const disease = e.target.value as string
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      disease,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "DISEASE"
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
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
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
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "TEST_TYPE"
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
              {/* <LibraryComponents.Atoms.Form.InputWrapper label="Worklist Code">
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
              </LibraryComponents.Atoms.Form.InputWrapper> */}

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
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "PREFIX"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
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
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "SUFIX"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
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
              {/* <LibraryComponents.Atoms.Form.InputWrapper label="Collection Container">
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
              </LibraryComponents.Atoms.Form.InputWrapper> */}
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
                  value={Stores.testMasterStore.testMaster?.status}
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
                const error = Utils.validate(
                  Stores.testMasterStore.testMaster,
                  Utils.testMaster
                )
                setErrorsMsg(error)
                if (error === undefined) {
                  RootStore.rootStore.setProcessLoading(true)
                  Stores.testMasterStore.testMasterService
                    .addTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      enteredBy: LoginStore.loginStore.login?._id,
                    })
                    .then(() => {
                      RootStore.rootStore.setProcessLoading(false)
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 Test master created.`,
                      })
                      Stores.testMasterStore.fetchTestMaster()
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
                <h6 className="text-red-700">{_.upperFirst(item.join(" : "))}</h6>
              ))}
          </div>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.TestMasterList
            data={Stores.testMasterStore.listTestMaster || []}
            isDelete={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
              "Edit/Modify"
            )}
            // isEditModify={false}
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
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.testMasterStore.testMasterService
                .deleteTestMaster(modalConfirm.id)
                .then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Test master deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testMasterStore.fetchTestMaster()
                  }
                })
            } else if (type === "Update") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.testMasterStore.testMasterService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Test master updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testMasterStore.fetchTestMaster()
                    window.location.reload()
                  }
                })
            }
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
