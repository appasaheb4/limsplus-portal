/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"

import { stores, useStores } from "@lp/stores"
import { Stores } from "../stores"
import { useForm, Controller } from "react-hook-form"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as AnalyteMaster } from "@lp/features/collection/masterAnalyte/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as CommunicationStore } from "@lp/features/communication/stores"

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
  const { loginStore, interfaceManagerStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)

  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.referenceRangesStore.updateReferenceRanges({
        ...Stores.referenceRangesStore.referenceRanges,
        lab: stores.loginStore.login.lab,
        environment: stores.loginStore.login.environment,
      })
      setValue("lab", stores.loginStore.login.lab)
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])
  const onSubmitReferenceRanges = () => {
    if (!Stores.referenceRangesStore.checkExitsRecord) {
      console.log({ store: Stores.referenceRangesStore.referenceRanges })

      if (
        !Stores.referenceRangesStore.referenceRanges?.existsVersionId &&
        !Stores.referenceRangesStore.referenceRanges?.existsRecordId
      ) {
        Stores.referenceRangesStore.referenceRangesService
          .addReferenceRanges({
            input: {
              ...Stores.referenceRangesStore.referenceRanges,
              enteredBy: stores.loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.addReferenceRanges.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.addReferenceRanges.message}`,
              })
            }
          })
      } else if (
        Stores.referenceRangesStore.referenceRanges?.existsVersionId &&
        !Stores.referenceRangesStore.referenceRanges?.existsRecordId
      ) {
        Stores.referenceRangesStore.referenceRangesService
          .versionUpgradeReferenceRanges({
            input: {
              ...Stores.referenceRangesStore.referenceRanges,
              enteredBy: stores.loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.versionUpgradeReferenceRanges.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.versionUpgradeReferenceRanges.message}`,
              })
            }
          })
      } else if (
        !Stores.referenceRangesStore.referenceRanges?.existsVersionId &&
        Stores.referenceRangesStore.referenceRanges?.existsRecordId
      ) {
        Stores.referenceRangesStore.referenceRangesService
          .duplicateReferenceRanges({
            input: {
              ...Stores.referenceRangesStore.referenceRanges,
              enteredBy: stores.loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.duplicateReferenceRanges.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.duplicateReferenceRanges.message}`,
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
          className={"p-2 rounded-lg shadow-xl " + (hideAddLab ? "shown" : "shown")}
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
                        Stores.referenceRangesStore.updateReferenceRanges({
                          ...Stores.referenceRangesStore.referenceRanges,
                          analyteCode: analyte.analyteCode,
                          analyteName: analyte.analyteName,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {AnalyteMaster.masterAnalyteStore.listMasterAnalyte &&
                        AnalyteMaster.masterAnalyteStore.listMasterAnalyte.map(
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Analyte Name"
                    name="txtAnalyteName"
                    hasError={errors.analyteName}
                    value={Stores.referenceRangesStore.referenceRanges?.analyteName}
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
                        Stores.referenceRangesStore.updateReferenceRanges({
                          ...Stores.referenceRangesStore.referenceRanges,
                          department,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {DepartmentStore.departmentStore.listDepartment.map(
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
                        Stores.referenceRangesStore.updateReferenceRanges({
                          ...Stores.referenceRangesStore.referenceRanges,
                          species,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                        Stores.referenceRangesStore.updateReferenceRanges({
                          ...Stores.referenceRangesStore.referenceRanges,
                          sex,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "SEX"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
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
                        Stores.referenceRangesStore.updateReferenceRanges({
                          ...Stores.referenceRangesStore.referenceRanges,
                          rangeSetOn,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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

              {interfaceManagerStore.listEncodeCharacter && (
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
                          Stores.referenceRangesStore.updateReferenceRanges({
                            ...Stores.referenceRangesStore.referenceRanges,
                            eqType,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {CommunicationStore.interfaceManagerStore
                          .listEncodeCharacter &&
                          CommunicationStore.interfaceManagerStore.listEncodeCharacter.map(
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
                      value={Stores.referenceRangesStore.referenceRanges?.lab}
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
                        Stores.referenceRangesStore.updateReferenceRanges({
                          ...Stores.referenceRangesStore.referenceRanges,
                          lab,
                        })
                        // if (
                        //   !Stores.priceListStore.priceList
                        //     ?.existsVersionId
                        // ) {
                        //   Stores.priceListStore.priceListService
                        //     .checkExitsLabEnvCode(
                        //       Stores.priceListStore.priceList
                        //         ?.price|| "",
                        //       Stores.priceListStore.priceList
                        //         ?.environment || "",
                        //       lab
                        //     )
                        //     .then((res) => {
                        //       if (res.success) {
                        //         Stores.priceListStore.updateExistsLabEnvCode(
                        //           true
                        //         )
                        //         LibraryComponents.Atoms.Toast.error({
                        //           message: `😔 ${res.message}`,
                        //         })
                        //       } else
                        //         Stores.priceListStore.updateExistsLabEnvCode(
                        //           false
                        //         )
                        //     })
                        // }
                      }}
                    >
                      <option selected>Select</option>
                      {LabStores.labStore.listLabs.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {item.name}
                          </option>
                        )
                      )}
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
                        Stores.referenceRangesStore.updateReferenceRanges({
                          ...Stores.referenceRangesStore.referenceRanges,
                          rangType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                    value={Stores.referenceRangesStore.referenceRanges?.age}
                    onChange={(age) => {
                      onChange(age)
                      Stores.referenceRangesStore.updateReferenceRanges({
                        ...Stores.referenceRangesStore.referenceRanges,
                        age: parseInt(age),
                      })
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
                        Stores.referenceRangesStore.updateReferenceRanges({
                          ...Stores.referenceRangesStore.referenceRanges,
                          ageUnit,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                    value={Stores.referenceRangesStore.referenceRanges?.low}
                    onChange={(low) => {
                      onChange(low)
                      Stores.referenceRangesStore.updateReferenceRanges({
                        ...Stores.referenceRangesStore.referenceRanges,
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
                    value={Stores.referenceRangesStore.referenceRanges?.high}
                    onChange={(high) => {
                      onChange(high)
                      Stores.referenceRangesStore.updateReferenceRanges({
                        ...Stores.referenceRangesStore.referenceRanges,
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
                    value={Stores.referenceRangesStore.referenceRanges?.alpha}
                    onChange={(alpha) => {
                      onChange(alpha)
                      Stores.referenceRangesStore.updateReferenceRanges({
                        ...Stores.referenceRangesStore.referenceRanges,
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
                    value={LoginStore.loginStore.login?.userId}
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
                      value={Stores.referenceRangesStore.referenceRanges?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        Stores.referenceRangesStore.updateReferenceRanges({
                          ...Stores.referenceRangesStore.referenceRanges,
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Environment"
                    hasError={errors.environment}
                  >
                    <select
                      value={
                        Stores.referenceRangesStore.referenceRanges?.environment
                      }
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
                        Stores.referenceRangesStore.updateReferenceRanges({
                          ...Stores.referenceRangesStore.referenceRanges,
                          environment,
                        })
                        // if (
                        //   !Stores.referenceRangesStore.referenceRanges
                        //     ?.existsVersionId
                        // ) {
                        //   Stores.referenceRangesStore.referenceRangesService
                        //     .checkExitsLabEnvCode(
                        //       Stores.referenceRangesStore.referenceRanges
                        //         ?.analyteCode || "",
                        //       environment,
                        //       Stores.referenceRangesStore.referenceRanges?.lab || ""
                        //     )
                        //     .then((res) => {
                        //       if (res.success) {
                        //         Stores.referenceRangesStore.updateExistsLabEnvCode(
                        //           true
                        //         )
                        //         LibraryComponents.Atoms.Toast.error({
                        //           message: `😔 ${res.message}`,
                        //         })
                        //       } else
                        //         Stores.referenceRangesStore.updateExistsLabEnvCode(
                        //           false
                        //         )
                        //     })
                        // }
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.referenceRangesStore.referenceRanges
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
                    value={LibraryUtils.moment
                      .unix(
                        Stores.referenceRangesStore.referenceRanges?.dateCreation ||
                          0
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
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Active"
                    placeholder={
                      errors.dateActive ? "Please Enter Date Active" : "Date Active"
                    }
                    hasError={errors.dateActive}
                    value={LibraryUtils.moment
                      .unix(
                        Stores.referenceRangesStore.referenceRanges?.dateActive || 0
                      )
                      .format("YYYY-MM-DD")}
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
                    value={LibraryUtils.moment
                      .unix(
                        Stores.referenceRangesStore.referenceRanges?.dateActive || 0
                      )
                      .format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const dateExpiry = new Date(e.target.value)
                      Stores.referenceRangesStore.updateReferenceRanges({
                        ...Stores.referenceRangesStore.referenceRanges,
                        dateActive: LibraryUtils.moment(dateExpiry).unix(),
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
                    value={Stores.referenceRangesStore.referenceRanges?.version}
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
                    placeholder={errors.keyNum ? "Please Enter Key Num" : "Key Num"}
                    hasError={errors.keyNum}
                    value={Stores.referenceRangesStore.referenceRanges?.keyNum}
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
                  <LibraryComponents.Atoms.Form.Input
                    label="DeltaRang TetType"
                    placeholder={
                      errors.deltarang_tetype
                        ? "Please Enter DeltaRang TetType"
                        : "DeltaRang TetType"
                    }
                    hasError={errors.deltarang_tetype}
                    value={
                      Stores.referenceRangesStore.referenceRanges?.deltarang_tetype
                    }
                    onChange={(deltarang_tetype) => {
                      onChange(deltarang_tetype)
                      Stores.referenceRangesStore.updateReferenceRanges({
                        ...Stores.referenceRangesStore.referenceRanges,
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
                    value={
                      Stores.referenceRangesStore.referenceRanges?.deltaInterval
                    }
                    onChange={(deltaInterval) => {
                      onChange(deltaInterval)
                      Stores.referenceRangesStore.updateReferenceRanges({
                        ...Stores.referenceRangesStore.referenceRanges,
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
                        Stores.referenceRangesStore.updateReferenceRanges({
                          ...Stores.referenceRangesStore.referenceRanges,
                          intervalUnit,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                    value={
                      Stores.referenceRangesStore.referenceRanges?.formatResultScript
                    }
                    onChange={(formatResultScript) => {
                      onChange(formatResultScript)
                      Stores.referenceRangesStore.updateReferenceRanges({
                        ...Stores.referenceRangesStore.referenceRanges,
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
                    value={
                      Stores.referenceRangesStore.referenceRanges?.reportDefault
                    }
                    onChange={(reportDefault) => {
                      onChange(reportDefault)
                      Stores.referenceRangesStore.updateReferenceRanges({
                        ...Stores.referenceRangesStore.referenceRanges,
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
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.ReferenceRanges
            data={Stores.referenceRangesStore.listReferenceRanges || []}
            totalSize={Stores.referenceRangesStore.listReferenceRangesCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems,
              listMasterAnalyte: AnalyteMaster.masterAnalyteStore.listMasterAnalyte,
              listDepartment: DepartmentStore.departmentStore.listDepartment,
              listLabs: LabStores.labStore.listLabs,
            }}
            isDelete={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
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
            // onPageSizeChange={() => {
            //   Stores.priceListStore.fetchListPriceList()
            // }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "delete") {
              Stores.referenceRangesStore.referenceRangesService
                .deleteReferenceRanges({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.deleteReferenceRanges.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.deleteReferenceRanges.message}`,
                    })
                    setModalConfirm({ show: false })
                    //Stores.referenceRangesStore.fetchListReferenceRanges()
                    setTimeout(() => {
                      window.location.reload()
                    }, 2000)
                  }
                })
            } else if (type === "update") {
              Stores.referenceRangesStore.referenceRangesService
                .updateSingleFiled({
                  input: {
                    ...modalConfirm.data,
                    value: JSON.stringify(modalConfirm.data.value),
                  },
                })
                .then((res: any) => {
                  if (res.updateSingleFiledReferenceRanges.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateSingleFiledReferenceRanges.message}`,
                    })
                    setModalConfirm({ show: false })
                    window.location.reload()
                  }
                })
            } else if (type === "versionUpgrade") {
              Stores.referenceRangesStore.updateReferenceRanges({
                ...modalConfirm.data,
                _id: undefined,
                __typename: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: modalConfirm.data.version + 1,
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
              Stores.referenceRangesStore.updateReferenceRanges({
                ...modalConfirm.data,
                _id: undefined,
                __typename: undefined,
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
