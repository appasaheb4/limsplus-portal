/* eslint-disable */
import React, { useEffect, useState,useMemo } from "react"
import { observer } from "mobx-react"
import dayjs from "dayjs"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/stores"
import { RouterFlow } from "@lp/flows"

const RegistrationLocation = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const {
    loginStore,
    registrationLocationsStore,
    labStore,
    corporateClientsStore,
    routerStore,
    loading
  } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)

  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      registrationLocationsStore.updateRegistrationLocations({
        ...registrationLocationsStore.registrationLocations,
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
    registrationLocationsStore && registrationLocationsStore.updateRegistrationLocations({
        ...registrationLocationsStore.registrationLocations,
        status: status.code as string,
      })
    setValue("status", status.code as string)
  }
  const environment = routerStore.lookupItems.find((fileds)=>{
    return fileds.fieldName === 'ENVIRONMENT'
  })?. arrValue?.find((environmentItem)=>environmentItem.code === 'P')
  if(environment){
    registrationLocationsStore && registrationLocationsStore.updateRegistrationLocations({
      ...registrationLocationsStore.registrationLocations,
      environment: environment.code as string
    })
    setValue("environment",environment.code as string)
  }
  },[routerStore.lookupItems])

  const onSubmitRegistrationLocation = () => {
    if (!registrationLocationsStore.checkExitsLabEnvCode) {
      if (
        !registrationLocationsStore.registrationLocations?.existsVersionId &&
        !registrationLocationsStore.registrationLocations?.existsRecordId
      ) {
        registrationLocationsStore.registrationLocationsService
          .addRegistrationLocations({
            input: {
              ...registrationLocationsStore.registrationLocations,
              enteredBy: loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.createRegistrationLocation.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.createRegistrationLocation.message}`,
              })
            }
          })
      } else if (
        registrationLocationsStore.registrationLocations?.existsVersionId &&
        !registrationLocationsStore.registrationLocations?.existsRecordId
      ) {
        registrationLocationsStore.registrationLocationsService
          .versionUpgradeRegistrationLocations({
            input: {
              ...registrationLocationsStore.registrationLocations,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.versionUpgradeRegistrationLocation.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.versionUpgradeRegistrationLocation.message}`,
              })
            }
          })
      } else if (
        !registrationLocationsStore.registrationLocations?.existsVersionId &&
        registrationLocationsStore.registrationLocations?.existsRecordId
      ) {
        registrationLocationsStore.registrationLocationsService
          .duplicateRegistrationLocations({
            input: {
              ...registrationLocationsStore.registrationLocations,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.duplicateRegistrationLocation.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.duplicateRegistrationLocation.message}`,
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

  const tableView = useMemo(
    ()=>(
      <FeatureComponents.Molecules.RegistrationLocationsList
            data={registrationLocationsStore.listRegistrationLocations || []}
            totalSize={registrationLocationsStore.listRegistrationLocationsCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
              listLabs:labStore.listLabs
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
              registrationLocationsStore.fetchRegistrationLocations(page, limit)
            }}
            onFilter={(type, filter, page, limit) => {
              registrationLocationsStore.registrationLocationsService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
    ),
    [registrationLocationsStore.listRegistrationLocations]
  )

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
                        ? "Please Enter Date Creation"
                        : "Date Creation"
                    }
                    hasError={errors.dateCreation}
                    value={dayjs(
                      registrationLocationsStore.registrationLocations?.dateCreation
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
                      errors.dateActive
                        ? "Please enter date Active"
                        : "Date Active"
                    }
                    hasError={errors.dateActive}
                    value={dayjs(
                      registrationLocationsStore.registrationLocations
                        ?.dateActive
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
                    placeholder="Date Expire"
                    hasError={errors.dateActiveTo}
                    value={dayjs(
                      registrationLocationsStore.registrationLocations?.dateExpire
                    ).format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const dateExpire = new Date(e.target.value)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
                        dateExpire,
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
                    value={registrationLocationsStore.registrationLocations?.version}
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
                    placeholder="Entered By"
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Location Code"
                    hasError={errors.locationCode}
                    placeholder={
                      errors.locationCode
                        ? "Please Enter Location Code"
                        : "Loaction Code"
                    }
                    value={
                      registrationLocationsStore.registrationLocations?.locationCode
                    }
                    onChange={(locationCode) => {
                      onChange(locationCode)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
                        locationCode,
                      })
                    }}
                    onBlur={(code) => {
                      if (
                        !registrationLocationsStore.registrationLocations
                          ?.existsVersionId
                      ) {
                        registrationLocationsStore.registrationLocationsService
                          .checkExitsLabEnvCode({
                            input: {
                              code,
                              env:
                                registrationLocationsStore.registrationLocations
                                  ?.environment,
                              lab:
                                registrationLocationsStore.registrationLocations
                                  ?.lab,
                            },
                          })
                          .then((res) => {
                            if (res.checkRegistrationLocationExistsRecord.success) {
                              registrationLocationsStore.updateExistsLabEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkRegistrationLocationExistsRecord.message}`,
                              })
                            } else
                              registrationLocationsStore.updateExistsLabEnvCode(
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
              {registrationLocationsStore.checkExitsLabEnvCode && (
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
                      registrationLocationsStore.registrationLocations?.locationName
                    }
                    onChange={(locationName) => {
                      onChange(locationName)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                    value={registrationLocationsStore.registrationLocations?.address}
                    onChange={(address) => {
                      onChange(address)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                    value={registrationLocationsStore.registrationLocations?.city}
                    onChange={(city) => {
                      onChange(city)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                    value={registrationLocationsStore.registrationLocations?.state}
                    onChange={(state) => {
                      onChange(state)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                    value={registrationLocationsStore.registrationLocations?.country}
                    onChange={(country) => {
                      onChange(country)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                      registrationLocationsStore.registrationLocations?.postcode
                    }
                    onChange={(postcode) => {
                      onChange(postcode)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
                        postcode: parseInt(postcode),
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
                        errors.customerGroup ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const customerGroup = e.target.value
                        onChange(customerGroup)
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
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
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
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
                      registrationLocationsStore.registrationLocations?.telephone
                    }
                    onChange={(telephone) => {
                      onChange(telephone)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                      registrationLocationsStore.registrationLocations?.mobileNo
                    }
                    onChange={(mobileNo) => {
                      onChange(mobileNo)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                    value={registrationLocationsStore.registrationLocations?.email}
                    onChange={(email) => {
                      onChange(email)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
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
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
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
                    label="Corporate Code"
                    hasError={errors.corporateCode}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.corporateCode ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const corporateDetails = JSON.parse(e.target.value)
                        onChange(corporateDetails.corporateCode)
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          corporateCode: corporateDetails.corporateCode,
                          invoiceAc: corporateDetails.invoiceAc,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {corporateClientsStore.listCorporateClients &&
                        corporateClientsStore.listCorporateClients.map(
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
                {registrationLocationsStore.registrationLocations?.invoiceAc}
              </label>
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Invoice Ac"
                    placeholder="Invoice Ac"
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.invoiceAc ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    hasError={errors.invoiceAc}
                    disabled={true}
                    value={
                      registrationLocationsStore.registrationLocations?.invoiceAc
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
                      registrationLocationsStore.registrationLocations?.labLicence
                    }
                    onChange={(labLicence) => {
                      onChange(labLicence)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                        errors.methodColn ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const methodColn = e.target.value
                        onChange(methodColn)
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          methodColn,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
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
                    value={registrationLocationsStore.registrationLocations?.workHrs}
                    onChange={(workHrs) => {
                      onChange(workHrs)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
                        workHrs: parseInt(workHrs),
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
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Area"
                    placeholder={errors.area ? "Please Enter area" : "Area"}
                    hasError={errors.area}
                    value={registrationLocationsStore.registrationLocations?.area}
                    onChange={(area) => {
                      onChange(area)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                    value={registrationLocationsStore.registrationLocations?.zone}
                    onChange={(zone) => {
                      onChange(zone)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                        registrationLocationsStore.registrationLocations
                          ?.confidential
                      }
                      onChange={(confidential) => {
                        onChange(confidential)
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
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
                      label="Print Label"
                      hasError={errors.printLabel}
                      value={
                        registrationLocationsStore.registrationLocations?.printLabel
                      }
                      onChange={(printLabel) => {
                        onChange(printLabel)
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          printLabel,
                        })
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
                        registrationLocationsStore.registrationLocations?.neverBill
                      }
                      onChange={(neverBill) => {
                        onChange(neverBill)
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          neverBill,
                        })
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
                        registrationLocationsStore.registrationLocations?.urgent
                      }
                      onChange={(urgent) => {
                        onChange(urgent)
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
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
                    label="Route"
                    placeholder={errors.route ? "Please Enter route" : "Route"}
                    hasError={errors.route}
                    value={registrationLocationsStore.registrationLocations?.route}
                    onChange={(route) => {
                      onChange(route)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                    <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    
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
                            filter: {
                              type: "search",
                              ["name"]: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.name)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
                        lab:item.code,
                      })
                      labStore.updateLabList(
                        labStore.listLabsCopy
                      )
                      if (
                        !registrationLocationsStore.registrationLocations
                          ?.existsVersionId
                      ) {
                        registrationLocationsStore.registrationLocationsService
                          .checkExitsLabEnvCode({
                            input: {
                              code:
                                registrationLocationsStore.registrationLocations
                                  ?.locationCode,
                              env:
                                registrationLocationsStore.registrationLocations
                                  ?.environment,
                              lab:item.code,
                            },
                          })
                          .then((res) => {
                            if (
                              res.checkRegistrationLocationExistsRecord.success
                            ) {
                              registrationLocationsStore.updateExistsLabEnvCode(
                                true
                              )
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkRegistrationLocationExistsRecord.message}`,
                              })
                            } else
                              registrationLocationsStore.updateExistsLabEnvCode(
                                false
                              )
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
                    label="Location"
                    placeholder={
                      errors.location ? "Please Enter location" : "Location"
                    }
                    hasError={errors.location}
                    value={
                      registrationLocationsStore.registrationLocations?.location
                    }
                    onChange={(location) => {
                      onChange(location)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                    value={registrationLocationsStore.registrationLocations?.edi}
                    onChange={(edi) => {
                      onChange(edi)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                      registrationLocationsStore.registrationLocations?.ediAddress
                    }
                    onChange={(ediAddress) => {
                      onChange(ediAddress)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                    <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    placeholder="Search by name"
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
                              name: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.name)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
                        schedule:item.code,
                      })
                      labStore.updateLabList(
                        labStore.listLabsCopy
                      )
                      
                    }}
                    />
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
                      registrationLocationsStore.registrationLocations?.reportFormat
                    }
                    onChange={(reportFormat) => {
                      onChange(reportFormat)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                    value={registrationLocationsStore.registrationLocations?.info}
                    onChange={(info) => {
                      onChange(info)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                    value={registrationLocationsStore.registrationLocations?.fyiLine}
                    onChange={(fyiLine) => {
                      onChange(fyiLine)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                      registrationLocationsStore.registrationLocations?.workLine
                    }
                    onChange={(workLine) => {
                      onChange(workLine)
                      registrationLocationsStore.updateRegistrationLocations({
                        ...registrationLocationsStore.registrationLocations,
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
                    value={registrationLocationsStore && registrationLocationsStore.registrationLocations?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
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
                      value={
                        registrationLocationsStore.registrationLocations?.environment
                      }
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
                        registrationLocationsStore.updateRegistrationLocations({
                          ...registrationLocationsStore.registrationLocations,
                          environment,
                        })
                        if (
                          !registrationLocationsStore.registrationLocations
                            ?.existsVersionId
                        ) {
                          registrationLocationsStore.registrationLocationsService
                            .checkExitsLabEnvCode({
                              input: {
                                code:
                                  registrationLocationsStore.registrationLocations
                                    ?.locationCode,
                                env: environment,
                                lab:
                                  registrationLocationsStore.registrationLocations
                                    ?.lab,
                              },
                            })
                            .then((res) => {
                              if (
                                res.checkRegistrationLocationExistsRecord.success
                              ) {
                                registrationLocationsStore.updateExistsLabEnvCode(
                                  true
                                )
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkRegistrationLocationExistsRecord.message}`,
                                })
                              } else
                                registrationLocationsStore.updateExistsLabEnvCode(
                                  false
                                )
                            })
                        }
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : registrationLocationsStore.registrationLocations
                              ?.environment || `Select`}
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          {tableView}
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              registrationLocationsStore.registrationLocationsService
                .deleteRegistrationLocations({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeRegistrationLocation.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeRegistrationLocation.message}`,
                    })
                    setModalConfirm({ show: false })
                    registrationLocationsStore.fetchRegistrationLocations()
                  }
                })
            } else if (type === "Update") {
              registrationLocationsStore.registrationLocationsService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateRegistrationLocation.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateRegistrationLocation.message}`,
                    })
                    setModalConfirm({ show: false })
                    registrationLocationsStore.fetchRegistrationLocations()
                  }
                })
            } else if (type === "versionUpgrade") {
              registrationLocationsStore.updateRegistrationLocations({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: parseInt(modalConfirm.data.version + 1),
                dateActiveFrom: new Date(),
              })
              setValue("locationCode", modalConfirm.data.locationCode)
              setValue("locationName", modalConfirm.data.locationName)
              setValue("lab", modalConfirm.data.lab)
              setValue("status", modalConfirm.data.status)
              setValue("environment", modalConfirm.data.environment)
            } else if (type === "duplicate") {
              registrationLocationsStore.updateRegistrationLocations({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
                dateActiveFrom: new Date(),
              })
              setValue("locationCode", modalConfirm.data.locationCode)
              setValue("locationName", modalConfirm.data.locationName)
              setValue("lab", modalConfirm.data.lab)
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

export default RegistrationLocation
