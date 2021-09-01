/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"

import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"
import { useForm, Controller } from "react-hook-form"
import { useStores } from "@lp/library/stores"
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { Stores as AdministrativeDivStore } from "@lp/features/collection/administrativeDivisions/stores"
import { Stores as SalesTeamStore } from "@lp/features/collection/salesTeam/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"
import { AssetsService } from "@lp/features/assets/services"

const Lab = observer(() => {
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
      Stores.labStore.updateLabs({
        ...Stores.labStore.labs,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  const onSubmitLab = () => {
    if (!Stores.labStore.checkExitsCode) {
      Stores.labStore.LabService.addLab(Stores.labStore.labs).then(() => {
        LibraryComponents.Atoms.Toast.success({
          message: `😊 Lab created.`,
        })
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
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
                    value={Stores.labStore.labs?.code}
                    onChange={(code) => {
                      onChange(code)
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
                        code,
                      })
                    }}
                    onBlur={(code) => {
                      Stores.labStore.LabService.checkExitsCode(code).then((res) => {
                        if (res) Stores.labStore.setExitsCode(true)
                        else Stores.labStore.setExitsCode(false)
                      })
                    }}
                  />
                )}
                name="code"
                rules={{ required: true }}
                defaultValue=""
              />
              {Stores.labStore.checkExitsCode && (
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
                    value={Stores.labStore.labs?.name}
                    onChange={(name) => {
                      onChange(name)
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
                        name,
                      })
                    }}
                  />
                )}
                name="name"
                rules={{ required: true }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Country"
                    hasError={errors.country}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.country
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const country = e.target.value
                        onChange(country)
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
                          country,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {AdministrativeDivStore.administrativeDivStore
                        .listAdministrativeDiv &&
                        AdministrativeDivStore.administrativeDivStore.listAdministrativeDiv.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.country}>
                              {`${item.country}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="country"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="State"
                    hasError={errors.state}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.state
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const state = e.target.value
                        onChange(state)
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
                          state,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {Utils.stateList(
                        AdministrativeDivStore.administrativeDivStore
                          .listAdministrativeDiv,
                        Stores.labStore.labs?.country
                      ) &&
                        Utils.stateList(
                          AdministrativeDivStore.administrativeDivStore
                            .listAdministrativeDiv,
                          Stores.labStore.labs?.country
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="District"
                    hasError={errors.district}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.district
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const district = e.target.value
                        onChange(district)
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
                          district,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {Utils.districtList(
                        AdministrativeDivStore.administrativeDivStore
                          .listAdministrativeDiv,
                        Stores.labStore.labs?.country,
                        Stores.labStore.labs?.state
                      ) &&
                        Utils.districtList(
                          AdministrativeDivStore.administrativeDivStore
                            .listAdministrativeDiv,
                          Stores.labStore.labs?.country,
                          Stores.labStore.labs?.state
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="City"
                    hasError={errors.city}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.city
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const city = e.target.value
                        onChange(city)
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
                          city,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {Utils.cityList(
                        AdministrativeDivStore.administrativeDivStore
                          .listAdministrativeDiv,
                        Stores.labStore.labs?.country,
                        Stores.labStore.labs?.state,
                        Stores.labStore.labs?.district
                      ) &&
                        Utils.cityList(
                          AdministrativeDivStore.administrativeDivStore
                            .listAdministrativeDiv,
                          Stores.labStore.labs?.country,
                          Stores.labStore.labs?.state,
                          Stores.labStore.labs?.district
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Area"
                    hasError={errors.area}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.area
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const area = e.target.value
                        onChange(area)
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
                          area,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {Utils.areaList(
                        AdministrativeDivStore.administrativeDivStore
                          .listAdministrativeDiv,
                        Stores.labStore.labs?.country,
                        Stores.labStore.labs?.state,
                        Stores.labStore.labs?.district,
                        Stores.labStore.labs?.city
                      ) &&
                        Utils.areaList(
                          AdministrativeDivStore.administrativeDivStore
                            .listAdministrativeDiv,
                          Stores.labStore.labs?.country,
                          Stores.labStore.labs?.state,
                          Stores.labStore.labs?.district,
                          Stores.labStore.labs?.city
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Postal Code"
                    hasError={errors.postalCode}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.postalCode
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const postalCode = e.target.value
                        onChange(postalCode)
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
                          postalCode,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {Utils.postCodeList(
                        AdministrativeDivStore.administrativeDivStore
                          .listAdministrativeDiv,
                        Stores.labStore.labs?.country,
                        Stores.labStore.labs?.state,
                        Stores.labStore.labs?.district,
                        Stores.labStore.labs?.city
                      ) &&
                        Utils.postCodeList(
                          AdministrativeDivStore.administrativeDivStore
                            .listAdministrativeDiv,
                          Stores.labStore.labs?.country,
                          Stores.labStore.labs?.state,
                          Stores.labStore.labs?.district,
                          Stores.labStore.labs?.city
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Delivery Type"
                    hasError={errors.deliveryType}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.deliveryType
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const deliveryType = e.target.value
                        onChange(deliveryType)
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
                          deliveryType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const salesTerritory = e.target.value
                        onChange(salesTerritory)
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
                          salesTerritory,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {SalesTeamStore.salesTeamStore.listSalesTeam &&
                        SalesTeamStore.salesTeamStore.listSalesTeam.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.salesTerritory.area}>
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
                    value={Stores.labStore.labs?.labLicence}
                    onChange={(labLicence) => {
                      onChange(labLicence)
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
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
                    value={Stores.labStore.labs?.director}
                    onChange={(director) => {
                      onChange(director)
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
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
                    value={Stores.labStore.labs?.physician}
                    onChange={(physician) => {
                      onChange(physician)
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
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
                    value={Stores.labStore.labs?.mobileNo}
                    onChange={(mobileNo) => {
                      onChange(mobileNo)
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
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
                    value={Stores.labStore.labs?.contactNo}
                    onChange={(contactNo) => {
                      onChange(contactNo)
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
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
                    value={Stores.labStore.labs?.speciality}
                    onChange={(speciality) => {
                      onChange(speciality)
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
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
                      value={Stores.labStore.labs?.labType}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.labType
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const labType = e.target.value
                        onChange(labType)
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
                          labType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
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
                    value={Stores.labStore.labs?.openingTime}
                    onChange={(openingTime) => {
                      onChange(openingTime)
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
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
                    value={Stores.labStore.labs?.closingTime}
                    onChange={(closingTime) => {
                      onChange(closingTime)
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
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
                    value={Stores.labStore.labs?.email}
                    onChange={(email) => {
                      onChange(email)
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
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
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
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
                    value={Stores.labStore.labs?.fyiLine}
                    onChange={(fyiLine) => {
                      onChange(fyiLine)
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
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
                    value={Stores.labStore.labs?.workLine}
                    onChange={(workLine) => {
                      onChange(workLine)
                      Stores.labStore.updateLabs({
                        ...Stores.labStore.labs,
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
                    label="Environment"
                    hasError={errors.environment}
                  >
                    <select
                      value={Stores.labStore.labs?.environment}
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
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
                          environment,
                        })
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.labStore.labs?.environment || `Select`}
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
                      label="Auto Release"
                      hasError={errors.autoRelease}
                      value={Stores.labStore.labs?.autoRelease}
                      onChange={(autoRelease) => {
                        onChange(autoRelease)
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
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
                      value={Stores.labStore.labs?.requireReceveInLab}
                      onChange={(requireReceveInLab) => {
                        onChange(requireReceveInLab)
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
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
                      value={Stores.labStore.labs?.requireScainIn}
                      onChange={(requireScainIn) => {
                        onChange(requireScainIn)
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
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
                      value={Stores.labStore.labs?.routingDept}
                      onChange={(routingDept) => {
                        onChange(routingDept)
                        Stores.labStore.updateLabs({
                          ...Stores.labStore.labs,
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
            data={Stores.labStore.listLabs || []}
            totalSize={Stores.labStore.listLabsCount}
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
              Stores.labStore.fetchListLab(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.labStore.LabService.deleteLab(modalConfirm.id).then(
                (res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Lab deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.labStore.fetchListLab()
                  }
                }
              )
            } else if (type === "Update") {
              Stores.labStore.LabService.updateSingleFiled(modalConfirm.data).then(
                (res: any) => {
                  if (res.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.message}`,
                    })
                    setModalConfirm({ show: false })
                    setTimeout(() => {
                      window.location.reload()
                    }, 2000)
                  }
                }
              )
            } else {
              const path = `https://limsplus.blob.core.windows.net/labs/${modalConfirm.data.value.name}`
              new AssetsService()
                .uploadFile(
                  modalConfirm.data.value,
                  "labs",
                  modalConfirm.data.value.name
                )
                .then((res) => {
                  if (res.success) {
                    Stores.labStore.LabService.updateSingleFiled({
                      ...modalConfirm.data,
                      value: path,
                    }).then((res: any) => {
                      if (res.status === 200) {
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 ${res.message}`,
                        })
                        setModalConfirm({ show: false })
                        setTimeout(() => {
                          window.location.reload()
                        }, 2000)
                      }
                    })
                  } else {
                    alert(res.message)
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
