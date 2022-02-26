/* eslint-disable */
import React, { useState, useMemo } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
  AutoCompleteFilterSingleSelect,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
} from "@/library/components"
import { DoctorsList } from "../components"
import { lookupItems, lookupValue, toTitleCase } from "@/library/utils"
import { useForm, Controller } from "react-hook-form"
import { DoctorsHoc } from "../hoc"
import { useStores } from "@/stores"
import { FormHelper } from "@/helper"

import { RouterFlow } from "@/flows"

const Doctors = DoctorsHoc(
  observer(() => {
    const {
      loginStore,
      labStore,
      routerStore,
      doctorsStore,
      loading,
      administrativeDivisions,
      registrationLocationsStore,
      salesTeamStore,
    } = useStores()
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm()

    setValue("status", doctorsStore.doctors?.status)
    setValue("environment", doctorsStore.doctors?.environment)

    const [modalConfirm, setModalConfirm] = useState<any>()
    const [hideAddSection, setHideAddSection] = useState<boolean>(true)
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
                Toast.success({
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
                Toast.success({
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
                Toast.success({
                  message: `😊 ${res.duplicateDoctors.message}`,
                })
              }
            })
        }
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        Toast.warning({
          message: `😔 Please enter diff code`,
        })
      }
    }

    const tableView = useMemo(
      () => (
        <DoctorsList
          data={doctorsStore.listDoctors || []}
          totalSize={doctorsStore.listDoctorsCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listLabs: labStore.listLabs,
            listAdministrativeDiv: administrativeDivisions.listAdministrativeDiv,
            labList:loginStore.login?.labList
          }}
          isDelete={RouterFlow.checkPermission(routerStore.userPermission, "Delete")}
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
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: "UpdateFileds",
              data: { fileds, id },
              title: "Are you sure?",
              body: `Update records!`,
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
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ""} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(routerStore.userPermission, "Add") && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddSection}
            onClick={() => setHideAddSection(!hideAddSection)}
          />
        )}
        <div className="mx-auto flex-wrap">
          <div
            className={
              "p-2 rounded-lg shadow-xl " + (hideAddSection ? "shown" : "shown")
            }
          >
            <Grid cols={3}>
              <List direction="col" space={4} justify="stretch" fill>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper label="Title" hasError={errors.title}>
                      <select
                        value={doctorsStore.doctors?.title}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.title ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const title = e.target.value
                          onChange(title)
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            title,
                            reportName: `${title}. ${toTitleCase(
                              doctorsStore.doctors?.doctorName
                            )}`,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, "TITLE").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name=" title"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
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
                          doctorCode: doctorCode.toUpperCase(),
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
                                Toast.error({
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
                    <Form.Input
                      label="Doctor Name"
                      placeholder={
                        errors.doctorName
                          ? "Please Enter Doctor Name"
                          : "Doctor Name"
                      }
                      hasError={errors.doctorName}
                      value={doctorsStore.doctors?.doctorName}
                      onChange={(doctorName) => {
                        onChange(doctorName)
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
                          doctorName: doctorName.toUpperCase(),
                          reportName: `${doctorsStore.doctors?.title}. ${toTitleCase(
                            doctorName
                          )}`,
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
                    <Form.Input
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
                          reportName: reportName,
                        })
                        setValue("reportName", doctorsStore.doctors?.title)
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
                    <Form.InputWrapper label="Sex" hasError={errors.sex}>
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
                        {["Male", "Female", "Other"].map(
                          (item: any, index: number) => (
                            <option key={index} value={item}>
                              {`${item}`}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="sex"
                  rules={{ required: false }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Doctor Type"
                      hasError={errors.doctorType}
                    >
                      <select
                      value={doctorsStore.doctors?.doctorType}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.doctorType ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const doctorType = e.target.value
                          onChange(doctorType)
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            doctorType,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, "DOCTOR_TYPE").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="doctorType"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Speciality"
                      hasError={errors.speciality}
                    >
                      <select
                        value={doctorsStore.doctors?.speciality}
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
                        {lookupItems(routerStore.lookupItems, "SPECIALITY").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="speciality"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper label="Category" hasError={errors.category}>
                      <select
                        value={doctorsStore.doctors?.category}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.category ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const category = e.target.value
                          onChange(category)
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            category,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, "CATEGORY").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="category"
                  rules={{ required: false }}
                  defaultValue=""
                />
                {administrativeDivisions.listAdministrativeDiv && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper
                        label="Country"
                        id="country"
                        hasError={errors.country}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          data={{
                            list: _.uniqBy(
                              administrativeDivisions.listAdministrativeDiv,
                              "country"
                            ),
                            displayKey: "country",
                            findKey: "country",
                          }}
                          hasError={errors.country}
                          onFilter={(value: string) => {
                            administrativeDivisions.administrativeDivisionsService.filter(
                              {
                                input: {
                                  filter: {
                                    type: "search",
                                    ["country"]: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              }
                            )
                          }}
                          onSelect={(item) => {
                            onChange(item.country)
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              country: item?.country?.toUpperCase(),
                            })
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name="country"
                    rules={{ required: true }}
                    defaultValue=""
                  />
                )}
                {(doctorsStore.doctors?.country ||
                  administrativeDivisions.listAdministrativeDiv) && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper
                        label="State"
                        id="state"
                        hasError={errors.state}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          disable={!doctorsStore.doctors?.country}
                          data={{
                            list: _.uniqBy(
                              administrativeDivisions.listAdministrativeDiv.filter(
                                (item) =>
                                  item.country === doctorsStore.doctors?.country
                              ),
                              "state"
                            ),
                            displayKey: "state",
                            findKey: "state",
                          }}
                          hasError={errors.state}
                          onFilter={(value: string) => {
                            administrativeDivisions.administrativeDivisionsService.filter(
                              {
                                input: {
                                  filter: {
                                    type: "search",
                                    country: labStore.labs.country,
                                    state: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              }
                            )
                          }}
                          onSelect={(item) => {
                            onChange(item.state)
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              state: item?.state?.toUpperCase(),
                            })
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name="state"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                )}
                {(doctorsStore.doctors?.state ||
                  administrativeDivisions.listAdministrativeDiv) && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper
                        label="District"
                        id="district"
                        hasError={errors.district}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          disable={!doctorsStore.doctors?.state}
                          data={{
                            list: _.uniqBy(
                              administrativeDivisions.listAdministrativeDiv.filter(
                                (item) =>
                                  item.country === doctorsStore.doctors?.country &&
                                  item.state === doctorsStore.doctors?.state
                              ),
                              "district"
                            ),
                            displayKey: "district",
                            findKey: "district",
                          }}
                          hasError={errors.district}
                          onFilter={(value: string) => {
                            administrativeDivisions.administrativeDivisionsService.filter(
                              {
                                input: {
                                  filter: {
                                    type: "search",
                                    country: labStore.labs.country,
                                    state: labStore.labs.state,
                                    district: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              }
                            )
                          }}
                          onSelect={(item) => {
                            onChange(item.district)
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              district: item?.district?.toUpperCase(),
                            })
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name="district"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                )}
                {(doctorsStore.doctors?.district ||
                  administrativeDivisions.listAdministrativeDiv) && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper
                        label="City"
                        id="city"
                        hasError={errors.city}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          disable={!doctorsStore.doctors?.district}
                          data={{
                            list: _.uniqBy(
                              administrativeDivisions.listAdministrativeDiv.filter(
                                (item) =>
                                  item.country === doctorsStore.doctors?.country &&
                                  item.state === doctorsStore.doctors?.state &&
                                  item.district === doctorsStore.doctors?.district
                              ),
                              "city"
                            ),
                            displayKey: "city",
                            findKey: "city",
                          }}
                          hasError={errors.city}
                          onFilter={(value: string) => {
                            administrativeDivisions.administrativeDivisionsService.filter(
                              {
                                input: {
                                  filter: {
                                    type: "search",
                                    country: doctorsStore.doctors?.country,
                                    state: doctorsStore.doctors?.state,
                                    district: doctorsStore.doctors?.district,
                                    city: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              }
                            )
                          }}
                          onSelect={(item) => {
                            onChange(item.city)
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              city: item?.city?.toUpperCase(),
                            })
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name="city"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                )}
                {(doctorsStore.doctors?.city ||
                  administrativeDivisions.listAdministrativeDiv) && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper
                        label="Area"
                        id="area"
                        hasError={errors.area}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          disable={!doctorsStore.doctors?.city}
                          data={{
                            list: _.uniqBy(
                              administrativeDivisions.listAdministrativeDiv.filter(
                                (item) =>
                                  item.country === doctorsStore.doctors?.country &&
                                  item.state === doctorsStore.doctors?.state &&
                                  item.district === doctorsStore.doctors?.district &&
                                  item.city === doctorsStore.doctors?.city
                              ),
                              "area"
                            ),
                            displayKey: "area",
                            findKey: "area",
                          }}
                          hasError={errors.area}
                          onFilter={(value: string) => {
                            administrativeDivisions.administrativeDivisionsService.filter(
                              {
                                input: {
                                  filter: {
                                    type: "search",
                                    country: doctorsStore.doctors?.country,
                                    state: doctorsStore.doctors?.state,
                                    district: doctorsStore.doctors?.district,
                                    city: doctorsStore.doctors?.city,
                                    area: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              }
                            )
                          }}
                          onSelect={(item) => {
                            onChange(item.area)
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              area: item?.area?.toUpperCase(),
                            })
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name="area"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                )}
                {(doctorsStore.doctors?.area ||
                  administrativeDivisions.listAdministrativeDiv) && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.InputWrapper
                        label="Postal Code"
                        id="postalCode"
                        hasError={errors.postalCode}
                      >
                        <AutoCompleteFilterSingleSelect
                          loader={loading}
                          disable={!doctorsStore.doctors?.area}
                          data={{
                            list: _.uniqBy(
                              administrativeDivisions.listAdministrativeDiv.filter(
                                (item) =>
                                  item.country === doctorsStore.doctors?.country &&
                                  item.state === doctorsStore.doctors?.state &&
                                  item.district === doctorsStore.doctors?.district &&
                                  item.city === doctorsStore.doctors?.city &&
                                  item.area === doctorsStore.doctors?.area
                              ),
                              "postalCode"
                            ),
                            displayKey: "postalCode",
                            findKey: "postalCode",
                          }}
                          hasError={errors.postalCode}
                          onFilter={(value: string) => {
                            administrativeDivisions.administrativeDivisionsService.filter(
                              {
                                input: {
                                  filter: {
                                    type: "search",
                                    country: doctorsStore.doctors?.country,
                                    state: doctorsStore.doctors?.state,
                                    district: doctorsStore.doctors?.district,
                                    city: doctorsStore.doctors?.city,
                                    area: doctorsStore.doctors?.area,
                                    postalCode: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              }
                            )
                          }}
                          onSelect={(item) => {
                            onChange(item.postalCode)
                            console.log({ item })
                            doctorsStore.updateDoctors({
                              ...doctorsStore.doctors,
                              postalCode: parseInt(item?.postalCode),
                              zone: item?.zone,
                              sbu: item?.sbu
                            })
                            administrativeDivisions.updateAdministrativeDivList(
                              administrativeDivisions.listAdministrativeDivCopy
                            )
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name="postalCode"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                )}
              </List>
              <List direction="col" space={4} justify="stretch" fill>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      label="SBU"
                      placeholder={errors.sbu ? "Please Enter sbu" : "SBU"}
                      hasError={errors.sbu}
                      value={doctorsStore.doctors?.sbu}
                      onChange={(sbu) => {
                        onChange(sbu)
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
                          sbu,
                        })
                      }}
                    />
                  )}
                  name="sbu"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
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
                    <Form.InputWrapper
                      label="Sales Territory"
                      hasError={errors.salesTerritoRy}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder="Search by sales territory"
                        data={{
                          list: _.uniqBy(
                            salesTeamStore.listSalesTeam,
                            "salesTerritory"
                          ),
                          displayKey: ["salesTerritory"],
                        }}
                        hasError={errors.salesTerritoRy}
                        onFilter={(value: string) => {
                          salesTeamStore.salesTeamService.filterByFields({
                            input: {
                              filter: {
                                fields: ["salesTerritory"],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          })
                        }}
                        onSelect={(item) => {
                          onChange(item.salesTerritory)
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            salesTerritoRy: item.salesTerritory,
                          })
                          salesTeamStore.updateSalesTeamList(
                            salesTeamStore.listSalesTeamCopy
                          )
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name="salesTerritoRy"
                  rules={{ required: false }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      label="Telephone"
                      placeholder={
                        errors.telephone ? "Please Enter telephone" : "Telephone"
                      }
                      type="number"
                      pattern={FormHelper.patterns.mobileNo}
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
                  rules={{ required: false,pattern:FormHelper.patterns.mobileNo }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      label="Mobile No"      
                      placeholder={
                        errors.mobileNo ? "Please Enter mobile no" : "Mobile No"
                      }
                      type="number"
                      pattern={FormHelper.patterns.mobileNo}
                      hasError={errors.mobileNo}
                      value={doctorsStore.doctors?.mobileNo}
                      onChange={(mobileNo) => {
                        console.log({mobileNo});
                        onChange(mobileNo)
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
                          mobileNo,
                        })
                      }}
                    />
                  )}
                  name="mobileNo"
                  rules={{ required: false, pattern: FormHelper.patterns.mobileNo }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
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
                    <Form.InputWrapper
                      label="Delivery Type"
                      hasError={errors.deliveryType}
                    >
                      <select
                        value={doctorsStore.doctors?.deliveryType}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.deliveryType
                            ? "border-red-500  "
                            : "border-gray-300"
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
                        {lookupItems(routerStore.lookupItems, "DELIVERY_TYPE").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="deliveryType"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Delivery Method"
                      hasError={errors.deliveryMethod}
                    >
                      <select
                        value={doctorsStore.doctors?.deliveryMethod}
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
                        {lookupItems(routerStore.lookupItems, "DELIVERY_METHOD").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="deliveryMethod"
                  rules={{ required: false }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Registartion Location"
                      hasError={errors.registrationLocation}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder="Search by locationCode or locationName"
                        data={{
                          list: registrationLocationsStore.listRegistrationLocations,
                          displayKey: ["locationCode", "locationName"],
                        }}
                        hasError={errors.registrationLocation}
                        onFilter={(value: string) => {
                          registrationLocationsStore.registrationLocationsService.filterByFields(
                            {
                              input: {
                                filter: {
                                  fields: ["locationCode", "locationName"],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            }
                          )
                        }}
                        onSelect={(item) => {
                          onChange(item.locationCode)
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            registrationLocation: item.locationCode,
                          })
                          registrationLocationsStore.updateRegistrationLocationsList(
                            registrationLocationsStore.listRegistrationLocationsCopy
                          )
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name="registrationLocation"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper label="Lab" hasError={errors.lab}>
                      <select
                        value={doctorsStore.doctors?.lab}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.lab ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const lab = e.target.value
                          console.log({ lab })

                          onChange(lab)
                          doctorsStore.updateDoctors({
                            ...doctorsStore.doctors,
                            lab,
                          })
                          labStore.updateLabList(labStore.listLabsCopy)
                          if (!doctorsStore.doctors?.existsVersionId) {
                            doctorsStore.doctorsService
                              .checkExitsLabEnvCode({
                                input: {
                                  code: doctorsStore.doctors?.doctorCode,
                                  env: doctorsStore.doctors?.environment,
                                  lab,
                                },
                              })
                              .then((res) => {
                                if (res.checkDoctorsExistsRecord.success) {
                                  doctorsStore.updateExistsLabEnvCode(true)
                                  Toast.error({
                                    message: `😔 ${res.checkDoctorsExistsRecord.message}`,
                                  })
                                } else doctorsStore.updateExistsLabEnvCode(false)
                              })
                          }
                        }}
                      >
                        <option selected>Select</option>
                        {loginStore.login?.labList?.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {`${item.code} - ${item.name}`}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="lab"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Clock
                      label="Opening Time"
                      hasError={errors.openingTime}
                      value={doctorsStore.doctors?.openingTime}
                      onChange={(openingTime) => {
                        onChange(openingTime)
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
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
                    <Form.Clock
                      label="Closing Time"
                      hasError={errors.closingTime}
                      value={doctorsStore.doctors?.closingTime}
                      onChange={(closingTime) => {
                        onChange(closingTime)
                        doctorsStore.updateDoctors({
                          ...doctorsStore.doctors,
                          closingTime,
                        })
                      }}
                    />
                  )}
                  name="closingTime"
                  rules={{ required: false }}
                  defaultValue=""
                />
              </List>
              <List direction="col" space={4} justify="stretch" fill>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
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
                    <Form.Input
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
                    <Form.Input
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
                    <Form.InputDateTime
                      label="Date Creation"
                      placeholder={
                        errors.dateCreation
                          ? "Please Enter dateCreation"
                          : "DateCreation"
                      }
                      hasError={errors.dateCreation}
                      value={doctorsStore.doctors?.dateCreation}
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
                    <Form.InputDateTime
                      label="Date Active"
                      placeholder={
                        errors.dateActive
                          ? "Please Enter DateActiveFrom"
                          : "DateActiveFrom"
                      }
                      hasError={errors.dateActive}
                      value={doctorsStore.doctors?.dateActive}
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
                    <Form.InputDateTime
                      label="Date Expire"
                      placeholder={
                        errors.dateActiveTo
                          ? "Please Enter DateActiveTo"
                          : "DateActiveTo"
                      }
                      hasError={errors.dateActiveTo}
                      value={doctorsStore.doctors?.dateExpire}
                      onChange={(dateExpire) => {
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
                    <Form.Input
                      label="Version"
                      placeholder={
                        errors.version ? "Please Enter Version" : "Version"
                      }
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
                    <Form.Input
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
                    <Form.InputWrapper label="Status" hasError={errors.status}>
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
                        {lookupItems(routerStore.lookupItems, "STATUS").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="status"
                  rules={{ required: true }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
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
                                  Toast.error({
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
                        {lookupItems(routerStore.lookupItems, "ENVIRONMENT").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          )
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name="environment"
                  rules={{ required: true }}
                  defaultValue=""
                />
                <Grid cols={5}>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Toggle
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
                      <Form.Toggle
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
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Toggle
                        label="Report Format"
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
                </Grid>
              </List>
            </Grid>
            <br />
            <List direction="row" space={3} align="center">
              <Buttons.Button
                size="medium"
                type="solid"
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitDoctors)}
              >
                Save
              </Buttons.Button>
              <Buttons.Button
                size="medium"
                type="outline"
                icon={Svg.Remove}
                onClick={() => {
                  window.location.reload()
                }}
              >
                Clear
              </Buttons.Button>
            </List>
          </div>
          <div className="p-2 rounded-lg shadow-xl overflow-auto">{tableView}</div>
          <ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === "Delete") {
                doctorsStore.doctorsService
                  .deleteDoctors({ input: { id: modalConfirm.id } })
                  .then((res: any) => {
                    if (res.removeDoctor.success) {
                      Toast.success({
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
                      Toast.success({
                        message: `😊 ${res.updateDoctor.message}`,
                      })
                      setModalConfirm({ show: false })
                      doctorsStore.fetchDoctors()
                    }
                  })
              } 
              else if (type === "UpdateFileds") {
                doctorsStore.doctorsService
                  .updateSingleFiled({
                    input: {
                      ...modalConfirm.data.fileds,
                      _id: modalConfirm.data.id,
                    },
                  })
                  .then((res: any) => {
                    if (res.updateDoctor.success) {
                      Toast.success({
                        message: `😊 ${res.updateDoctor.message}`,
                      })
                      setModalConfirm({ show: false })
                      doctorsStore.fetchDoctors()
                    }
                  })
              }else if (type === "versionUpgrade") {
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
                  version: parseInt(modalConfirm.data.version + 1),
                  dateActive: new Date(),
                })
                setHideAddSection(!hideAddSection)
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
)

export default Doctors
