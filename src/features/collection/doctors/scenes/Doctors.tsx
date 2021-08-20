/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"

// import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"
import { useForm, Controller } from "react-hook-form"
import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"

import { RouterFlow } from "@lp/flows"

const Doctors = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm()
  const {
		loginStore,
	} = useStores();
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)
  const [lookupItems, setLookupItems] = useState<any[]>([])

  const getLookupValues = async () => {
    const listLookup = LookupStore.lookupStore.listLookup
    if (listLookup.length > 0) {
      const selectedCategory: any = await Storage.getItem(
        `__persist_mobx_stores_routerStore_SelectedCategory__`
      )
      const items = listLookup.filter((item: any) => {
        if (
          item.documentName.name === selectedCategory.category &&
          item.documentName.children.name === selectedCategory.item
        )
          return item
      })
      if (items) {
        const status = items
          .find((fileds) => {
            return fileds.fieldName === "STATUS"
          })
          ?.arrValue?.find((statusItem) => statusItem.code === "A")
        if (status) {
          Stores.doctorsStore.updateDoctors({
            ...Stores.doctorsStore.doctors,
            status: status.code,
          })
        }
        setLookupItems(items)
      }
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])

  const onSubmitDoctors = () =>{
    const error = Utils.validate(
      Stores.doctorsStore.doctors,
      Utils.doctors
    )
    if (error === undefined) {
      
      if (
        !Stores.doctorsStore.doctors?.existsVersionId &&
        !Stores.doctorsStore.doctors?.existsRecordId
      ) {
        Stores.doctorsStore.doctorsService
          .addDoctors(Stores.doctorsStore.doctors)
          .then((res) => {
            
            if (res.status === 200) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 Doctor record created.`,
              })
            }
          })
      } else if (
        Stores.doctorsStore.doctors?.existsVersionId &&
        !Stores.doctorsStore.doctors?.existsRecordId
      ) {
        Stores.doctorsStore.doctorsService
          .versionUpgradeDoctors(Stores.doctorsStore.doctors)
          .then((res) => {
            
            if (res.status === 200) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 Doctor record version upgrade.`,
              })
            }
          })
      } else if (
        !Stores.doctorsStore.doctors?.existsVersionId &&
        Stores.doctorsStore.doctors?.existsRecordId
      ) {
        Stores.doctorsStore.doctorsService
          .duplicateDoctors(Stores.doctorsStore.doctors)
          .then((res) => {
            
            if (res.status === 200) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 Doctor record duplicate created.`,
              })
            }
          })
      }
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: `😔 Please enter all information!`,
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
                placeholder={errors.dateCreation ? "Please Enter dateCreation": "DateCreation"}
                hasError={errors.dateCreation}
                value={LibraryUtils.moment
                  .unix(Stores.doctorsStore.doctors?.dateCreation || 0)
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
                placeholder={errors.dateActiveFrom ? "Please Enter DateActiveFrom" : "DateActiveFrom"}
                hasError={errors.dateActiveFrom}
                value={LibraryUtils.moment
                  .unix(Stores.doctorsStore.doctors?.dateActiveFrom || 0)
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
                placeholder={errors.dateActiveTo ?  "Please Enter DateActiveTo" : "DateActiveTo"}
                hasError={errors.dateActiveTo}
                value={LibraryUtils.moment
                  .unix(Stores.doctorsStore.doctors?.dateActiveTo || 0)
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  onChange(schedule)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                placeholder={errors.version ? "Please Enter Version" :"Version"}
                hasError={errors.version}
                value={Stores.doctorsStore.doctors?.version}
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
                placeholder={errors.keyNum ? "Please Enter KeyNum" : "KeyNum"}
                hasError={errors.keyNum}
                value={Stores.doctorsStore.doctors?.keyNum}
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
                placeholder={errors.userId ? "Please Enter userId" : "EnterEd By"}
                hasError={errors.userId }
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
                label="Doctor Code"
                hasError={errors.doctorCode}
                placeholder={errors.doctorCode ? "Please Enter Code" : "Doctor Code"}
                value={Stores.doctorsStore.doctors?.doctorCode}
                onChange={(doctorCode) => {
                  onChange(doctorCode)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    doctorCode,
                  })
                }}
              />
              )}
                 name="DoctorCode"
                 rules={{ required: true }}
                 defaultValue=""
               />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Doctor Name"
                placeholder={errors.doctorName ? "Please Enter Doctor Name" : "Doctor Name"}
                value={Stores.doctorsStore.doctors?.doctorName}
                onChange={(doctorName) => {
                  onChange(doctorName)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Sex" hasError={errors.sex}>
                <select
                 className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                  errors.sex
                    ? "border-red-500  focus:border-red-500"
                    : "border-gray-200"
                } rounded-md`}
                  onChange={(e) => {
                    const sex = e.target.value
                    onChange(sex)
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Title" hasError={errors.title}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.title
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const title = e.target.value
                    onChange( title)
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      title,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "TITLE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
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
                placeholder={errors.firstName ? "Please Enter firstName" : "First Name"}
                hasError={errors.firstName}
                value={Stores.doctorsStore.doctors?.firstName}
                onChange={(firstName) => {
                  onChange(firstName)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                value={Stores.doctorsStore.doctors?.middleName}
                onChange={(middleName) => {
                  onChange(middleName)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                placeholder={errors.lastName ? "Please Enter lastName" : "Last Name"}
                hasError={errors.lastName}
                value={Stores.doctorsStore.doctors?.lastName}
                onChange={(lastName) => {
                  onChange(lastName)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                placeholder={errors.reportName ? "Please Enter reportName" :"Report Name"}
                hasError={errors.reportName}
                value={Stores.doctorsStore.doctors?.reportName}
                onChange={(reportName) => {
                  onChange(reportName)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                value={Stores.doctorsStore.doctors?.address}
                onChange={(address) => {
                  onChange(address)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                value={Stores.doctorsStore.doctors?.city}
                onChange={(city) => {
                  onChange(city)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                value={Stores.doctorsStore.doctors?.state}
                hasError={errors.state}
                onChange={(state) => {
                  onChange(state)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                value={Stores.doctorsStore.doctors?.country}
                onChange={(country) => {
                  onChange(country)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                placeholder={errors.postcode ? "Please Enter postcode" : "Postcode"}
                type="number"
                hasError={errors.postcode}
                value={Stores.doctorsStore.doctors?.postcode}
                onChange={(postcode) => {
                  onChange(postcode)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
              <LibraryComponents.Atoms.Form.Input
                label="Doctor Type"
                placeholder={errors.doctorType ? "Please Enter doctorType" : "Doctor Type"}
                hasError={errors.doctorType}
                value={Stores.doctorsStore.doctors?.doctorType}
                onChange={(doctorType) => {
                  onChange(doctorType)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Speciality" hasError={errors.speciality}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.speciality
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const speciality = e.target.value
                    onChange(speciality)
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      speciality,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SPECIALITY").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Sales TerritoRy" hasError={errors.salesTerritoRy}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.salesTerritoRy
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const salesTerritoRy = e.target.value
                    onChange(salesTerritoRy)
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      salesTerritoRy,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SPECIALITY").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
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
                value={Stores.doctorsStore.doctors?.area}
                onChange={(area) => {
                  onChange(area)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                value={Stores.doctorsStore.doctors?.zone}
                onChange={(zone) => {
                  onChange(zone)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                placeholder={errors.telephone ? "Please Enter telephone" : "Telephone"}
                hasError={errors.telephone}
                value={Stores.doctorsStore.doctors?.telephone}
                onChange={(telephone) => {
                  onChange(telephone)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                placeholder={errors.mobileNo ? "Please Enter mobileNo" : "Mobile No"}
                hasError={errors.mobileNo}
                value={Stores.doctorsStore.doctors?.mobileNo}
                onChange={(mobileNo) => {
                  onChange(mobileNo)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                value={Stores.doctorsStore.doctors?.email}
                onChange={(email) => {
                  onChange(email)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                placeholder={errors.workHours ? "Please Enter workHours" : "Work Hours"}
                type="number"
                hasError={errors.workHours}
                value={Stores.doctorsStore.doctors?.workHours}
                onChange={(workHours) => {
                  onChange(workHours)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
                    workHours,
                  })
                }}
              />
              )}
               name="workHours"
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
                  value={Stores.doctorsStore.doctors?.confidential}
                  onChange={(confidential) => {
                    onChange(confidential)
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
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
                  value={Stores.doctorsStore.doctors?.urgent}
                  onChange={(urgent) => {
                    onChange(urgent)
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Type" hasError={errors.deliveryType}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.deliveryType
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const deliveryType = e.target.value
                    onChange(deliveryType)
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      deliveryType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "DELIVERY_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Method" hasError={errors.deliveryMethod}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.deliveryMethod
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const deliveryMethod = e.target.value
                    onChange(deliveryMethod)
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      deliveryMethod,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "DELIVERY_METHOD").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
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
                value={Stores.doctorsStore.doctors?.edi}
                onChange={(edi) => {
                  onChange(edi)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                placeholder={errors.ediAddress ? "Please Enter Edi Address" : "EDI Address"}
                hasError={errors.ediAddress}
                value={Stores.doctorsStore.doctors?.ediAddress}
                onChange={(ediAddress) => {
                  onChange(ediAddress)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Registartion Location" hasError={errors.registrationLocation}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.registrationLocation
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const registrationLocation = e.target.value
                    onChange(registrationLocation)
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      registrationLocation,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "STATUS").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Lab" hasError={errors.lab}>
                <select
                  value={Stores.doctorsStore.doctors?.lab}
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.lab
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const lab = e.target.value as string
                    onChange(lab)
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      lab,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LabStores.labStore.listLabs.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="lab"
              rules={{ required: false }}
                defaultValue=""
              />
              <Controller
              control={control}
               render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Location" hasError={errors.location}>
                <select
                  value={Stores.doctorsStore.doctors?.location}
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.location
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const location = e.target.value as string
                    onChange(location)
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      location,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LabStores.labStore.listLabs.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="location"
              rules={{ required: false }}
                defaultValue=""
              />
              <Controller
              control={control}
               render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Schedule" hasError={errors.schedule}>
                <select
                  value={Stores.doctorsStore.doctors?.schedule}
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.schedule
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const schedule = e.target.value as string
                    onChange(schedule)
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      schedule,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LabStores.labStore.listLabs.map((item: any, index: number) => (
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
                placeholder={errors.reportFormat ? "Please Enter reportFormat" : "Report Format"}
                hasError={errors.reportFormat}
                value={Stores.doctorsStore.doctors?.reportFormat}
                onChange={(reportFormat) => {
                  onChange(reportFormat)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                value={Stores.doctorsStore.doctors?.info}
                onChange={(info) => {
                  onChange(info)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                placeholder={errors.fyiLine ? "Please Enter fyiLine" : "FYI Line"}
                hasError={errors.fyiLine}
                value={Stores.doctorsStore.doctors?.fyiLine}
                onChange={(fyiLine) => {
                  onChange(fyiLine)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
                placeholder={errors.workLine ? "Please Enter workLine"  : "Work Line"}
                hasError={errors.workLine}
                value={Stores.doctorsStore.doctors?.workLine}
                onChange={(workLine) => {
                  onChange(workLine)
                  Stores.doctorsStore.updateDoctors({
                    ...Stores.doctorsStore.doctors,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Status" hasError={errors.status}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.status
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const status = e.target.value
                    onChange(status)
                    Stores.doctorsStore.updateDoctors({
                      ...Stores.doctorsStore.doctors,
                      status,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "STATUS").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="status"
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
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.DoctorsList
            data={Stores.doctorsStore.listDoctors || []}
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
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              
              Stores.doctorsStore.doctorsService
                .deleteDoctors(modalConfirm.id)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Doctors record deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.doctorsStore.fetchDoctors()
                  }
                })
            } else if (type === "Update") {
              
              Stores.doctorsStore.doctorsService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Doctors record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.doctorsStore.fetchDoctors()
                    window.location.reload()
                  }
                })
            } else if (type === "versionUpgrade") {
              Stores.doctorsStore.updateDoctors({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: modalConfirm.data.version + 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
              })
            } else if (type === "duplicate") {
              Stores.doctorsStore.updateDoctors({
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

export default Doctors
