/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"
import { useForm, Controller } from "react-hook-form"
import { useStores } from "@lp/library/stores"
import { Stores } from "../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { stores } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const MasterAnalyte = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm()
  const { loginStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)

  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.masterAnalyteStore.updateMasterAnalyte({
        ...Stores.masterAnalyteStore.masterAnalyte,
        lab: stores.loginStore.login.lab,
        environment: stores.loginStore.login.environment,
      })
      setValue("lab", stores.loginStore.login.lab)
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  const onSubmitMasterAnalyte = () => {
    if (!Stores.masterAnalyteStore.checkExitsLabEnvCode) {
      if (
        !Stores.masterAnalyteStore.masterAnalyte?.existsVersionId &&
        !Stores.masterAnalyteStore.masterAnalyte?.existsRecordId
      ) {
        Stores.masterAnalyteStore.masterAnalyteService
          .addAnalyteMaster({
            ...Stores.masterAnalyteStore.masterAnalyte,
            enteredBy: LoginStore.loginStore.login?._id,
          })
          .then(() => {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Analyte master created.`,
            })
          })
      } else if (
        Stores.masterAnalyteStore.masterAnalyte?.existsVersionId &&
        !Stores.masterAnalyteStore.masterAnalyte?.existsRecordId
      ) {
        Stores.masterAnalyteStore.masterAnalyteService
          .versionUpgradeAnalyteMaster({
            ...Stores.masterAnalyteStore.masterAnalyte,
            enteredBy: stores.loginStore.login.userId,
          })
          .then(() => {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Analyte master version upgrade.`,
            })
          })
      } else if (
        !Stores.masterAnalyteStore.masterAnalyte?.existsVersionId &&
        Stores.masterAnalyteStore.masterAnalyte?.existsRecordId
      ) {
        Stores.masterAnalyteStore.masterAnalyteService
          .duplicateAnalyteMaster({
            ...Stores.masterAnalyteStore.masterAnalyte,
            enteredBy: stores.loginStore.login.userId,
          })
          .then(() => {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Analyte master duplicate created.`,
            })
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
                      value={Stores.masterAnalyteStore.masterAnalyte?.lab}
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
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
                          lab,
                        })
                        if (
                          !Stores.masterAnalyteStore.masterAnalyte?.existsVersionId
                        ) {
                          Stores.masterAnalyteStore.masterAnalyteService
                            .checkExitsLabEnvCode(
                              Stores.masterAnalyteStore.masterAnalyte?.analyteCode ||
                                "",
                              Stores.masterAnalyteStore.masterAnalyte?.environment ||
                                "",
                              lab
                            )
                            .then((res) => {
                              if (res.success) {
                                Stores.masterAnalyteStore.updateExistsLabEnvCode(
                                  true
                                )
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.message}`,
                                })
                              } else
                                Stores.masterAnalyteStore.updateExistsLabEnvCode(
                                  false
                                )
                            })
                        }
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Analyte Code"
                    name="txtAnalyteCode"
                    hasError={errors.analyteCode}
                    placeholder={
                      errors.analyteCode
                        ? "Please Enter Analyte Code"
                        : "Analyte Code"
                    }
                    value={Stores.masterAnalyteStore.masterAnalyte?.analyteCode}
                    onChange={(analyteCode) => {
                      onChange(analyteCode)
                      Stores.masterAnalyteStore.updateMasterAnalyte({
                        ...Stores.masterAnalyteStore.masterAnalyte,
                        analyteCode: analyteCode.toUpperCase(),
                      })
                    }}
                    onBlur={(code) => {
                      if (
                        !Stores.masterAnalyteStore.masterAnalyte?.existsVersionId
                      ) {
                        Stores.masterAnalyteStore.masterAnalyteService
                          .checkExitsLabEnvCode(
                            code,
                            Stores.masterAnalyteStore.masterAnalyte?.environment ||
                              "",
                            Stores.masterAnalyteStore.masterAnalyte?.lab || ""
                          )
                          .then((res) => {
                            if (res.success) {
                              Stores.masterAnalyteStore.updateExistsLabEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.message}`,
                              })
                            } else
                              Stores.masterAnalyteStore.updateExistsLabEnvCode(false)
                          })
                      }
                    }}
                  />
                )}
                name="analyteCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {Stores.masterAnalyteStore.checkExitsLabEnvCode && (
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
                    placeholder="Analyte Name"
                    hasError={errors.analyteName}
                    value={Stores.masterAnalyteStore.masterAnalyte?.analyteName}
                    onChange={(analyteName) => {
                      onChange(analyteName)
                      Stores.masterAnalyteStore.updateMasterAnalyte({
                        ...Stores.masterAnalyteStore.masterAnalyte,
                        analyteName: analyteName.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="analyteName"
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
                      errors.description
                        ? "Please Enter Description "
                        : "Description"
                    }
                    hasError={errors.description}
                    value={Stores.masterAnalyteStore.masterAnalyte?.description}
                    onChange={(description) => {
                      onChange(description)
                      Stores.masterAnalyteStore.updateMasterAnalyte({
                        ...Stores.masterAnalyteStore.masterAnalyte,
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
                    label="Analyte Method"
                    name="txtAnalyteMethod"
                    placeholder={
                      errors.analyteMethod
                        ? "Please Enter Analyte Method"
                        : "Analyte Method"
                    }
                    hasError={errors.analyteMethod}
                    value={Stores.masterAnalyteStore.masterAnalyte?.analyteMethod}
                    onChange={(analyteMethod) => {
                      onChange(analyteMethod)
                      Stores.masterAnalyteStore.updateMasterAnalyte({
                        ...Stores.masterAnalyteStore.masterAnalyte,
                        analyteMethod,
                      })
                    }}
                  />
                )}
                name="analyteMethod"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Short Name"
                    name="txtShortName"
                    placeholder={
                      errors.shortName ? "Please Enter Short Name" : "Short Name"
                    }
                    hasError={errors.shortName}
                    value={Stores.masterAnalyteStore.masterAnalyte?.shortName}
                    onChange={(shortName) => {
                      onChange(shortName)
                      Stores.masterAnalyteStore.updateMasterAnalyte({
                        ...Stores.masterAnalyteStore.masterAnalyte,
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
                    name="txtPrice"
                    placeholder={errors.price ? "Please Enter Price" : "Price"}
                    type="number"
                    hasError={errors.price}
                    value={Stores.masterAnalyteStore.masterAnalyte?.price}
                    onChange={(price) => {
                      onChange(price)
                      Stores.masterAnalyteStore.updateMasterAnalyte({
                        ...Stores.masterAnalyteStore.masterAnalyte,
                        price,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="High"
                    name="txtHigh"
                    placeholder={errors.high ? "Please Enter High" : "High"}
                    hasError={errors.high}
                    value={Stores.masterAnalyteStore.masterAnalyte?.high}
                    onChange={(high) => {
                      onChange(high)
                      Stores.masterAnalyteStore.updateMasterAnalyte({
                        ...Stores.masterAnalyteStore.masterAnalyte,
                        high: high.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="high"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Low"
                    name="txtLow"
                    placeholder={errors.low ? "Please Enter low" : "Low"}
                    hasError={errors.low}
                    value={Stores.masterAnalyteStore.masterAnalyte?.low}
                    onChange={(low) => {
                      onChange(low)
                      Stores.masterAnalyteStore.updateMasterAnalyte({
                        ...Stores.masterAnalyteStore.masterAnalyte,
                        low: low.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="low"
                rules={{ required: false }}
                defaultValue=""
              />

              <LibraryComponents.Atoms.Grid cols={5}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Method"
                      id="modeMethod"
                      hasError={errors.method}
                      value={Stores.masterAnalyteStore.masterAnalyte?.method}
                      onChange={(method) => {
                        onChange(method)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
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
                      label="Bill"
                      id="modeBill"
                      hasError={errors.bill}
                      value={Stores.masterAnalyteStore.masterAnalyte?.bill}
                      onChange={(bill) => {
                        onChange(bill)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
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
                      label="Display"
                      id="modeDisplay"
                      hasError={errors.display}
                      value={Stores.masterAnalyteStore.masterAnalyte?.display}
                      onChange={(display) => {
                        onChange(display)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
                          display,
                        })
                      }}
                    />
                  )}
                  name="display"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Calculation Flag"
                      id="modeCalculationFlag"
                      hasError={errors.calculationFlag}
                      value={
                        Stores.masterAnalyteStore.masterAnalyte?.calculationFlag
                      }
                      onChange={(calculationFlag) => {
                        onChange(calculationFlag)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
                          calculationFlag,
                        })
                      }}
                    />
                  )}
                  name="calculationFlag"
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
                    label="Result Type"
                    hasError={errors.resultType}
                  >
                    <select
                      value={Stores.masterAnalyteStore.masterAnalyte?.resultType}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.resultType
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const resultType = e.target.value
                        onChange(resultType)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
                          resultType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "RESULT_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name=" resultType"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Analyte Type"
                    hasError={errors.analyteType}
                  >
                    <select
                      value={Stores.masterAnalyteStore.masterAnalyte?.analyteType}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.analyteType
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const analyteType = e.target.value
                        onChange(analyteType)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
                          analyteType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "ANALYTE_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="analyteType"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Units"
                    hasError={errors.units}
                  >
                    <select
                      value={Stores.masterAnalyteStore.masterAnalyte?.units}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.units
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const units = e.target.value as string
                        onChange(units)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
                          units,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "UNITS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="units"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Usage"
                    hasError={errors.usage}
                  >
                    <select
                      value={Stores.masterAnalyteStore.masterAnalyte?.usage}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.usage
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const usage = e.target.value
                        onChange(usage)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
                          usage,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "USAGE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="usage"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Picture"
                    id="optionPicture"
                    hasError={errors.picture}
                  >
                    <select
                      value={Stores.masterAnalyteStore.masterAnalyte?.picture}
                      name="optionPicture"
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.picture
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const picture = e.target.value as "0" | "1" | "2" | "3"
                        onChange(picture)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
                          picture,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {["0", "1", "2", "3"].map((item: any, index: number) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="picture"
                rules={{ required: false }}
                defaultValue=""
              />
              {/* <LibraryComponents.Atoms.Form.InputDate
                label="Schedule"
                name="txtSchedule"
                placeholder="Schedule"
                value={LibraryUtils.moment
                  .unix(Stores.masterAnalyteStore.masterAnalyte?.schedule || 0)
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  const formatDate = LibraryUtils.moment(schedule).format(
                    "YYYY-MM-DD HH:mm"
                  )
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    schedule: LibraryUtils.moment(formatDate).unix(),
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Tube Groups"
                name="txtTubeGroups"
                placeholder="Tube Groups"
                value={Stores.masterAnalyteStore.masterAnalyte?.tubeGroups}
                onChange={(tubeGroups) => {
                  Stores.masterAnalyteStore.updateMasterAnalyte({
                    ...Stores.masterAnalyteStore.masterAnalyte,
                    tubeGroups,
                  })
                }}
              /> */}

              {/* <LibraryComponents.Atoms.Form.InputWrapper label="Workflow">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const workflow = e.target.value as string
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      workflow,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "WORKFLOW"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper
                label="Sample Type"
                id="optionSampleType"
              >
                <select
                  name="optionSampleTypes"
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleType = e.target.value as string
                    Stores.masterAnalyteStore.updateMasterAnalyte({
                      ...Stores.masterAnalyteStore.masterAnalyte,
                      sampleType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["sampleType1"].map((item: any, index: number) => (
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
                    label="Calcy Name"
                    name="txtCalcyName"
                    placeholder={
                      errors.calcyName ? "Please Enter Calcy Name" : "Calcy Name"
                    }
                    hasError={errors.calcyName}
                    value={Stores.masterAnalyteStore.masterAnalyte?.calcyName}
                    onChange={(calcyName) => {
                      onChange(calcyName)
                      Stores.masterAnalyteStore.updateMasterAnalyte({
                        ...Stores.masterAnalyteStore.masterAnalyte,
                        calcyName: calcyName.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="calcyName"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="CPT Code"
                    name="txtCPTCode"
                    placeholder={
                      errors.cptCode ? "Please Enter CPT Code" : "CPT Code"
                    }
                    hasError={errors.cptCode}
                    value={Stores.masterAnalyteStore.masterAnalyte?.cptCode}
                    onChange={(cptCode) => {
                      onChange(cptCode)
                      Stores.masterAnalyteStore.updateMasterAnalyte({
                        ...Stores.masterAnalyteStore.masterAnalyte,
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
                    label="Status"
                    hasError={errors.status}
                  >
                    <select
                      value={Stores.masterAnalyteStore.masterAnalyte?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
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
                rules={{ required: false }}
                defaultValue=""
              />

              <LibraryComponents.Atoms.Grid cols={5}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="AutoRelease"
                      id="modeAutoRelease"
                      hasError={errors.autoRelease}
                      value={Stores.masterAnalyteStore.masterAnalyte?.autoRelease}
                      onChange={(autoRelease) => {
                        onChange(autoRelease)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
                          autoRelease,
                        })
                      }}
                    />
                  )}
                  name="autoRelease"
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
                      value={Stores.masterAnalyteStore.masterAnalyte?.holdOOS}
                      onChange={(holdOOS) => {
                        onChange(holdOOS)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
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
                      label="InstantResult"
                      id="modeInstantResult"
                      hasError={errors.instantResult}
                      value={Stores.masterAnalyteStore.masterAnalyte?.instantResult}
                      onChange={(instantResult) => {
                        onChange(instantResult)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
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
                      label="Repitation"
                      id="modeRepitation"
                      hasError={errors.repetition}
                      value={Stores.masterAnalyteStore.masterAnalyte?.repetition}
                      onChange={(repetition) => {
                        onChange(repetition)
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
                          repetition,
                        })
                      }}
                    />
                  )}
                  name="repetition"
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Entered By"
                    placeholder={
                      errors.keyNum ? "Please Enter Entered By" : "Entered By"
                    }
                    hasError={errors.keyNum}
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
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Creation"
                    placeholder={
                      errors.keyNum ? "Please Enter Date Creation" : "Date Creation"
                    }
                    hasError={errors.keyNum}
                    value={LibraryUtils.moment
                      .unix(
                        Stores.masterAnalyteStore.masterAnalyte?.dateCreation || 0
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
                      errors.keyNum ? "Please Enter Date Active" : "Date Active"
                    }
                    hasError={errors.keyNum}
                    value={LibraryUtils.moment
                      .unix(
                        Stores.masterAnalyteStore.masterAnalyte?.dateActiveFrom || 0
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
                    placeholder={
                      errors.schedule ? "Please Enter schedule" : "Date Expire"
                    }
                    hasError={errors.keyNum}
                    value={LibraryUtils.moment
                      .unix(
                        Stores.masterAnalyteStore.masterAnalyte?.dateActiveTo || 0
                      )
                      .format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const schedule = new Date(e.target.value)
                      Stores.masterAnalyteStore.updateMasterAnalyte({
                        ...Stores.masterAnalyteStore.masterAnalyte,
                        dateActiveTo: LibraryUtils.moment(schedule).unix(),
                      })
                    }}
                  />
                )}
                name="schedule"
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
                    value={Stores.masterAnalyteStore.masterAnalyte?.version}
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
                    value={Stores.masterAnalyteStore.masterAnalyte?.keyNum}
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Environment"
                    hasError={errors.environment}
                  >
                    <select
                      value={Stores.masterAnalyteStore.masterAnalyte?.environment}
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
                        Stores.masterAnalyteStore.updateMasterAnalyte({
                          ...Stores.masterAnalyteStore.masterAnalyte,
                          environment,
                        })
                        if (
                          !Stores.masterAnalyteStore.masterAnalyte?.existsVersionId
                        ) {
                          Stores.masterAnalyteStore.masterAnalyteService
                            .checkExitsLabEnvCode(
                              Stores.masterAnalyteStore.masterAnalyte?.analyteCode ||
                                "",
                              environment,
                              Stores.masterAnalyteStore.masterAnalyte?.lab || ""
                            )
                            .then((res) => {
                              if (res.success) {
                                Stores.masterAnalyteStore.updateExistsLabEnvCode(
                                  true
                                )
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.message}`,
                                })
                              } else
                                Stores.masterAnalyteStore.updateExistsLabEnvCode(
                                  false
                                )
                            })
                        }
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.masterAnalyteStore.masterAnalyte?.environment ||
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
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={handleSubmit(onSubmitMasterAnalyte)}
            >
              Save
            </LibraryComponents.Atoms.Buttons.Button>
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Atoms.Icon.Remove}
              onClick={() => {
                //rootStore.labStore.clear();
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.MasterAnalyteList
            data={Stores.masterAnalyteStore.listMasterAnalyte || []}
            totalSize={Stores.masterAnalyteStore.listMasterAnalyteCount}
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
            onPageSizeChange={(page, limit) => {
              Stores.masterAnalyteStore.fetchAnalyteMaster(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.masterAnalyteStore.masterAnalyteService
                .deleteAnalyteMaster(modalConfirm.id)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Analyte master deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.masterAnalyteStore.fetchAnalyteMaster()
                  }
                })
            } else if (type === "Update") {
              Stores.masterAnalyteStore.masterAnalyteService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Analyte master updated.`,
                    })
                    setModalConfirm({ show: false })
                    window.location.reload()
                  }
                })
            } else if (type === "versionUpgrade") {
              Stores.masterAnalyteStore.updateMasterAnalyte({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: modalConfirm.data.version + 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
              })  
              setValue("lab",modalConfirm.data.lab)
              setValue("analyteCode",modalConfirm.data.analyteCode)
              setValue("analyteName",modalConfirm.data.analyteName)
              setValue("environment",modalConfirm.data.environment)
              //clearErrors(["lab", "analyteCode", "analyteName", "environment"])
            } else if (type === "duplicate") {
              Stores.masterAnalyteStore.updateMasterAnalyte({
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

export default MasterAnalyte
