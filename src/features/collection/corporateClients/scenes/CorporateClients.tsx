/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import dayjs from "dayjs"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"

import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"

const CorporateClients = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const { loginStore, labStore, corporateClientsStore, routerStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)

  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      corporateClientsStore.updateCorporateClients({
        ...corporateClientsStore.corporateClients,
        environment: loginStore.login.environment,
      })
      setValue("environment", loginStore.login.environment)
    }
  }, [loginStore.login])
  const onSubmitCoporateClients = () => {
    if (!corporateClientsStore.checkExistsEnvCode) {
      if (
        !corporateClientsStore.corporateClients?.existsVersionId &&
        !corporateClientsStore.corporateClients?.existsRecordId
      ) {
        corporateClientsStore.corporateClientsService
          .addCorporateClients({
            input: {
              ...corporateClientsStore.corporateClients,
              enteredBy: loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.createCorporateClient.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.createCorporateClient.message}`,
              })
              corporateClientsStore.fetchCorporateClients()
            }
          })
      } else if (
        corporateClientsStore.corporateClients?.existsVersionId &&
        !corporateClientsStore.corporateClients?.existsRecordId
      ) {
        corporateClientsStore.corporateClientsService
          .versionUpgradeCorporateClient({
            input: {
              ...corporateClientsStore.corporateClients,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.versionUpgradeCorporateClient.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.versionUpgradeCorporateClient.message}`,
              })
            }
          })
      } else if (
        !corporateClientsStore.corporateClients?.existsVersionId &&
        corporateClientsStore.corporateClients?.existsRecordId
      ) {
        corporateClientsStore.corporateClientsService
          .duplicateCorporateClient({
            input: {
              ...corporateClientsStore.corporateClients,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.duplicateCorporateClient.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.duplicateCorporateClient.message}`,
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
      {RouterFlow.checkPermission(routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddSection}
          onClick={() => setHideAddSection(!hideAddSection)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddSection ? "hidden" : "shown")
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
                        ? "Please Enter Date Creation "
                        : "Created By"
                    }
                    hasError={errors.dateCreation}
                    value={dayjs(
                      corporateClientsStore.corporateClients?.dateCreation
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
                    hasError={errors.dateActive}
                    placeholder={
                      errors.dateActive ? "Please Enter Date Active" : "Date Active"
                    }
                    value={dayjs(
                      corporateClientsStore.corporateClients?.dateActiveFrom
                    ).format("YYYY-MM-DD")}
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
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Date Expire"
                    hasError={errors.dateExpire}
                    placeholder={
                      errors.dateExpire ? "Please Enter Date Expire" : "Date Expire"
                    }
                    value={dayjs(
                      corporateClientsStore.corporateClients?.dateExpire
                    ).format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const dateExpire = new Date(e.target.value)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
                        dateExpire,
                      })
                    }}
                  />
                )}
                name="dateExpire"
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
                    value={corporateClientsStore.corporateClients?.version}
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
                    label="Entered By"
                    hasError={errors.enteredBy}
                    placeholder={
                      errors.enteredBy ? "Please Enter Entered By" : "Entered By"
                    }
                    value={loginStore.login?.userId}
                    disabled={true}
                  />
                )}
                name="enteredBy"
                rules={{ required: false }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Corporate Code"
                    placeholder={
                      errors.corporateCode
                        ? "Please Enter Coporate Code"
                        : "Coporate Code"
                    }
                    hasError={errors.corporateCode}
                    value={corporateClientsStore.corporateClients?.corporateCode}
                    onChange={(corporateCode) => {
                      onChange(corporateCode)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
                        corporateCode,
                      })
                    }}
                    onBlur={(code) => {
                      if (!corporateClientsStore.corporateClients?.existsVersionId) {
                        corporateClientsStore.corporateClientsService
                          .checkExistsEnvCode({
                            input: {
                              code,
                              env:
                                corporateClientsStore.corporateClients?.environment,
                            },
                          })
                          .then((res) => {
                            if (res.checkCorporateClientExistsRecord.success) {
                              corporateClientsStore.updateExistsEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkCorporateClientExistsRecord.message}`,
                              })
                            } else corporateClientsStore.updateExistsEnvCode(false)
                          })
                      }
                    }}
                  />
                )}
                name="corporateCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {corporateClientsStore.checkExistsEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Corporate Name"
                    placeholder={
                      errors.corporateName
                        ? "Please Enter Coporate Name"
                        : "Coporate Name"
                    }
                    hasError={errors.corporateName}
                    value={corporateClientsStore.corporateClients?.corporateName}
                    onChange={(corporateName) => {
                      onChange(corporateName)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
                        corporateName,
                      })
                    }}
                  />
                )}
                name="corporateName"
                rules={{ required: true }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Invoice AC"
                    placeholder={
                      errors.invoiceAc ? "Please Enter Invoice AC" : "Invoice AC"
                    }
                    hasError={errors.invoiceAc}
                    value={corporateClientsStore.corporateClients?.invoiceAc}
                    onChange={(invoiceAc) => {
                      onChange(invoiceAc)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
                        invoiceAc,
                      })
                    }}
                  />
                )}
                name="invoiceAc"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Price List"
                    hasError={errors.priceList}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.priceList ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const priceList = e.target.value
                        onChange(priceList)
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          priceList,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {[].map((item: any, index: number) => (
                        <option key={index} value={item}>
                          {`${item}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="priceList"
                rules={{ required: false }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Price Group"
                    placeholder={
                      errors.priceGroup ? "Please Enter Price Group" : "Price Group"
                    }
                    value={corporateClientsStore.corporateClients?.priceGroup}
                    hasError={errors.priceGroup}
                    onChange={(priceGroup) => {
                      onChange(priceGroup)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
                        priceGroup,
                      })
                    }}
                  />
                )}
                name="priceGroup"
                rules={{ required: false }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Billing on"
                    placeholder={
                      errors.billingOn ? "Please Enter Biling On" : "Billing On"
                    }
                    hasError={errors.billingOn}
                    value={corporateClientsStore.corporateClients?.billingOn}
                    onChange={(billingOn) => {
                      onChange(billingOn)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
                        billingOn,
                      })
                    }}
                  />
                )}
                name="billingOn"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={3}
                    label="Address"
                    placeholder={errors.address ? "Please Enter Address" : "Address"}
                    hasError={errors.address}
                    value={corporateClientsStore.corporateClients?.address}
                    onChange={(address) => {
                      onChange(address)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
                        address,
                      })
                    }}
                  />
                )}
                name="address"
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
                    label="City"
                    placeholder={errors.city ? "Please Enter City" : "City"}
                    hasError={errors.city}
                    value={corporateClientsStore.corporateClients?.city}
                    onChange={(city) => {
                      onChange(city)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
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
                    placeholder={errors.state ? "Please Enter State" : "State"}
                    hasError={errors.state}
                    value={corporateClientsStore.corporateClients?.state}
                    onChange={(state) => {
                      onChange(state)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
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
                    placeholder={errors.country ? "Please Enter Country" : "Country"}
                    hasError={errors.country}
                    value={corporateClientsStore.corporateClients?.country}
                    onChange={(country) => {
                      onChange(country)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
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
                      errors.postCode ? "Please Enter PostCode" : "Post Code"
                    }
                    hasError={errors.postCode}
                    type="number"
                    value={corporateClientsStore.corporateClients?.postcode}
                    onChange={(postcode) => {
                      onChange(postcode)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
                        postcode: parseInt(postcode),
                      })
                    }}
                  />
                )}
                name="postCode"
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
                        errors.customerGroup ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const customerGroup = e.target.value
                        onChange(customerGroup)
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          customerGroup,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
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
                        errors.category ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const category = e.target.value
                        onChange(category)
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          category,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Telephone"
                    placeholder={
                      errors.telephone ? "Please Enter Telephone" : "Telephone"
                    }
                    hasError={errors.telephone}
                    value={corporateClientsStore.corporateClients?.telephone}
                    onChange={(telephone) => {
                      onChange(telephone)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
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
                      errors.mobileNo ? "Please Enter Mobile No" : "Mobile No"
                    }
                    hasError={errors.mobileNo}
                    value={corporateClientsStore.corporateClients?.mobileNo}
                    onChange={(mobileNo) => {
                      onChange(mobileNo)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
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
                    placeholder={errors.email ? "Please Enter Email" : "Email"}
                    hasError={errors.email}
                    value={corporateClientsStore.corporateClients?.email}
                    onChange={(email) => {
                      onChange(email)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
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
                        errors.deliveryType ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const deliveryType = e.target.value
                        onChange(deliveryType)
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
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
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          deliveryMethod,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
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
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          salesTerritoRy,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
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
              <LibraryComponents.Atoms.Grid cols={5}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Confidential"
                      hasError={errors.confidential}
                      value={corporateClientsStore.corporateClients?.confidential}
                      onChange={(confidential) => {
                        onChange(confidential)
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
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
                      value={corporateClientsStore.corporateClients?.urgent}
                      onChange={(urgent) => {
                        onChange(urgent)
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Area"
                    placeholder={errors.area ? "Please Enter Area" : "Area"}
                    hasError={errors.area}
                    value={corporateClientsStore.corporateClients?.area}
                    onChange={(area) => {
                      onChange(area)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
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
                    placeholder={errors.zone ? "Please Enter Zone" : "Zone"}
                    hasError={errors.zone}
                    value={corporateClientsStore.corporateClients?.zone}
                    onChange={(zone) => {
                      onChange(zone)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
                        zone,
                      })
                    }}
                  />
                )}
                name="zone"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="EDI"
                    placeholder={errors.edi ? "Please Enter EDI" : "EDI"}
                    hasError={errors.edi}
                    value={corporateClientsStore.corporateClients?.edi}
                    onChange={(edi) => {
                      onChange(edi)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
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
                      errors.ediAddress ? "Please Enter EDI Address" : "EDI Address"
                    }
                    hasError={errors.ediAddress}
                    value={corporateClientsStore.corporateClients?.ediAddress}
                    onChange={(ediAddress) => {
                      onChange(ediAddress)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
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
                      value={corporateClientsStore.corporateClients?.schedule}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.schedule ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const schedule = e.target.value as string
                        onChange(schedule)
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          schedule,
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
                        ? "Please Enter Report Format"
                        : "ReportFormat"
                    }
                    hasError={errors.reportFormat}
                    value={corporateClientsStore.corporateClients?.reportFormat}
                    onChange={(reportFormat) => {
                      onChange(reportFormat)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
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
                    placeholder={errors.info ? "Please Enter INFO" : "INFO"}
                    hasError={errors.info}
                    value={corporateClientsStore.corporateClients?.info}
                    onChange={(info) => {
                      onChange(info)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
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
                    placeholder={errors.fyiLine ? "Please Enter FyiLine" : "FyiLine"}
                    hasError={errors.fyiLine}
                    value={corporateClientsStore.corporateClients?.fyiLine}
                    onChange={(fyiLine) => {
                      onChange(fyiLine)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
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
                      errors.workLine ? "Plese Enter WorkLine" : "WorkLine"
                    }
                    hasError={errors.workLine}
                    value={corporateClientsStore.corporateClients?.workLine}
                    onChange={(workLine) => {
                      onChange(workLine)
                      corporateClientsStore.updateCorporateClients({
                        ...corporateClientsStore.corporateClients,
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
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={corporateClientsStore.corporateClients?.environment}
                      disabled={
                        loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const environment = e.target.value
                        onChange(environment)
                        corporateClientsStore.updateCorporateClients({
                          ...corporateClientsStore.corporateClients,
                          environment,
                        })
                        if (
                          !corporateClientsStore.corporateClients?.existsVersionId
                        ) {
                          corporateClientsStore.corporateClientsService
                            .checkExistsEnvCode({
                              input: {
                                code:
                                  corporateClientsStore.corporateClients
                                    ?.corporateCode,
                                env: environment,
                              },
                            })
                            .then((res) => {
                              if (res.checkCorporateClientExistsRecord.success) {
                                corporateClientsStore.updateExistsEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkCorporateClientExistsRecord.message}`,
                                })
                              } else corporateClientsStore.updateExistsEnvCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : corporateClientsStore.corporateClients?.environment ||
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
              onClick={handleSubmit(onSubmitCoporateClients)}
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
          <FeatureComponents.Molecules.CorporateClient
            data={corporateClientsStore.listCorporateClients || []}
            totalSize={corporateClientsStore.listCoporateClientsCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
            }}
            isDelete={RouterFlow.checkPermission(
              routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              routerStore.userPermission,
              "Edit/Modify"
            )}
            // isEditModify={false}
            onDelete={(selectedItem) => setModalConfirm(selectedItem)}
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
            onPageSizeChange={(page, limit) => {
              corporateClientsStore.fetchCorporateClients(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              corporateClientsStore.corporateClientsService
                .deleteCorporateClients({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeCorporateClient.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeCorporateClient.message}`,
                    })
                    setModalConfirm({ show: false })
                    corporateClientsStore.fetchCorporateClients()
                  }
                })
            } else if (type === "Update") {
              corporateClientsStore.corporateClientsService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateCorporateClient.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateCorporateClient.message}`,
                    })
                    setModalConfirm({ show: false })
                    corporateClientsStore.fetchCorporateClients()
                  }
                })
            } else if (type === "versionUpgrade") {
              corporateClientsStore.updateCorporateClients({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: parseInt(modalConfirm.data.version + 1),
                dateActiveFrom: new Date(),
              })
              setValue("corporateCode", modalConfirm.data.corporateCode)
              setValue("corporateName", modalConfirm.data.corporateName)
              setValue("status", modalConfirm.data.status)
              setValue("environment", modalConfirm.data.environment)
              //clearErrors(["lab", "analyteCode", "analyteName", "environment"])
            } else if (type === "duplicate") {
              corporateClientsStore.updateCorporateClients({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
                dateActiveFrom: new Date(),
              })
              setValue("corporateCode", modalConfirm.data.corporateCode)
              setValue("corporateName", modalConfirm.data.corporateName)
              setValue("status", modalConfirm.data.status)
              setValue("environment", modalConfirm.data.environment)
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  )
})

export default CorporateClients
