/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import Storage from "@lp/library/modules/storage"
import { useForm, Controller } from "react-hook-form"
import { useStores } from "@lp/library/stores"
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { Stores as TestMasterStore } from "@lp/features/collection/testMaster/stores"
import { Stores as SampleTypeStore } from "@lp/features/collection/sampleType/stores"
import { Stores as SampleContainerStore } from "@lp/features/collection/sampleContainer/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const TestSampleMapping = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const { loginStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)

  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.testSampleMappingStore.updateSampleType({
        ...Stores.testSampleMappingStore.testSampleMapping,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  const onSubmitTestSampleMapping = () => {
    if (Stores.testSampleMappingStore.testSampleMapping) {
      Stores.testSampleMappingStore.testSampleMappingService
        .addTestSampleMapping(Stores.testSampleMappingStore.testSampleMapping)
        .then(() => {
          LibraryComponents.Atoms.Toast.success({
            message: `😊 Test sample mapping created.`,
          })
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: "😔 Please enter all information!",
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
                    label="Test Code"
                    hasError={errors.testCode}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.testCode ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const testCode = e.target.value as string
                        onChange(testCode)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
                          testCode,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {TestMasterStore.testMasterStore.listTestMaster &&
                        TestMasterStore.testMasterStore.listTestMaster.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.testCode}>
                              {item.testCode}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="testCode"
                rules={{ required: true }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Sample Code"
                    hasError={errors.sampleCode}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.sampleCode ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const sampleCode = e.target.value as string
                        onChange(sampleCode)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
                          sampleCode,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {SampleTypeStore.sampleTypeStore.listSampleType &&
                        SampleTypeStore.sampleTypeStore.listSampleType.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.sampleCode}>
                              {item.sampleCode}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="sampleCode"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Sample Type"
                    hasError={errors.sampleType}
                  >
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const sampleType = e.target.value as string
                        onChange(sampleType)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
                          sampleType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {SampleTypeStore.sampleTypeStore.listSampleType &&
                        SampleTypeStore.sampleTypeStore.listSampleType.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.sampleType}>
                              {item.sampleType}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="sampleType"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Sample Group"
                    hasError={errors.sampleGroup}
                  >
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const sampleGroup = e.target.value as string
                        onChange(sampleGroup)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
                          sampleGroup,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {SampleTypeStore.sampleTypeStore.listSampleType &&
                        SampleTypeStore.sampleTypeStore.listSampleType.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.sampleGroup}>
                              {item.sampleGroup}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="sampleGroup"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Coll Container Code"
                    hasError={errors.collContainerCode}
                  >
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const collContainerCode = e.target.value as string
                        onChange(collContainerCode)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
                          collContainerCode,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {SampleContainerStore.sampleContainerStore
                        .listSampleContainer &&
                        SampleContainerStore.sampleContainerStore.listSampleContainer.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.containerCode}>
                              {item.containerCode}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="collContainerCode"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Coll Container Name"
                    hasError={errors.collContainerName}
                  >
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const collContainerName = e.target.value as string
                        onChange(collContainerName)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
                          collContainerName,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {SampleContainerStore.sampleContainerStore
                        .listSampleContainer &&
                        SampleContainerStore.sampleContainerStore.listSampleContainer.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.containerName}>
                              {item.containerName}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="collContainerName"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Test Container Code"
                    hasError={errors.testContainerCode}
                  >
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const testContainerCode = e.target.value as string
                        onChange(testContainerCode)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
                          testContainerCode,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {SampleContainerStore.sampleContainerStore
                        .listSampleContainer &&
                        SampleContainerStore.sampleContainerStore.listSampleContainer.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.containerCode}>
                              {item.containerCode}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="testContainerCode"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Test Container Name"
                    hasError={errors.testContainerName}
                  >
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const testContainerName = e.target.value as string
                        onChange(testContainerName)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
                          testContainerName,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {SampleContainerStore.sampleContainerStore
                        .listSampleContainer &&
                        SampleContainerStore.sampleContainerStore.listSampleContainer.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.containerName}>
                              {item.containerName}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="testContainerName"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Min Draw Vol"
                    placeholder={
                      errors.minDrawVol ? "Please Enter minDrawVol" : "Min Draw Vol"
                    }
                    hasError={errors.minDrawVol}
                    value={
                      Stores.testSampleMappingStore.testSampleMapping?.minDrawVol
                    }
                    onChange={(minDrawVol) => {
                      onChange(minDrawVol)
                      Stores.testSampleMappingStore.updateSampleType({
                        ...Stores.testSampleMappingStore.testSampleMapping,
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
                        Stores.testSampleMappingStore.testSampleMapping
                          ?.primaryContainer
                      }
                      onChange={(primaryContainer) => {
                        onChange(primaryContainer)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
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
                        Stores.testSampleMappingStore.testSampleMapping
                          ?.uniqueContainer
                      }
                      onChange={(uniqueContainer) => {
                        onChange(uniqueContainer)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
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
                      value={
                        Stores.testSampleMappingStore.testSampleMapping?.centerIfuge
                      }
                      onChange={(centerIfuge) => {
                        onChange(centerIfuge)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
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
                      value={
                        Stores.testSampleMappingStore.testSampleMapping?.aliquot
                      }
                      onChange={(aliquot) => {
                        onChange(aliquot)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
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
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
                          minDrawVolUnit,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                    value={
                      Stores.testSampleMappingStore.testSampleMapping?.minTestVol
                    }
                    onChange={(minTestVol) => {
                      onChange(minTestVol)
                      Stores.testSampleMappingStore.updateSampleType({
                        ...Stores.testSampleMappingStore.testSampleMapping,
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
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
                          minTestVolUnit,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                    value={
                      Stores.testSampleMappingStore.testSampleMapping?.condition
                    }
                    onChange={(condition) => {
                      onChange(condition)
                      Stores.testSampleMappingStore.updateSampleType({
                        ...Stores.testSampleMappingStore.testSampleMapping,
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
                    value={
                      Stores.testSampleMappingStore.testSampleMapping
                        ?.repentionPeriod
                    }
                    onChange={(repentionPeriod) => {
                      onChange(repentionPeriod)
                      Stores.testSampleMappingStore.updateSampleType({
                        ...Stores.testSampleMappingStore.testSampleMapping,
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
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
                          repentionUnits,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                    value={
                      Stores.testSampleMappingStore.testSampleMapping?.labelInst
                    }
                    onChange={(labelInst) => {
                      onChange(labelInst)
                      Stores.testSampleMappingStore.updateSampleType({
                        ...Stores.testSampleMappingStore.testSampleMapping,
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
                    value={Stores.testSampleMappingStore.testSampleMapping?.info}
                    onChange={(info) => {
                      onChange(info)
                      Stores.testSampleMappingStore.updateSampleType({
                        ...Stores.testSampleMappingStore.testSampleMapping,
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
                      value={
                        Stores.testSampleMappingStore.testSampleMapping?.environment
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
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
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
                          environment,
                        })
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.testSampleMappingStore.testSampleMapping
                              ?.environment || `Select`}
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
              <LibraryComponents.Atoms.Grid cols={4}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Lab Specfic"
                      hasError={errors.labSpecfic}
                      value={
                        Stores.testSampleMappingStore.testSampleMapping?.labSpecfic
                      }
                      onChange={(labSpecfic) => {
                        onChange(labSpecfic)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
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
                        Stores.testSampleMappingStore.testSampleMapping
                          ?.departmentSpecfic
                      }
                      onChange={(departmentSpecfic) => {
                        onChange(departmentSpecfic)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
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
                      value={
                        Stores.testSampleMappingStore.testSampleMapping?.sharedSample
                      }
                      onChange={(sharedSample) => {
                        onChange(sharedSample)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
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
                      value={
                        Stores.testSampleMappingStore.testSampleMapping?.printLabels
                      }
                      onChange={(printLabels) => {
                        onChange(printLabels)
                        Stores.testSampleMappingStore.updateSampleType({
                          ...Stores.testSampleMappingStore.testSampleMapping,
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
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.TestSampleMappingList
            data={Stores.testSampleMappingStore.listTestSampleMapping || []}
            totalSize={Stores.testSampleMappingStore.listTestSampleMappingCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems,
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
            onPageSizeChange={(page, limit) => {
              Stores.testSampleMappingStore.fetchSampleTypeList(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.testSampleMappingStore.testSampleMappingService
                .deleteTestSampleMapping(modalConfirm.id)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Test sample mapping deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testSampleMappingStore.fetchSampleTypeList()
                  }
                })
            } else if (type === "Update") {
              Stores.testSampleMappingStore.testSampleMappingService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Test sample mapping updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testSampleMappingStore.fetchSampleTypeList()
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

export default TestSampleMapping
