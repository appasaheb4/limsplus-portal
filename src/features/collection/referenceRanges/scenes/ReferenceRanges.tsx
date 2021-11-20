/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import dayjs from "dayjs"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const ReferenceRanges = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm()
  const {
    loginStore,
    interfaceManagerStore,
    labStore,
    masterAnalyteStore,
    departmentStore,
    refernceRangesStore,
    routerStore,
  } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
   
  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      refernceRangesStore.updateReferenceRanges({
        ...refernceRangesStore.referenceRanges,
        lab: loginStore.login.lab,
        environment: loginStore.login.environment,
      })
      setValue("lab", loginStore.login.lab)
      setValue("environment", loginStore.login.environment)
    }
  }, [loginStore.login])

  useEffect(()=>{
    const status = routerStore.lookupItems
    .find((fileds) => {
      return fileds.fieldName === "STATUS"
    })
    ?.arrValue?.find((statusItem) => statusItem.code === "A")
  if (status) {
    refernceRangesStore && refernceRangesStore.updateReferenceRanges({
        ...refernceRangesStore.referenceRanges,
        status: status.code as string,
      })
    setValue("status", status.code as string)
  }
  const environment = routerStore.lookupItems.find((fileds)=>{
    return fileds.fieldName === 'ENVIRONMENT'
  })?. arrValue?.find((environmentItem)=>environmentItem.code === 'P')
  if(environment){
    refernceRangesStore && refernceRangesStore.updateReferenceRanges({
      ...refernceRangesStore.referenceRanges,
      environment: environment.code as string
    })
    setValue("environment",environment.code as string)
  }
  },[routerStore.lookupItems])


  const onSubmitReferenceRanges = () => {
    if (!refernceRangesStore.checkExitsRecord) {
      if (
        !refernceRangesStore.referenceRanges?.existsVersionId &&
        !refernceRangesStore.referenceRanges?.existsRecordId
      ) {
        refernceRangesStore.referenceRangesService
          .addReferenceRanges({
            input: {
              ...refernceRangesStore.referenceRanges,
              enteredBy: loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.createReferenceRange.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.createReferenceRange.message}`,
              })
            }
          })
      } else if (
        refernceRangesStore.referenceRanges?.existsVersionId &&
        !refernceRangesStore.referenceRanges?.existsRecordId
      ) {
        refernceRangesStore.referenceRangesService
          .versionUpgradeReferenceRanges({
            input: {
              ...refernceRangesStore.referenceRanges,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.versionUpgradeReferenceRange.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.versionUpgradeReferenceRange.message}`,
              })
            }
          })
      } else if (
        !refernceRangesStore.referenceRanges?.existsVersionId &&
        refernceRangesStore.referenceRanges?.existsRecordId
      ) {
        refernceRangesStore.referenceRangesService
          .duplicateReferenceRanges({
            input: {
              ...refernceRangesStore.referenceRanges,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.duplicateReferenceRange.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.duplicateReferenceRange.message}`,
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
          <LibraryComponents.Atoms.Grid cols={3}>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
            >
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Analyte Code"
                    hasError={errors.analyteCode}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.analyteCode ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const analyte = JSON.parse(e.target.value) as any
                        onChange(analyte.analyteCode)
                        setValue("analyteName", analyte.analyteName)
                        clearErrors("analyteName")
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          analyteCode: analyte.analyteCode,
                          analyteName: analyte.analyteName,
                        })
                        if (!refernceRangesStore.referenceRanges?.existsVersionId) {
                          refernceRangesStore.referenceRangesService
                            .checkExitsRecord({
                              input: {
                                analyteCode: analyte.analyteCode,
                                species: refernceRangesStore.referenceRanges.species,
                                rangeSetOn:
                                  refernceRangesStore.referenceRanges.rangeSetOn,
                                lab: refernceRangesStore.referenceRanges.lab,
                                age: refernceRangesStore.referenceRanges.age,
                                ageUnit: refernceRangesStore.referenceRanges.ageUnit,
                                rangType:
                                  refernceRangesStore.referenceRanges.rangType,
                                env: refernceRangesStore.referenceRanges.environment,
                              },
                            })
                            .then((res) => {
                              if (res.checkReferenceRangeExistsRecord.success) {
                                refernceRangesStore.updateExistsRecord(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkReferenceRangeExistsRecord.message}`,
                                })
                              } else refernceRangesStore.updateExistsRecord(false)
                            })
                        }
                      }}
                    >
                      <option selected>Select</option>
                      {masterAnalyteStore.listMasterAnalyte &&
                        masterAnalyteStore.listMasterAnalyte.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.analyteName} - ${item.analyteCode}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="analyteCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {refernceRangesStore.checkExitsRecord && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Analyte Name"
                    name="txtAnalyteName"
                    hasError={errors.analyteName}
                    value={refernceRangesStore.referenceRanges?.analyteName}
                    placeholder={
                      errors.analyteName
                        ? "Please Enter Analyte Name"
                        : "AnalyteName"
                    }
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.analyteName ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    disabled={true}
                  />
                )}
                name="analyteName"
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
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.department ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const department = e.target.value as string
                        onChange(department)
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          department,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {departmentStore.listDepartment.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {`${item.code} - ${item.name}`}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="department"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Species"
                    hasError={errors.species}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.species ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const species = e.target.value as string
                        onChange(species)
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          species,
                        })
                        if (!refernceRangesStore.referenceRanges?.existsVersionId) {
                          refernceRangesStore.referenceRangesService
                            .checkExitsRecord({
                              input: {
                                analyteCode:
                                  refernceRangesStore.referenceRanges.analyteCode,
                                species,
                                rangeSetOn:
                                  refernceRangesStore.referenceRanges.rangeSetOn,
                                lab: refernceRangesStore.referenceRanges.lab,
                                age: refernceRangesStore.referenceRanges.age,
                                ageUnit: refernceRangesStore.referenceRanges.ageUnit,
                                rangType:
                                  refernceRangesStore.referenceRanges.rangType,
                                env: refernceRangesStore.referenceRanges.environment,
                              },
                            })
                            .then((res) => {
                              if (res.checkReferenceRangeExistsRecord.success) {
                                refernceRangesStore.updateExistsRecord(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkReferenceRangeExistsRecord.message}`,
                                })
                              } else refernceRangesStore.updateExistsRecord(false)
                            })
                        }
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "SPECIES"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="species"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Sex"
                    hasError={errors.sex}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.sex ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const sex = e.target.value as string
                        onChange(sex)
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          sex,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(routerStore.lookupItems, "SEX").map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {`${item.value} - ${item.code}`}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="sex"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Range Set On"
                    hasError={errors.rangeSetOn}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.rangeSetOn ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const rangeSetOn = e.target.value as string
                        onChange(rangeSetOn)
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          rangeSetOn,
                        })
                        if (!refernceRangesStore.referenceRanges?.existsVersionId) {
                          refernceRangesStore.referenceRangesService
                            .checkExitsRecord({
                              input: {
                                analyteCode:
                                  refernceRangesStore.referenceRanges.analyteCode,
                                species: refernceRangesStore.referenceRanges.species,
                                rangeSetOn,
                                lab: refernceRangesStore.referenceRanges.lab,
                                age: refernceRangesStore.referenceRanges.age,
                                ageUnit: refernceRangesStore.referenceRanges.ageUnit,
                                rangType:
                                  refernceRangesStore.referenceRanges.rangType,
                                env: refernceRangesStore.referenceRanges.environment,
                              },
                            })
                            .then((res) => {
                              if (res.checkReferenceRangeExistsRecord.success) {
                                refernceRangesStore.updateExistsRecord(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkReferenceRangeExistsRecord.message}`,
                                })
                              } else refernceRangesStore.updateExistsRecord(false)
                            })
                        }
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "RANGE_SET_ON"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="rangeSetOn"
                rules={{ required: true }}
                defaultValue=""
              />

              {interfaceManagerStore.listInterfaceManager && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Equipment Type"
                      hasError={errors.eqType}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.eqType ? "border-red-500" : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const eqType = e.target.value as string
                          onChange(eqType)
                          refernceRangesStore.updateReferenceRanges({
                            ...refernceRangesStore.referenceRanges,
                            eqType,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {interfaceManagerStore.listInterfaceManager &&
                          interfaceManagerStore.listInterfaceManager.map(
                            (item: any, index: number) => (
                              <option key={index} value={item.instrumentType}>
                                {`${item.instrumentType}`}
                              </option>
                            )
                          )}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="eqType"
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Lab"
                    hasError={errors.lab}
                  >
                    <select
                      value={refernceRangesStore.referenceRanges?.lab}
                      disabled={
                        loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.lab ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const lab = e.target.value as string
                        onChange(lab)
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          lab,
                        })
                        if (!refernceRangesStore.referenceRanges?.existsVersionId) {
                          refernceRangesStore.referenceRangesService
                            .checkExitsRecord({
                              input: {
                                analyteCode:
                                  refernceRangesStore.referenceRanges.analyteCode,
                                species: refernceRangesStore.referenceRanges.species,
                                rangeSetOn:
                                  refernceRangesStore.referenceRanges.rangeSetOn,
                                lab,
                                age: refernceRangesStore.referenceRanges.age,
                                ageUnit: refernceRangesStore.referenceRanges.ageUnit,
                                rangType:
                                  refernceRangesStore.referenceRanges.rangType,
                                env: refernceRangesStore.referenceRanges.environment,
                              },
                            })
                            .then((res) => {
                              if (res.checkReferenceRangeExistsRecord.success) {
                                refernceRangesStore.updateExistsRecord(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkReferenceRangeExistsRecord.message}`,
                                })
                              } else refernceRangesStore.updateExistsRecord(false)
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
                    label="Rang Type"
                    hasError={errors.rangType}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.rangType ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const rangType = e.target.value as string
                        onChange(rangType)
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          rangType,
                        })
                        if (!refernceRangesStore.referenceRanges?.existsVersionId) {
                          refernceRangesStore.referenceRangesService
                            .checkExitsRecord({
                              input: {
                                analyteCode:
                                  refernceRangesStore.referenceRanges.analyteCode,
                                species: refernceRangesStore.referenceRanges.species,
                                rangeSetOn:
                                  refernceRangesStore.referenceRanges.rangeSetOn,
                                lab: refernceRangesStore.referenceRanges.lab,
                                age: refernceRangesStore.referenceRanges.age,
                                ageUnit: refernceRangesStore.referenceRanges.ageUnit,
                                rangType,
                                env: refernceRangesStore.referenceRanges.environment,
                              },
                            })
                            .then((res) => {
                              if (res.checkReferenceRangeExistsRecord.success) {
                                refernceRangesStore.updateExistsRecord(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkReferenceRangeExistsRecord.message}`,
                                })
                              } else refernceRangesStore.updateExistsRecord(false)
                            })
                        }
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "RANG_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="rangType"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Age"
                    name="txtAge"
                    placeholder={errors.age ? "Please Enter Age" : "Age"}
                    type="number"
                    hasError={errors.age}
                    value={refernceRangesStore.referenceRanges?.age}
                    onChange={(age) => {
                      onChange(age)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        age: parseInt(age),
                      })
                    }}
                    onBlur={(age) => {
                      if (!refernceRangesStore.referenceRanges?.existsVersionId) {
                        refernceRangesStore.referenceRangesService
                          .checkExitsRecord({
                            input: {
                              analyteCode:
                                refernceRangesStore.referenceRanges.analyteCode,
                              species: refernceRangesStore.referenceRanges.species,
                              rangeSetOn:
                                refernceRangesStore.referenceRanges.rangeSetOn,
                              lab: refernceRangesStore.referenceRanges.lab,
                              age: parseInt(age),
                              ageUnit: refernceRangesStore.referenceRanges.ageUnit,
                              rangType: refernceRangesStore.referenceRanges.rangType,
                              env: refernceRangesStore.referenceRanges.environment,
                            },
                          })
                          .then((res) => {
                            if (res.checkReferenceRangeExistsRecord.success) {
                              refernceRangesStore.updateExistsRecord(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkReferenceRangeExistsRecord.message}`,
                              })
                            } else refernceRangesStore.updateExistsRecord(false)
                          })
                      }
                    }}
                  />
                )}
                name="age"
                rules={{ required: true }}
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Age Unit"
                    hasError={errors.ageUnit}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.ageUnit ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const ageUnit = e.target.value as string
                        onChange(ageUnit)
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          ageUnit,
                        })
                        if (!refernceRangesStore.referenceRanges?.existsVersionId) {
                          refernceRangesStore.referenceRangesService
                            .checkExitsRecord({
                              input: {
                                analyteCode:
                                  refernceRangesStore.referenceRanges.analyteCode,
                                species: refernceRangesStore.referenceRanges.species,
                                rangeSetOn:
                                  refernceRangesStore.referenceRanges.rangeSetOn,
                                lab: refernceRangesStore.referenceRanges.lab,
                                age: refernceRangesStore.referenceRanges.age,
                                ageUnit,
                                rangType:
                                  refernceRangesStore.referenceRanges.rangType,
                                env: refernceRangesStore.referenceRanges.environment,
                              },
                            })
                            .then((res) => {
                              if (res.checkReferenceRangeExistsRecord.success) {
                                refernceRangesStore.updateExistsRecord(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkReferenceRangeExistsRecord.message}`,
                                })
                              } else refernceRangesStore.updateExistsRecord(false)
                            })
                        }
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "AGE_UNIT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="ageUnit"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Low"
                    name="txtLow"
                    placeholder={errors.low ? "Please Enter Low" : "Low"}
                    type="number"
                    hasError={errors.low}
                    value={refernceRangesStore.referenceRanges?.low}
                    onChange={(low) => {
                      onChange(low)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        low,
                      })
                    }}
                  />
                )}
                name="low"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="High"
                    name="txtHigh"
                    placeholder={errors.high ? "Please Enter High" : "High"}
                    type="number"
                    hasError={errors.high}
                    value={refernceRangesStore.referenceRanges?.high}
                    onChange={(high) => {
                      onChange(high)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        high,
                      })
                    }}
                  />
                )}
                name="high"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Alpha"
                    name="txtAlpha"
                    placeholder={errors.aplha ? "Please Enter Alpha" : "Alpha"}
                    hasError={errors.alpha}
                    value={refernceRangesStore.referenceRanges?.alpha}
                    onChange={(alpha) => {
                      onChange(alpha)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        alpha,
                      })
                    }}
                  />
                )}
                name="alpha"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Entered By"
                    placeholder={
                      errors.userId ? "Please Enter Entered By" : "Entered By"
                    }
                    hasError={errors.userId}
                    value={loginStore.login?.userId}
                    disabled={true}
                  />
                )}
                name="userId"
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
                      value={refernceRangesStore.referenceRanges?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          status,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Environment"
                    hasError={errors.environment}
                  >
                    <select
                      value={refernceRangesStore.referenceRanges?.environment}
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
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          environment,
                        })
                        if (!refernceRangesStore.referenceRanges?.existsVersionId) {
                          refernceRangesStore.referenceRangesService
                            .checkExitsRecord({
                              input: {
                                analyteCode:
                                  refernceRangesStore.referenceRanges.analyteCode,
                                species: refernceRangesStore.referenceRanges.species,
                                rangeSetOn:
                                  refernceRangesStore.referenceRanges.rangeSetOn,
                                lab: refernceRangesStore.referenceRanges.lab,
                                age: refernceRangesStore.referenceRanges.age,
                                ageUnit: refernceRangesStore.referenceRanges.ageUnit,
                                rangType:
                                  refernceRangesStore.referenceRanges.rangType,
                                env: environment,
                              },
                            })
                            .then((res) => {
                              if (res.checkReferenceRangeExistsRecord.success) {
                                refernceRangesStore.updateExistsRecord(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkReferenceRangeExistsRecord.message}`,
                                })
                              } else refernceRangesStore.updateExistsRecord(false)
                            })
                        }
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : refernceRangesStore.referenceRanges?.environment ||
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Creation"
                    placeholder={
                      errors.dateCreation
                        ? "Please Enter Date Creation"
                        : "Date Creation"
                    }
                    hasError={errors.dateCreation}
                    value={dayjs(
                      refernceRangesStore.referenceRanges?.dateCreation
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
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Active"
                    placeholder={
                      errors.dateActive ? "Please Enter Date Active" : "Date Active"
                    }
                    hasError={errors.dateActive}
                    value={dayjs(
                      refernceRangesStore.referenceRanges?.dateActive
                    ).format("YYYY-MM-DD")}
                    disabled={true}
                  />
                )}
                name="dateActive"
                rules={{ required: false }}
                defaultValue=""
              />
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              fill
              space={4}
              justify="stretch"
            >
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Expire"
                    placeholder={
                      errors.schedule ? "Please Enter schedule" : "Date Expire"
                    }
                    hasError={errors.dateExpiry}
                    value={dayjs(
                      refernceRangesStore.referenceRanges?.dateExpire
                    ).format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const dateExpire = new Date(e.target.value)
                      onChange(dateExpire)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        dateExpire,
                      })
                    }}
                  />
                )}
                name="dateExpiry"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Version"
                    placeholder={errors.version ? "Please Enter Version" : "Version"}
                    hasError={errors.version}
                    value={refernceRangesStore.referenceRanges?.version}
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
                    label="DeltaRang TetType"
                    placeholder={
                      errors.deltarang_tetype
                        ? "Please Enter DeltaRang TetType"
                        : "DeltaRang TetType"
                    }
                    hasError={errors.deltarang_tetype}
                    value={refernceRangesStore.referenceRanges?.deltarang_tetype}
                    onChange={(deltarang_tetype) => {
                      onChange(deltarang_tetype)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        deltarang_tetype,
                      })
                    }}
                  />
                )}
                name="deltarang_tetype"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Delta Interval"
                    placeholder={
                      errors.deltaInterval
                        ? "Please Enter Delta Interval"
                        : "Delta Interval"
                    }
                    hasError={errors.deltaInterval}
                    value={refernceRangesStore.referenceRanges?.deltaInterval}
                    onChange={(deltaInterval) => {
                      onChange(deltaInterval)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        deltaInterval,
                      })
                    }}
                  />
                )}
                name="deltaInterval"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Interval Unit"
                    hasError={errors.intervalUnit}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.intervalUnit ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const intervalUnit = e.target.value as string
                        onChange(intervalUnit)
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          intervalUnit,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "INTERVAL_UNIT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="intervalUnit"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Format Result Script"
                    name="txtFormatResultScript"
                    placeholder={
                      errors.formalResultScript
                        ? "Please Enter Format Result Script "
                        : "Format Result Script"
                    }
                    hasError={errors.formalResultScript}
                    value={refernceRangesStore.referenceRanges?.formatResultScript}
                    onChange={(formatResultScript) => {
                      onChange(formatResultScript)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        formatResultScript,
                      })
                    }}
                  />
                )}
                name="formalResultScript"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Report Default"
                    name="txtReportDefault"
                    placeholder={
                      errors.reportDefault
                        ? "Please Enter Report Default"
                        : "Report Default"
                    }
                    hasError={errors.reportDefault}
                    value={refernceRangesStore.referenceRanges?.reportDefault}
                    onChange={(reportDefault) => {
                      onChange(reportDefault)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        reportDefault,
                      })
                    }}
                  />
                )}
                name="reportDefault"
                rules={{ required: true }}
                defaultValue=""
              />
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={handleSubmit(onSubmitReferenceRanges)}
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
          <FeatureComponents.Molecules.ReferenceRanges
            data={refernceRangesStore.listReferenceRanges || []}
            totalSize={refernceRangesStore.listReferenceRangesCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
              listMasterAnalyte: masterAnalyteStore.listMasterAnalyte,
              listDepartment: departmentStore.listDepartment,
              listLabs: labStore.listLabs,
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
                type: "delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected items!`,
              })
            }}
            onUpdateItem={(value: any, dataField: string, id: string) => {
              setModalConfirm({
                show: true,
                type: "update",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update item!`,
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
            onPageSizeChange={(page,limit) => {
              refernceRangesStore.fetchListReferenceRanges(page,limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "delete") {
              refernceRangesStore.referenceRangesService
                .deleteReferenceRanges({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeReferenceRange.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeReferenceRange.message}`,
                    })
                    setModalConfirm({ show: false })
                    refernceRangesStore.fetchListReferenceRanges()
                  }
                })
            } else if (type === "update") {
              refernceRangesStore.referenceRangesService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateReferenceRange.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateReferenceRange.message}`,
                    })
                    setModalConfirm({ show: false })
                    refernceRangesStore.fetchListReferenceRanges()
                  }
                })
            } else if (type === "versionUpgrade") {
              refernceRangesStore.updateReferenceRanges({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: parseInt(modalConfirm.data.version + 1),
              })
              setValue("analyteCode", modalConfirm.data.analyteCode)
              setValue("analyteName", modalConfirm.data.analyteName)
              setValue("department", modalConfirm.data.department)
              setValue("species", modalConfirm.data.species)
              setValue("sex", modalConfirm.data.sex)
              setValue("rangeSetOn", modalConfirm.data.rangeSetOn)
              setValue("lab", modalConfirm.data.lab)
              setValue("rangType", modalConfirm.data.rangType)
              setValue("age", modalConfirm.data.age)
              setValue("low", modalConfirm.data.low)
              setValue("high", modalConfirm.data.high)
              setValue("alpha", modalConfirm.data.alpha)
              setValue("status", modalConfirm.data.status)
              setValue("environment", modalConfirm.data.environment)
              setValue("deltarang_tetype", modalConfirm.data.deltarang_tetype)
              setValue("deltaInterval", modalConfirm.data.deltaInterval)
              setValue("formalResultScript", modalConfirm.data.formatResultScript)
              setValue("reportDefault", modalConfirm.data.reportDefault)
            } else if (type === "duplicate") {
              refernceRangesStore.updateReferenceRanges({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
              })
              setValue("analyteCode", modalConfirm.data.analyteCode)
              setValue("analyteName", modalConfirm.data.analyteName)
              setValue("department", modalConfirm.data.department)
              setValue("species", modalConfirm.data.species)
              setValue("sex", modalConfirm.data.sex)
              setValue("rangeSetOn", modalConfirm.data.rangeSetOn)
              setValue("lab", modalConfirm.data.lab)
              setValue("rangType", modalConfirm.data.rangType)
              setValue("age", modalConfirm.data.age)
              setValue("low", modalConfirm.data.low)
              setValue("high", modalConfirm.data.high)
              setValue("alpha", modalConfirm.data.alpha)
              setValue("status", modalConfirm.data.status)
              setValue("environment", modalConfirm.data.environment)
              setValue("deltarang_tetype", modalConfirm.data.deltarang_tetype)
              setValue("deltaInterval", modalConfirm.data.deltaInterval)
              setValue("formalResultScript", modalConfirm.data.formatResultScript)
              setValue("reportDefault", modalConfirm.data.reportDefault)
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
export default ReferenceRanges
