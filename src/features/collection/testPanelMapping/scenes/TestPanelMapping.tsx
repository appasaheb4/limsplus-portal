/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"
import Storage from "@lp/library/modules/storage"
import { useForm, Controller } from "react-hook-form"
import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { stores } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as MasterPanelStore } from "@lp/features/collection/masterPanel/stores"
import { Stores as TestMasterStore } from "@lp/features/collection/testMaster/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const TestPanelMapping = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const {
		loginStore,
	} = useStores();
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
      if (items) {
        const status = items
          .find((fileds) => {
            return fileds.fieldName === "STATUS"
          })
          ?.arrValue?.find((statusItem) => statusItem.code === "A")
        if (status) {
          Stores.testPanelMappingStore.updateTestPanelMapping({
            ...Stores.testPanelMappingStore.testPanelMapping,
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

  const onSubmitTestPanelMapping = () =>{
    if (Stores.testPanelMappingStore.testPanelMapping) {
      
      if (
        !Stores.testPanelMappingStore.testPanelMapping
          ?.existsVersionId &&
        !Stores.testPanelMappingStore.testPanelMapping?.existsRecordId
      ) {
        Stores.testPanelMappingStore.testPanelMappingService
          .addTestPanelMapping(
            Stores.testPanelMappingStore.testPanelMapping
          )
          .then(() => {
            
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Test panel mapping created.`,
            })
          })
      } else if (
        Stores.testPanelMappingStore.testPanelMapping?.existsVersionId &&
        !Stores.testPanelMappingStore.testPanelMapping?.existsRecordId
      ) {
        Stores.testPanelMappingStore.testPanelMappingService
          .versionUpgradeTestPanelMapping(
            Stores.testPanelMappingStore.testPanelMapping
          )
          .then(() => {
            
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Test panel version upgrade.`,
            })
          })
      } else if (
        !Stores.testPanelMappingStore.testPanelMapping
          ?.existsVersionId &&
        Stores.testPanelMappingStore.testPanelMapping?.existsRecordId
      ) {
        Stores.testPanelMappingStore.testPanelMappingService
          .duplicateTestPanelMapping(
            Stores.testPanelMappingStore.testPanelMapping
          )
          .then(() => {
            
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Test panel duplicate created.`,
            })
          })
      }   
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: `😔 Please enter all information!`,
      })
    }
  }

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(
        toJS(stores.routerStore.userPermission),
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
             
             <Controller
                control={control}
                render={({ field: { onChange } }) => (
             <LibraryComponents.Atoms.Form.InputWrapper 
             label="Lab"
             hasError={errors.lab}
             >
                <select
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.lab
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const lab = e.target.value as string
                   onChange(lab)
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
              )}
              name="lab"
              rules={{ required: true }}
              defaultValue=""
             />

          <Controller
            control={control}
             render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper
               label="Panel Code"
               hasError-={errors.panelCode}
               >
                <select
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.panelCode
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const panelCode = e.target.value
                   onChange(panelCode)
                    Stores.testPanelMappingStore.updateTestPanelMapping({
                      ...Stores.testPanelMappingStore.testPanelMapping,
                      panelCode: panelCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {MasterPanelStore.masterPanelStore.listMasterPanel &&
                    MasterPanelStore.masterPanelStore.listMasterPanel.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.panelCode}>
                          {`${item.panelName} - ${item.panelCode}`}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="panelCode"
              rules={{ required: true }}
              defaultValue=""
             />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Test Code"
                placeholder={errors.testCode?"Please Enter testCode":"Test Code"}
                hasError={errors.testCode}
                disabled={true}
                value={Stores.testPanelMappingStore.testPanelMapping?.testCode}
                onChange={(testCode) => {
                  onChange(testCode)
                  Stores.testPanelMappingStore.updateTestPanelMapping({
                    ...Stores.testPanelMappingStore.testPanelMapping,
                    testCode,
                  })
                }}
              />
              )}
            name="testCode"
             rules={{ required: false }}
             defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Test Name" hasError={errors.testName}>
                <LibraryComponents.Molecules.AutoCompleteCheckMultiFilterKeys
                  placeholder="Search by test name or test code"
                  data={{
                    defulatValues: [],
                    list: TestMasterStore.testMasterStore.listTestMaster || [],
                    displayKey: ["testName", "testCode"],
                    findKey: ["testName", "testCode"],
                  }}
                  onUpdate={(items) => {
                    onChange(items)
                    const testCode: string[] = []
                    const testName: string[] = []
                    items.filter((item: any) => {
                      testCode.push(item.testCode)
                      testName.push(item.testName)
                    })
                    Stores.testPanelMappingStore.updateTestPanelMapping({
                      ...Stores.testPanelMappingStore.testPanelMapping,
                      testName,
                      testCode,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="Test Name"
               rules={{ required: false }}
               defaultValue=""
               />
               <Controller
               control={control}
               render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Description"
                name="txtDescription"
                placeholder={errors.description?"Please Enter Description":"Description"}
                hasError={errors.description}
                value={Stores.testPanelMappingStore.testPanelMapping?.description}
                onChange={(description) => {
                  onChange(description)
                  Stores.testPanelMappingStore.updateTestPanelMapping({
                    ...Stores.testPanelMappingStore.testPanelMapping,
                    description,
                  })
                }}
              />
              )}
            name="description"
             rules={{ required: false }}
             defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
               <LibraryComponents.Atoms.Form.InputWrapper label="Status" hasError={errors.status}>
                <select
                  value={Stores.testPanelMappingStore.testPanelMapping?.status}
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    onChange(status)
                    Stores.testPanelMappingStore.updateTestPanelMapping({
                      ...Stores.testPanelMappingStore.testPanelMapping,
                      status,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "STATUS").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="status"
               rules={{ required: false }}
               defaultValue=""
               />
               <Controller
               control={control}
               render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Entered By"
                placeholder={errors.userId?"Please Enter userId":"Entered By"}
                value={LoginStore.loginStore.login?.userId}
                hasError={errors.userId}
                disabled={true}
                // onChange={(analyteCode) => {
                //   Stores.masterAnalyteStore.updateMasterAnalyte({
                //     ...Stores.masterAnalyteStore.masterAnalyte,
                //     analyteCode,
                //   })
                // }}
              />
              )}
            name="userId"
             rules={{ required: false }}
             defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Creation"
                placeholder={errors.dateCreation?"Please Enter DateCreation":"Date Creation"}
                hasError={errors.dateCreation}
                value={LibraryUtils.moment
                  .unix(
                    Stores.testPanelMappingStore.testPanelMapping?.dateCreation || 0
                  )
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              )}
            name="dateCreation"
             rules={{ required: false }}
             defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Toggle
                label="Bill"
                id="modeBill"
                hasError={errors.bill}
                value={Stores.testPanelMappingStore.testPanelMapping?.bill}
                onChange={(bill) => {
                  onChange(bill)
                  Stores.testPanelMappingStore.updateTestPanelMapping({
                    ...Stores.testPanelMappingStore.testPanelMapping,
                    bill,
                  })
                }}
              />
              )}
            name="bill"
             rules={{ required: false }}
             defaultValue=""
             />
            </LibraryComponents.Atoms.List>

            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
             
             
             <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active"
                placeholder={errors.dateActiveFrom?"Please Enter DateActiveFrom":"Date Active"}
                hasError={errors.dateActiveFrom}
                value={LibraryUtils.moment
                  .unix(
                    Stores.testPanelMappingStore.testPanelMapping?.dateActiveFrom ||
                      0
                  )
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              )}
            name="dateActiveFrom"
             rules={{ required: false }}
             defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Expire"
                placeholder={errors.dateActiveTo?"Please Enter dateActiveTo":"Date Expire"}
                hasError={errors.dateActiveTo}
                value={LibraryUtils.moment
                  .unix(
                    Stores.testPanelMappingStore.testPanelMapping?.dateActiveTo || 0
                  )
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  Stores.testPanelMappingStore.updateTestPanelMapping({
                    ...Stores.testPanelMappingStore.testPanelMapping,
                    dateActiveTo: LibraryUtils.moment(schedule).unix(),
                  })
                }}
              />
              )}
            name="dateActiveTo"
             rules={{ required: false }}
             defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Version"
                placeholder={errors.version?"Please Enter version":"Version"}
                hasError={errors.version}
                value={Stores.testPanelMappingStore.testPanelMapping?.version}
                disabled={true}
              />
              )}
            name="version"
             rules={{ required: false }}
             defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Key Num"
                placeholder={errors.keyNum?"Please Enter keyNum":"Key Num"}
                hasError={errors.keyNum}
                value={Stores.testPanelMappingStore.testPanelMapping?.keyNum}
                disabled={true}
              />
              )}
            name="keyNum"
             rules={{ required: false }}
             defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
               <LibraryComponents.Atoms.Form.InputWrapper label="Environment" hasError={errors.environment}>
                <select
                  value={Stores.testPanelMappingStore.testPanelMapping?.environment}
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.environment
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    onChange(environment)
                    Stores.testPanelMappingStore.updateTestPanelMapping({
                      ...Stores.testPanelMappingStore.testPanelMapping,
                      environment,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(stores.routerStore.lookupItems, "ENVIRONMENT").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="environment"
              rules={{ required: true }}
              defaultValue=""
             />
              {/* <LibraryComponents.Atoms.Grid cols={5}> */}
             
              {/* </LibraryComponents.Atoms.Grid> */}
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={handleSubmit(onSubmitTestPanelMapping)}
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
          <FeatureComponents.Molecules.TestPanelMappingList
            data={Stores.testPanelMappingStore.listTestPanelMapping || []}
            totalSize={Stores.testPanelMappingStore.listTestPanelMappingCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems
            }}
            isDelete={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
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
            onVersionUpgrade={(item) => {
              setModalConfirm({
                show: true,
                type: "versionUpgrade",
                data: item,
                title: "Are you version upgrade?",
                body: `Version upgrade this record`,
              })
            }}
            onDuplicate={(item) => {
              setModalConfirm({
                show: true,
                type: "duplicate",
                data: item,
                title: "Are you duplicate?",
                body: `Duplicate this record`,
              })
            }}
            onPageSizeChange={(page,limit)=>{
              Stores.testPanelMappingStore.fetchTestPanelMapping(page,limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              
              Stores.testPanelMappingStore.testPanelMappingService
                .deleteTestPanelMapping(modalConfirm.id)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Record deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testPanelMappingStore.fetchTestPanelMapping()
                  }
                })
            } else if (type === "Update") {
              
              Stores.testPanelMappingStore.testPanelMappingService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testPanelMappingStore.fetchTestPanelMapping()
                    window.location.reload()
                  }
                })
            } else if (type === "versionUpgrade") {
              Stores.testPanelMappingStore.updateTestPanelMapping({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: modalConfirm.data.version + 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
              })
            } else if (type === "duplicate") {
              Stores.testPanelMappingStore.updateTestPanelMapping({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
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
