/* eslint-disable */
import React, { useEffect, useState,useMemo } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import dayjs from "dayjs"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"

const Doctors = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const { loginStore, labStore, routerStore, doctorsStore ,loading} = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)

  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      doctorsStore.updateDoctors({
        ...doctorsStore.doctors,
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
    doctorsStore && doctorsStore.updateDoctors({
        ...doctorsStore.doctors,
        status: status.code as string,
      })
    setValue("status", status.code as string)
  }
  const environment = routerStore.lookupItems.find((fileds)=>{
    return fileds.fieldName === 'ENVIRONMENT'
  })?. arrValue?.find((environmentItem)=>environmentItem.code === 'P')
  if(environment){
    doctorsStore && doctorsStore.updateDoctors({
      ...doctorsStore.doctors,
      environment: environment.code as string
    })
    setValue("environment",environment.code as string)
  }
  },[routerStore.lookupItems])

  const onSubmitDoctors = () => {
    if (!doctorsStore.checkExitsLabEnvCode) {
      if (
        !doctorsStore.doctors?.existsVersionId &&
        !doctorsStore.doctors?.existsRecordId
      ) {
        doctorsStore.doctorsService
          .addDoctors({
            input: {
              ...doctorsStore.doctors,
              enteredBy: loginStore.login.userId,
            },
          })
          .then((res) => {
            if (res.createDoctor.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.createDoctor.message}`,
              })
            }
          })
      } else if (
        doctorsStore.doctors?.existsVersionId &&
        !doctorsStore.doctors?.existsRecordId
      ) {
        doctorsStore.doctorsService
          .versionUpgradeDoctors({
            input: {
              ...doctorsStore.doctors,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.versionUpgradeDoctors.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.versionUpgradeDoctors.message}`,
              })
            }
          })
      } else if (
        !doctorsStore.doctors?.existsVersionId &&
        doctorsStore.doctors?.existsRecordId
      ) {
        doctorsStore.doctorsService
          .duplicateDoctors({
            input: {
              ...doctorsStore.doctors,
              enteredBy: loginStore.login.userId,
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.duplicateDoctors.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.duplicateDoctors.message}`,
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

  const tableView = useMemo(
    ()=>(
      <FeatureComponents.Molecules.DoctorsList
      data={doctorsStore.listDoctors || []}
      totalSize={doctorsStore.listDoctorsCount}
      extraData={{
        lookupItems: routerStore.lookupItems,
        listLabs: labStore.listLabs
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
        doctorsStore.fetchDoctors(page, limit)
      }}
      onFilter={(type, filter, page, limit) => {
        doctorsStore.doctorsService.filter({
          input: { type, filter, page, limit },
        })
      }}
    />
    ),
    [doctorsStore.listDoctors]
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
                        ? "Please Enter dateCreation"
                        : "DateCreation"
                    }
                    hasError={errors.dateCreation}
                    value={dayjs(doctorsStore.doctors?.dateCreation).format(
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
                    placeholder={
                      errors.dateActive
                        ? "Please Enter DateActiveFrom"
                        : "DateActiveFrom"
                    }
                    hasError={errors.dateActive}
                    value={dayjs(doctorsStore.doctors?.dateActive).format(
                      "YYYY-MM-DD"
                    )}
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
                    placeholder={
                      errors.dateActiveTo
                        ? "Please Enter DateActiveTo"
                        : "DateActiveTo"
                    }
                    hasError={errors.dateActiveTo}
                    value={dayjs(doctorsStore.doctors?.dateExpire).format(
                      "YYYY-MM-DD"
                    )}
                    onChange={(e) => {
                      const dateExpire = new Date(e.target.value)
                      onChange(dateExpire)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    placeholder={errors.version ? "Please Enter Version" : "Version"}
                    hasError={errors.version}
                    value={doctorsStore.doctors?.version}
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
                    placeholder={
                      errors.userId ? "Please Enter userId" : "EnterEd By"
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Doctor Code"
                    hasError={errors.doctorCode}
                    placeholder={
                      errors.doctorCode ? "Please Enter Code" : "Doctor Code"
                    }
                    value={doctorsStore.doctors?.doctorCode}
                    onChange={(doctorCode) => {
                      onChange(doctorCode)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
                        doctorCode,
                      })
                    }}
                    onBlur={(code) => {
                      if (!doctorsStore.doctors?.existsVersionId) {
                        doctorsStore.doctorsService
                          .checkExitsLabEnvCode({
                            input: {
                              code,
                              env: doctorsStore.doctors?.environment,
                              lab: doctorsStore.doctors?.lab,
                            },
                          })
                          .then((res) => {
                            if (res.checkDoctorsExistsRecord.success) {
                              doctorsStore.updateExistsLabEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkDoctorsExistsRecord.message}`,
                              })
                            } else doctorsStore.updateExistsLabEnvCode(false)
                          })
                      }
                    }}
                  />
                )}
                name="doctorCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {doctorsStore.checkExitsLabEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Doctor Name"
                    placeholder={
                      errors.doctorName ? "Please Enter Doctor Name" : "Doctor Name"
                    }
                    hasError={errors.doctorName}
                    value={doctorsStore.doctors?.doctorName}
                    onChange={(doctorName) => {
                      onChange(doctorName)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
                        doctorName,
                      })
                    }}
                  />
                )}
                name="doctorName"
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
                        const sex = e.target.value
                        onChange(sex)
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
                          sex,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {["Male", "Female"].map((item: any, index: number) => (
                        <option key={index} value={item}>
                          {`${item}`}
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Title"
                    hasError={errors.title}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.title ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const title = e.target.value
                        onChange(title)
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
                          title,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "TITLE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name=" title"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="First Name"
                    placeholder={
                      errors.firstName ? "Please Enter firstName" : "First Name"
                    }
                    hasError={errors.firstName}
                    value={doctorsStore.doctors?.firstName}
                    onChange={(firstName) => {
                      onChange(firstName)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
                        firstName,
                      })
                    }}
                  />
                )}
                name="firstName"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Middle Name"
                    placeholder={errors.middleName ? "Please Enter" : "Middle Name"}
                    hasError={errors.middleName}
                    value={doctorsStore.doctors?.middleName}
                    onChange={(middleName) => {
                      onChange(middleName)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
                        middleName,
                      })
                    }}
                  />
                )}
                name="middleName"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Last Name"
                    placeholder={
                      errors.lastName ? "Please Enter lastName" : "Last Name"
                    }
                    hasError={errors.lastName}
                    value={doctorsStore.doctors?.lastName}
                    onChange={(lastName) => {
                      onChange(lastName)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
                        lastName,
                      })
                    }}
                  />
                )}
                name="lastName"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Report Name"
                    placeholder={
                      errors.reportName ? "Please Enter reportName" : "Report Name"
                    }
                    hasError={errors.reportName}
                    value={doctorsStore.doctors?.reportName}
                    onChange={(reportName) => {
                      onChange(reportName)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
                        reportName,
                      })
                    }}
                  />
                )}
                name="reportName"
                rules={{ required: false }}
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
                    value={doctorsStore.doctors?.address}
                    onChange={(address) => {
                      onChange(address)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    placeholder={errors.city ? "Please Enter city" : "City"}
                    hasError={errors.city}
                    value={doctorsStore.doctors?.city}
                    onChange={(city) => {
                      onChange(city)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    value={doctorsStore.doctors?.state}
                    hasError={errors.state}
                    onChange={(state) => {
                      onChange(state)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    value={doctorsStore.doctors?.country}
                    onChange={(country) => {
                      onChange(country)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    value={doctorsStore.doctors?.postcode}
                    onChange={(postcode) => {
                      onChange(postcode)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Doctor Type"
                    placeholder={
                      errors.doctorType ? "Please Enter doctorType" : "Doctor Type"
                    }
                    hasError={errors.doctorType}
                    value={doctorsStore.doctors?.doctorType}
                    onChange={(doctorType) => {
                      onChange(doctorType)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
                        doctorType,
                      })
                    }}
                  />
                )}
                name="doctorType"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Speciality"
                    hasError={errors.speciality}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.speciality ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const speciality = e.target.value
                        onChange(speciality)
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
                          speciality,
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
                name="speciality"
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
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
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
                    placeholder={errors.area ? "Please Enter Area" : "Area"}
                    hasError={errors.area}
                    value={doctorsStore.doctors?.area}
                    onChange={(area) => {
                      onChange(area)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    value={doctorsStore.doctors?.zone}
                    onChange={(zone) => {
                      onChange(zone)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    label="Telephone"
                    placeholder={
                      errors.telephone ? "Please Enter telephone" : "Telephone"
                    }
                    hasError={errors.telephone}
                    value={doctorsStore.doctors?.telephone}
                    onChange={(telephone) => {
                      onChange(telephone)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    value={doctorsStore.doctors?.mobileNo}
                    onChange={(mobileNo) => {
                      onChange(mobileNo)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    value={doctorsStore.doctors?.email}
                    onChange={(email) => {
                      onChange(email)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Work Hours"
                    placeholder={
                      errors.workHours ? "Please Enter workHours" : "Work Hours"
                    }
                    type="number"
                    hasError={errors.workHours}
                    value={doctorsStore.doctors?.workHours}
                    onChange={(workHours) => {
                      onChange(workHours)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
                        workHours: parseInt(workHours),
                      })
                    }}
                  />
                )}
                name="workHours"
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
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
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

              <LibraryComponents.Atoms.Grid cols={5}>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Confidential"
                      hasError={errors.confidential}
                      value={doctorsStore.doctors?.confidential}
                      onChange={(confidential) => {
                        onChange(confidential)
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
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
                      value={doctorsStore.doctors?.urgent}
                      onChange={(urgent) => {
                        onChange(urgent)
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
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
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="EDI"
                    placeholder={errors.edi ? "Please Enter edi" : "EDI"}
                    hasError={errors.edi}
                    value={doctorsStore.doctors?.edi}
                    onChange={(edi) => {
                      onChange(edi)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                      errors.ediAddress ? "Please Enter Edi Address" : "EDI Address"
                    }
                    hasError={errors.ediAddress}
                    value={doctorsStore.doctors?.ediAddress}
                    onChange={(ediAddress) => {
                      onChange(ediAddress)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    label="Registartion Location"
                    hasError={errors.registrationLocation}
                  >
                    <select

                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.registrationLocation
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const registrationLocation = e.target.value
                        onChange(registrationLocation)
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
                          registrationLocation,
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
                name="registrationLocation"
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
                            type: "search",
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
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
                        lab:item.code,
                      })
                      labStore.updateLabList(
                        labStore.listLabsCopy
                      )
                      if (!doctorsStore.doctors?.existsVersionId) {
                        doctorsStore.doctorsService
                          .checkExitsLabEnvCode({
                            input: {
                              code: doctorsStore.doctors?.doctorCode,
                              env: doctorsStore.doctors?.environment,
                              lab:item.code,
                            },
                          })
                          .then((res) => {
                            if (res.checkDoctorsExistsRecord.success) {
                              doctorsStore.updateExistsLabEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkDoctorsExistsRecord.message}`,
                              })
                            } else doctorsStore.updateExistsLabEnvCode(false)
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Location"
                    hasError={errors.location}
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
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
                        location:item.code,
                      })
                      labStore.updateLabList(
                        labStore.listLabsCopy
                      )
                      
                    }}
                    />
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="location"
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
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    value={doctorsStore.doctors?.reportFormat}
                    onChange={(reportFormat) => {
                      onChange(reportFormat)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    value={doctorsStore.doctors?.info}
                    onChange={(info) => {
                      onChange(info)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    value={doctorsStore.doctors?.fyiLine}
                    onChange={(fyiLine) => {
                      onChange(fyiLine)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    value={doctorsStore.doctors?.workLine}
                    onChange={(workLine) => {
                      onChange(workLine)
                      doctorsStore.updateDoctors({
                        ...doctorsStore.doctors,
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
                    value={doctorsStore && doctorsStore.doctors?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
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
                      value={doctorsStore.doctors?.environment}
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
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
                          environment,
                        })
                        if (!doctorsStore.doctors?.existsVersionId) {
                          doctorsStore.doctorsService
                            .checkExitsLabEnvCode({
                              input: {
                                code: doctorsStore.doctors?.doctorCode,
                                env: environment,
                                lab: doctorsStore.doctors?.lab,
                              },
                            })
                            .then((res) => {
                              if (res.checkDoctorsExistsRecord.success) {
                                doctorsStore.updateExistsLabEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkDoctorsExistsRecord.message}`,
                                })
                              } else doctorsStore.updateExistsLabEnvCode(false)
                            })
                        }
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : doctorsStore.doctors?.environment || `Select`}
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
              onClick={handleSubmit(onSubmitDoctors)}
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
              doctorsStore.doctorsService
                .deleteDoctors({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeDoctor.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeDoctor.message}`,
                    })
                    setModalConfirm({ show: false })
                    doctorsStore.fetchDoctors()
                  }
                })
            } else if (type === "Update") {
              doctorsStore.doctorsService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateDoctor.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateDoctor.message}`,
                    })
                    setModalConfirm({ show: false })
                    doctorsStore.fetchDoctors()
                  }
                })
            } else if (type === "versionUpgrade") {
              doctorsStore.updateDoctors({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: parseInt(modalConfirm.data.version + 1),
                dateActive: new Date(),
              })
              setValue("doctorCode", modalConfirm.data.doctorCode)
              setValue("doctorName", modalConfirm.data.doctorName)
              setValue("lab", modalConfirm.data.lab)
              setValue("status", modalConfirm.data.status)
              setValue("environment", modalConfirm.data.environment)
            } else if (type === "duplicate") {
              doctorsStore.updateDoctors({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
                dateActive: new Date(),
              })
              setValue("doctorCode", modalConfirm.data.doctorCode)
              setValue("doctorName", modalConfirm.data.doctorName)
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

export default Doctors
