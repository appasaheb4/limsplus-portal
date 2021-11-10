/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"

import * as Utils from "../util"
import { useForm, Controller } from "react-hook-form"
import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const Lab = observer(() => {
  const {
    labStore,
    salesTeamStore,
    routerStore,
    administrativeDivisions,
  } = useStores()

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
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      labStore.updateLabs({
        ...labStore.labs,
        environment: loginStore.login.environment,
      })
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
    labStore && labStore.updateLabs({
        ...labStore.labs,
        status: status.code as string,
      })
    setValue("status", status.code as string)
  }
  const environment = routerStore.lookupItems.find((fileds)=>{
    return fileds.fieldName === 'ENVIRONMENT'
  })?. arrValue?.find((environmentItem)=>environmentItem.code === 'P')
  if(environment){
    labStore && labStore.updateLabs({
      ...labStore.labs,
      environment: environment.code as string
    })
    setValue("environment",environment.code as string)
  }
  },[routerStore.lookupItems])

  const onSubmitLab = () => {
    if (!labStore.checkExitsEnvCode) {
      labStore.LabService.addLab({ input: { ...labStore.labs } }).then((res) => {
        if (res.createLab.success) {
          LibraryComponents.Atoms.Toast.success({
            message: `😊 ${res.createLab.message}`,
          })
        }
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: "😔 Please enter diff code and environment",
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
              fill
            >
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Code"
                    id="code"
                    hasError={errors.code}
                    placeholder={errors.code ? "Please Enter Code" : "Code"}
                    value={labStore.labs?.code}
                    onChange={(code) => {
                      onChange(code)
                      labStore.updateLabs({
                        ...labStore.labs,
                        code: code.toUpperCase(),
                      })
                    }}
                    onBlur={(code) => {
                      labStore.LabService.checkExitsEnvCode({
                        input: {
                          code,
                          env: labStore.labs?.environment,
                        },
                      }).then((res) => {
                        if (res.checkLabExitsEnvCode.success) {
                          labStore.setExitsEnvCode(true)
                          LibraryComponents.Atoms.Toast.error({
                            message: `😔 ${res.checkLabExitsEnvCode.message}`,
                          })
                        } else labStore.setExitsEnvCode(false)
                      })
                    }}
                  />
                )}
                name="code"
                rules={{ required: true }}
                defaultValue=""
              />
              {labStore.checkExitsEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Name"
                    name="name"
                    hasError={errors.name}
                    placeholder={errors.name ? "Please Enter Name" : "Name"}
                    value={labStore.labs?.name}
                    onChange={(name) => {
                      onChange(name)
                      labStore.updateLabs({
                        ...labStore.labs,
                        name: name.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="name"
                rules={{ required: true }}
                defaultValue=""
              />
              {administrativeDivisions.listAdministrativeDiv && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Country"
                      hasError={errors.country}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.country ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const country = e.target.value
                          onChange(country)
                          labStore.updateLabs({
                            ...labStore.labs,
                            country,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {_.uniq(
                          _.map(
                            administrativeDivisions.listAdministrativeDiv,
                            "country"
                          )
                        ).map((item: any, index: number) => (
                          <option key={index} value={item}>
                            {`${item}`}
                          </option>
                        ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="country"
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}
              {(labStore.labs.country || administrativeDivisions.listAdministrativeDiv)  && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="State"
                      hasError={errors.state}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.state ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const state = e.target.value
                          onChange(state)
                          labStore.updateLabs({
                            ...labStore.labs,
                            state,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {administrativeDivisions.listAdministrativeDiv &&
                          Utils.stateList(
                            administrativeDivisions.listAdministrativeDiv,
                            labStore.labs.country
                          ).map((item: any, index: number) => (
                            <option key={index} value={item}>
                              {`${item}`}
                            </option>
                          ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="state"
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}
              {(labStore.labs.state ||  administrativeDivisions.listAdministrativeDiv) && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="District"
                      hasError={errors.district}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.district ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const district = e.target.value
                          onChange(district)
                          labStore.updateLabs({
                            ...labStore.labs,
                            district,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {administrativeDivisions.listAdministrativeDiv &&
                          Utils.districtList(
                            administrativeDivisions.listAdministrativeDiv,
                            labStore.labs.country,
                            labStore.labs.state
                          ).map((item: any, index: number) => (
                            <option key={index} value={item}>
                              {`${item}`}
                            </option>
                          ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="district"
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}
              {(labStore.labs.district || administrativeDivisions.listAdministrativeDiv) && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="City"
                      hasError={errors.city}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.city ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const city = e.target.value
                          onChange(city)
                          labStore.updateLabs({
                            ...labStore.labs,
                            city,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {administrativeDivisions.listAdministrativeDiv &&
                          Utils.cityList(
                            administrativeDivisions.listAdministrativeDiv,
                            labStore.labs.country,
                            labStore.labs.state,
                            labStore.labs.district
                          ).map((item: any, index: number) => (
                            <option key={index} value={item}>
                              {`${item}`}
                            </option>
                          ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="city"
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}
              {(labStore.labs.city || administrativeDivisions.listAdministrativeDiv) && (
                <Controller  
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Area"
                      hasError={errors.area}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.area ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const area = e.target.value
                          onChange(area)
                          labStore.updateLabs({
                            ...labStore.labs,
                            area,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {administrativeDivisions.listAdministrativeDiv &&
                          Utils.areaList(
                            administrativeDivisions.listAdministrativeDiv,
                            labStore.labs.country,
                            labStore.labs.state,
                            labStore.labs.district,
                            labStore.labs.city
                          ).map((item: any, index: number) => (
                            <option key={index} value={item}>
                              {`${item}`}
                            </option>
                          ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="area "
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}
              {(labStore.labs.area || administrativeDivisions.listAdministrativeDiv) && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Postal Code"
                      hasError={errors.postalCode}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.postalCode ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const postalCode = e.target.value
                          onChange(postalCode)
                          labStore.updateLabs({
                            ...labStore.labs,
                            postalCode,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {administrativeDivisions.listAdministrativeDiv &&
                          Utils.postCodeList(
                            administrativeDivisions.listAdministrativeDiv,
                            labStore.labs.country,
                            labStore.labs.state,
                            labStore.labs.district,
                            labStore.labs.city,
                            labStore.labs.area
                          ).map((item: any, index: number) => (
                            <option key={index} value={item}>
                              {`${item}`}
                            </option>
                          ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="postalCode "
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Delivery Type"
                    hasError={errors.deliveryType}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.deliveryType ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const deliveryType = e.target.value
                        onChange(deliveryType)
                        labStore.updateLabs({
                          ...labStore.labs,
                          deliveryType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "DELIVERY_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="deliveryType"
                rules={{ required: false }}
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
                    label="Sales Territory"
                    hasError={errors.salesTerritory}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.salesTerritory
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const salesTerritory = e.target.value
                        onChange(salesTerritory)
                        labStore.updateLabs({
                          ...labStore.labs,
                          salesTerritory,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {salesTeamStore.listSalesTeam &&
                        salesTeamStore.listSalesTeam.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.salesTerritory}>
                              {`${item.salesTerritory.area}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="salesTerritory"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Lab Licence"
                    placeholder={
                      errors.labLicence ? "Please Enter labLicence" : "Lab Licence"
                    }
                    hasError={errors.labLicence}
                    value={labStore.labs?.labLicence}
                    onChange={(labLicence) => {
                      onChange(labLicence)
                      labStore.updateLabs({
                        ...labStore.labs,
                        labLicence,
                      })
                    }}
                  />
                )}
                name="labLicence"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Director"
                    placeholder={
                      errors.director ? "Please Enter director" : "Director"
                    }
                    hasError={errors.director}
                    value={labStore.labs?.director}
                    onChange={(director) => {
                      onChange(director)
                      labStore.updateLabs({
                        ...labStore.labs,
                        director,
                      })
                    }}
                  />
                )}
                name="director"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Physician"
                    placeholder={
                      errors.physician ? "Please Enter physician" : "Physician"
                    }
                    hasError={errors.physician}
                    value={labStore.labs?.physician}
                    onChange={(physician) => {
                      onChange(physician)
                      labStore.updateLabs({
                        ...labStore.labs,
                        physician,
                      })
                    }}
                  />
                )}
                name="physician"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    type="number"
                    label="Mobile Number"
                    placeholder={
                      errors.mobileNo ? "Please Enter mobileNo" : "Mobile Number"
                    }
                    hasError={errors.mobileNo}
                    value={labStore.labs?.mobileNo}
                    onChange={(mobileNo) => {
                      onChange(mobileNo)
                      labStore.updateLabs({
                        ...labStore.labs,
                        mobileNo,
                      })
                    }}
                  />
                )}
                name="mobileNo"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    type="number"
                    label="Contact Number"
                    placeholder={
                      errors.contactNo ? "Please Enter contactNo" : "Contact Number"
                    }
                    hasError={errors.contactNo}
                    value={labStore.labs?.contactNo}
                    onChange={(contactNo) => {
                      onChange(contactNo)
                      labStore.updateLabs({
                        ...labStore.labs,
                        contactNo,
                      })
                    }}
                  />
                )}
                name="contactNo"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Speciality"
                    placeholder={
                      errors.speciality ? "Please Enter speciality" : "Speciality"
                    }
                    hasError={errors.speciality}
                    value={labStore.labs?.speciality}
                    onChange={(speciality) => {
                      onChange(speciality)
                      labStore.updateLabs({
                        ...labStore.labs,
                        speciality,
                      })
                    }}
                  />
                )}
                name="speciality"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Lab type"
                    hasError={errors.labType}
                  >
                    <select
                      value={labStore.labs?.labType}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.labType ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const labType = e.target.value
                        onChange(labType)
                        labStore.updateLabs({
                          ...labStore.labs,
                          labType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "LAB_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="labType"
                rules={{ required: false }}
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
                  <LibraryComponents.Atoms.Form.Clock
                    label="Opening Time"
                    hasError={errors.openingTime}
                    value={labStore.labs?.openingTime}
                    onChange={(openingTime) => {
                      onChange(openingTime)
                      labStore.updateLabs({
                        ...labStore.labs,
                        openingTime,
                      })
                    }}
                  />
                )}
                name="openingTime"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Clock
                    label="Closing Time"
                    hasError={errors.closingTime}
                    value={labStore.labs?.closingTime}
                    onChange={(closingTime) => {
                      onChange(closingTime)
                      labStore.updateLabs({
                        ...labStore.labs,
                        closingTime,
                      })
                    }}
                  />
                )}
                name="closingTime"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Email"
                    placeholder={errors.email ? "Please Enter Email" : "Email"}
                    hasError={errors.email}
                    value={labStore.labs?.email}
                    onChange={(email) => {
                      onChange(email)
                      labStore.updateLabs({
                        ...labStore.labs,
                        email,
                      })
                    }}
                  />
                )}
                name="email"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputFile
                    label="Lab logo"
                    placeholder={errors.labLog ? "Please Enter labLog" : "LabLog"}
                    hasError={errors.labLog}
                    onChange={(e) => {
                      const labLog = e.target.files[0]
                      onChange(labLog)
                      labStore.updateLabs({
                        ...labStore.labs,
                        labLog,
                      })
                    }}
                  />
                )}
                name="labLog"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={2}
                    label="FYI line"
                    placeholder={
                      errors.fyiLine ? "Please Enter fyiLine" : "FYI Line"
                    }
                    hasError={errors.fyiLine}
                    value={labStore.labs?.fyiLine}
                    onChange={(fyiLine) => {
                      onChange(fyiLine)
                      labStore.updateLabs({
                        ...labStore.labs,
                        fyiLine,
                      })
                    }}
                  />
                )}
                name="fyiLine"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={2}
                    label="Work line"
                    placeholder={
                      errors.workLine ? "Please Enter workLine" : "WorkLine"
                    }
                    hasError={errors.workLine}
                    value={labStore.labs?.workLine}
                    onChange={(workLine) => {
                      onChange(workLine)
                      labStore.updateLabs({
                        ...labStore.labs,
                        workLine,
                      })
                    }}
                  />
                )}
                name="workLine"
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
                      value={labStore.labs.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        labStore.updateLabs({
                          ...labStore.labs,
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
                      value={labStore.labs?.environment}
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
                        labStore.updateLabs({
                          ...labStore.labs,
                          environment,
                        })
                        labStore.LabService.checkExitsEnvCode({
                          input: {
                            code: labStore.labs?.code,
                            env: environment,
                          },
                        }).then((res) => {
                          if (res.checkLabExitsEnvCode.success) {
                            labStore.setExitsEnvCode(true)
                            LibraryComponents.Atoms.Toast.error({
                              message: `😔 ${res.checkLabExitsEnvCode.message}`,
                            })
                          } else labStore.setExitsEnvCode(false)
                        })
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : labStore.labs?.environment || `Select`}
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
                      label="Auto Release"
                      hasError={errors.autoRelease}
                      value={labStore.labs?.autoRelease}
                      onChange={(autoRelease) => {
                        onChange(autoRelease)
                        labStore.updateLabs({
                          ...labStore.labs,
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
                      label="Require receve in lab"
                      hasError={errors.requireReceveInLab}
                      value={labStore.labs?.requireReceveInLab}
                      onChange={(requireReceveInLab) => {
                        onChange(requireReceveInLab)
                        labStore.updateLabs({
                          ...labStore.labs,
                          requireReceveInLab,
                        })
                      }}
                    />
                  )}
                  name="requireReceveInLab"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Require Scain In"
                      hasError={errors.requireScainIn}
                      value={labStore.labs?.requireScainIn}
                      onChange={(requireScainIn) => {
                        onChange(requireScainIn)
                        labStore.updateLabs({
                          ...labStore.labs,
                          requireScainIn,
                        })
                      }}
                    />
                  )}
                  name="requireScainIn"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Routing Dept"
                      hasError={errors.routingDept}
                      value={labStore.labs?.routingDept}
                      onChange={(routingDept) => {
                        onChange(routingDept)
                        labStore.updateLabs({
                          ...labStore.labs,
                          routingDept,
                        })
                      }}
                    />
                  )}
                  name="routingDept"
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
              onClick={handleSubmit(onSubmitLab)}
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
          <FeatureComponents.Molecules.LabList
            data={labStore.listLabs || []}
            totalSize={labStore.listLabsCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
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
                body: `Update lab!`,
              })
            }}
            onUpdateImage={(value: any, dataField: string, id: string) => {
              setModalConfirm({
                show: true,
                type: "UpdateImage",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update lab!`,
              })
            }}
            onPageSizeChange={(page, limit) => {
              labStore.fetchListLab(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              labStore.LabService.deleteLab({
                input: { id: modalConfirm.id },
              }).then((res: any) => {
                if (res.removeLab.success) {
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 ${res.removeLab.message}`,
                  })
                  setModalConfirm({ show: false })
                  labStore.fetchListLab()
                }
              })
            } else if (type === "Update") {
              labStore.LabService.updateSingleFiled({
                input: {
                  _id: modalConfirm.data.id,
                  [modalConfirm.data.dataField]: modalConfirm.data.value,
                },
              }).then((res: any) => {
                if (res.updateLab.success) {
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 ${res.updateLab.message}`,
                  })
                  setModalConfirm({ show: false })
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
                }
              })
            } else {
              labStore.LabService.updateLabImages({
                input: {
                  _id: modalConfirm.data.id,
                  labLog: modalConfirm.data.value,
                },
              }).then((res: any) => {
                if (res.updateLabImages.success) {
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 ${res.updateLabImages.message}`,
                  })
                  setModalConfirm({ show: false })
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
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

export default Lab
