/* eslint-disable */
import React, { useEffect, useState,useMemo } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"
import { useForm, Controller } from "react-hook-form"
import dayjs from "dayjs"
import {MasterAnalyteHoc} from "../hoc"
import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const MasterAnalyte = MasterAnalyteHoc(observer(() => {
  const { loginStore, masterAnalyteStore, labStore,routerStore,loading } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm()
  setValue("lab", loginStore.login.lab)
  setValue("environment", masterAnalyteStore.masterAnalyte?.environment)
  setValue("status", masterAnalyteStore.masterAnalyte?.status)
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  const onSubmitMasterAnalyte = () => {
    if (!masterAnalyteStore.checkExitsLabEnvCode) {
      if (
        !masterAnalyteStore.masterAnalyte?.existsVersionId &&
        !masterAnalyteStore.masterAnalyte?.existsRecordId
      ) {
        masterAnalyteStore.masterAnalyteService
          .addAnalyteMaster({
            input: {
              ...masterAnalyteStore.masterAnalyte,
              enteredBy: loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.createAnalyteMaster.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.createAnalyteMaster.message}`,
              })
            }
          })
      } else if (
        masterAnalyteStore.masterAnalyte?.existsVersionId &&
        !masterAnalyteStore.masterAnalyte?.existsRecordId
      ) {
        masterAnalyteStore.masterAnalyteService
          .versionUpgradeAnalyteMaster({
            input: {
              ...masterAnalyteStore.masterAnalyte,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.versionUpgradeAnalyteMaster.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.versionUpgradeAnalyteMaster.message}`,
              })
            }
          })
      } else if (
        !masterAnalyteStore.masterAnalyte?.existsVersionId &&
        masterAnalyteStore.masterAnalyte?.existsRecordId
      ) {
        masterAnalyteStore.masterAnalyteService
          .duplicateAnalyteMaster({
            input: {
              ...masterAnalyteStore.masterAnalyte,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.duplicateAnalyteMaster.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.duplicateAnalyteMaster.message}`,
              })
            }
          })
      }
      setTimeout(() => {
      // masterAnalyteStore.fetchAnalyteMaster()
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
      <FeatureComponents.Molecules.MasterAnalyteList
            data={masterAnalyteStore.listMasterAnalyte || []}
            totalSize={masterAnalyteStore.listMasterAnalyteCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
              listLabs: labStore.listLabs
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
              masterAnalyteStore.fetchAnalyteMaster(page, limit)
            }}
            onFilter={(type, filter, page, limit) => {
              masterAnalyteStore.masterAnalyteService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
    ),
      [masterAnalyteStore.listMasterAnalyte]
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
                            type: "filter",
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
                      masterAnalyteStore.updateMasterAnalyte({
                        ...masterAnalyteStore.masterAnalyte,
                        lab:item.code,
                      })
                      labStore.updateLabList(
                        labStore.listLabsCopy
                      )
                      if (!masterAnalyteStore.masterAnalyte?.existsVersionId) {
                        masterAnalyteStore.masterAnalyteService
                          .checkExitsLabEnvCode({
                            input: {
                              code: masterAnalyteStore.masterAnalyte?.analyteCode,
                              env: masterAnalyteStore.masterAnalyte?.environment,
                              lab:item.code,
                            },
                          })
                          .then((res) => {
                            if (res.checkAnalyteMasterExistsRecord.success) {
                              masterAnalyteStore.updateExistsLabEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkAnalyteMasterExistsRecord.message}`,
                              })
                            } else masterAnalyteStore.updateExistsLabEnvCode(false)
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
                    value={masterAnalyteStore.masterAnalyte?.analyteCode}
                    onChange={(analyteCode) => {
                      onChange(analyteCode)
                      masterAnalyteStore.updateMasterAnalyte({
                        ...masterAnalyteStore.masterAnalyte,
                        analyteCode: analyteCode.toUpperCase(),
                      })
                    }}
                    onBlur={(code) => {
                      if (!masterAnalyteStore.masterAnalyte?.existsVersionId) {
                        masterAnalyteStore.masterAnalyteService
                          .checkExitsLabEnvCode({
                            input: {
                              code,
                              env: masterAnalyteStore.masterAnalyte?.environment,
                              lab: masterAnalyteStore.masterAnalyte?.lab,
                            },
                          })
                          .then((res) => {
                            if (res.checkAnalyteMasterExistsRecord.success) {
                              masterAnalyteStore.updateExistsLabEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkAnalyteMasterExistsRecord.message}`,
                              })
                            } else masterAnalyteStore.updateExistsLabEnvCode(false)
                          })
                      }
                    }}
                  />
                )}
                name="analyteCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {masterAnalyteStore.checkExitsLabEnvCode && (
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
                    value={masterAnalyteStore.masterAnalyte?.analyteName}
                    onChange={(analyteName) => {
                      onChange(analyteName)
                      masterAnalyteStore.updateMasterAnalyte({
                        ...masterAnalyteStore.masterAnalyte,
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
                    value={masterAnalyteStore.masterAnalyte?.description}
                    onChange={(description) => {
                      onChange(description)
                      masterAnalyteStore.updateMasterAnalyte({
                        ...masterAnalyteStore.masterAnalyte,
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
                    value={masterAnalyteStore.masterAnalyte?.analyteMethod}
                    onChange={(analyteMethod) => {
                      onChange(analyteMethod)
                      masterAnalyteStore.updateMasterAnalyte({
                        ...masterAnalyteStore.masterAnalyte,
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
                    value={masterAnalyteStore.masterAnalyte?.shortName}
                    onChange={(shortName) => {
                      onChange(shortName)
                      masterAnalyteStore.updateMasterAnalyte({
                        ...masterAnalyteStore.masterAnalyte,
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
                    value={masterAnalyteStore.masterAnalyte?.price}
                    onChange={(price) => {
                      onChange(price)
                      masterAnalyteStore.updateMasterAnalyte({
                        ...masterAnalyteStore.masterAnalyte,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="High"
                    name="txtHigh"
                    placeholder={errors.high ? "Please Enter High" : "High"}
                    hasError={errors.high}
                    value={masterAnalyteStore.masterAnalyte?.high}
                    onChange={(high) => {
                      onChange(high)
                      masterAnalyteStore.updateMasterAnalyte({
                        ...masterAnalyteStore.masterAnalyte,
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
                    value={masterAnalyteStore.masterAnalyte?.low}
                    onChange={(low) => {
                      onChange(low)
                      masterAnalyteStore.updateMasterAnalyte({
                        ...masterAnalyteStore.masterAnalyte,
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
                      value={masterAnalyteStore.masterAnalyte?.method}
                      onChange={(method) => {
                        onChange(method)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
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
                      value={masterAnalyteStore.masterAnalyte?.bill}
                      onChange={(bill) => {
                        onChange(bill)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
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
                      value={masterAnalyteStore.masterAnalyte?.display}
                      onChange={(display) => {
                        onChange(display)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
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
                      value={masterAnalyteStore.masterAnalyte?.calculationFlag}
                      onChange={(calculationFlag) => {
                        onChange(calculationFlag)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
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
                      value={masterAnalyteStore.masterAnalyte?.resultType}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.resultType ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const resultType = e.target.value
                        onChange(resultType)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
                          resultType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
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
                      value={masterAnalyteStore.masterAnalyte?.analyteType}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.analyteType ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const analyteType = e.target.value
                        onChange(analyteType)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
                          analyteType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
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
                      value={masterAnalyteStore.masterAnalyte?.units}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.units ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const units = e.target.value as string
                        onChange(units)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
                          units,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
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
                      value={masterAnalyteStore.masterAnalyte?.usage}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.usage ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const usage = e.target.value
                        onChange(usage)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
                          usage,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
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
                      value={masterAnalyteStore.masterAnalyte?.picture}
                      name="optionPicture"
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.picture ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const picture = e.target.value as "0" | "1" | "2" | "3"
                        onChange(picture)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
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
                  .unix(masterAnalyteStore.masterAnalyte?.schedule || 0)
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  const formatDate = LibraryUtils.moment(schedule).format(
                    "YYYY-MM-DD HH:mm"
                  )
                  masterAnalyteStore.updateMasterAnalyte({
                    ...masterAnalyteStore.masterAnalyte,
                    schedule: LibraryUtils.moment(formatDate).unix(),
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Tube Groups"
                name="txtTubeGroups"
                placeholder="Tube Groups"
                value={masterAnalyteStore.masterAnalyte?.tubeGroups}
                onChange={(tubeGroups) => {
                  masterAnalyteStore.updateMasterAnalyte({
                    ...masterAnalyteStore.masterAnalyte,
                    tubeGroups,
                  })
                }}
              /> */}

              {/* <LibraryComponents.Atoms.Form.InputWrapper label="Workflow">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const workflow = e.target.value as string
                    masterAnalyteStore.updateMasterAnalyte({
                      ...masterAnalyteStore.masterAnalyte,
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
                    masterAnalyteStore.updateMasterAnalyte({
                      ...masterAnalyteStore.masterAnalyte,
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
                    value={masterAnalyteStore.masterAnalyte?.calcyName}
                    onChange={(calcyName) => {
                      onChange(calcyName)
                      masterAnalyteStore.updateMasterAnalyte({
                        ...masterAnalyteStore.masterAnalyte,
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
                    value={masterAnalyteStore.masterAnalyte?.cptCode}
                    onChange={(cptCode) => {
                      onChange(cptCode)
                      masterAnalyteStore.updateMasterAnalyte({
                        ...masterAnalyteStore.masterAnalyte,
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
                      value={masterAnalyteStore.masterAnalyte?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
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

              <LibraryComponents.Atoms.Grid cols={5}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="AutoRelease"
                      id="modeAutoRelease"
                      hasError={errors.autoRelease}
                      value={masterAnalyteStore.masterAnalyte?.autoRelease}
                      onChange={(autoRelease) => {
                        onChange(autoRelease)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
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
                      value={masterAnalyteStore.masterAnalyte?.holdOOS}
                      onChange={(holdOOS) => {
                        onChange(holdOOS)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
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
                      value={masterAnalyteStore.masterAnalyte?.instantResult}
                      onChange={(instantResult) => {
                        onChange(instantResult)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
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
                      value={masterAnalyteStore.masterAnalyte?.repetition}
                      onChange={(repetition) => {
                        onChange(repetition)
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                    label="Date Creation"
                    placeholder={
                      errors.dateCreation ? "Please Enter Date Creation" : "Date Creation"
                    }
                    hasError={errors.dateCreation}
                    value={
                      masterAnalyteStore.masterAnalyte?.dateCreation
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
                    placeholder={
                      errors.dateActive ? "Please Enter Date Active" : "Date Active"
                    }
                    hasError={errors.dateActive}
                    value={
                      masterAnalyteStore.masterAnalyte?.dateActive
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
                      errors.schedule ? "Please Enter schedule" : "Date Expire"
                    }
                    hasError={errors.schedule}
                    value={
                      masterAnalyteStore.masterAnalyte?.dateExpire
                    }
                    onChange={(dateExpire) => {
                      onChange(dateExpire)
                      masterAnalyteStore.updateMasterAnalyte({
                        ...masterAnalyteStore.masterAnalyte,
                        dateExpire
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
                    value={masterAnalyteStore.masterAnalyte?.version}
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
                      value={masterAnalyteStore.masterAnalyte?.environment}
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
                        masterAnalyteStore.updateMasterAnalyte({
                          ...masterAnalyteStore.masterAnalyte,
                          environment,
                        })
                        if (!masterAnalyteStore.masterAnalyte?.existsVersionId) {
                          masterAnalyteStore.masterAnalyteService
                            .checkExitsLabEnvCode({
                              input: {
                                code: masterAnalyteStore.masterAnalyte?.analyteCode,
                                env: environment,
                                lab: masterAnalyteStore.masterAnalyte?.lab,
                              },
                            })
                            .then((res) => {
                              if (res.checkAnalyteMasterExistsRecord.success) {
                                masterAnalyteStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkAnalyteMasterExistsRecord.message}`,
                                })
                              } else masterAnalyteStore.updateExistsLabEnvCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>
                        {loginStore.login &&
                        loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : masterAnalyteStore.masterAnalyte?.environment ||
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          {tableView}
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              masterAnalyteStore.masterAnalyteService
                .deleteAnalyteMaster({ input: { id: modalConfirm.id } })
                .then((res) => {
                  if (res.removeAnalyteMaster.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeAnalyteMaster.message}`,
                    })
                    setModalConfirm({ show: false })
                    masterAnalyteStore.fetchAnalyteMaster()
                  }
                })
            } else if (type === "Update") {
              masterAnalyteStore.masterAnalyteService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateAnalyteMaster.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateAnalyteMaster.message}`,
                    })
                    setModalConfirm({ show: false })
                    masterAnalyteStore.fetchAnalyteMaster()
                  }
                })
            } else if (type === "versionUpgrade") {
              masterAnalyteStore.updateMasterAnalyte({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: parseInt(modalConfirm.data.version + 1),
                dateActive: new Date(),
              })
              setValue("lab", modalConfirm.data.lab)
              setValue("analyteCode", modalConfirm.data.analyteCode)
              setValue("analyteName", modalConfirm.data.analyteName)
              setValue("environment", modalConfirm.data.environment)
              setValue("status", modalConfirm.data.status)
            } else if (type === "duplicate") {
              masterAnalyteStore.updateMasterAnalyte({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: (modalConfirm.data.version + 1),
                dateActive: new Date(),
              })
              setHideAddLab(!hideAddLab)
              setValue("lab", modalConfirm.data.lab)
              setValue("analyteCode", modalConfirm.data.analyteCode)
              setValue("analyteName", modalConfirm.data.analyteName)
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

export default MasterAnalyte
