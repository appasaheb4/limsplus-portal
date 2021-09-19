/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"

import { useStores, stores } from "@lp/stores"
import { Stores } from "../stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as CorporateClientsStore } from "@lp/features/collection/corporateClients/stores"
import { RouterFlow } from "@lp/flows"

const RegistrationLocation = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const { loginStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)

  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.registrationLocationsStore.updateRegistrationLocations({
        ...Stores.registrationLocationsStore.registrationLocations,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  const onSubmitRegistrationLocation = () => {
    if (!Stores.registrationLocationsStore.checkExitsLabEnvCode) {
      if (
        !Stores.registrationLocationsStore.registrationLocations?.existsVersionId &&
        !Stores.registrationLocationsStore.registrationLocations?.existsRecordId
      ) {
        Stores.registrationLocationsStore.registrationLocationsService
          .addRegistrationLocations({
            ...Stores.registrationLocationsStore.registrationLocations,
            enteredBy: stores.loginStore.login.userId,
          })
          .then((res) => {
            if (res.status === 200) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 Registration Locations record created.`,
              })
            }
          })
      } else if (
        Stores.registrationLocationsStore.registrationLocations?.existsVersionId &&
        !Stores.registrationLocationsStore.registrationLocations?.existsRecordId
      ) {
        Stores.registrationLocationsStore.registrationLocationsService
          .versionUpgradeRegistrationLocations(
            Stores.registrationLocationsStore.registrationLocations
          )
          .then((res) => {
            if (res.status === 200) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 Registration Locations version updraged.`,
              })
            }
          })
      } else if (
        !Stores.registrationLocationsStore.registrationLocations?.existsVersionId &&
        Stores.registrationLocationsStore.registrationLocations?.existsRecordId
      ) {
        Stores.registrationLocationsStore.registrationLocationsService
          .duplicateRegistrationLocations(
            Stores.registrationLocationsStore.registrationLocations
          )
          .then((res) => {
            if (res.status === 200) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 Registration Locations duplicate created.`,
              })
            }
          })
      }
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: `😔 Please enter diff code!`,
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
      {RouterFlow.checkPermission(stores.routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddSection}
          onClick={() => setHideAddSection(!hideAddSection)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddSection ? "shown" : "shown")
          }
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
                        Stores.registrationLocationsStore.registrationLocations
                          ?.dateCreation || 0
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
                      errors.dateActiveFrom
                        ? "Please Enter Date Active"
                        : "Date Active"
                    }
                    hasError={errors.dateActiveFrom}
                    value={LibraryUtils.moment
                      .unix(
                        Stores.registrationLocationsStore.registrationLocations
                          ?.dateActiveFrom || 0
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
                    placeholder="Date Expire"
                    hasError={errors.dateActiveTo}
                    value={LibraryUtils.moment
                      .unix(
                        Stores.registrationLocationsStore.registrationLocations
                          ?.dateActiveTo || 0
                      )
                      .format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const schedule = new Date(e.target.value)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        dateActiveTo: LibraryUtils.moment(schedule).unix(),
                      })
                    }}
                  />
                )}
                name="dateActiveTo"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Version"
                    placeholder="Version"
                    hasError={errors.version}
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.version
                    }
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
                    placeholder="Key Num"
                    hasError={errors.keyNum}
                    value={
                      Stores.registrationLocationsStore.registrationLocations?.keyNum
                    }
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
                    label="Entered By"
                    placeholder="Entered By"
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Location Code"
                    hasError={errors.locationCode}
                    placeholder={
                      errors.locationCode
                        ? "Please Enter Location Code"
                        : "Loaction Code"
                    }
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.locationCode
                    }
                    onChange={(locationCode) => {
                      onChange(locationCode)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        locationCode,
                      })
                    }}
                    onBlur={(code) => {
                      if (
                        !Stores.registrationLocationsStore.registrationLocations
                          ?.existsVersionId
                      ) {
                        Stores.registrationLocationsStore.registrationLocationsService
                          .checkExitsLabEnvCode(
                            code,
                            Stores.registrationLocationsStore.registrationLocations
                              ?.environment || "",
                            Stores.registrationLocationsStore.registrationLocations
                              ?.lab || ""
                          )
                          .then((res) => {
                            if (res.success) {
                              Stores.registrationLocationsStore.updateExistsLabEnvCode(
                                true
                              )
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.message}`,
                              })
                            } else
                              Stores.registrationLocationsStore.updateExistsLabEnvCode(
                                false
                              )
                          })
                      }
                    }}
                  />
                )}
                name="locationCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {Stores.registrationLocationsStore.checkExitsLabEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Location Name"
                    hasError={errors.locationName}
                    placeholder={
                      errors.locationName
                        ? "Please Enter Loaction Name"
                        : "Loaction Name"
                    }
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.locationName
                    }
                    onChange={(locationName) => {
                      onChange(locationName)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        locationName,
                      })
                    }}
                  />
                )}
                name="locationName"
                rules={{ required: true }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={3}
                    label="Address"
                    placeholder={errors.address ? "Please Enter address" : "Address"}
                    hasError={errors.address}
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.address
                    }
                    onChange={(address) => {
                      onChange(address)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        address,
                      })
                    }}
                  />
                )}
                name="address"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="City"
                    placeholder={errors.city ? "Please Enter city" : "City"}
                    hasError={errors.city}
                    value={
                      Stores.registrationLocationsStore.registrationLocations?.city
                    }
                    onChange={(city) => {
                      onChange(city)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        city,
                      })
                    }}
                  />
                )}
                name="city"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="State"
                    placeholder={errors.state ? "Please Enter state" : "State"}
                    hasError={errors.state}
                    value={
                      Stores.registrationLocationsStore.registrationLocations?.state
                    }
                    onChange={(state) => {
                      onChange(state)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        state,
                      })
                    }}
                  />
                )}
                name="state"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Country"
                    placeholder={errors.country ? "Please Enter country" : "Country"}
                    hasError={errors.country}
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.country
                    }
                    onChange={(country) => {
                      onChange(country)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        country,
                      })
                    }}
                  />
                )}
                name="country"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Postcode"
                    placeholder={
                      errors.postcode ? "Please Enter postcode" : "Postcode"
                    }
                    type="number"
                    hasError={errors.postcode}
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.postcode
                    }
                    onChange={(postcode) => {
                      onChange(postcode)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        postcode,
                      })
                    }}
                  />
                )}
                name="postcode"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Customer Group"
                    hasError={errors.customerGroup}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.customerGroup
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const customerGroup = e.target.value
                        onChange(customerGroup)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            customerGroup,
                          }
                        )
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "CUSTOMER_GROUP"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="customerGroup"
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
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const category = e.target.value
                        onChange(category)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            category,
                          }
                        )
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
                    label="Telephone"
                    placeholder={
                      errors.telephone ? "Please Enter telephone" : "Telephone"
                    }
                    hasError={errors.telephone}
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.telephone
                    }
                    onChange={(telephone) => {
                      onChange(telephone)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        telephone,
                      })
                    }}
                  />
                )}
                name="telephone"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Mobile No"
                    placeholder={
                      errors.mobileNo ? "Please Enter mobileNo" : "Mobile No"
                    }
                    hasError={errors.mobileNo}
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.mobileNo
                    }
                    onChange={(mobileNo) => {
                      onChange(mobileNo)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
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
                    label="Email"
                    placeholder={errors.email ? "Please Enter email" : "Email"}
                    hasError={errors.email}
                    value={
                      Stores.registrationLocationsStore.registrationLocations?.email
                    }
                    onChange={(email) => {
                      onChange(email)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Delivery Type"
                    hasError={errors.deliveryType}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.deliveryType
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const deliveryType = e.target.value
                        onChange(deliveryType)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            deliveryType,
                          }
                        )
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Delivery Method"
                    hasError={errors.deliveryMethod}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.deliveryMethod
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const deliveryMethod = e.target.value
                        onChange(deliveryMethod)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            deliveryMethod,
                          }
                        )
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "DELIVERY_METHOD"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="deliveryMethod"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Corporate Code"
                    hasError={errors.corporateCode}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.corporateCode
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const corporateDetails = JSON.parse(e.target.value)
                        onChange(corporateDetails.corporateCode)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            corporateCode: corporateDetails.corporateCode,
                            invoiceAc: corporateDetails.invoiceAc,
                          }
                        )
                      }}
                    >
                      <option selected>Select</option>
                      {CorporateClientsStore.corporateClientsStore
                        .listCorporateClients &&
                        CorporateClientsStore.corporateClientsStore.listCorporateClients.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.corporateCode} - ${item.corporateName}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="corporateCode"
                rules={{ required: false }}
                defaultValue=""
              />
              <label className="hidden">
                {Stores.registrationLocationsStore.registrationLocations?.invoiceAc}
              </label>
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Invoice Ac"
                    placeholder="Invoice Ac"
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.invoiceAc
                        ? "border-red-500  "
                        : "border-gray-300"
                    } rounded-md`}
                    hasError={errors.invoiceAc}
                    disabled={true}
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.invoiceAc
                    }
                  />
                )}
                name="invoiceAc"
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
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.labLicence
                    }
                    onChange={(labLicence) => {
                      onChange(labLicence)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Method Coln"
                    hasError={errors.methodColn}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.methodColn
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const methodColn = e.target.value
                        onChange(methodColn)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            methodColn,
                          }
                        )
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "METHOD_COLN"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="methodColn"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Work HRS"
                    placeholder={
                      errors.workHrs ? "Please Enter workHrs" : "Work HRS"
                    }
                    hasError={errors.workHrs}
                    type="number"
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.workHrs
                    }
                    onChange={(workHrs) => {
                      onChange(workHrs)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        workHrs,
                      })
                    }}
                  />
                )}
                name="workHrs"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Sales TerritoRy"
                    hasError={errors.salesTerritoRy}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.salesTerritoRy
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const salesTerritoRy = e.target.value
                        onChange(salesTerritoRy)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            salesTerritoRy,
                          }
                        )
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "SPECIALITY"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="salesTerritoRy"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Area"
                    placeholder={errors.area ? "Please Enter area" : "Area"}
                    hasError={errors.area}
                    value={
                      Stores.registrationLocationsStore.registrationLocations?.area
                    }
                    onChange={(area) => {
                      onChange(area)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        area,
                      })
                    }}
                  />
                )}
                name="area"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Zone"
                    placeholder={errors.zone ? "Please Enter zone" : "Zone"}
                    hasError={errors.zone}
                    value={
                      Stores.registrationLocationsStore.registrationLocations?.zone
                    }
                    onChange={(zone) => {
                      onChange(zone)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        zone,
                      })
                    }}
                  />
                )}
                name="zone"
                rules={{ required: false }}
                defaultValue=""
              />

              <LibraryComponents.Atoms.Grid cols={5}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Confidential"
                      hasError={errors.confidential}
                      value={
                        Stores.registrationLocationsStore.registrationLocations
                          ?.confidential
                      }
                      onChange={(confidential) => {
                        onChange(confidential)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            confidential,
                          }
                        )
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
                      label="Print Label"
                      hasError={errors.printLabel}
                      value={
                        Stores.registrationLocationsStore.registrationLocations
                          ?.printLabel
                      }
                      onChange={(printLabel) => {
                        onChange(printLabel)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            printLabel,
                          }
                        )
                      }}
                    />
                  )}
                  name="printLabel"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Never Bill"
                      hasError={errors.neverBill}
                      value={
                        Stores.registrationLocationsStore.registrationLocations
                          ?.neverBill
                      }
                      onChange={(neverBill) => {
                        onChange(neverBill)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            neverBill,
                          }
                        )
                      }}
                    />
                  )}
                  name="neverBill"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Urgent"
                      hasError={errors.urgent}
                      value={
                        Stores.registrationLocationsStore.registrationLocations
                          ?.urgent
                      }
                      onChange={(urgent) => {
                        onChange(urgent)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            urgent,
                          }
                        )
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Route"
                    placeholder={errors.route ? "Please Enter route" : "Route"}
                    hasError={errors.route}
                    value={
                      Stores.registrationLocationsStore.registrationLocations?.route
                    }
                    onChange={(route) => {
                      onChange(route)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        route,
                      })
                    }}
                  />
                )}
                name="route"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Lab"
                    hasError={errors.lab}
                  >
                    <select
                      value={
                        Stores.registrationLocationsStore.registrationLocations?.lab
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.lab
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const lab = e.target.value as string
                        onChange(lab)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            lab,
                          }
                        )
                        if (
                          !Stores.registrationLocationsStore.registrationLocations
                            ?.existsVersionId
                        ) {
                          Stores.registrationLocationsStore.registrationLocationsService
                            .checkExitsLabEnvCode(
                              Stores.registrationLocationsStore.registrationLocations
                                ?.locationCode || "",
                              Stores.registrationLocationsStore.registrationLocations
                                ?.environment || "",
                              lab
                            )
                            .then((res) => {
                              if (res.success) {
                                Stores.registrationLocationsStore.updateExistsLabEnvCode(
                                  true
                                )
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.message}`,
                                })
                              } else
                                Stores.registrationLocationsStore.updateExistsLabEnvCode(
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
                    label="Location"
                    placeholder={
                      errors.location ? "Please Enter location" : "Location"
                    }
                    hasError={errors.location}
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.location
                    }
                    onChange={(location) => {
                      onChange(location)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        location,
                      })
                    }}
                  />
                )}
                name="location"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="EDI"
                    placeholder={errors.edi ? "Please Enter edi" : "EDI"}
                    hasError={errors.edi}
                    value={
                      Stores.registrationLocationsStore.registrationLocations?.edi
                    }
                    onChange={(edi) => {
                      onChange(edi)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        edi,
                      })
                    }}
                  />
                )}
                name="edi"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="EDI Address"
                    placeholder={
                      errors.ediAddress ? "Please Enter ediAddress" : "EDI Address"
                    }
                    hasError={errors.ediAddress}
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.ediAddress
                    }
                    onChange={(ediAddress) => {
                      onChange(ediAddress)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        ediAddress,
                      })
                    }}
                  />
                )}
                name="ediAddress"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Schedule"
                    hasError={errors.schedule}
                  >
                    <select
                      value={
                        Stores.registrationLocationsStore.registrationLocations
                          ?.schedule
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.schedule
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const schedule = e.target.value as string
                        onChange(schedule)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            schedule,
                          }
                        )
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
                name="schedule"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Report Format"
                    placeholder={
                      errors.reportFormat
                        ? "Please Enter reportFormat"
                        : "Report Format"
                    }
                    hasError={errors.reportFormat}
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.reportFormat
                    }
                    onChange={(reportFormat) => {
                      onChange(reportFormat)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
                        reportFormat,
                      })
                    }}
                  />
                )}
                name="reportFormat"
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
                    value={
                      Stores.registrationLocationsStore.registrationLocations?.info
                    }
                    onChange={(info) => {
                      onChange(info)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="FYI Line"
                    placeholder={
                      errors.fyiLine ? "Please Enter fyiLine" : "FYI Line"
                    }
                    hasError={errors.fyiLine}
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.fyiLine
                    }
                    onChange={(fyiLine) => {
                      onChange(fyiLine)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Work Line"
                    placeholder={
                      errors.workLine ? "Please Enter workLine" : "Work Line"
                    }
                    hasError={errors.workLine}
                    value={
                      Stores.registrationLocationsStore.registrationLocations
                        ?.workLine
                    }
                    onChange={(workLine) => {
                      onChange(workLine)
                      Stores.registrationLocationsStore.updateRegistrationLocations({
                        ...Stores.registrationLocationsStore.registrationLocations,
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
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            status,
                          }
                        )
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Environment"
                    hasError={errors.environment}
                  >
                    <select
                      value={
                        Stores.registrationLocationsStore.registrationLocations
                          ?.environment
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment
                          ? "border-red-500  "
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
                        Stores.registrationLocationsStore.updateRegistrationLocations(
                          {
                            ...Stores.registrationLocationsStore
                              .registrationLocations,
                            environment,
                          }
                        )
                        if (
                          !Stores.registrationLocationsStore.registrationLocations
                            ?.existsVersionId
                        ) {
                          Stores.registrationLocationsStore.registrationLocationsService
                            .checkExitsLabEnvCode(
                              Stores.registrationLocationsStore.registrationLocations
                                ?.locationCode || "",
                              environment,
                              Stores.registrationLocationsStore.registrationLocations
                                ?.lab || ""
                            )
                            .then((res) => {
                              if (res.success) {
                                Stores.registrationLocationsStore.updateExistsLabEnvCode(
                                  true
                                )
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.message}`,
                                })
                              } else
                                Stores.registrationLocationsStore.updateExistsLabEnvCode(
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
                          : Stores.registrationLocationsStore.registrationLocations
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
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={handleSubmit(onSubmitRegistrationLocation)}
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
          <FeatureComponents.Molecules.RegistrationLocationsList
            data={Stores.registrationLocationsStore.listRegistrationLocations || []}
            totalSize={
              Stores.registrationLocationsStore.listRegistrationLocationsCount
            }
            extraData={{
              lookupItems: stores.routerStore.lookupItems,
            }}
            isDelete={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
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
                body: `Update Section!`,
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
              Stores.registrationLocationsStore.fetchRegistrationLocations(
                page,
                limit
              )
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.registrationLocationsStore.registrationLocationsService
                .deleteRegistrationLocations(modalConfirm.id)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Registration Locations record deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.registrationLocationsStore.fetchRegistrationLocations()
                  }
                })
            } else if (type === "Update") {
              Stores.registrationLocationsStore.registrationLocationsService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Registration Locations record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.registrationLocationsStore.fetchRegistrationLocations()
                    window.location.reload()
                  }
                })
            } else if (type === "versionUpgrade") {
              Stores.registrationLocationsStore.updateRegistrationLocations({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: modalConfirm.data.version + 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
              })
              setValue("locationCode", modalConfirm.data.locationCode)
              setValue("locationName", modalConfirm.data.locationName)
              setValue("lab", modalConfirm.data.lab)
              setValue("environment", modalConfirm.data.environment)
            } else if (type === "duplicate") {
              Stores.registrationLocationsStore.updateRegistrationLocations({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
              })
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  )
})

export default RegistrationLocation
