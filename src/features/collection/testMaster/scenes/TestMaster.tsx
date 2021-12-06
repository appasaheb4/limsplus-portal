/* eslint-disable */
import React, { useState, useEffect,useMemo } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import dayjs from "dayjs"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"
import { useForm, Controller } from "react-hook-form"
import {AutoCompleteFilterSingleSelectDepartment } from "../components/organsims"
import { useStores, stores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const TestMater = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const {
    loginStore,
    testMasterStore,
    labStore,
    departmentStore,
    deliveryScheduleStore,
    routerStore,
    loading
  } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      testMasterStore.updateTestMaster({
        ...testMasterStore.testMaster,
        rLab: stores.loginStore.login.lab,
        pLab: stores.loginStore.login.lab,
        environment: stores.loginStore.login.environment,
      })
      setValue("rLab", stores.loginStore.login.lab)
      setValue("plab", stores.loginStore.login.lab)
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  useEffect(() => {
    const status = routerStore.lookupItems
      .find((fileds) => {
        return fileds.fieldName === "STATUS"
      })
      ?.arrValue?.find((statusItem) => statusItem.code === "A")
    if (status) {
      testMasterStore &&
        testMasterStore.updateTestMaster({
          ...testMasterStore.testMaster,
          status: status.code as string,
        })
      setValue("status", status.code as string)
    }
    const environment = routerStore.lookupItems
      .find((fileds) => {
        return fileds.fieldName === "ENVIRONMENT"
      })
      ?.arrValue?.find((environmentItem) => environmentItem.code === "P")
    if (environment) {
      testMasterStore &&
        testMasterStore.updateTestMaster({
          ...testMasterStore.testMaster,
          environment: environment.code as string,
        })
      setValue("environment", environment.code as string)
    }
  }, [routerStore.lookupItems])
  const onSubmitTestMaster = () => {
    if (!testMasterStore.checkExitsLabEnvCode) {
      if (
        !testMasterStore.testMaster?.existsVersionId &&
        !testMasterStore.testMaster?.existsRecordId
      ) {
        testMasterStore.testMasterService
          .addTestMaster({
            input: {
              ...testMasterStore.testMaster,
              enteredBy: stores.loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.createTestMaster.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.createTestMaster.message}`,
              })
            }
          })
      } else if (
        testMasterStore.testMaster?.existsVersionId &&
        !testMasterStore.testMaster?.existsRecordId
      ) {
        testMasterStore.testMasterService
          .versionUpgradeTestMaster({
            input: {
              ...testMasterStore.testMaster,
              enteredBy: stores.loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.versionUpgradeTestMaster.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.versionUpgradeTestMaster.message}`,
              })
            }
          })
      } else if (
        !testMasterStore.testMaster?.existsVersionId &&
        testMasterStore.testMaster?.existsRecordId
      ) {
        testMasterStore.testMasterService
          .duplicateTestMaster({
            input: {
              ...testMasterStore.testMaster,
              enteredBy: stores.loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.duplicateTestMaster.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.duplicateTestMaster.message}`,
              })
            }
          })
      }
      setTimeout(() => {
        // testMasterStore.fetchTestMaster()
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
      <FeatureComponents.Molecules.TestMasterList
            data={testMasterStore.listTestMaster || []}
            totalSize={testMasterStore.listTestMasterCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems,
              labList: loginStore.login?.labList,
              listLabs: labStore.listLabs,
              listDepartment: departmentStore.listDepartment,
              sectionListByDeptCode: testMasterStore.sectionListByDeptCode,
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
              testMasterStore.fetchTestMaster(page, limit)
            }}
            onFilter={(type, filter, page, limit) => {
              testMasterStore.testMasterService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
    ),
    [testMasterStore.listTestMaster]
  )

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
          <LibraryComponents.Atoms.Grid cols={3}>
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
                    label="RLab"
                    hasError={errors.rLab}
                  >
                    <select
                      value={testMasterStore.testMaster?.rLab}
                      disabled={
                        stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.rLab ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const rLab = e.target.value as string
                        onChange(rLab)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          rLab,
                        })
                        if (!testMasterStore.testMaster?.existsVersionId) {
                          testMasterStore.testMasterService
                            .checkExitsLabEnvCode({
                              input: {
                                code: testMasterStore.testMaster?.testCode,
                                env: testMasterStore.testMaster?.environment,
                                lab: rLab,
                              },
                            })
                            .then((res) => {
                              if (res.checkTestMasterExistsRecord.success) {
                                testMasterStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkTestMasterExistsRecord.message}`,
                                })
                              } else testMasterStore.updateExistsLabEnvCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>Select</option>
                      {loginStore.login?.labList &&
                        loginStore.login?.labList.map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="rLab"
                rules={{ required: true }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="PLab"
                    hasError={errors.pLab}
                  >
                    <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    placeholder="Search by name"
                    disable={
                      stores.loginStore.login &&
                      stores.loginStore.login.role !== "SYSADMIN"
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
                            type: "search",
                            filter: {
                              name: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.name)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
                        pLab:item.code
                      })
                      labStore.updateLabList(
                        labStore.listLabsCopy
                      )
                    }}
                    />
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="pLab"
                rules={{ required: true }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Department"
                    hasError={errors.department}
                  >
                   <AutoCompleteFilterSingleSelectDepartment
                   onSelect={(item)=>{
                    onChange(item.name)
                    testMasterStore.updateTestMaster({
                      ...testMasterStore.testMaster,
                      department:item.code
                    })
                     departmentStore.updateDepartmentList(
                       departmentStore.listDepartmentCopy
                     )
                     testMasterStore.findSectionListByDeptCode(item.code)
                   }}
                   />
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="department"
                rules={{ required: true }}
                defaultValue=""
              />
              {testMasterStore.sectionListByDeptCode && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Section"
                      hasError={errors.section}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.section ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const section = JSON.parse(e.target.value) as any
                          console.log({ section })

                          onChange(section)
                          testMasterStore.updateTestMaster({
                            ...testMasterStore.testMaster,
                            section,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {testMasterStore.sectionListByDeptCode &&
                          testMasterStore.sectionListByDeptCode.map(
                            (item: any, index: number) => (
                              <option key={index} value={JSON.stringify(item)}>
                                {`${item.code} -${item.name}`}
                              </option>
                            )
                          )}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="section"
                  rules={{ required: false }}
                  defaultValue=""
                />
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
                    value={testMasterStore.testMaster?.testCode}
                    onChange={(testCode) => {
                      onChange(testCode)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
                        testCode: testCode.toUpperCase(),
                      })
                    }}
                    onBlur={(code) => {
                      if (!testMasterStore.testMaster?.existsVersionId) {
                        testMasterStore.testMasterService
                          .checkExitsLabEnvCode({
                            input: {
                              code,
                              env: testMasterStore.testMaster?.environment,
                              lab: testMasterStore.testMaster?.rLab,
                            },
                          })
                          .then((res) => {
                            if (res.checkTestMasterExistsRecord.success) {
                              testMasterStore.updateExistsLabEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkTestMasterExistsRecord.message}`,
                              })
                            } else testMasterStore.updateExistsLabEnvCode(false)
                          })
                      }
                    }}
                  />
                )}
                name="testCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {testMasterStore.checkExitsLabEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Test Name"
                    placeholder={
                      errors.testName ? "Please Enter testName" : "Test Name"
                    }
                    hasError={errors.testName}
                    value={testMasterStore.testMaster?.testName}
                    onChange={(testName) => {
                      onChange(testName)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
                        testName: testName.toUpperCase(),
                      })
                    }}
                  />
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
                    placeholder={
                      errors.description ? "Please Enter description" : "Description"
                    }
                    hasError={errors.description}
                    value={testMasterStore.testMaster?.description}
                    onChange={(description) => {
                      onChange(description)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Short Name"
                    placeholder={
                      errors.shortName ? "Please Enter shortName" : "Short Name"
                    }
                    hasError={errors.shortName}
                    value={testMasterStore.testMaster?.shortName}
                    onChange={(shortName) => {
                      onChange(shortName)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
                        shortName: shortName.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="shortName"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Price"
                    placeholder={errors.price ? "Please Enter price" : "Price"}
                    type="number"
                    hasError={errors.price}
                    value={testMasterStore.testMaster?.price}
                    onChange={(price) => {
                      onChange(price)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
                        price: parseFloat(price),
                      })
                    }}
                  />
                )}
                name="price"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Schedule"
                    hasError={errors.schedule}
                  >
                   <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    placeholder="Search by code"
                    data={{
                      list:deliveryScheduleStore.listDeliverySchedule,
                      displayKey: "schCode",
                      findKey: "schCode",
                    }}
                    hasError={errors.schCode}
                    onFilter={(value: string) => {
                     deliveryScheduleStore.deliveryScheduleService.filter(
                        {
                          input: {
                            type: "filter",
                            filter: {
                              schCode: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.schCode)
                     testMasterStore.updateTestMaster({
                       ...testMasterStore.testMaster,
                       schedule:item.schCode
                     })
                      deliveryScheduleStore.updateDeliveryScheduleList(
                        deliveryScheduleStore.listDeliveryScheduleCopy
                      )
                    }}
                    />
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="schedule"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="TAT"
                    placeholder={errors.tat ? "Please Enter tat" : "TAT"}
                    value={testMasterStore.testMaster?.tat}
                    onChange={(tat) => {
                      onChange(tat)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
                        tat: tat.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="tat"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Validation Level"
                    hasError={errors.validationLevel}
                  >
                    <select
                      value={
                        testMasterStore &&
                        testMasterStore.testMaster?.validationLevel
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.validationLevel
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const validationLevel: any = (e.target.value || 0) as number
                        onChange(validationLevel)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          validationLevel: parseInt(validationLevel),
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                        (item: any, index: number) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="validationLevel"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Result Order"
                    placeholder={
                      errors.resultOrder
                        ? "Please Enter resultOrder"
                        : "Result Order"
                    }
                    hasError={errors.resultOrder}
                    value={testMasterStore.testMaster?.resultOrder}
                    onChange={(resultOrder) => {
                      onChange(resultOrder)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
                        resultOrder: resultOrder.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="resultOrder"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Processing"
                    hasError={errors.processing}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.processing ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const processing = e.target.value as
                          | "MANUAL"
                          | "AEMI"
                          | "AUTOMATIC"
                        onChange(processing)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
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
                )}
                name="processing"
                rules={{ required: false }}
                defaultValue=""
              />
              <LibraryComponents.Atoms.Grid cols={5}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Bill"
                      id="modeBill"
                      hasError={errors.bill}
                      value={testMasterStore.testMaster?.bill}
                      onChange={(bill) => {
                        onChange(bill)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
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
                    <LibraryComponents.Atoms.Form.Toggle
                      label="AutoFinish"
                      id="modeAutoFinish"
                      hasError={errors.autoFinish}
                      value={testMasterStore.testMaster?.autoFinish}
                      onChange={(autoFinish) => {
                        onChange(autoFinish)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          autoFinish,
                        })
                      }}
                    />
                  )}
                  name="autoFinish"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Hold OOS"
                      id="modeHoldOOS"
                      hasError={errors.holdOOS}
                      value={testMasterStore.testMaster?.holdOOS}
                      onChange={(holdOOS) => {
                        onChange(holdOOS)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          holdOOS,
                        })
                      }}
                    />
                  )}
                  name="holdOOS"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Confidential"
                      hasError={errors.confidential}
                      value={testMasterStore.testMaster?.confidential}
                      onChange={(confidential) => {
                        onChange(confidential)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          confidential,
                        })
                      }}
                    />
                  )}
                  name="confidential"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Urgent"
                      hasError={errors.urgent}
                      value={testMasterStore.testMaster?.urgent}
                      onChange={(urgent) => {
                        onChange(urgent)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          urgent,
                        })
                      }}
                    />
                  )}
                  name="urgent"
                  rules={{ required: false }}
                  defaultValue=""
                />
              </LibraryComponents.Atoms.Grid>
            </LibraryComponents.Atoms.List>

            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              {/* <LibraryComponents.Atoms.Form.Input
                label="Report Group"
                placeholder="Report Group"
                value={testMasterStore.testMaster?.reportGroup}
                onChange={(reportGroup) => {
                  testMasterStore.updateTestMaster({
                    ...testMasterStore.testMaster,
                    reportGroup,
                  })
                }}
              /> */}

              {/* <LibraryComponents.Atoms.Form.Input
                label="Tube Groups"
                placeholder="Tube Groups"
                value={testMasterStore.testMaster?.tubeGroup}
                onChange={(tubeGroup) => {
                  testMasterStore.updateTestMaster({
                    ...testMasterStore.testMaster,
                    tubeGroup,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Label Instruction"
                placeholder="Label Instruction"
                value={testMasterStore.testMaster?.labelInstruction}
                onChange={(labelInstruction) => {
                  testMasterStore.updateTestMaster({
                    ...testMasterStore.testMaster,
                    labelInstruction,
                  })
                }}
              /> */}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Panel Method"
                    placeholder={
                      errors.panelMethod
                        ? "Please Enter panelMethod"
                        : "Panel Method"
                    }
                    hasError={errors.panelMethod}
                    value={testMasterStore.testMaster?.panelMethod}
                    onChange={(panelMethod) => {
                      onChange(panelMethod)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
                        panelMethod,
                      })
                    }}
                  />
                )}
                name="panelMethod"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Sample Run On"
                    hasError={errors.sampleRunOn}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.sampleRunOn ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const sampleRunOn = e.target.value as "LABID" | "SAMPLEID"
                        onChange(sampleRunOn)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
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
                )}
                name="sampleRunOn"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Workflow"
                    hasError={errors.workflow}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.workflow ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const workflow = e.target.value as string
                        onChange(workflow)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          workflow,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "WORKFLOW"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="workflow"
                rules={{ required: false }}
                defaultValue=""
              />
              {/* <LibraryComponents.Atoms.Form.Input
                label="Sample Type"
                placeholder="Sample Type"
                value={testMasterStore.testMaster?.sampleType}
                onChange={(sampleType) => {
                  testMasterStore.updateTestMaster({
                    ...testMasterStore.testMaster,
                    sampleType,
                  })
                }}
              /> */}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Speical Instruction"
                    hasError={errors.speicalInstructions}
                    placeholder={
                      errors.speicalInstructions
                        ? "Please Enter speicalInstructions"
                        : "Speical Instrcution"
                    }
                    value={testMasterStore.testMaster?.speicalInstructions}
                    onChange={(speicalInstructions) => {
                      onChange(speicalInstructions)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
                        speicalInstructions: speicalInstructions.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="speicalInstructions"
                rules={{ required: false }}
                defaultValue=""
              />
              {/* <LibraryComponents.Atoms.Form.Input
                label="Disease"
                placeholder="Disease"
                value={testMasterStore.testMaster?.disease}
                onChange={(disease) => {
                  testMasterStore.updateTestMaster({
                    ...testMasterStore.testMaster,
                    disease,
                  })
                }}
              /> */}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Disease"
                    hasError={errors.disease}
                  >
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const disease = e.target.value as string
                        onChange(disease)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          disease,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "DISEASE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="disease"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Category"
                    hasError={errors.category}
                  >
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const category = e.target.value as string
                        onChange(category)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          category,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "CATEGORY"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="category"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Test Type"
                    hasError={errors.testType}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.testType ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const testType = e.target.value as string
                        onChange(testType)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          testType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "TEST_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="testType"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Workflow Code"
                    hasError={errors.workflowCode}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.workflowCode ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const workflowCode = e.target.value as string
                        onChange(workflowCode)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
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
                )}
                name="workflowCode"
                rules={{ required: false }}
                defaultValue=""
              />
              {/* <LibraryComponents.Atoms.Form.InputWrapper label="Worklist Code">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const worklistCode = e.target.value as string
                    testMasterStore.updateTestMaster({
                      ...testMasterStore.testMaster,
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="CPT Code"
                    placeholder={
                      errors.cptCode ? "Please Enter cptCode" : "CPT Code"
                    }
                    hasError={errors.cptCode}
                    value={testMasterStore.testMaster?.cptCode}
                    onChange={(cptCode) => {
                      onChange(cptCode)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
                        cptCode: cptCode.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="cptCode"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Prefix"
                    hasError={errors.prefix}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.prefix ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const prefix = e.target.value
                        onChange(prefix)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          prefix,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "PREFIX"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="prefix"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Sufix"
                    hasError={errors.sufix}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.sufix ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const sufix = e.target.value
                        onChange(sufix)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          sufix,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "SUFIX"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="sufix"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Delevery Schedule"
                    placeholder={
                      errors.deleverySchedule
                        ? "Please Enter deleverySchedule"
                        : "Delevery Schedule"
                    }
                    hasError={errors.deleverySchedule}
                    value={testMasterStore.testMaster?.deleverySchedule}
                    onChange={(deleverySchedule) => {
                      onChange(deleverySchedule)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
                        deleverySchedule: deleverySchedule.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="deleverySchedule"
                rules={{ required: false }}
                defaultValue=""
              />

              <LibraryComponents.Atoms.Grid cols={5}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Instant Result"
                      hasError={errors.instantResult}
                      value={testMasterStore.testMaster?.instantResult}
                      onChange={(instantResult) => {
                        onChange(instantResult)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          instantResult,
                        })
                      }}
                    />
                  )}
                  name="instantResult"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Accredited"
                      hasError={errors.accredited}
                      value={testMasterStore.testMaster?.accredited}
                      onChange={(accredited) => {
                        onChange(accredited)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          accredited,
                        })
                      }}
                    />
                  )}
                  name="accredited"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Cretical"
                      hasError={errors.cretical}
                      value={testMasterStore.testMaster?.cretical}
                      onChange={(cretical) => {
                        onChange(cretical)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          cretical,
                        })
                      }}
                    />
                  )}
                  name="cretical"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Repetition"
                      hasError={errors.repitation}
                      value={testMasterStore.testMaster?.repitation}
                      onChange={(repitation) => {
                        onChange(repitation)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          repitation,
                        })
                      }}
                    />
                  )}
                  name="repitation"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Print Label"
                      hasError={errors.printLabel}
                      value={testMasterStore.testMaster?.printLabel}
                      onChange={(printLabel) => {
                        onChange(printLabel)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          printLabel,
                        })
                      }}
                    />
                  )}
                  name="printLabel"
                  rules={{ required: false }}
                  defaultValue=""
                />
              </LibraryComponents.Atoms.Grid>
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              {/* <LibraryComponents.Atoms.Form.InputWrapper label="Collection Container">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const collectionContainer = e.target.value
                    testMasterStore.updateTestMaster({
                      ...testMasterStore.testMaster,
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Holding Days"
                    placeholder={
                      errors.holdingDays
                        ? "Please Enter holdingDays"
                        : "Holding Days"
                    }
                    hasError={errors.holdingDays}
                    value={testMasterStore.testMaster?.holdingDays}
                    onChange={(holdingDays) => {
                      onChange(holdingDays)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
                        holdingDays: holdingDays.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="holdingDays"
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
                      value={testMasterStore.testMaster?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
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
                      errors.dateCreation
                        ? "Please Enter dateCreation"
                        : "Entered By"
                    }
                    hasError={errors.dateCreation}
                    value={loginStore.login?.userId}
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
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Creation"
                    placeholder={
                      errors.dateCreation
                        ? "Please Enter dateCreation"
                        : "Date Creation"
                    }
                    hasError={errors.dateCreation}
                    value={dayjs(testMasterStore.testMaster?.dateCreation).format(
                      "YYYY-MM-DD"
                    )}
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
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Active"
                    placeholder={
                      errors.dateActive ? "Please Enter dateActive" : "Date Active"
                    }
                    hasError={errors.dateActive}
                    value={dayjs(testMasterStore.testMaster?.dateActive).format(
                      "YYYY-MM-DD"
                    )}
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
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Expire"
                    placeholder={
                      errors.dateExpire ? "Please Enter dateExpire" : "Date Expire"
                    }
                    hasError={errors.dateExpire}
                    value={dayjs(testMasterStore.testMaster?.dateExpire).format(
                      "YYYY-MM-DD"
                    )}
                    onChange={(e) => {
                      const dateExpire = new Date(e.target.value)
                      onChange(dateExpire)
                      testMasterStore.updateTestMaster({
                        ...testMasterStore.testMaster,
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
                    placeholder={errors.version ? "Please Enter version" : "Version"}
                    hasError={errors.version}
                    value={testMasterStore.testMaster?.version}
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
                      value={testMasterStore.testMaster?.environment}
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
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          environment,
                        })
                        if (!testMasterStore.testMaster?.existsVersionId) {
                          testMasterStore.testMasterService
                            .checkExitsLabEnvCode({
                              input: {
                                code: testMasterStore.testMaster?.testCode,
                                env: environment,
                                lab: testMasterStore.testMaster?.rLab,
                              },
                            })
                            .then((res) => {
                              if (res.checkTestMasterExistsRecord.success) {
                                testMasterStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkTestMasterExistsRecord.message}`,
                                })
                              } else testMasterStore.updateExistsLabEnvCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : testMasterStore.testMaster?.environment || `Select`}
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
              <LibraryComponents.Atoms.Grid cols={6}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Method"
                      hasError={errors.method}
                      value={testMasterStore.testMaster?.method}
                      onChange={(method) => {
                        onChange(method)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          method,
                        })
                      }}
                    />
                  )}
                  name="method"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Cumulative"
                      hasError={errors.cumulative}
                      value={testMasterStore.testMaster?.cumulative}
                      onChange={(cumulative) => {
                        onChange(cumulative)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          cumulative,
                        })
                      }}
                    />
                  )}
                  name="cumulative"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="QC Hold"
                      hasError={errors.qcHold}
                      value={testMasterStore.testMaster?.qcHold}
                      onChange={(qcHold) => {
                        onChange(qcHold)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          qcHold,
                        })
                      }}
                    />
                  )}
                  name="qcHold"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="OOS Hold"
                      hasError={errors.oosHold}
                      value={testMasterStore.testMaster?.oosHold}
                      onChange={(oosHold) => {
                        onChange(oosHold)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          oosHold,
                        })
                      }}
                    />
                  )}
                  name=" oosHold"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Delta Hold"
                      hasError={errors.deltaHold}
                      value={testMasterStore.testMaster?.deltaHold}
                      onChange={(deltaHold) => {
                        onChange(deltaHold)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          deltaHold,
                        })
                      }}
                    />
                  )}
                  name="deltaHold"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Allow Partial"
                      hasError={errors.allowPartial}
                      value={testMasterStore.testMaster?.allowPartial}
                      onChange={(allowPartial) => {
                        onChange(allowPartial)
                        testMasterStore.updateTestMaster({
                          ...testMasterStore.testMaster,
                          allowPartial,
                        })
                      }}
                    />
                  )}
                  name="allowPartial"
                  rules={{ required: false }}
                  defaultValue=""
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
              onClick={handleSubmit(onSubmitTestMaster)}
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
              testMasterStore.testMasterService
                .deleteTestMaster({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeTestMaster.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeTestMaster.message}`,
                    })
                    setModalConfirm({ show: false })
                    testMasterStore.fetchTestMaster()
                  }
                })
            } else if (type === "Update") {
              testMasterStore.testMasterService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateTestMaster.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateTestMaster.message}`,
                    })
                    setModalConfirm({ show: false })
                    testMasterStore.fetchTestMaster()
                  }
                })
            } else if (type === "versionUpgrade") {
              testMasterStore.updateTestMaster({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: parseInt(modalConfirm.data.version + 1),
                dateActiveFrom: new Date(),
              })
              setValue("rLab", modalConfirm.data.rLab)
              setValue("pLab", modalConfirm.data.pLab)
              setValue("department", modalConfirm.data.department)
              setValue("testCode", modalConfirm.data.testCode)
              setValue("testName", modalConfirm.data.testName)
              setValue("department", modalConfirm.data.department)
              setValue("environment", modalConfirm.data.environment)
              setValue("status", modalConfirm.data.status)
            } else if (type === "duplicate") {
              testMasterStore.updateTestMaster({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
                dateActiveFrom: new Date(),
              })
              setValue("rLab", modalConfirm.data.rLab)
              setValue("pLab", modalConfirm.data.pLab)
              setValue("department", modalConfirm.data.department)
              setValue("testCode", modalConfirm.data.testCode)
              setValue("testName", modalConfirm.data.testName)
              setValue("department", modalConfirm.data.department)
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

export default TestMater
