/* eslint-disable */
import React, { useEffect, useState,useMemo } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const TestSampleMapping = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const {
    loginStore,
    testMasterStore,
    sampleTypeStore,
    sampleContainerStore,
    testSampleMappingStore,
    routerStore,
    loading
  } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)

  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      testSampleMappingStore.updateSampleType({
        ...testSampleMappingStore.testSampleMapping,
        environment: loginStore.login.environment,
      })
      setValue("environment", loginStore.login.environment)
    }
  }, [loginStore.login])

  useEffect(()=>{
    const environment = routerStore.lookupItems.find((fileds)=>{
      return fileds.fieldName === 'ENVIRONMENT'
    })?. arrValue?.find((environmentItem)=>environmentItem.code === 'P')
    if(environment){
      testSampleMappingStore && testSampleMappingStore.updateSampleType({
        ...testSampleMappingStore.testSampleMapping,
        environment: environment.code as string
      })
      setValue("environment",environment.code as string)
    }
  },[routerStore.lookupItems])

  const onSubmitTestSampleMapping = () => {
    if (!testSampleMappingStore.checkExitsTestSampleEnvCode) {
      testSampleMappingStore.testSampleMappingService
        .addTestSampleMapping({
          input: { ...testSampleMappingStore.testSampleMapping },
        })
        .then((res) => {
          if (res.createTestSampleMapping.success) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 ${res.createTestSampleMapping.message}`,
            })
          }
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: "😔 Please enter diff code!",
      })
    }
  }

  const tableView = useMemo(
    ()=>(
      <FeatureComponents.Molecules.TestSampleMappingList
            data={testSampleMappingStore.listTestSampleMapping || []}
            totalSize={testSampleMappingStore.listTestSampleMappingCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
              listTestMaster:testMasterStore.listTestMaster,
              listSampleType:sampleTypeStore.listSampleType,
              listSampleContainer:sampleContainerStore.listSampleContainer
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
            onPageSizeChange={(page, limit) => {
              testSampleMappingStore.fetchSampleTypeList(page, limit)
            }}
            onFilter={(type, filter, page, limit) => {
              testSampleMappingStore.testSampleMappingService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
    ),
    [testSampleMappingStore.listTestSampleMapping]
  )

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(toJS(routerStore.userPermission), "Add") && (
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
              {testMasterStore.listTestMaster && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Test Code"
                      hasError={errors.testCode}
                    >
                      <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    data={{
                      list:testMasterStore.listTestMaster,
                      displayKey: "testCode",
                      findKey: "testCode",
                    }}
                    hasError={errors.testCode}
                    onFilter={(value: string) => {
                     testMasterStore.testMasterService.filter(
                        {
                          input: {
                            filter: {
                              type: "search",
                              ["testCode"]: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.testCode)
                    testSampleMappingStore.updateSampleType({
                      ...testSampleMappingStore.testSampleMapping,
                      testCode:item.testCode
                    })
                      testMasterStore.updateTestMasterList(
                        testMasterStore.listTestMasterCopy
                      )
                      testSampleMappingStore.testSampleMappingService
                      .checkExitsTestSampleEnvCode({
                        input: {
                          testCode:item.testCode,
                          sampleCode:
                            testSampleMappingStore.testSampleMapping
                              ?.sampleCode,
                          env:
                            testSampleMappingStore.testSampleMapping
                              ?.environment,
                        },
                      })
                      .then((res) => {
                        if (res.checkTestSampleMappingsExistsRecord.success) {
                          testSampleMappingStore.updateExitsTestSampleEnvCode(
                            true
                          )
                          LibraryComponents.Atoms.Toast.error({
                            message: `😔 ${res.checkTestSampleMappingsExistsRecord.message}`,
                          })
                        } else
                          testSampleMappingStore.updateExitsTestSampleEnvCode(
                            false
                          )
                      })
                      
                    }}
                    />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="testCode"
                  rules={{ required: true }}
                  defaultValue=""
                />
              )}
              {testSampleMappingStore.checkExitsTestSampleEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Test code or sample code already exits. Please use other code.
                </span>
              )}

              {sampleTypeStore.listSampleType && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Sample Code"
                      hasError={errors.sampleCode}
                    >
                      <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    
                    data={{
                      list:sampleTypeStore.listSampleType,
                      displayKey: "sampleCode",
                      findKey: "sampleCode",
                    }}
                    hasError={errors.sampleCode}
                    onFilter={(value: string) => {
                      sampleTypeStore.sampleTypeService.filter(
                        {
                          input: {
                            filter: {
                              type: "search",
                              ["sampleCode"]: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.sampleCode)
                      testSampleMappingStore.updateSampleType({
                        ...testSampleMappingStore.testSampleMapping,
                        sampleCode:item.sampleCode
                      })
                      sampleTypeStore.updateSampleTypeList(
                        sampleTypeStore.listSampleTypeCopy
                      )
                      testSampleMappingStore.testSampleMappingService
                            .checkExitsTestSampleEnvCode({
                              input: {
                                testCode:
                                  testSampleMappingStore.testSampleMapping?.testCode,
                                sampleCode:item.sampleCode,
                                env:
                                  testSampleMappingStore.testSampleMapping
                                    ?.environment,
                              },
                            })
                            .then((res) => {
                              if (res.checkTestSampleMappingsExistsRecord.success) {
                                testSampleMappingStore.updateExitsTestSampleEnvCode(
                                  true
                                )
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkTestSampleMappingsExistsRecord.message}`,
                                })
                              } else
                                testSampleMappingStore.updateExitsTestSampleEnvCode(
                                  false
                                )
                            })
                      
                    }}
                    />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="sampleCode"
                  rules={{ required: true }}
                  defaultValue=""
                />
              )}
              {testSampleMappingStore.checkExitsTestSampleEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Test code or sample code already exits. Please use other code.
                </span>
              )}
              {sampleTypeStore.listSampleType && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Sample Type"
                      hasError={errors.sampleType}
                    >
                      <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    data={{
                      list:sampleTypeStore.listSampleType,
                      displayKey: "sampleType",
                      findKey: "sampleType",
                    }}
                    hasError={errors.sampleType}
                    onFilter={(value: string) => {
                      sampleTypeStore.sampleTypeService.filter(
                        {
                          input: {
                            filter: {
                              type: "search",
                              ["sampleType"]: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.sampleType)
                      testSampleMappingStore.updateSampleType({
                        ...testSampleMappingStore.testSampleMapping,
                        sampleType:item.sampleType
                      })
                      sampleTypeStore.updateSampleTypeList(
                        sampleTypeStore.listSampleTypeCopy
                      ) 
                    }}
                    />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="sampleType"
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}

              {sampleTypeStore.listSampleType && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Sample Group"
                      hasError={errors.sampleGroup}
                    >
                      <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    data={{
                      list:sampleTypeStore.listSampleType,
                      displayKey: "sampleGroup",
                      findKey: "sampleGroup",
                    }}
                    hasError={errors.sampleGroup}
                    onFilter={(value: string) => {
                      sampleTypeStore.sampleTypeService.filter(
                        {
                          input: {
                            filter: {
                              type: "search",
                              ["sampleGroup"]: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.sampleGroup)
                      testSampleMappingStore.updateSampleType({
                        ...testSampleMappingStore.testSampleMapping,
                        sampleGroup:item.sampleGroup
                      })
                      sampleTypeStore.updateSampleTypeList(
                        sampleTypeStore.listSampleTypeCopy
                      ) 
                    }}
                    />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="sampleGroup"
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}
              {sampleContainerStore.listSampleContainer && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Coll Container Code"
                      hasError={errors.collContainerCode}
                    >
                      <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    data={{
                      list:sampleContainerStore.listSampleContainer,
                      displayKey: "containerCode",
                      findKey: "containerCode",
                    }}
                    hasError={errors.name}
                    onFilter={(value: string) => {
                      sampleContainerStore.sampleContainerService.filter(
                        {
                          input: {
                            filter: {
                              type: "search",
                              ["containerCode"]: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.containerCode)
                      testSampleMappingStore.updateSampleType({
                        ...testSampleMappingStore.testSampleMapping,
                        collContainerCode:item.containerCode,
                      })
                      sampleContainerStore.updateSampleContainerList(
                        sampleContainerStore.listSampleContainerCopy
                      )
                    }}
                    />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="collContainerCode"
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}
              {sampleContainerStore.listSampleContainer && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Coll Container Name"
                      hasError={errors.collContainerName}
                    >
                      <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    data={{
                      list:sampleContainerStore.listSampleContainer,
                      displayKey: "containerName",
                      findKey: "containerName",
                    }}
                    hasError={errors.containerName}
                    onFilter={(value: string) => {
                      sampleContainerStore.sampleContainerService.filter(
                        {
                          input: {
                            filter: {
                              type: "search",
                              ["containerName"]: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.containerName)
                      testSampleMappingStore.updateSampleType({
                        ...testSampleMappingStore.testSampleMapping,
                        collContainerName:item.containerName,
                      })
                      sampleContainerStore.updateSampleContainerList(
                        sampleContainerStore.listSampleContainerCopy
                      )
                    }}
                    />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="collContainerName"
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}
              {sampleContainerStore.listSampleContainer && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Test Container Code"
                      hasError={errors.testContainerCode}
                    >
                      <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    data={{
                      list:sampleContainerStore.listSampleContainer,
                      displayKey: "containerCode",
                      findKey: "containerCode",
                    }}
                    hasError={errors.name}
                    onFilter={(value: string) => {
                      sampleContainerStore.sampleContainerService.filter(
                        {
                          input: {
                            filter: {
                              type: "search",
                              ["containerCode"]: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.containerCode)
                      testSampleMappingStore.updateSampleType({
                        ...testSampleMappingStore.testSampleMapping,
                        collContainerCode:item.containerCode,
                      })
                      sampleContainerStore.updateSampleContainerList(
                        sampleContainerStore.listSampleContainerCopy
                      )
                    }}
                    />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="testContainerCode"
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}
              {sampleContainerStore.listSampleContainer && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Test Container Name"
                      hasError={errors.testContainerName}
                    >
                      <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    data={{
                      list:sampleContainerStore.listSampleContainer,
                      displayKey: "containerName",
                      findKey: "containerName",
                    }}
                    hasError={errors.containerName}
                    onFilter={(value: string) => {
                      sampleContainerStore.sampleContainerService.filter(
                        {
                          input: {
                            filter: {
                              type: "search",
                              ["containerName"]: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.containerName)
                      testSampleMappingStore.updateSampleType({
                        ...testSampleMappingStore.testSampleMapping,
                        collContainerName:item.containerName,
                      })
                      sampleContainerStore.updateSampleContainerList(
                        sampleContainerStore.listSampleContainerCopy
                      )
                    }}
                    />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="testContainerName"
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Min Draw Vol"
                    placeholder={
                      errors.minDrawVol ? "Please Enter minDrawVol" : "Min Draw Vol"
                    }
                    hasError={errors.minDrawVol}
                    value={testSampleMappingStore.testSampleMapping?.minDrawVol}
                    onChange={(minDrawVol) => {
                      onChange(minDrawVol)
                      testSampleMappingStore.updateSampleType({
                        ...testSampleMappingStore.testSampleMapping,
                        minDrawVol,
                      })
                    }}
                  />
                )}
                name="minDrawVol"
                rules={{ required: false }}
                defaultValue=""
              />
              <LibraryComponents.Atoms.Grid cols={4}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Primary Container"
                      hasError={errors.primaryContainer}
                      value={
                        testSampleMappingStore.testSampleMapping?.primaryContainer
                      }
                      onChange={(primaryContainer) => {
                        onChange(primaryContainer)
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          primaryContainer,
                        })
                      }}
                    />
                  )}
                  name="primaryContainer"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Unique Container"
                      hasError={errors.uniqueContainer}
                      value={
                        testSampleMappingStore.testSampleMapping?.uniqueContainer
                      }
                      onChange={(uniqueContainer) => {
                        onChange(uniqueContainer)
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          uniqueContainer,
                        })
                      }}
                    />
                  )}
                  name="uniqueContainer"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Centrifue"
                      hasError={errors.centerIfuge}
                      value={testSampleMappingStore.testSampleMapping?.centerIfuge}
                      onChange={(centerIfuge) => {
                        onChange(centerIfuge)
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          centerIfuge,
                        })
                      }}
                    />
                  )}
                  name="centerIfuge"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Aliquot"
                      hasError={errors.aliquot}
                      value={testSampleMappingStore.testSampleMapping?.aliquot}
                      onChange={(aliquot) => {
                        onChange(aliquot)
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          aliquot,
                        })
                      }}
                    />
                  )}
                  name="aliquot"
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Min Draw Vol Unit"
                    hasError={errors.minDrawVolUnit}
                  >
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const minDrawVolUnit = e.target.value as string
                        onChange(minDrawVolUnit)
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          minDrawVolUnit,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "MIN_DRAW_VOL_UNIT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {LibraryUtils.lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="minDrawVolUnit"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Min Test Vol"
                    placeholder={
                      errors.minTestVol ? "Please Enter minTestVol" : "Min Test Vol"
                    }
                    hasError={errors.minTestVol}
                    value={testSampleMappingStore.testSampleMapping?.minTestVol}
                    onChange={(minTestVol) => {
                      onChange(minTestVol)
                      testSampleMappingStore.updateSampleType({
                        ...testSampleMappingStore.testSampleMapping,
                        minTestVol,
                      })
                    }}
                  />
                )}
                name="minTestVol"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Min Test Vol Unit"
                    hasError={errors.minTestVolUnit}
                  >
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const minTestVolUnit = e.target.value as string
                        onChange(minTestVolUnit)
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          minTestVolUnit,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "MIN_TEST_VOL_UNIT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {LibraryUtils.lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="minTestVolUnit"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Condition"
                    placeholder={
                      errors.condition ? "Please Enter condition" : "Condition"
                    }
                    hasError={errors.condition}
                    value={testSampleMappingStore.testSampleMapping?.condition}
                    onChange={(condition) => {
                      onChange(condition)
                      testSampleMappingStore.updateSampleType({
                        ...testSampleMappingStore.testSampleMapping,
                        condition,
                      })
                    }}
                  />
                )}
                name="condition"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Retention Period"
                    placeholder={
                      errors.repentionPeriod
                        ? "Please Enter repentionPeriod"
                        : "Retention Period"
                    }
                    hasError={errors.repentionPeriod}
                    value={testSampleMappingStore.testSampleMapping?.repentionPeriod}
                    onChange={(repentionPeriod) => {
                      onChange(repentionPeriod)
                      testSampleMappingStore.updateSampleType({
                        ...testSampleMappingStore.testSampleMapping,
                        repentionPeriod,
                      })
                    }}
                  />
                )}
                name="repentionPeriod"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Repention Units"
                    hasError={errors.repentionUnits}
                  >
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const repentionUnits = e.target.value as string
                        onChange(repentionUnits)
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          repentionUnits,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "RETENTION_UNITS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="repentionUnits"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Label Inst"
                    placeholder={
                      errors.labelInst ? "Please Enter labelInst" : "Label Inst"
                    }
                    hasError={errors.labelInst}
                    value={testSampleMappingStore.testSampleMapping?.labelInst}
                    onChange={(labelInst) => {
                      onChange(labelInst)
                      testSampleMappingStore.updateSampleType({
                        ...testSampleMappingStore.testSampleMapping,
                        labelInst,
                      })
                    }}
                  />
                )}
                name="labelInst"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Info"
                    placeholder={errors.info ? "Please Enter info" : "Info"}
                    hasError={errors.info}
                    value={testSampleMappingStore.testSampleMapping?.info}
                    onChange={(info) => {
                      onChange(info)
                      testSampleMappingStore.updateSampleType({
                        ...testSampleMappingStore.testSampleMapping,
                        info,
                      })
                    }}
                  />
                )}
                name="info"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={testSampleMappingStore.testSampleMapping?.environment}
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
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          environment,
                        })
                        testSampleMappingStore.testSampleMappingService
                          .checkExitsTestSampleEnvCode({
                            input: {
                              testCode:
                                testSampleMappingStore.testSampleMapping?.testCode,
                              sampleCode:
                                testSampleMappingStore.testSampleMapping?.sampleCode,
                              env: environment,
                            },
                          })
                          .then((res) => {
                            if (res.checkTestSampleMappingsExistsRecord.success) {
                              testSampleMappingStore.updateExitsTestSampleEnvCode(
                                true
                              )
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkTestSampleMappingsExistsRecord.message}`,
                              })
                            } else
                              testSampleMappingStore.updateExitsTestSampleEnvCode(
                                false
                              )
                          })
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : testSampleMappingStore.testSampleMapping?.environment ||
                            `Select`}
                      </option>
                      {LibraryUtils.lookupItems(
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
              <LibraryComponents.Atoms.Grid cols={4}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Lab Specfic"
                      hasError={errors.labSpecfic}
                      value={testSampleMappingStore.testSampleMapping?.labSpecfic}
                      onChange={(labSpecfic) => {
                        onChange(labSpecfic)
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          labSpecfic,
                        })
                      }}
                    />
                  )}
                  name="labSpecfic"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Department Specfic"
                      hasError={errors.departmentSpecfic}
                      value={
                        testSampleMappingStore.testSampleMapping?.departmentSpecfic
                      }
                      onChange={(departmentSpecfic) => {
                        onChange(departmentSpecfic)
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          departmentSpecfic,
                        })
                      }}
                    />
                  )}
                  name="departmentSpecfic"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Shared Sample"
                      hasError={errors.sharedSample}
                      value={testSampleMappingStore.testSampleMapping?.sharedSample}
                      onChange={(sharedSample) => {
                        onChange(sharedSample)
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          sharedSample,
                        })
                      }}
                    />
                  )}
                  name="sharedSample"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Print Label"
                      hasError={errors.printLabels}
                      value={testSampleMappingStore.testSampleMapping?.printLabels}
                      onChange={(printLabels) => {
                        onChange(printLabels)
                        testSampleMappingStore.updateSampleType({
                          ...testSampleMappingStore.testSampleMapping,
                          printLabels,
                        })
                      }}
                    />
                  )}
                  name="printLabels"
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
              onClick={handleSubmit(onSubmitTestSampleMapping)}
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
              testSampleMappingStore.testSampleMappingService
                .deleteTestSampleMapping({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeTestSampleMapping.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeTestSampleMapping.message}`,
                    })
                    setModalConfirm({ show: false })
                    testSampleMappingStore.fetchSampleTypeList()
                  }
                })
            } else if (type === "Update") {
              testSampleMappingStore.testSampleMappingService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateTestSampleMapping.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateTestSampleMapping.message}`,
                    })
                    setModalConfirm({ show: false })
                    testSampleMappingStore.fetchSampleTypeList()
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

export default TestSampleMapping
