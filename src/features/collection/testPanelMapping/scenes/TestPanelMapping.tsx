/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import dayjs from "dayjs"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"
import { useForm, Controller } from "react-hook-form"

import { useStores, stores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const TestPanelMapping = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const {
    loginStore,
    labStore,
    masterPanelStore,
    testMasterStore,
    testPanelMappingStore,
    routerStore
  } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)

  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      testPanelMappingStore.updateTestPanelMapping({
        ...testPanelMappingStore.testPanelMapping,
        lab: stores.loginStore.login.lab,
        environment: stores.loginStore.login.environment,
      })
      setValue("lab", stores.loginStore.login.lab)
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])  
   
  useEffect(()=>{
    const status = routerStore.lookupItems
    .find((fileds) => {
      return fileds.fieldName === "STATUS"
    })
    ?.arrValue?.find((statusItem) => statusItem.code === "A")
  if (status) {
    testPanelMappingStore && testPanelMappingStore.updateTestPanelMapping({
        ...testPanelMappingStore.testPanelMapping,
        status: status.code as string,
      })
    setValue("status", status.code as string)
  }
  const environment = routerStore.lookupItems.find((fileds)=>{
    return fileds.fieldName === 'ENVIRONMENT'
  })?. arrValue?.find((environmentItem)=>environmentItem.code === 'P')
  if(environment){
    testPanelMappingStore && testPanelMappingStore.updateTestPanelMapping({
      ...testPanelMappingStore.testPanelMapping,
      environment: environment.code as string
    })
    setValue("environment",environment.code as string)
  }
  },[routerStore.lookupItems])
  const onSubmitTestPanelMapping = () => {
    if (!testPanelMappingStore.checkExitsLabEnvCode) {
      if (
        !testPanelMappingStore.testPanelMapping?.existsVersionId &&
        !testPanelMappingStore.testPanelMapping?.existsRecordId
      ) {
        testPanelMappingStore.testPanelMappingService
          .addTestPanelMapping({
            input: {
              ...testPanelMappingStore.testPanelMapping,
              enteredBy: loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.createTestPanelMapping.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.createTestPanelMapping.message}`,
              })
            }
          })
      } else if (
        testPanelMappingStore.testPanelMapping?.existsVersionId &&
        !testPanelMappingStore.testPanelMapping?.existsRecordId
      ) {
        testPanelMappingStore.testPanelMappingService
          .versionUpgradeTestPanelMapping({
            input: {
              ...testPanelMappingStore.testPanelMapping,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.versionUpgradeTestPanelMappings.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.versionUpgradeTestPanelMappings.message}`,
              })
            }
          })
      } else if (
        !testPanelMappingStore.testPanelMapping?.existsVersionId &&
        testPanelMappingStore.testPanelMapping?.existsRecordId
      ) {
        testPanelMappingStore.testPanelMappingService
          .duplicateTestPanelMapping({
            input: {
              ...testPanelMappingStore.testPanelMapping,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.duplicateTestPanelMappings.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.duplicateTestPanelMappings.message}`,
              })
            }
          })
      }
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: `😔 Please enter diff code`,
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
          className={"p-2 rounded-lg shadow-xl " + (hideAddLab ? "hidden" : "shown")}
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
                      value={testPanelMappingStore.testPanelMapping?.lab}
                      disabled={
                        stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.lab ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const lab = e.target.value as string
                        onChange(lab)
                        testPanelMappingStore.updateTestPanelMapping({
                          ...testPanelMappingStore.testPanelMapping,
                          lab,
                        })
                        if (
                          !testPanelMappingStore.testPanelMapping?.existsVersionId
                        ) {
                          testPanelMappingStore.testPanelMappingService
                            .checkExitsLabEnvCode({
                              input: {
                                code:
                                  testPanelMappingStore.testPanelMapping?.panelCode,
                                env:
                                  testPanelMappingStore.testPanelMapping
                                    ?.environment,
                                lab,
                              },
                            })
                            .then((res) => {
                              if (res.checkTestPanelMappingsExistsRecord.success) {
                                testPanelMappingStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkTestPanelMappingsExistsRecord.message}`,
                                })
                              } else
                                testPanelMappingStore.updateExistsLabEnvCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>Select</option>
                      {labStore.listLabs.map((item: any, index: number) => (
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
                        errors.panelCode ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const panelCode = e.target.value
                        onChange(panelCode)
                        testPanelMappingStore.updateTestPanelMapping({
                          ...testPanelMappingStore.testPanelMapping,
                          panelCode: panelCode,
                        })
                        if (
                          !testPanelMappingStore.testPanelMapping?.existsVersionId
                        ) {
                          testPanelMappingStore.testPanelMappingService
                            .checkExitsLabEnvCode({
                              input: {
                                code: panelCode,
                                env:
                                  testPanelMappingStore.testPanelMapping
                                    ?.environment,
                                lab: testPanelMappingStore.testPanelMapping?.lab,
                              },
                            })
                            .then((res) => {
                              if (res.checkTestPanelMappingsExistsRecord.success) {
                                testPanelMappingStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkTestPanelMappingsExistsRecord.message}`,
                                })
                              } else
                                testPanelMappingStore.updateExistsLabEnvCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>Select</option>
                      {masterPanelStore.listMasterPanel &&
                        masterPanelStore.listMasterPanel.map(
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
              {testPanelMappingStore.checkExitsLabEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Test Code"
                    placeholder={
                      errors.testCode ? "Please Enter testCode" : "Test Code"
                    }
                    hasError={errors.testCode}
                    disabled={true}
                    value={testPanelMappingStore.testPanelMapping?.testCode}
                    onChange={(testCode) => {
                      onChange(testCode)
                      testPanelMappingStore.updateTestPanelMapping({
                        ...testPanelMappingStore.testPanelMapping,
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Test Name"
                    hasError={errors.testName}
                  >
                    <LibraryComponents.Molecules.AutoCompleteCheckMultiFilterKeys
                      placeholder="Search by test name or test code"
                      data={{
                        defulatValues: [],
                        list: testMasterStore.listTestMaster || [],
                        displayKey: ["testName", "testCode"],
                        findKey: ["testName", "testCode"],
                      }}
                      hasError={errors.testName}
                      onUpdate={(items) => {
                        onChange(items)
                        const testCode: string[] = []
                        const testName: string[] = []
                        items.filter((item: any) => {
                          testCode.push(item.testCode)
                          testName.push(item.testName)
                        })
                        testPanelMappingStore.updateTestPanelMapping({
                          ...testPanelMappingStore.testPanelMapping,
                          testName,
                          testCode,
                        })
                      }}
                    />
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="testName"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={3}
                    label="Description"
                    name="txtDescription"
                    placeholder={
                      errors.description ? "Please Enter Description" : "Description"
                    }
                    hasError={errors.description}
                    value={testPanelMappingStore.testPanelMapping?.description}
                    onChange={(description) => {
                      onChange(description)
                      testPanelMappingStore.updateTestPanelMapping({
                        ...testPanelMappingStore.testPanelMapping,
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Status"
                    hasError={errors.status}
                  >
                    <select
                      value={testPanelMappingStore.testPanelMapping?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        testPanelMappingStore.updateTestPanelMapping({
                          ...testPanelMappingStore.testPanelMapping,
                          status,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "STATUS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="status"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Entered By"
                    placeholder={
                      errors.userId ? "Please Enter userId" : "Entered By"
                    }
                    value={loginStore.login?.userId}
                    hasError={errors.userId}
                    disabled={true}
                    // onChange={(analyteCode) => {
                    //   masterAnalyteStore.updateMasterAnalyte({
                    //     ...masterAnalyteStore.masterAnalyte,
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
                    placeholder={
                      errors.dateCreation
                        ? "Please Enter DateCreation"
                        : "Date Creation"
                    }
                    hasError={errors.dateCreation}
                    value={dayjs(
                      testPanelMappingStore.testPanelMapping?.dateCreation
                    ).format("YYYY-MM-DD")}
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
                    value={testPanelMappingStore.testPanelMapping?.bill}
                    onChange={(bill) => {
                      onChange(bill)
                      testPanelMappingStore.updateTestPanelMapping({
                        ...testPanelMappingStore.testPanelMapping,
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
                    placeholder={
                      errors.dateActiveFrom
                        ? "Please Enter DateActiveFrom"
                        : "Date Active"
                    }
                    hasError={errors.dateActiveFrom}
                    value={dayjs(
                      testPanelMappingStore.testPanelMapping?.dateActiveFrom
                    ).format("YYYY-MM-DD")}
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
                    placeholder={
                      errors.dateActiveTo
                        ? "Please Enter dateActiveTo"
                        : "Date Expire"
                    }
                    hasError={errors.dateActiveTo}
                    value={dayjs(
                      testPanelMappingStore.testPanelMapping?.dateActiveTo
                    ).format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const dateActiveTo = new Date(e.target.value)
                      onChange(dateActiveTo)
                      testPanelMappingStore.updateTestPanelMapping({
                        ...testPanelMappingStore.testPanelMapping,
                        dateActiveTo,
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
                    placeholder={errors.version ? "Please Enter version" : "Version"}
                    hasError={errors.version}
                    value={testPanelMappingStore.testPanelMapping?.version}
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Environment"
                    hasError={errors.environment}
                  >
                    <select
                      value={testPanelMappingStore.testPanelMapping?.environment}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      disabled={
                        stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        const environment = e.target.value
                        onChange(environment)
                        testPanelMappingStore.updateTestPanelMapping({
                          ...testPanelMappingStore.testPanelMapping,
                          environment,
                        })
                        if (
                          !testPanelMappingStore.testPanelMapping?.existsVersionId
                        ) {
                          testPanelMappingStore.testPanelMappingService
                            .checkExitsLabEnvCode({
                              input: {
                                code:
                                  testPanelMappingStore.testPanelMapping?.panelCode,
                                env: environment,
                                lab: testPanelMappingStore.testPanelMapping?.lab,
                              },
                            })
                            .then((res) => {
                              if (res.checkTestPanelMappingsExistsRecord.success) {
                                testPanelMappingStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkTestPanelMappingsExistsRecord.message}`,
                                })
                              } else
                                testPanelMappingStore.updateExistsLabEnvCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : testPanelMappingStore.testPanelMapping?.environment ||
                            `Select`}
                      </option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "ENVIRONMENT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
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
            data={testPanelMappingStore.listTestPanelMapping || []}
            totalSize={testPanelMappingStore.listTestPanelMappingCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems,
              listLabs:labStore.listLabs,
              listMasterPanel:masterPanelStore.listMasterPanel
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
            onPageSizeChange={(page, limit) => {
              testPanelMappingStore.fetchTestPanelMapping(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              testPanelMappingStore.testPanelMappingService
                .deleteTestPanelMapping({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeTestPanelMapping.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeTestPanelMapping.message}`,
                    })
                    setModalConfirm({ show: false })
                    testPanelMappingStore.fetchTestPanelMapping()
                  }
                })
            } else if (type === "Update") {
              testPanelMappingStore.testPanelMappingService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateTestPanelMapping.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateTestPanelMapping.message}`,
                    })
                    setModalConfirm({ show: false })
                    testPanelMappingStore.fetchTestPanelMapping()
                  }
                })
            } else if (type === "versionUpgrade") {
              testPanelMappingStore.updateTestPanelMapping({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: parseInt(modalConfirm.data.version + 1),
                dateActiveFrom: new Date(),
              })
              setValue("lab", modalConfirm.data.lab)
              setValue("panelCode", modalConfirm.data.panelCode)
              setValue("testCode", modalConfirm.data.testCode)
              setValue("testName", modalConfirm.data.testName)
              setValue("environment", modalConfirm.data.environment)
              setValue("status", modalConfirm.data.status)
            } else if (type === "duplicate") {
              testPanelMappingStore.updateTestPanelMapping({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
                dateActiveFrom: new Date(),
              })
              setValue("lab", modalConfirm.data.lab)
              setValue("panelCode", modalConfirm.data.panelCode)
              setValue("testCode", modalConfirm.data.testCode)
              setValue("testName", modalConfirm.data.testName)
              setValue("environment", modalConfirm.data.environment)
              setValue("status", modalConfirm.data.status)
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
