/* eslint-disable */
import React, { useState, useMemo } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
  AutoCompleteFilterSingleSelect,
  AutoCompleteCheckMultiFilterKeys,
} from "@/library/components"
import { lookupItems } from "@/library/utils"
import { TestPanelMappingList } from "../components"
import { useForm, Controller } from "react-hook-form"
import { AutoCompleteFilterSingleSelectPanelCode } from "../components"

import { TestPanelMappingHoc } from "../hoc"
import { useStores } from "@/stores"

import { RouterFlow } from "@/flows"
import { toJS } from "mobx"

const TestPanelMapping = TestPanelMappingHoc(
  observer(() => {
    const {
      loginStore,
      labStore,
      masterPanelStore,
      testMasterStore,
      testPanelMappingStore,
      routerStore,
      loading,
    } = useStores()
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm()

    setValue("lab", loginStore.login.lab)
    setValue("environment", loginStore.login.environment)
    setValue("status", testPanelMappingStore.testPanelMapping?.status)
    setValue("environment", testPanelMappingStore.testPanelMapping?.environment)

    const [modalConfirm, setModalConfirm] = useState<any>()
    const [hideAddLab, setHideAddLab] = useState<boolean>(true)

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
                Toast.success({
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
                Toast.success({
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
                Toast.success({
                  message: `😊 ${res.duplicateTestPanelMappings.message}`,
                })
              }
            })
        }
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        Toast.warning({
          message: `😔 Please enter diff code`,
        })
      }
    }

    const tableView = useMemo(
      () => (
        <TestPanelMappingList
          data={testPanelMappingStore.listTestPanelMapping || []}
          totalSize={testPanelMappingStore.listTestPanelMappingCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listLabs: labStore.listLabs,
            listMasterPanel: masterPanelStore.listMasterPanel,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            "Delete"
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
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
          onFilter={(type, filter, page, limit) => {
            testPanelMappingStore.testPanelMappingService.filter({
              input: { type, filter, page, limit },
            })
          }}
        />
      ),
      [testPanelMappingStore.listTestPanelMapping]
    )

    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ""} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(toJS(routerStore.userPermission), "Add") && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddLab}
            onClick={() => setHideAddLab(!hideAddLab)}
          />
        )}
        <div className="mx-auto flex-wrap">
          <div
            className={
              "p-2 rounded-lg shadow-xl " + (hideAddLab ? "shown" : "shown")
            }
          >
            <Grid cols={2}>
              <List direction="col" space={4} justify="stretch" fill>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper label="Lab" hasError={errors.lab}>
                      <AutoCompleteFilterSingleSelect
                        loader={loading}
                        placeholder="Search by name"
                        disable={
                          loginStore.login && loginStore.login.role !== "SYSADMIN"
                            ? true
                            : false
                        }
                        data={{
                          list: labStore.listLabs,
                          displayKey: "name",
                          findKey: "name",
                        }}
                        displayValue={testPanelMappingStore.testPanelMapping?.lab}
                        hasError={errors.lab}
                        onFilter={(value: string) => {
                          labStore.LabService.filter({
                            input: {
                              type: "filter",
                              filter: {
                                name: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          })
                        }}
                        onSelect={(item) => {
                          onChange(item.name)
                          testPanelMappingStore.updateTestPanelMapping({
                            ...testPanelMappingStore.testPanelMapping,
                            lab: item.code,
                          })
                          if (
                            !testPanelMappingStore.testPanelMapping?.existsVersionId
                          ) {
                            testPanelMappingStore.testPanelMappingService
                              .checkExitsLabEnvCode({
                                input: {
                                  code:
                                    testPanelMappingStore.testPanelMapping
                                      ?.panelCode,
                                  env:
                                    testPanelMappingStore.testPanelMapping
                                      ?.environment,
                                  lab: item.code,
                                },
                              })
                              .then((res) => {
                                if (res.checkTestPanelMappingsExistsRecord.success) {
                                  testPanelMappingStore.updateExistsLabEnvCode(true)
                                  Toast.error({
                                    message: `😔 ${res.checkTestPanelMappingsExistsRecord.message}`,
                                  })
                                } else
                                  testPanelMappingStore.updateExistsLabEnvCode(false)
                              })
                          }
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name="lab"
                  rules={{ required: true }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Panel Code"
                      hasError-={errors.panelCode}
                    >
                      <AutoCompleteFilterSingleSelectPanelCode
                        lab={testPanelMappingStore.testPanelMapping?.lab}
                        onSelect={(item) => {
                          onChange(item.panelName)
                          testPanelMappingStore.updateTestPanelMapping({
                            ...testPanelMappingStore.testPanelMapping,
                            panelCode: item.panelCode,
                          })
                          masterPanelStore.updatePanelMasterList(
                            masterPanelStore.listMasterPanelCopy
                          )
                          if (
                            !testPanelMappingStore.testPanelMapping?.existsVersionId
                          ) {
                            testPanelMappingStore.testPanelMappingService
                              .checkExitsLabEnvCode({
                                input: {
                                  code: item.panelCode,
                                  env:
                                    testPanelMappingStore.testPanelMapping
                                      ?.environment,
                                  lab: testPanelMappingStore.testPanelMapping?.lab,
                                },
                              })
                              .then((res) => {
                                if (res.checkTestPanelMappingsExistsRecord.success) {
                                  testPanelMappingStore.updateExistsLabEnvCode(true)
                                  Toast.error({
                                    message: `😔 ${res.checkTestPanelMappingsExistsRecord.message}`,
                                  })
                                } else
                                  testPanelMappingStore.updateExistsLabEnvCode(false)
                              })
                          }
                        }}
                      />
                    </Form.InputWrapper>
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
                    <Form.Input
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
                    <Form.InputWrapper label="Test Name" hasError={errors.testName}>
                      <AutoCompleteCheckMultiFilterKeys
                        placeholder="Search by test name or test code"
                        data={{
                          defulatValues: [],
                          list: testMasterStore.listTestMaster || [],
                          displayKey: ["testName", "testCode"],
                          findKey: ["testName", "testCode"],
                        }}
                        hasError={errors.testName}
                        onFilter={(value: string) => {
                          testMasterStore.testMasterService.filter({
                            input: {
                              type: "filter",
                              filter: {
                                testName: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          })
                        }}
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
                    </Form.InputWrapper>
                  )}
                  name="testName"
                  rules={{ required: true }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.MultilineInput
                      rows={3}
                      label="Description"
                      name="txtDescription"
                      placeholder={
                        errors.description
                          ? "Please Enter Description"
                          : "Description"
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
                    <Form.InputWrapper label="Status" hasError={errors.status}>
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
                        {lookupItems(routerStore.lookupItems, "STATUS").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {`${item.value} - ${item.code}`}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="status"
                  rules={{ required: true }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
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
                    <Form.InputDateTime
                      label="Date Creation"
                      placeholder={
                        errors.dateCreation
                          ? "Please Enter DateCreation"
                          : "Date Creation"
                      }
                      hasError={errors.dateCreation}
                      value={testPanelMappingStore.testPanelMapping?.dateCreation}
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
                    <Form.Toggle
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
              </List>

              <List direction="col" space={4} justify="stretch" fill>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputDateTime
                      label="Date Active"
                      placeholder={
                        errors.dateActive
                          ? "Please Enter DateActiveFrom"
                          : "Date Active"
                      }
                      hasError={errors.dateActive}
                      value={testPanelMappingStore.testPanelMapping?.dateActive}
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
                    <Form.InputDateTime
                      label="Date Expire"
                      placeholder={
                        errors.dateExpire ? "Please Enter dateExpire" : "Date Expire"
                      }
                      hasError={errors.dateExpire}
                      value={testPanelMappingStore.testPanelMapping?.dateExpire}
                      onChange={(dateExpire) => {
                        onChange(dateExpire)
                        testPanelMappingStore.updateTestPanelMapping({
                          ...testPanelMappingStore.testPanelMapping,
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
                    <Form.Input
                      label="Version"
                      placeholder={
                        errors.version ? "Please Enter version" : "Version"
                      }
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
                    <Form.InputWrapper
                      label="Environment"
                      hasError={errors.environment}
                    >
                      <select
                        value={testPanelMappingStore.testPanelMapping?.environment}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        disabled={
                          loginStore.login && loginStore.login.role !== "SYSADMIN"
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
                                    testPanelMappingStore.testPanelMapping
                                      ?.panelCode,
                                  env: environment,
                                  lab: testPanelMappingStore.testPanelMapping?.lab,
                                },
                              })
                              .then((res) => {
                                if (res.checkTestPanelMappingsExistsRecord.success) {
                                  testPanelMappingStore.updateExistsLabEnvCode(true)
                                  Toast.error({
                                    message: `😔 ${res.checkTestPanelMappingsExistsRecord.message}`,
                                  })
                                } else
                                  testPanelMappingStore.updateExistsLabEnvCode(false)
                              })
                          }
                        }}
                      >
                        <option selected>
                          {loginStore.login && loginStore.login.role !== "SYSADMIN"
                            ? `Select`
                            : testPanelMappingStore.testPanelMapping?.environment ||
                              `Select`}
                        </option>
                        {lookupItems(routerStore.lookupItems, "ENVIRONMENT").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {`${item.value} - ${item.code}`}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="environment"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {/* <Grid cols={5}> */}

                {/* </Grid> */}
              </List>
            </Grid>
            <br />
            <List direction="row" space={3} align="center">
              <Buttons.Button
                size="medium"
                type="solid"
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitTestPanelMapping)}
              >
                Save
              </Buttons.Button>
              <Buttons.Button
                size="medium"
                type="outline"
                icon={Svg.Remove}
                onClick={() => {
                  window.location.reload()
                }}
              >
                Clear
              </Buttons.Button>
            </List>
          </div>
          <div className="p-2 rounded-lg shadow-xl overflow-auto">{tableView}</div>
          <ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === "Delete") {
                testPanelMappingStore.testPanelMappingService
                  .deleteTestPanelMapping({ input: { id: modalConfirm.id } })
                  .then((res: any) => {
                    if (res.removeTestPanelMapping.success) {
                      Toast.success({
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
                      Toast.success({
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
                  version: parseInt(modalConfirm.data.version + 1),
                  dateActiveFrom: new Date(),
                })
                setHideAddLab(!hideAddLab)
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
)

export default TestPanelMapping
