/* eslint-disable */
import React, {  useState,useMemo } from "react"
import { observer } from "mobx-react"
import _ from 'lodash'
import * as LibraryComponents from "@lp/library/components"
import {lookupItems} from "@lp/library/utils"
import {TestAnalyteMappingList} from "../components"
import { useForm, Controller } from "react-hook-form"
import {AutoCompleteFilterSingleSelectTestName} from "../components"
import {TestAnalyteMappingHoc} from "../hoc"
import { useStores, } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const TestAnalyteMapping = TestAnalyteMappingHoc(observer(() => {
  const {
    loginStore,
    testAnalyteMappingStore,
    labStore,
    masterAnalyteStore,
    routerStore,
    loading
  } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  setValue("lab", loginStore.login.lab)
  setValue("environment", loginStore.login.environment)
  setValue("status", testAnalyteMappingStore.testAnalyteMapping?.status)
  setValue("environment", testAnalyteMappingStore.testAnalyteMapping?.environment)
  
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)


  const onSubmitTestAnalyteMapping = () => {
    if (!testAnalyteMappingStore.checkExitsLabEnvCode) {
      if (
        !testAnalyteMappingStore.testAnalyteMapping?.existsVersionId &&
        !testAnalyteMappingStore.testAnalyteMapping?.existsRecordId
      ) {
        testAnalyteMappingStore.testAnalyteMappingService
          .addTestAnalyteMapping({
            input: {
              ...testAnalyteMappingStore.testAnalyteMapping,
              enteredBy: loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.createTestAnalyteMapping.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.createTestAnalyteMapping.message}`,
              })
            }
          })
      } else if (
        testAnalyteMappingStore.testAnalyteMapping?.existsVersionId &&
        !testAnalyteMappingStore.testAnalyteMapping?.existsRecordId
      ) {
        testAnalyteMappingStore.testAnalyteMappingService
          .versionUpgradeTestAnalyteMapping({
            input: {
              ...testAnalyteMappingStore.testAnalyteMapping,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.versionUpgradeTestAnalyteMappings.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.versionUpgradeTestAnalyteMappings.message}`,
              })
            }
          })
      } else if (
        !testAnalyteMappingStore.testAnalyteMapping?.existsVersionId &&
        testAnalyteMappingStore.testAnalyteMapping?.existsRecordId
      ) {
        testAnalyteMappingStore.testAnalyteMappingService
          .duplicateTestAnalyteMapping({
            input: {
              ...testAnalyteMappingStore.testAnalyteMapping,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.duplicateTestAnalyteMappings.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.duplicateTestAnalyteMappings.message}`,
              })
            }
          })
      }
      setTimeout(() => {
        // testAnalyteMappingStore.fetchTestAnalyteMapping()
        window.location.reload()
      }, 2000)
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: `😔 Please enter diff code`,
      })
    }
  }

  const tableView = useMemo(
    ()=>(
      <TestAnalyteMappingList
            data={testAnalyteMappingStore.listTestAnalyteMapping || []}
            totalSize={testAnalyteMappingStore.listTestAnalyteMappingCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
              listsLabs: labStore.listLabs,
            }}
            isDelete={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
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
              testAnalyteMappingStore.fetchTestAnalyteMapping(page, limit)
            }}
            onFilter={(type, filter, page, limit) => {
              testAnalyteMappingStore.testAnalyteMappingService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
    ),
    [testAnalyteMappingStore.listTestAnalyteMapping]
  )

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(
        toJS(routerStore.userPermission),
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
              {labStore.listLabs && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Lab"
                      hasError={errors.lab}
                    >
                      <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    placeholder="Search by name"
                    disable={
                      loginStore.login &&
                      loginStore.login.role !== "SYSADMIN"
                        ? true
                        : false
                    }
                    data={{
                      list:labStore.listLabs,
                      displayKey: "name",
                      findKey: "name",
                    }}
                    hasError={errors.name}
                    onFilter={(value: string) => {
                      labStore.LabService.filter(
                        {
                          input: {
                            type:"filter",
                            filter: {
                             name: value
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.name)
                      testAnalyteMappingStore.updateTestAnalyteMapping({
                        ...testAnalyteMappingStore.testAnalyteMapping,
                        lab:item.code
                      })
                      labStore.updateLabList(
                        labStore.listLabsCopy
                      )
                      if (
                        !testAnalyteMappingStore.testAnalyteMapping
                          ?.existsVersionId
                      ) {
                        testAnalyteMappingStore.testAnalyteMappingService
                          .checkExitsLabEnvCode({
                            input: {
                              code:
                                testAnalyteMappingStore.testAnalyteMapping
                                  ?.testCode,
                              env:
                                testAnalyteMappingStore.testAnalyteMapping
                                  ?.environment,
                              lab:item.code,
                            },
                          })
                          .then((res) => {
                            if (
                              res.checkTestAnalyteMappingsExistsRecord.success
                            ) {
                              testAnalyteMappingStore.updateExistsLabEnvCode(
                                true
                              )
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkTestAnalyteMappingsExistsRecord.message}`,
                              })
                            } else
                              testAnalyteMappingStore.updateExistsLabEnvCode(
                                false
                              )
                          })
                      }
                    }}
                    />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="lab"
                  rules={{ required: true }}
                  defaultValue=""
                />
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Test Code"
                    name="txtTestCode"
                    placeholder={
                      errors.testCode ? "Please Enter TestCode" : "Test Code"
                    }
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.testCode ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    hasError={errors.testCode}
                    disabled={true}
                    value={testAnalyteMappingStore.testAnalyteMapping?.testCode}
                  />
                )}
                name="testCode"
                rules={{ required: false }}
                defaultValue=""
              />
              {testAnalyteMappingStore.checkExitsLabEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Test Name"
                    hasError={errors.testName}
                  >
                    <AutoCompleteFilterSingleSelectTestName
                    hasError={errors.testName}
                    onSelect={(item)=>{
                      onChange(item.testName)
                      setValue("testCode", item.testCode)
                        testAnalyteMappingStore.updateTestAnalyteMapping({
                          ...testAnalyteMappingStore.testAnalyteMapping,
                          testName: item.testName,
                          testCode: item.testCode,
                        })
                        if (
                          !testAnalyteMappingStore.testAnalyteMapping
                            ?.existsVersionId
                        ) {
                          testAnalyteMappingStore.testAnalyteMappingService
                            .checkExitsLabEnvCode({
                              input: {
                                code: item.testCode,
                                env:
                                  testAnalyteMappingStore.testAnalyteMapping
                                    ?.environment,
                                lab: testAnalyteMappingStore.testAnalyteMapping?.lab,
                              },
                            })
                            .then((res) => {
                              if (res.checkTestAnalyteMappingsExistsRecord.success) {
                                testAnalyteMappingStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkTestAnalyteMappingsExistsRecord.message}`,
                                })
                              } else
                                testAnalyteMappingStore.updateExistsLabEnvCode(false)
                            })
                        }
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Analyte Code"
                    hasError={errors.analyteCode}
                  >
                    <LibraryComponents.Molecules.AutoCompleteCheckMultiFilterKeys
                      placeholder={
                        errors.analyteCode
                          ? "Please Enter Analyte Code And Analyte Name"
                          : "Search by analyte name or analyte code"
                      }
                      hasError={errors.analyteCode}
                      data={{
                        defulatValues: [],  
                        list: _.uniqBy(masterAnalyteStore.listMasterAnalyte, v => [v.analyteName, v.analyteCode, v.lab].join()) || [],
                        displayKey: ["analyteName", "analyteCode"],
                        findKey: ["analyteName", "analyteCode"],
                      }}
                      onFilter={(value: string) => {
                        masterAnalyteStore.masterAnalyteService.filter(
                          {
                            input: {
                              type: "filter",
                              filter: {
                                analyteName: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          }
                        )
                      }}
                      onUpdate={(items) => {
                        onChange(items)
                        const analyteCode: string[] = []
                        const analyteName: string[] = []
                        items.filter((item: any) => {
                          analyteCode.push(item.analyteCode)
                          analyteName.push(item.analyteName)
                        })
                        console.log({ analyteName, analyteCode })
                        testAnalyteMappingStore.updateTestAnalyteMapping({
                          ...testAnalyteMappingStore.testAnalyteMapping,
                          analyteName,
                          analyteCode,
                        })
                      }}
                    />
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="analyteCode"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Analyte Name"
                    placeholder={
                      errors.analyteName
                        ? "Please Enter AnalyteName"
                        : "Analyte Name"
                    }
                    hasError={errors.analyteName}
                    disabled={true}
                    value={
                      typeof testAnalyteMappingStore.testAnalyteMapping
                        ?.analyteName !== "string"
                        ? testAnalyteMappingStore.testAnalyteMapping?.analyteName?.join(
                            ","
                          )
                        : testAnalyteMappingStore.testAnalyteMapping?.analyteName
                    }
                  />
                )}
                name="analyteName"
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
                    placeholder={
                      errors.description ? "Please Enter description" : "Description"
                    }
                    hasError={errors.description}
                    value={testAnalyteMappingStore.testAnalyteMapping?.description}
                    onChange={(description) => {
                      onChange(description)
                      testAnalyteMappingStore.updateTestAnalyteMapping({
                        ...testAnalyteMappingStore.testAnalyteMapping,
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
                      value={testAnalyteMappingStore.testAnalyteMapping?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        testAnalyteMappingStore.updateTestAnalyteMapping({
                          ...testAnalyteMappingStore.testAnalyteMapping,
                          status,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        routerStore.lookupItems,
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
                  <LibraryComponents.Atoms.Form.Toggle
                    label="Bill"
                    id="modeBill"
                    hasError={errors.bill}
                    value={testAnalyteMappingStore.testAnalyteMapping?.bill}
                    onChange={(bill) => {
                      onChange(bill)
                      testAnalyteMappingStore.updateTestAnalyteMapping({
                        ...testAnalyteMappingStore.testAnalyteMapping,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Entered By"
                    placeholder={
                      errors.userId ? "Please Enter UserID" : "Entered By"
                    }
                    hasError={errors.userId}
                    value={loginStore.login?.userId}
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                    label="Date Creation"
                    placeholder={
                      errors.dateCreation
                        ? "Please Enter DateCreation"
                        : "Date Creation"
                    }
                    value={
                      testAnalyteMappingStore.testAnalyteMapping?.dateCreation
                    }
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                    label="Date Active"
                    hasError={errors.dateActive}
                    placeholder={
                      errors.dateActive
                        ? "Please Enter dateActive"
                        : "Date Active"
                    }
                    value={
                      testAnalyteMappingStore.testAnalyteMapping?.dateActive
                    }
                    disabled={true}
                  />
                )}
                name="dateActive"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputDateTime
                    label="Date Expire"
                    placeholder={
                      errors.dateExpire
                        ? "Please Enter dateExpire"
                        : "Date Expire"
                    }
                    value={
                      testAnalyteMappingStore.testAnalyteMapping?.dateExpire
                    }
                    onChange={(dateExpire) => {
                      onChange(dateExpire)
                      testAnalyteMappingStore.updateTestAnalyteMapping({
                        ...testAnalyteMappingStore.testAnalyteMapping,
                        dateExpire,
                      })
                    }}
                  />
                )}
                name="dateExpire"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Version"
                    hasError={errors.version}
                    placeholder={errors.version ? "Please Enter Version" : "Version"}
                    value={testAnalyteMappingStore.testAnalyteMapping?.version}
                    disabled={true}
                    // onChange={(analyteCode) => {
                    //   masterAnalyteStore.updateMasterAnalyte({
                    //     ...masterAnalyteStore.masterAnalyte,
                    //     analyteCode,
                    //   })
                    // }}
                  />
                )}
                name="version"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={testAnalyteMappingStore.testAnalyteMapping?.environment}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      disabled={
                        loginStore.login &&
                        loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        const environment = e.target.value
                        onChange(environment)
                        testAnalyteMappingStore.updateTestAnalyteMapping({
                          ...testAnalyteMappingStore.testAnalyteMapping,
                          environment,
                        })
                        if (
                          !testAnalyteMappingStore.testAnalyteMapping
                            ?.existsVersionId
                        ) {
                          testAnalyteMappingStore.testAnalyteMappingService
                            .checkExitsLabEnvCode({
                              input: {
                                code:
                                  testAnalyteMappingStore.testAnalyteMapping
                                    ?.testCode,
                                env: environment,
                                lab: testAnalyteMappingStore.testAnalyteMapping?.lab,
                              },
                            })
                            .then((res) => {
                              if (res.checkTestAnalyteMappingsExistsRecord.success) {
                                testAnalyteMappingStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkTestAnalyteMappingsExistsRecord.message}`,
                                })
                              } else
                                testAnalyteMappingStore.updateExistsLabEnvCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>
                        {loginStore.login &&
                        loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : testAnalyteMappingStore.testAnalyteMapping
                              ?.environment || `Select`}
                      </option>
                      {lookupItems(
                        routerStore.lookupItems,
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
              onClick={handleSubmit(onSubmitTestAnalyteMapping)}
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          {tableView}
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              testAnalyteMappingStore.testAnalyteMappingService
                .deleteTestAnalyteMapping({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeTestAnalyteMapping.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeTestAnalyteMapping.message}`,
                    })
                    setModalConfirm({ show: false })
                    testAnalyteMappingStore.fetchTestAnalyteMapping()
                  }
                })
            } else if (type === "Update") {
              testAnalyteMappingStore.testAnalyteMappingService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateTestAnalyteMapping.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateTestAnalyteMapping.message}`,
                    })
                    setModalConfirm({ show: false })
                    testAnalyteMappingStore.fetchTestAnalyteMapping()
                  }
                })
            } else if (type === "versionUpgrade") {
              testAnalyteMappingStore.updateTestAnalyteMapping({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: parseInt(modalConfirm.data.version + 1),
                dateCreation: new Date(),
              })
              setValue("lab", modalConfirm.data.lab)
              setValue("testCode", modalConfirm.data.testCode)
              setValue("testName", modalConfirm.data.testName)
              setValue("analyteCode", "default")
              setValue("environment", modalConfirm.data.environment)
              setValue("status", modalConfirm.data.status)
            } else if (type === "duplicate") {
              testAnalyteMappingStore.updateTestAnalyteMapping({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: parseInt(modalConfirm.data.version + 1),
                dateCreation: new Date(),
              })
              setHideAddLab(!hideAddLab)
              setValue("lab", modalConfirm.data.lab)
              setValue("testCode", modalConfirm.data.testCode)
              setValue("testName", modalConfirm.data.testName)
              setValue("analyteCode", "default")
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
}))

export default TestAnalyteMapping
