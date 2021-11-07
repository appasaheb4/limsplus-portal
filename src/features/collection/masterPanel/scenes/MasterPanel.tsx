/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import daysjs from "dayjs"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"
import { useForm, Controller } from "react-hook-form"

import { useStores, stores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const MasterPanel = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const {
    loginStore,
    departmentStore,
    labStore,
    masterPanelStore,
    methodsStore,
  } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      masterPanelStore.updateMasterPanel({
        ...masterPanelStore.masterPanel,
        rLab: stores.loginStore.login.lab,
        pLab: stores.loginStore.login.lab,
        environment: stores.loginStore.login.environment,
      })
      setValue("rLab", stores.loginStore.login.lab)
      setValue("pLab", stores.loginStore.login.lab)
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  const onSubmitMasterPanel = () => {
    if (!masterPanelStore.checkExitsLabEnvCode) {
      if (
        !masterPanelStore.masterPanel?.existsVersionId &&
        !masterPanelStore.masterPanel?.existsRecordId
      ) {
        masterPanelStore.masterPanelService
          .addPanelMaster({
            input: {
              ...masterPanelStore.masterPanel,
              enteredBy: stores.loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.createPanelMaster.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.createPanelMaster.message}`,
              })
            }
          })
      } else if (
        masterPanelStore.masterPanel?.existsVersionId &&
        !masterPanelStore.masterPanel?.existsRecordId
      ) {
        masterPanelStore.masterPanelService
          .versionUpgradePanelMaster({
            input: {
              ...masterPanelStore.masterPanel,
              enteredBy: stores.loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.versionUpgradePanelMaster.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.versionUpgradePanelMaster.message}`,
              })
            }
          })
      } else if (
        !masterPanelStore.masterPanel?.existsVersionId &&
        masterPanelStore.masterPanel?.existsRecordId
      ) {
        masterPanelStore.masterPanelService
          .duplicatePanelMaster({
            input: {
              ...masterPanelStore.masterPanel,
              enteredBy: stores.loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.duplicatePanelMaster.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.duplicatePanelMaster.message}`,
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
                      value={masterPanelStore.masterPanel?.rLab}
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
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
                          rLab,
                        })
                        if (!masterPanelStore.masterPanel?.existsVersionId) {
                          masterPanelStore.masterPanelService
                            .checkExitsLabEnvCode({
                              input: {
                                code: masterPanelStore.masterPanel?.panelCode,
                                env: masterPanelStore.masterPanel?.environment,
                                lab: rLab,
                              },
                            })
                            .then((res) => {
                              if (res.checkPanelMasterExistsRecord.success) {
                                masterPanelStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkPanelMasterExistsRecord.message}`,
                                })
                              } else masterPanelStore.updateExistsLabEnvCode(false)
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
                    <select
                      value={masterPanelStore.masterPanel?.pLab}
                      disabled={
                        stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.pLab ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const pLab = e.target.value as string
                        onChange(pLab)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
                          pLab,
                        })
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
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.department ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const department = e.target.value as string
                        onChange(department)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
                          department,
                        })
                        masterPanelStore.findSectionListByDeptCode(department)
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

              {masterPanelStore.sectionListByDeptCode && (
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
                          const section = JSON.parse(e.target.value)
                          onChange(section)
                          masterPanelStore.updateMasterPanel({
                            ...masterPanelStore.masterPanel,
                            section,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {masterPanelStore.sectionListByDeptCode &&
                          masterPanelStore.sectionListByDeptCode.map(
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Service Type"
                    hasError={errors.serviceType}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.serviceType ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const serviceType = e.target.value as string
                        onChange(serviceType)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
                          serviceType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "SERVICE_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="serviceType"
                rules={{ required: true }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Panel Code"
                    placeholder={
                      errors.panelCode ? "Please Enter PanelCode" : "Panel Code"
                    }
                    hasError={errors.panelCode}
                    value={masterPanelStore.masterPanel?.panelCode}
                    onChange={(panelCode) => {
                      onChange(panelCode)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        panelCode: panelCode.toUpperCase(),
                      })
                    }}
                    onBlur={(code) => {
                      if (!masterPanelStore.masterPanel?.existsVersionId) {
                        masterPanelStore.masterPanelService
                          .checkExitsLabEnvCode({
                            input: {
                              code,
                              env: masterPanelStore.masterPanel?.environment,
                              lab: masterPanelStore.masterPanel?.rLab,
                            },
                          })
                          .then((res) => {
                            if (res.checkPanelMasterExistsRecord.success) {
                              masterPanelStore.updateExistsLabEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkPanelMasterExistsRecord.message}`,
                              })
                            } else masterPanelStore.updateExistsLabEnvCode(false)
                          })
                      }
                    }}
                  />
                )}
                name="panelCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {masterPanelStore.checkExitsLabEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Panel Name"
                    placeholder={
                      errors.panelName ? "Please Enter Panel Name" : "Panel Name"
                    }
                    hasError={errors.panelName}
                    value={masterPanelStore.masterPanel?.panelName}
                    onChange={(panelName) => {
                      onChange(panelName)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        panelName: panelName.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="panelName"
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
                      errors.description ? "Please Enter Description" : "Description"
                    }
                    hasError={errors.description}
                    value={masterPanelStore.masterPanel?.description}
                    onChange={(description) => {
                      onChange(description)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
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
                    label="Panel Method"
                    hasError={errors.panelMethod}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.panelMethod ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const panelMethod = e.target.value
                        onChange(panelMethod)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
                          panelMethod,
                        })
                      }}
                    >  
                      <option selected>Select</option>
                      {methodsStore.listMethods.map((item: any, index: number) => (
                        <option key={index} value={item.methodsCode}>
                          {`${item.methodsCode} - ${item.methodsName}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="panelMethod"
                rules={{ required: true }}
                defaultValue=""
              />

              {/* <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Panel Method"
                    placeholder={
                      errors.panelMethod
                        ? "Please Enter PanelMethod"
                        : "Panel Method"
                    }
                    hasError={errors.panelMethod}
                    value={masterPanelStore.masterPanel?.panelMethod}
                    onChange={(panelMethod) => {
                      onChange(panelMethod)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        panelMethod,
                      })
                    }}
                  />
                )}
                name="panelMethod"
                rules={{ required: false }}
                defaultValue=""
              /> */}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Short Name"
                    placeholder={
                      errors.shortName ? "Please Enter ShortName" : "Short Name"
                    }
                    hasError={errors.shortName}
                    value={masterPanelStore.masterPanel?.shortName}
                    onChange={(shortName) => {
                      onChange(shortName)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
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
                    placeholder={errors.price ? "Please Enter Price" : "Price"}
                    type="number"
                    hasError={errors.price}
                    value={masterPanelStore.masterPanel?.price}
                    onChange={(price) => {
                      onChange(price)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
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
                    label="Schedule"
                    placeholder={
                      errors.schedule ? "Please Enter Schedule" : "Schedule"
                    }
                    hasError={errors.schedule}
                    value={masterPanelStore.masterPanel?.schedule}
                    onChange={(schedule) => {
                      onChange(schedule)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        schedule: schedule.toUpperCase(),
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
                    label="TAT"
                    placeholder={errors.tat ? "Please Enter TAT" : "TAT"}
                    hasError={errors.tat}
                    value={masterPanelStore.masterPanel?.tat}
                    onChange={(tat) => {
                      onChange(tat)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        tat: tat.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="tat"
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
                      value={masterPanelStore.masterPanel?.bill}
                      onChange={(bill) => {
                        onChange(bill)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
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
                      label="AutoRelease"
                      id="modeAutoRelease"
                      hasError={errors.autoRelease}
                      value={masterPanelStore.masterPanel?.autoRelease}
                      onChange={(autoRelease) => {
                        onChange(autoRelease)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
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
                      value={masterPanelStore.masterPanel?.holdOOS}
                      onChange={(holdOOS) => {
                        onChange(holdOOS)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
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
                      value={masterPanelStore.masterPanel?.confidential}
                      onChange={(confidential) => {
                        onChange(confidential)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
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
                      value={masterPanelStore.masterPanel?.urgent}
                      onChange={(urgent) => {
                        onChange(urgent)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Validation Level"
                    hasError={errors.validationLevel}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.validationLevel
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const validationLevel: any = e.target.value
                        onChange(validationLevel)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
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
                    label="Report Groups"
                    placeholder={
                      errors.reportGroup
                        ? "Please Enter ReportGroup"
                        : "Report Groups"
                    }
                    hasError={errors.reportGroup}
                    value={masterPanelStore.masterPanel?.reportGroup}
                    onChange={(reportGroup) => {
                      onChange(reportGroup)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        reportGroup: reportGroup.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="reportGroup"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Report Order"
                    placeholder={
                      errors.reportOrder
                        ? "Please Enter ReportOrder"
                        : "Report Order"
                    }
                    hasError={errors.reportOrder}
                    value={masterPanelStore.masterPanel?.reportOrder}
                    onChange={(reportOrder) => {
                      onChange(reportOrder)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        reportOrder: reportOrder.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="reportOrder"
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
                        const processing = e.target.value as string
                        onChange(processing)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
                          processing,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "PROCESSING"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="processing"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Workflow"
                    placeholder={
                      errors.workflow ? "Please Enter Workflow" : "Workflow"
                    }
                    hasError={errors.workflow}
                    value={masterPanelStore.masterPanel?.workflow}
                    onChange={(workflow) => {
                      onChange(workflow)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        workflow,
                      })
                    }}
                  />
                )}
                name="workflow"
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
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.category ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const category = e.target.value as string
                        onChange(category)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
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
                    label="Panel Type"
                    hasError={errors.panelType}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.panelType ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const panelType = e.target.value as string
                        onChange(panelType)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
                          panelType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "PANEL_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="panelType"
                rules={{ required: false }}
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
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
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
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Hi Age"
                    placeholder={errors.hiAge ? "Please Enter HiAge" : "Hi Age"}
                    hasError={errors.hiAge}
                    value={masterPanelStore.masterPanel?.hiAge}
                    onChange={(hiAge) => {
                      onChange(hiAge)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        hiAge: hiAge.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="hiAge"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Lo Age"
                    placeholder={errors.loAge ? "Please Enter LoAge" : "Lo Age"}
                    hasError={errors.loAge}
                    value={masterPanelStore.masterPanel?.loAge}
                    onChange={(loAge) => {
                      onChange(loAge)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        loAge: loAge.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="loAge"
                rules={{ required: false }}
                defaultValue=""
              />

              {/* <LibraryComponents.Atoms.Form.InputWrapper label="Suffix">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const suffix = e.target.value as string
                    masterPanelStore.updateMasterPanel({
                      ...masterPanelStore.masterPanel,
                      suffix,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "SUFFIX"
                      })
                      .arrValue.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper> */}

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Page Break"
                    placeholder={
                      errors.pageBreak ? "Please Enter PageBreak" : "Page Break"
                    }
                    hasError={errors.pageBreak}
                    value={masterPanelStore.masterPanel?.pageBreak}
                    onChange={(pageBreak) => {
                      onChange(pageBreak)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        pageBreak,
                      })
                    }}
                  />
                )}
                name="pageBreak"
                rules={{ required: false }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Report Template"
                    placeholder={
                      errors.reportTemplate
                        ? "Please Enter ReportTemplate"
                        : "Report Template"
                    }
                    hasError={errors.reportTemplate}
                    value={masterPanelStore.masterPanel?.reportTemplate}
                    onChange={(reportTemplate) => {
                      onChange(reportTemplate)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        reportTemplate,
                      })
                    }}
                  />
                )}
                name="reportTemplate"
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
                      value={masterPanelStore.masterPanel?.instantResult}
                      onChange={(instantResult) => {
                        onChange(instantResult)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
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
                      label="Sex Action"
                      hasError={errors.sexAction}
                      value={masterPanelStore.masterPanel?.sexAction}
                      onChange={(sexAction) => {
                        onChange(sexAction)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
                          sexAction,
                        })
                      }}
                    />
                  )}
                  name="sexAction"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Repetition"
                      hasError={errors.repitation}
                      value={masterPanelStore.masterPanel?.repitation}
                      onChange={(repitation) => {
                        onChange(repitation)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
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
                      value={masterPanelStore.masterPanel?.printLabel}
                      onChange={(printLabel) => {
                        onChange(printLabel)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
                          printLabel,
                        })
                      }}
                    />
                  )}
                  name=" printLabel"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Method"
                      hasError={errors.method}
                      value={masterPanelStore.masterPanel?.method}
                      onChange={(method) => {
                        onChange(method)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
                          method,
                        })
                      }}
                    />
                  )}
                  name="method"
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
                label="Tube Groups"
                placeholder="Tube Groups"
                value={masterPanelStore.masterPanel?.tubeGroup}
                onChange={(tubeGroup) => {
                  masterPanelStore.updateMasterPanel({
                    ...masterPanelStore.masterPanel,
                    tubeGroup,
                  })
                }}
              /> */}

              {/* <LibraryComponents.Atoms.Form.InputWrapper label="Sample Type">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleType = e.target.value as string
                    masterPanelStore.updateMasterPanel({
                      ...masterPanelStore.masterPanel,
                      sampleType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Sample Type 1"].map((item: any, index: number) => (
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
                    label="Label Instruction"
                    placeholder={
                      errors.labelInstruction
                        ? "Please Enter LabelInstruction"
                        : "Label Instruction"
                    }
                    hasError={errors.labelInstruction}
                    value={masterPanelStore.masterPanel?.labelInstruction}
                    onChange={(labelInstruction) => {
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        labelInstruction: labelInstruction.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="labelInstruction"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Special Instructions"
                    placeholder={
                      errors.specalInstructions
                        ? "Please Enter SpecalInstructions"
                        : "Special Instruction"
                    }
                    hasError={errors.specalInstructions}
                    value={masterPanelStore.masterPanel?.specalInstructions}
                    onChange={(specalInstructions) => {
                      onChange(specalInstructions)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        specalInstructions: specalInstructions.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="specalInstructions"
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
                      value={masterPanelStore.masterPanel?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value as string
                        onChange(status)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
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
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Creation"
                    placeholder={
                      errors.dateCreation
                        ? "Please Enter DateCreation"
                        : "Date Creation"
                    }
                    value={daysjs(masterPanelStore.masterPanel?.dateCreation).format(
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
                    hasError={errors.dateActiveFrom}
                    placeholder={
                      errors.dateActiveFrom
                        ? "Please Enter dateActiveFrom"
                        : "Date Active"
                    }
                    value={daysjs(
                      masterPanelStore.masterPanel?.dateActiveFrom
                    ).format("YYYY-MM-DD")}
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
                      errors.dateActiveTo
                        ? "Please Enter dateActiveTo"
                        : "Date Expire"
                    }
                    value={daysjs(masterPanelStore.masterPanel?.dateActiveTo).format(
                      "YYYY-MM-DD"
                    )}
                    onChange={(e) => {
                      const dateActiveTo = new Date(e.target.value)
                      onChange(dateActiveTo)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        dateActiveTo,
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
                    hasError={errors.version}
                    placeholder={errors.version ? "Please Enter Version" : "Version"}
                    value={masterPanelStore.masterPanel?.version}
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
                      value={masterPanelStore.masterPanel?.environment}
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
                        const environment = e.target.value as string
                        onChange(environment)
                        masterPanelStore.updateMasterPanel({
                          ...masterPanelStore.masterPanel,
                          environment,
                        })
                        if (!masterPanelStore.masterPanel?.existsVersionId) {
                          masterPanelStore.masterPanelService
                            .checkExitsLabEnvCode({
                              input: {
                                code: masterPanelStore.masterPanel?.panelCode,
                                env: environment,
                                lab: masterPanelStore.masterPanel?.rLab,
                              },
                            })
                            .then((res) => {
                              if (res.checkPanelMasterExistsRecord.success) {
                                masterPanelStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkPanelMasterExistsRecord.message}`,
                                })
                              } else masterPanelStore.updateExistsLabEnvCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : masterPanelStore.masterPanel?.environment || `Select`}
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
                  <LibraryComponents.Atoms.Form.Toggle
                    label="Cumulative"
                    hasError={errors.cumulative}
                    value={masterPanelStore.masterPanel?.cumulative}
                    onChange={(cumulative) => {
                      onChange(cumulative)
                      masterPanelStore.updateMasterPanel({
                        ...masterPanelStore.masterPanel,
                        cumulative,
                      })
                    }}
                  />
                )}
                name="cumulative"
                rules={{ required: false }}
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
              onClick={handleSubmit(onSubmitMasterPanel)}
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
          <FeatureComponents.Molecules.PanelMasterList
            data={masterPanelStore.listMasterPanel || []}
            totalSize={masterPanelStore.listMasterPanelCount}
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
              masterPanelStore.fetchPanelMaster(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              masterPanelStore.masterPanelService
                .deletePanelMaster({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removePanelMaster.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removePanelMaster.message}`,
                    })
                    setModalConfirm({ show: false })
                    masterPanelStore.fetchPanelMaster()
                  }
                })
            } else if (type === "Update") {
              masterPanelStore.masterPanelService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updatePanelMaster.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updatePanelMaster.message}`,
                    })
                    setModalConfirm({ show: false })
                    masterPanelStore.fetchPanelMaster()
                  }
                })
            } else if (type === "versionUpgrade") {
              masterPanelStore.updateMasterPanel({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: parseInt(modalConfirm.data.version + 1),
                dateActiveFrom: new Date(),
              })
              setValue("rLab", modalConfirm.data.rLab)
              setValue("pLab", modalConfirm.data.pLab)
              setValue("panelCode", modalConfirm.data.panelCode)
              setValue("panelName", modalConfirm.data.panelName)
              setValue("department", modalConfirm.data.department)
              setValue("serviceType", modalConfirm.data.serviceType)
              setValue("status", modalConfirm.data.status)
              setValue("environment", modalConfirm.data.environment)
            } else if (type === "duplicate") {
              masterPanelStore.updateMasterPanel({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
                dateActiveFrom: new Date(),
              })
              setValue("rLab", modalConfirm.data.rLab)
              setValue("pLab", modalConfirm.data.pLab)
              setValue("panelCode", modalConfirm.data.panelCode)
              setValue("panelName", modalConfirm.data.panelName)
              setValue("department", modalConfirm.data.department)
              setValue("serviceType", modalConfirm.data.serviceType)
              setValue("status", modalConfirm.data.status)
              setValue("environment", modalConfirm.data.environment)
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

export default MasterPanel
