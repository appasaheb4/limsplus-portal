/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"

import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"

import { Stores } from "../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as RootStore } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as MasterPanelStore } from "@lp/features/collection/masterPanel/stores"
import { Stores as TestMasterStore } from "@lp/features/collection/testMaster/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const TestPanelMapping = observer(() => {
  const [errors, setErrors] = useState<Models.TestPanelMapping>()
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
          <LibraryComponents.Atoms.Grid cols={2}>
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
                  .unix(
                    Stores.testPanelMappingStore.testPanelMapping?.dateCreation || 0
                  )
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
                  .unix(
                    Stores.testPanelMappingStore.testPanelMapping?.dateActive || 0
                  )
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
                value={Stores.testPanelMappingStore.testPanelMapping?.version}
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
                value={Stores.testPanelMappingStore.testPanelMapping?.keyNum}
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Lab">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const lab = e.target.value as string
                    setErrors({
                      ...errors,
                      lab: Utils.validate.single(lab, Utils.testPanelMapping.lab),
                    })
                    Stores.testPanelMappingStore.updateTestPanelMapping({
                      ...Stores.testPanelMappingStore.testPanelMapping,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Panel Code">
                <LibraryComponents.Molecules.AutocompleteChecked
                  data={{
                    defulatValues: [],
                    list: MasterPanelStore.masterPanelStore.listMasterPanel,
                    displayKey: "panelCode",
                    findKey: "panelCode",
                  }}
                  onUpdate={(items) => {
                    setErrors({
                      ...errors,
                      panelCode: Utils.validate.single(
                        items,
                        Utils.testPanelMapping.panelCode
                      ),
                    })
                    Stores.testPanelMappingStore.updateTestPanelMapping({
                      ...Stores.testPanelMappingStore.testPanelMapping,
                      panelCode: items,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Form.InputWrapper>
            </LibraryComponents.Atoms.List>

            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.Input
                label="Test Code"
                placeholder="Test Code"
                disabled={true}
                value={Stores.testPanelMappingStore.testPanelMapping?.testCode}
                onChange={(testCode) => {
                  Stores.testPanelMappingStore.updateTestPanelMapping({
                    ...Stores.testPanelMappingStore.testPanelMapping,
                    testCode,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Test Name">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const testMasteritem = JSON.parse(e.target.value)
                    Stores.testPanelMappingStore.updateTestPanelMapping({
                      ...Stores.testPanelMappingStore.testPanelMapping,
                      testName: testMasteritem.testName,
                      testCode: testMasteritem.testCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {TestMasterStore.testMasterStore.listTestMaster &&
                    TestMasterStore.testMasterStore.listTestMaster.map(
                      (item: any, index: number) => (
                        <option key={index} value={JSON.stringify(item)}>
                          {item.testName}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>

              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Description"
                name="txtDescription"
                placeholder="Description"
                value={Stores.testPanelMappingStore.testPanelMapping?.description}
                onChange={(description) => {
                  Stores.testPanelMappingStore.updateTestPanelMapping({
                    ...Stores.testPanelMappingStore.testPanelMapping,
                    description,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    Stores.testPanelMappingStore.updateTestPanelMapping({
                      ...Stores.testPanelMappingStore.testPanelMapping,
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
              {/* <LibraryComponents.Atoms.Grid cols={5}> */}
              <LibraryComponents.Atoms.Form.Toggle
                label="Bill"
                id="modeBill"
                value={Stores.testPanelMappingStore.testPanelMapping?.bill}
                onChange={(bill) => {
                  Stores.testPanelMappingStore.updateTestPanelMapping({
                    ...Stores.testPanelMappingStore.testPanelMapping,
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
                const error = Utils.validate(
                  Stores.testPanelMappingStore.testPanelMapping,
                  Utils.testPanelMapping
                )
                setErrorsMsg(error)
                if (!error) {
                  RootStore.rootStore.setProcessLoading(true)
                  Stores.testPanelMappingStore.testPanelMappingService
                    .addTestPanelMapping(
                      Stores.testPanelMappingStore.testPanelMapping
                    )
                    .then(() => {
                      RootStore.rootStore.setProcessLoading(false)
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 Test panel mapping created.`,
                      })
                      Stores.testPanelMappingStore.fetchTestPanelMapping()
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
                <h6 className="text-red-700" key={index}>
                  {_.upperFirst(item.join(" : "))}
                </h6>
              ))}
          </div>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.TestPanelMappingList
            data={Stores.testPanelMappingStore.listTestPanelMapping || []}
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
              Stores.testPanelMappingStore.testPanelMappingService
                .deleteTestPanelMapping(modalConfirm.id)
                .then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Record deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testPanelMappingStore.fetchTestPanelMapping()
                  }
                })  
            } else if (type === "Update") {
              RootStore.rootStore.setProcessLoading(true)
              Stores.testPanelMappingStore.testPanelMappingService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  RootStore.rootStore.setProcessLoading(false)
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testPanelMappingStore.fetchTestPanelMapping()
                    window.location.reload();
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

export default TestPanelMapping
