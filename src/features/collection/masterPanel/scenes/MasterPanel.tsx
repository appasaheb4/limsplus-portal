/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/library/stores"
import { Stores } from "../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { stores } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as LoginStores } from "@lp/features/login/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const MasterPanel = observer(() => {
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
      Stores.masterPanelStore.updateMasterPanel({
        ...Stores.masterPanelStore.masterPanel,
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
    if (!Stores.masterPanelStore.checkExitsLabEnvCode) {
      if (
        !Stores.masterPanelStore.masterPanel?.existsVersionId &&
        !Stores.masterPanelStore.masterPanel?.existsRecordId
      ) {
        Stores.masterPanelStore.masterPanelService
          .addPanelMaster({
            ...Stores.masterPanelStore.masterPanel,
            enteredBy: stores.loginStore.login.userId,
          })
          .then(() => {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Panel master created.`,
            })
          })
      } else if (
        Stores.masterPanelStore.masterPanel?.existsVersionId &&
        !Stores.masterPanelStore.masterPanel?.existsRecordId
      ) {
        Stores.masterPanelStore.masterPanelService
          .versionUpgradePanelMaster({
            ...Stores.masterPanelStore.masterPanel,
            enteredBy: stores.loginStore.login.userId,
          })
          .then(() => {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Panel master version upgrade.`,
            })
          })
      } else if (
        !Stores.masterPanelStore.masterPanel?.existsVersionId &&
        Stores.masterPanelStore.masterPanel?.existsRecordId
      ) {
        Stores.masterPanelStore.masterPanelService
          .duplicatePanelMaster({
            ...Stores.masterPanelStore.masterPanel,
            enteredBy: stores.loginStore.login.userId,
          })
          .then(() => {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Panel master duplicate created.`,
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
                    label="RLab"
                    hasError={errors.rLab}
                  >
                    <select
                      value={Stores.masterPanelStore.masterPanel?.rLab}
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
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
                          rLab,
                        })
                        if (!Stores.masterPanelStore.masterPanel?.existsVersionId) {
                          Stores.masterPanelStore.masterPanelService
                            .checkExitsLabEnvCode(
                              Stores.masterPanelStore.masterPanel?.panelCode || "",
                              Stores.masterPanelStore.masterPanel?.environment || "",
                              rLab
                            )
                            .then((res) => {
                              if (res.success) {
                                Stores.masterPanelStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.message}`,
                                })
                              } else
                                Stores.masterPanelStore.updateExistsLabEnvCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>Select</option>
                      {LoginStores.loginStore.login?.labList &&
                        LoginStores.loginStore.login?.labList.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {item.name}
                            </option>
                          )
                        )}
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
                      value={Stores.masterPanelStore.masterPanel?.pLab}
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
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
                          pLab,
                        })
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
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                    label="Section"
                    hasError={errors.section}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.section
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const section = e.target.value as string
                        onChange(section)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
                          section,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {["Section 1"].map((item: any, index: number) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="section"
                rules={{ required: true }}
                defaultValue=""
              />

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
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                    value={Stores.masterPanelStore.masterPanel?.panelCode}
                    onChange={(panelCode) => {
                      onChange(panelCode)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
                        panelCode: panelCode.toUpperCase(),
                      })
                    }}
                    onBlur={(code) => {
                      if (!Stores.masterPanelStore.masterPanel?.existsVersionId) {
                        Stores.masterPanelStore.masterPanelService
                          .checkExitsLabEnvCode(
                            code,
                            Stores.masterPanelStore.masterPanel?.environment || "",
                            Stores.masterPanelStore.masterPanel?.rLab || ""
                          )
                          .then((res) => {
                            if (res.success) {
                              Stores.masterPanelStore.updateExistsLabEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.message}`,
                              })
                            } else
                              Stores.masterPanelStore.updateExistsLabEnvCode(false)
                          })
                      }
                    }}
                  />
                )}
                name="panelCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {Stores.masterPanelStore.checkExitsLabEnvCode && (
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
                    value={Stores.masterPanelStore.masterPanel?.panelName}
                    onChange={(panelName) => {
                      onChange(panelName)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                    value={Stores.masterPanelStore.masterPanel?.description}
                    onChange={(description) => {
                      onChange(description)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                    label="Panel Method"
                    placeholder={
                      errors.panelMethod
                        ? "Please Enter PanelMethod"
                        : "Panel Method"
                    }
                    hasError={errors.panelMethod}
                    value={Stores.masterPanelStore.masterPanel?.panelMethod}
                    onChange={(panelMethod) => {
                      onChange(panelMethod)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Short Name"
                    placeholder={
                      errors.shortName ? "Please Enter ShortName" : "Short Name"
                    }
                    hasError={errors.shortName}
                    value={Stores.masterPanelStore.masterPanel?.shortName}
                    onChange={(shortName) => {
                      onChange(shortName)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                    value={Stores.masterPanelStore.masterPanel?.price}
                    onChange={(price) => {
                      onChange(price)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                    label="Schedule"
                    placeholder={
                      errors.schedule ? "Please Enter Schedule" : "Schedule"
                    }
                    hasError={errors.schedule}
                    value={Stores.masterPanelStore.masterPanel?.schedule}
                    onChange={(schedule) => {
                      onChange(schedule)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                    value={Stores.masterPanelStore.masterPanel?.tat}
                    onChange={(tat) => {
                      onChange(tat)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                      value={Stores.masterPanelStore.masterPanel?.bill}
                      onChange={(bill) => {
                        onChange(bill)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                      value={Stores.masterPanelStore.masterPanel?.autoRelease}
                      onChange={(autoRelease) => {
                        onChange(autoRelease)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                      value={Stores.masterPanelStore.masterPanel?.holdOOS}
                      onChange={(holdOOS) => {
                        onChange(holdOOS)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                      value={Stores.masterPanelStore.masterPanel?.confidential}
                      onChange={(confidential) => {
                        onChange(confidential)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                      value={Stores.masterPanelStore.masterPanel?.urgent}
                      onChange={(urgent) => {
                        onChange(urgent)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const validationLevel: any = e.target.value
                        onChange(validationLevel)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
                          validationLevel,
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
                    value={Stores.masterPanelStore.masterPanel?.reportGroup}
                    onChange={(reportGroup) => {
                      onChange(reportGroup)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                    value={Stores.masterPanelStore.masterPanel?.reportOrder}
                    onChange={(reportOrder) => {
                      onChange(reportOrder)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                        errors.processing
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const processing = e.target.value as string
                        onChange(processing)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                    value={Stores.masterPanelStore.masterPanel?.workflow}
                    onChange={(workflow) => {
                      onChange(workflow)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                        errors.category
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const category = e.target.value as string
                        onChange(category)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                        errors.panelType
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const panelType = e.target.value as string
                        onChange(panelType)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                        errors.sex
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const sex = e.target.value as string
                        onChange(sex)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                    value={Stores.masterPanelStore.masterPanel?.hiAge}
                    onChange={(hiAge) => {
                      onChange(hiAge)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                    value={Stores.masterPanelStore.masterPanel?.loAge}
                    onChange={(loAge) => {
                      onChange(loAge)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
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
                    value={Stores.masterPanelStore.masterPanel?.pageBreak}
                    onChange={(pageBreak) => {
                      onChange(pageBreak)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                    value={Stores.masterPanelStore.masterPanel?.reportTemplate}
                    onChange={(reportTemplate) => {
                      onChange(reportTemplate)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                      value={Stores.masterPanelStore.masterPanel?.instantResult}
                      onChange={(instantResult) => {
                        onChange(instantResult)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                      value={Stores.masterPanelStore.masterPanel?.sexAction}
                      onChange={(sexAction) => {
                        onChange(sexAction)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                      value={Stores.masterPanelStore.masterPanel?.repitation}
                      onChange={(repitation) => {
                        onChange(repitation)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                      value={Stores.masterPanelStore.masterPanel?.printLabel}
                      onChange={(printLabel) => {
                        onChange(printLabel)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                      value={Stores.masterPanelStore.masterPanel?.method}
                      onChange={(method) => {
                        onChange(method)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
                value={Stores.masterPanelStore.masterPanel?.tubeGroup}
                onChange={(tubeGroup) => {
                  Stores.masterPanelStore.updateMasterPanel({
                    ...Stores.masterPanelStore.masterPanel,
                    tubeGroup,
                  })
                }}
              /> */}

              {/* <LibraryComponents.Atoms.Form.InputWrapper label="Sample Type">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleType = e.target.value as string
                    Stores.masterPanelStore.updateMasterPanel({
                      ...Stores.masterPanelStore.masterPanel,
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
                    value={Stores.masterPanelStore.masterPanel?.labelInstruction}
                    onChange={(labelInstruction) => {
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                    value={Stores.masterPanelStore.masterPanel?.specalInstructions}
                    onChange={(specalInstructions) => {
                      onChange(specalInstructions)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                      value={Stores.masterPanelStore.masterPanel?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value as string
                        onChange(status)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Entered By"
                    placeholder={
                      errors.userId ? "Please Enter UserID" : "Entered By"
                    }
                    hasError={errors.userId}
                    value={LoginStore.loginStore.login?.userId}
                    disabled={true}
                    // onChange={(analyteCode) => {
                    //   Stores.masterAnalyteStore.updateMasterAnalyte({
                    //     ...Stores.masterAnalyteStore.masterAnalyte,
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
                    value={LibraryUtils.moment
                      .unix(Stores.masterPanelStore.masterPanel?.dateCreation || 0)
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
                    hasError={errors.dateActiveFrom}
                    placeholder={
                      errors.dateActiveFrom
                        ? "Please Enter dateActiveFrom"
                        : "Date Active"
                    }
                    value={LibraryUtils.moment
                      .unix(Stores.masterPanelStore.masterPanel?.dateActiveFrom || 0)
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
                      errors.dateActiveTo
                        ? "Please Enter dateActiveTo"
                        : "Date Expire"
                    }
                    value={LibraryUtils.moment
                      .unix(Stores.masterPanelStore.masterPanel?.dateActiveTo || 0)
                      .format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const schedule = new Date(e.target.value)
                      onChange(schedule)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
                    hasError={errors.version}
                    placeholder={errors.version ? "Please Enter Version" : "Version"}
                    value={Stores.masterPanelStore.masterPanel?.version}
                    disabled={true}
                    // onChange={(analyteCode) => {
                    //   Stores.masterAnalyteStore.updateMasterAnalyte({
                    //     ...Stores.masterAnalyteStore.masterAnalyte,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Key Num"
                    hasError={errors.keyNum}
                    placeholder={errors.keyNum ? "Please Enter keyNum" : "Key Num"}
                    value={Stores.masterPanelStore.masterPanel?.keyNum}
                    disabled={true}
                    // onChange={(analyteCode) => {
                    //   Stores.masterAnalyteStore.updateMasterAnalyte({
                    //     ...Stores.masterAnalyteStore.masterAnalyte,
                    //     analyteCode,
                    //   })
                    // }}
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
                      value={Stores.masterPanelStore.masterPanel?.environment}
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
                        const environment = e.target.value as string
                        onChange(environment)
                        Stores.masterPanelStore.updateMasterPanel({
                          ...Stores.masterPanelStore.masterPanel,
                          environment,
                        })
                        if (!Stores.masterPanelStore.masterPanel?.existsVersionId) {
                          Stores.masterPanelStore.masterPanelService
                            .checkExitsLabEnvCode(
                              Stores.masterPanelStore.masterPanel?.panelCode || "",
                              environment,
                              Stores.masterPanelStore.masterPanel?.rLab || ""
                            )
                            .then((res) => {
                              if (res.success) {
                                Stores.masterPanelStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.message}`,
                                })
                              } else
                                Stores.masterPanelStore.updateExistsLabEnvCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.masterPanelStore.masterPanel?.environment ||
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Toggle
                    label="Cumulative"
                    hasError={errors.cumulative}
                    value={Stores.masterPanelStore.masterPanel?.cumulative}
                    onChange={(cumulative) => {
                      onChange(cumulative)
                      Stores.masterPanelStore.updateMasterPanel({
                        ...Stores.masterPanelStore.masterPanel,
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
            data={Stores.masterPanelStore.listMasterPanel || []}
            totalSize={Stores.masterPanelStore.listMasterPanelCount}
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
              Stores.masterPanelStore.fetchPanelMaster(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.masterPanelStore.masterPanelService
                .deletePanelMaster(modalConfirm.id)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Records deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.masterPanelStore.fetchPanelMaster()
                  }
                })
            } else if (type === "Update") {
              Stores.masterPanelStore.masterPanelService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.masterPanelStore.fetchPanelMaster()
                    window.location.reload()
                  }
                })
            } else if (type === "versionUpgrade") {
              Stores.masterPanelStore.updateMasterPanel({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: modalConfirm.data.version + 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
              })
              setValue("rLab",modalConfirm.data.rLab)
              setValue("pLab",modalConfirm.data.pLab)
              setValue("panelCode",modalConfirm.data.panelCode)
              setValue("panelName",modalConfirm.data.panelName)
              setValue("environment",modalConfirm.data.environment)
            } else if (type === "duplicate") {
              Stores.masterPanelStore.updateMasterPanel({
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

export default MasterPanel
