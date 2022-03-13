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
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
  Icons,
} from "@/library/components"
import { Table } from "reactstrap"
import { lookupItems, lookupValue } from "@/library/utils"
import { TestAnalyteMappingList } from "../components"
import { useForm, Controller } from "react-hook-form"
import { AutoCompleteFilterSingleSelectTestName } from "../components"
import { TestAnalyteMappingHoc } from "../hoc"
import { useStores } from "@/stores"
import { IconContext } from "react-icons"
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs"

import { RouterFlow } from "@/flows"
import { toJS } from "mobx"


const TestAnalyteMapping = TestAnalyteMappingHoc(
  observer(() => {
    const {
      loginStore,
      testAnalyteMappingStore,
      labStore,
      masterAnalyteStore,
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
    setValue("status", testAnalyteMappingStore.testAnalyteMapping?.status)
    setValue("environment", testAnalyteMappingStore.testAnalyteMapping?.environment)

    const [modalConfirm, setModalConfirm] = useState<any>()
    const [hideAddLab, setHideAddLab] = useState<boolean>(true)
    const [txtDisable, setTxtDisable] = useState(true)

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
                Toast.success({
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
                Toast.success({
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
                Toast.success({
                  message: `😊 ${res.duplicateTestAnalyteMappings.message}`,
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
              body: `Update items!`,
            })
          }}
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: "updateFileds",
              data: { fileds, id },
              title: "Are you sure?",
              body: "Update records",
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
          onUpdateOrderSeq={(orderSeq) => {
            testAnalyteMappingStore.testAnalyteMappingService
              .updateOrderSeq({ input: { filter: { orderSeq } } })
              .then((res) => {
                Toast.success({
                  message: `😊 ${res.updateRROTestAnalyteMapping.message}`,
                })
                testAnalyteMappingStore.fetchTestAnalyteMapping()
              })
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
              "p-2 rounded-lg shadow-xl " + (hideAddLab ? "hidden" : "shown")
            }
          >
            <Grid cols={2}>
              <List direction="col" space={4} justify="stretch" fill>
                {labStore.listLabs && (
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
                          displayValue={
                            testAnalyteMappingStore.testAnalyteMapping?.lab
                          }
                          hasError={errors.name}
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
                            testAnalyteMappingStore.updateTestAnalyteMapping({
                              ...testAnalyteMappingStore.testAnalyteMapping,
                              lab: item.code,
                            })
                            labStore.updateLabList(labStore.listLabsCopy)
                            if (
                              !testAnalyteMappingStore.testAnalyteMapping
                                ?.existsVersionId
                            ) {
                              testAnalyteMappingStore.testAnalyteMappingService
                                .checkExitsRecords({
                                  input: {
                                    lab: item.code,
                                    testCode:
                                      testAnalyteMappingStore.testAnalyteMapping
                                        ?.testCode,
                                    analyteCode:
                                      testAnalyteMappingStore.testAnalyteMapping
                                        ?.analyteCode,
                                    env: testAnalyteMappingStore.testAnalyteMapping
                                      ?.environment,
                                  },
                                })
                                .then((res) => {
                                  if (
                                    res.checkTestAnalyteMappingsExistsRecord.success
                                  ) {
                                    testAnalyteMappingStore.updateExistsLabEnvCode(
                                      true
                                    )
                                    Toast.error({
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
                      </Form.InputWrapper>
                    )}
                    name="lab"
                    rules={{ required: true }}
                    defaultValue=""
                  />
                )}

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
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
                    <Form.InputWrapper label="Test Name" hasError={errors.testName}>
                      <AutoCompleteFilterSingleSelectTestName
                        lab={testAnalyteMappingStore.testAnalyteMapping?.lab}
                        hasError={errors.testName}
                        onSelect={(item) => {
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
                              .checkExitsRecords({
                                input: {
                                  lab: testAnalyteMappingStore.testAnalyteMapping
                                    ?.lab,
                                  testCode: item.testCode,
                                  analyteCode:
                                    testAnalyteMappingStore.testAnalyteMapping
                                      ?.analyteCode,
                                  env: testAnalyteMappingStore.testAnalyteMapping
                                    ?.environment,
                                },
                              })
                              .then((res) => {
                                if (
                                  res.checkTestAnalyteMappingsExistsRecord.success
                                ) {
                                  testAnalyteMappingStore.updateExistsLabEnvCode(
                                    true
                                  )
                                  Toast.error({
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
                    </Form.InputWrapper>
                  )}
                  name="testName"
                  rules={{ required: true }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Analyte Code"
                      hasError={errors.analyteCode}
                    >
                      <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder="Search by code or name"
                        data={{
                          list:
                            _.uniqBy(
                              masterAnalyteStore.listMasterAnalyte.filter(
                                (item) =>
                                  item.lab ===
                                  testAnalyteMappingStore.testAnalyteMapping?.lab
                              ),
                              (v) => [v.analyteName, v.analyteCode, v.lab].join()
                            ) || [],
                          selected:
                            testAnalyteMappingStore.selectedItems?.analyteCode,
                          displayKey: ["analyteCode", "analyteName"],
                        }}
                        hasError={errors.analyteCode}
                        onUpdate={(item) => {
                          const items =
                            testAnalyteMappingStore.selectedItems?.analyteCode
                          const analyteCode: string[] = []
                          const analyteName: string[] = []
                          const resultOrder: any[] = []
                          const reportOrder: any[] = []
                          items?.filter((item: any) => {
                            analyteCode.push(item.analyteCode)
                            analyteName.push(item.analyteName)
                            resultOrder.push({
                              analyteCode: item.analyteCode,
                              analyteName: item.analyteName,
                              order: 1,
                            })
                            reportOrder.push({
                              analyteCode: item.analyteCode,
                              analyteName: item.analyteName,
                              order: 1,
                            })
                          })
                          testAnalyteMappingStore.updateTestAnalyteMapping({
                            ...testAnalyteMappingStore.testAnalyteMapping,
                            analyteName,
                            analyteCode,
                            resultOrder,
                            reportOrder,
                          })
                          masterAnalyteStore.updateMasterAnalyteList(
                            masterAnalyteStore.listMasterAnalyteCopy
                          )

                          if (
                            !testAnalyteMappingStore.testAnalyteMapping
                              ?.existsVersionId
                          ) {
                            testAnalyteMappingStore.testAnalyteMappingService
                              .checkExitsRecords({
                                input: {
                                  lab: testAnalyteMappingStore.testAnalyteMapping
                                    ?.lab,
                                  testCode:
                                    testAnalyteMappingStore.testAnalyteMapping
                                      ?.testCode,
                                  analyteCode,
                                  env: testAnalyteMappingStore.testAnalyteMapping
                                    ?.environment,
                                },
                              })
                              .then((res) => {
                                if (
                                  res.checkTestAnalyteMappingsExistsRecord.success
                                ) {
                                  testAnalyteMappingStore.updateExistsLabEnvCode(
                                    true
                                  )
                                  Toast.error({
                                    message: `😔 ${res.checkTestAnalyteMappingsExistsRecord.message}`,
                                  })
                                } else
                                  testAnalyteMappingStore.updateExistsLabEnvCode(
                                    false
                                  )
                              })
                          }
                        }}
                        onFilter={(value: string) => {
                          masterAnalyteStore.masterAnalyteService.filterByFields({
                            input: {
                              filter: {
                                fields: ["analyteCode", "analyteName"],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          })
                        }}
                        onSelect={(item) => {
                          onChange(new Date())
                          let analyteCode =
                            testAnalyteMappingStore.selectedItems?.analyteCode
                          if (!item.selected) {
                            if (analyteCode && analyteCode.length > 0) {
                              analyteCode.push(item)
                            } else analyteCode = [item]
                          } else {
                            analyteCode = analyteCode.filter((items) => {
                              return items._id !== item._id
                            })
                          }
                          testAnalyteMappingStore.updateSelectedItems({
                            ...testAnalyteMappingStore.selectedItems,
                            analyteCode,
                          })
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name="analyteCode"
                  rules={{ required: true }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
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
                    <Form.InputWrapper label="Status" hasError={errors.status}>
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
                    <Form.InputDateTime
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
                    <Form.InputDateTime
                      label="Date Active"
                      hasError={errors.dateActive}
                      placeholder={
                        errors.dateActive ? "Please Enter dateActive" : "Date Active"
                      }
                      value={testAnalyteMappingStore.testAnalyteMapping?.dateActive}
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
                      value={testAnalyteMappingStore.testAnalyteMapping?.dateExpire}
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

                <Grid cols={3}>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Toggle
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
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Toggle
                        label="Test Method"
                        id="testMethod"
                        hasError={errors.testMethod}
                        value={
                          testAnalyteMappingStore.testAnalyteMapping?.testMethod
                        }
                        onChange={(testMethod) => {
                          onChange(testMethod)
                          testAnalyteMappingStore.updateTestAnalyteMapping({
                            ...testAnalyteMappingStore.testAnalyteMapping,
                            testMethod,
                          })
                        }}
                      />
                    )}
                    name="testMethod"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Toggle
                        label="Analyte Method"
                        id="analyteMethod"
                        hasError={errors.analyteMethod}
                        value={
                          testAnalyteMappingStore.testAnalyteMapping?.analyteMethod
                        }
                        onChange={(analyteMethod) => {
                          onChange(analyteMethod)
                          testAnalyteMappingStore.updateTestAnalyteMapping({
                            ...testAnalyteMappingStore.testAnalyteMapping,
                            analyteMethod,
                          })
                        }}
                      />
                    )}
                    name="analyteMethod"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                </Grid>
              </List>
              <List direction="col" space={4} justify="stretch" fill>
                <Form.InputWrapper label="Result Order">
                  <Table striped bordered className="max-h-5" size="sm">
                    <thead>
                      <tr className="text-xs">
                        <th className="text-white" style={{ minWidth: 150 }}>
                          Analyte
                        </th>
                        <th
                          className="text-white flex flex-row gap-2 items-center"
                          style={{ minWidth: 150 }}
                        >
                          Order
                          <Buttons.ButtonIcon
                            icon={
                              <IconContext.Provider value={{ color: "#ffffff" }}>
                                <BsFillArrowUpCircleFill />
                              </IconContext.Provider>
                            }
                            title=""
                            onClick={() => {
                              let resultOrder =
                                testAnalyteMappingStore.testAnalyteMapping
                                  .resultOrder
                              resultOrder = _.orderBy(resultOrder, "order", "asc")
                              testAnalyteMappingStore.updateTestAnalyteMapping({
                                ...testAnalyteMappingStore.testAnalyteMapping,
                                resultOrder,
                              })
                            }}
                          />
                          <Buttons.ButtonIcon
                            icon={
                              <IconContext.Provider value={{ color: "#ffffff" }}>
                                <BsFillArrowDownCircleFill />
                              </IconContext.Provider>
                            }
                            title=""
                            onClick={() => {
                              let resultOrder =
                                testAnalyteMappingStore.testAnalyteMapping
                                  .resultOrder
                              resultOrder = _.orderBy(resultOrder, "order", "desc")
                              testAnalyteMappingStore.updateTestAnalyteMapping({
                                ...testAnalyteMappingStore.testAnalyteMapping,
                                resultOrder,
                              })
                            }}
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {testAnalyteMappingStore.testAnalyteMapping?.resultOrder &&
                        testAnalyteMappingStore.testAnalyteMapping?.resultOrder.map(
                          (item, index) => (
                            <tr
                              onMouseEnter={() => {
                                setTxtDisable(false)
                              }}
                              onMouseLeave={() => {
                                setTxtDisable(true)
                              }}
                            >
                              <td>{`${index + 1}. ${
                                item.analyteName + " - " + item.analyteCode
                              }`}</td>
                              <td style={{ width: 150 }}>
                                {txtDisable ? (
                                  <span
                                    className={`leading-4 p-2  focus:outline-none focus:ring  block w-full shadow-sm sm:text-base  border-2 rounded-md`}
                                  >
                                    {item.order}
                                  </span>
                                ) : (
                                  <Form.Input
                                    type="number"
                                    placeholder={item.order}
                                    onChange={(order) => {
                                      const resultOrder =
                                        testAnalyteMappingStore.testAnalyteMapping
                                          ?.resultOrder
                                      resultOrder[index].order = parseInt(order)
                                      testAnalyteMappingStore.updateTestAnalyteMapping(
                                        {
                                          ...testAnalyteMappingStore.testAnalyteMapping,
                                          resultOrder,
                                        }
                                      )
                                    }}
                                  />
                                )}
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </Table>
                </Form.InputWrapper>

                <Form.InputWrapper label="Report Order">
                  <Table striped bordered className="max-h-5" size="sm">
                    <thead>
                      <tr className="text-xs">
                        <th className="text-white" style={{ minWidth: 150 }}>
                          Analyte
                        </th>
                        <th
                          className="text-white flex flex-row gap-2 items-center"
                          style={{ minWidth: 150 }}
                        >
                          Order
                          <Buttons.ButtonIcon
                            icon={
                              <IconContext.Provider value={{ color: "#ffffff" }}>
                                <BsFillArrowUpCircleFill />
                              </IconContext.Provider>
                            }
                            title=""
                            onClick={() => {
                              let reportOrder =
                                testAnalyteMappingStore.testAnalyteMapping
                                  .reportOrder
                              reportOrder = _.orderBy(reportOrder, "order", "asc")
                              testAnalyteMappingStore.updateTestAnalyteMapping({
                                ...testAnalyteMappingStore.testAnalyteMapping,
                                reportOrder,
                              })
                            }}
                          />
                          <Buttons.ButtonIcon
                            icon={
                              <IconContext.Provider value={{ color: "#ffffff" }}>
                                <BsFillArrowDownCircleFill />
                              </IconContext.Provider>
                            }
                            title=""
                            onClick={() => {
                              let reportOrder =
                                testAnalyteMappingStore.testAnalyteMapping
                                  .reportOrder
                              reportOrder = _.orderBy(reportOrder, "order", "desc")
                              testAnalyteMappingStore.updateTestAnalyteMapping({
                                ...testAnalyteMappingStore.testAnalyteMapping,
                                reportOrder,
                              })
                            }}
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {testAnalyteMappingStore.testAnalyteMapping?.reportOrder &&
                        testAnalyteMappingStore.testAnalyteMapping?.reportOrder.map(
                          (item, index) => (
                            <tr
                              onMouseEnter={() => {
                                setTxtDisable(false)
                              }}
                              onMouseLeave={() => {
                                setTxtDisable(true)
                              }}
                            >
                              <td>{`${index + 1}. ${
                                item.analyteName + " - " + item.analyteCode
                              }`}</td>
                              <td style={{ width: 150 }}>
                                {txtDisable ? (
                                  <span
                                    className={`leading-4 p-2  focus:outline-none focus:ring  block w-full shadow-sm sm:text-base  border-2 rounded-md`}
                                  >
                                    {item.order}
                                  </span>
                                ) : (
                                  <Form.Input
                                    type="number"
                                    placeholder={item.order}
                                    onChange={(order) => {
                                      const reportOrder =
                                        testAnalyteMappingStore.testAnalyteMapping
                                          ?.reportOrder
                                      reportOrder[index].order = parseInt(order)
                                      testAnalyteMappingStore.updateTestAnalyteMapping(
                                        {
                                          ...testAnalyteMappingStore.testAnalyteMapping,
                                          reportOrder,
                                        }
                                      )
                                    }}
                                  />
                                )}
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </Table>
                </Form.InputWrapper>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      label="Version"
                      hasError={errors.version}
                      placeholder={
                        errors.version ? "Please Enter Version" : "Version"
                      }
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
                    <Form.InputWrapper label="Environment">
                      <select
                        value={
                          testAnalyteMappingStore.testAnalyteMapping?.environment
                        }
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
                          testAnalyteMappingStore.updateTestAnalyteMapping({
                            ...testAnalyteMappingStore.testAnalyteMapping,
                            environment,
                          })
                          if (
                            !testAnalyteMappingStore.testAnalyteMapping
                              ?.existsVersionId
                          ) {
                            testAnalyteMappingStore.testAnalyteMappingService
                              .checkExitsRecords({
                                input: {
                                  code: testAnalyteMappingStore.testAnalyteMapping
                                    ?.testCode,
                                  env: environment,
                                  lab: testAnalyteMappingStore.testAnalyteMapping
                                    ?.lab,
                                },
                              })
                              .then((res) => {
                                if (
                                  res.checkTestAnalyteMappingsExistsRecord.success
                                ) {
                                  testAnalyteMappingStore.updateExistsLabEnvCode(
                                    true
                                  )
                                  Toast.error({
                                    message: `😔 ${res.checkTestAnalyteMappingsExistsRecord.message}`,
                                  })
                                } else
                                  testAnalyteMappingStore.updateExistsLabEnvCode(
                                    false
                                  )
                              })
                          }
                        }}
                      >
                        <option selected>
                          {loginStore.login && loginStore.login.role !== "SYSADMIN"
                            ? `Select`
                            : testAnalyteMappingStore.testAnalyteMapping
                                ?.environment || `Select`}
                        </option>
                        {lookupItems(routerStore.lookupItems, "ENVIRONMENT").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
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
                onClick={handleSubmit(onSubmitTestAnalyteMapping)}
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
                testAnalyteMappingStore.testAnalyteMappingService
                  .deleteTestAnalyteMapping({ input: { id: modalConfirm.id } })
                  .then((res: any) => {
                    if (res.removeTestAnalyteMapping.success) {
                      Toast.success({
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
                      Toast.success({
                        message: `😊 ${res.updateTestAnalyteMapping.message}`,
                      })
                      setModalConfirm({ show: false })
                      testAnalyteMappingStore.fetchTestAnalyteMapping()
                    }
                  })
              } else if (type === "updateFileds") {
                testAnalyteMappingStore.testAnalyteMappingService
                  .updateSingleFiled({
                    input: {
                      ...modalConfirm.data.fileds,
                      _id: modalConfirm.data.id,
                    },
                  })
                  .then((res: any) => {
                    if (res.updateTestAnalyteMapping.success) {
                      Toast.success({
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
          {/* <ModalResultOrder
            {...testAnalyteMappingStore.modalResultOrder}
            onClick={() => {
              testAnalyteMappingStore.updateModalResultOrder({ isVisible: false })
            }}
            onClose={() => {
             // testAnalyteMappingStore.updateModalResultOrder({ isVisible: false })
            }}
          /> */}
        </div>
      </>
    )
  })
)

export default TestAnalyteMapping
