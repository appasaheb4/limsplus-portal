/* eslint-disable */
import React, {  useEffect, useState } from "react"
import { observer } from "mobx-react"
import dayjs from "dayjs"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import "@lp/library/assets/css/accordion.css"
import * as FeatureComponents from "../../components"
import { useForm, Controller } from "react-hook-form"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"
import "react-accessible-accordion/dist/fancy-example.css"

import { PatientVisitHoc } from "../../hoc"
import { useStores } from "@lp/stores"
import { toJS } from "mobx"
import { RouterFlow } from "@lp/flows"
import { getAgeAndAgeUnit } from "../../utils"
import { FormHelper } from "@lp/helper"

interface PatientVisitProps {
  onModalConfirm?: (item: any) => void
}

const PatientVisit = PatientVisitHoc(
  observer((props: PatientVisitProps) => {
    const {
      loading,
      appStore,
      patientVisitStore,
      loginStore,
      routerStore,
      corporateClientsStore,
      registrationLocationsStore,
      doctorsStore,
    } = useStores()
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      clearErrors,
    } = useForm()
   
    useEffect(()=>{
      if (
        appStore.environmentValues?.LABID_AUTO_GENERATE?.value.toLowerCase() !== "no"
      ){
        setValue("labId", patientVisitStore.patientVisit.labId)
        clearErrors("labId")
      }
    },[patientVisitStore.patientVisit.labId])
         
    //console.log({ appStore })
    const [modalConfirm, setModalConfirm] = useState<any>()
    const [hideInputView, setHideInputView] = useState<boolean>(true)

    const onSubmitPatientVisit = () => {
      if (
        !patientVisitStore.checkExistsVisitId &&
        !patientVisitStore.checkExistsLabId
      ) {
        patientVisitStore.patientVisitService
          .addPatientVisit({
            input: {
              ...patientVisitStore.patientVisit,
              documentType: "patientVisit",
            },
          })
          .then((res) => {
            if (res.createPatientVisit.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.createPatientVisit.message}`,
              })
            }
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          })
      } else {
        LibraryComponents.Atoms.Toast.warning({
          message: `😔 Please enter diff visitId or labId`,
        })
      }
    }

    return (
      <>
        {patientVisitStore.patientVisit.patientName && (
          <LibraryComponents.Atoms.Heading
            title={`${patientVisitStore.patientVisit.pId} - ${patientVisitStore.patientVisit.patientName}`}
          />
        )}
        {RouterFlow.checkPermission(routerStore.userPermission, "Add") && (
          <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemoveBottom
            style={{ bottom: 140 }}
            show={hideInputView}
            onClick={() => setHideInputView(!hideInputView)}
          />
        )}
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideInputView ? "shown" : "shown")
          }
        >
          <div className="p-2 rounded-lg shadow-xl">
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
                      label="Visit Id"
                      placeholder={
                        errors.visitId ? "Please Enter Visit ID" : "Visit ID"
                      }
                      hasError={errors.visitId}
                      disabled={true}
                      value={patientVisitStore.patientVisit?.visitId}
                      onChange={(visitId) => {
                        onChange(visitId)
                        patientVisitStore.updatePatientVisit({
                          ...patientVisitStore.patientVisit,
                          visitId,
                        })
                      }}
                    />
                  )}
                  name="visitId"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      label="Lab Id"
                      placeholder={errors.labId ? "Please Enter Lab ID" : "Lab ID"}
                      hasError={errors.labId}
                      disabled={
                        appStore.environmentValues?.LABID_AUTO_GENERATE?.value.toLowerCase() !==
                        "no"
                      }
                      type="number"
                      value={patientVisitStore.patientVisit?.labId}
                      onChange={(labId) => {
                        onChange(labId)
                        patientVisitStore.updatePatientVisit({
                          ...patientVisitStore.patientVisit,
                          labId: parseFloat(labId),
                        })
                      }}
                      onBlur={(labId) => {
                        patientVisitStore.patientVisitService
                          .checkExistsRecord({
                            input: {
                              filter: {
                                labId: parseFloat(labId),
                                documentType: "patientVisit",
                              },
                            },
                          })
                          .then((res) => {
                            if (res.checkExistsPatientVisitRecord.success) {
                              patientVisitStore.updateExistsLabId(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkExistsPatientVisitRecord.message}`,
                              })
                            } else patientVisitStore.updateExistsLabId(false)
                          })
                      }}
                    />
                  )}
                  name="labId"
                  rules={{
                    required: true,
                    minLength: appStore.environmentValues?.LABID_LENGTH?.value || 4,
                    maxLength: appStore.environmentValues?.LABID_LENGTH?.value || 4,
                  }}
                  defaultValue=""
                />
                {appStore.environmentValues?.LABID_LENGTH?.value ? (
                  <span className="text-red-600 font-medium relative">
                    {`Lab id must be ${appStore.environmentValues?.LABID_LENGTH?.value} digit`}
                  </span>
                ) : (
                  <span className="text-red-600 font-medium relative">
                    Lab id must be 4 digit.
                  </span>
                )}

                {patientVisitStore.checkExistsLabId && (
                  <span className="text-red-600 font-medium relative">
                    Lab Id already exits. Please use diff lab Id.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="PId"
                      hasError={errors.pid}
                    >
                      <FeatureComponents.Orgransims.AutoCompleteFilterSingleSelectPid
                        hasError={errors.pid}
                        onSelect={(item) => {
                          onChange(item.pId)
                          const resultAge = LibraryUtils.calculateTimimg(
                            Math.abs(dayjs(item.birthDate).diff(new Date(), "days"))
                          )
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            pId: item.pId,
                            patientName: `${item.firstName} ${
                              item.middleName ? item.middleName : ""
                            } ${item.lastName}`,
                            age: getAgeAndAgeUnit(resultAge).age,
                            ageUnits: getAgeAndAgeUnit(resultAge).ageUnit,
                          })
                        }}
                      />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="pid"
                  rules={{ required: true }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Rlab"
                      hasError={errors.rLab}
                    >
                      <select
                        value={patientVisitStore.patientVisit?.rLab}
                        disabled={true}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.rLab ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const rLab = JSON.parse(e.target.value) as any
                          onChange(rLab)
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            rLab,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {loginStore.login?.labList &&
                          loginStore.login?.labList.map(
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
                  rules={{ required: false }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputDateTime
                      label="Visit Date"
                      placeholder={
                        errors.visitDate ? "Please Enter VisitDate" : "VisitDate"
                      }
                      hasError={errors.visitDate}
                      value={patientVisitStore.patientVisit.visitDate}
                      onChange={(visitDate) => {
                        onChange(visitDate)
                        patientVisitStore.updatePatientVisit({
                          ...patientVisitStore.patientVisit,
                          visitDate,
                        })
                      }}
                    />
                  )}
                  name="visitDate"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputDateTime
                      label="Registration Date"
                      name="txtRegistrationDate"
                      placeholder={
                        errors.registrationDate
                          ? "Please Enter RegistrationDate"
                          : "RegistrationDate"
                      }
                      hasError={errors.registrationDate}
                      value={patientVisitStore.patientVisit?.registrationDate}
                      onChange={(registrationDate) => {
                        onChange(registrationDate)
                        patientVisitStore.updatePatientVisit({
                          ...patientVisitStore.patientVisit,
                          registrationDate,
                        })
                      }}
                    />
                  )}
                  name="registrationDate"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputDateTime
                      label="Collection Date"
                      name="txtCollectionDate"
                      placeholder={
                        errors.collectionDate
                          ? "Please Enter Collection Date"
                          : "Collection Date"
                      }
                      hasError={errors.collectionDate}
                      value={patientVisitStore.patientVisit?.collectionDate}
                      onChange={(collectionDate) => {
                        patientVisitStore.updatePatientVisit({
                          ...patientVisitStore.patientVisit,
                          collectionDate,
                        })
                      }}
                    />
                  )}
                  name="dateReceived"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputDateTime
                      label="Due Date"
                      name="txtDueDate"
                      placeholder={
                        errors.dueDate ? "Please Enter Due Date" : "Due Date"
                      }
                      disabled={true}
                      hasError={errors.dueDate}
                      value={patientVisitStore.patientVisit?.dueDate}
                      onChange={(dueDate) => {
                        onChange(dueDate)
                        patientVisitStore.updatePatientVisit({
                          ...patientVisitStore.patientVisit,
                          dueDate,
                        })
                      }}
                    />
                  )}
                  name="dueDate"
                  rules={{ required: false }}
                  defaultValue=""
                />
                {patientVisitStore.patientVisit && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Input
                        label="Age"
                        name="txtAge"
                        disabled={true}
                        placeholder={errors.birthDate ? "Please Enter Age" : "Age"}
                        hasError={errors.age}
                        type="number"
                        value={patientVisitStore.patientVisit?.age}
                        onChange={(age) => {
                          onChange(age)
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            age: parseInt(age),
                          })
                        }}
                      />
                    )}
                    name="age"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                )}

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Age Units"
                      hasError={errors.ageUnits}
                    >
                      <select
                        disabled={true}
                        value={patientVisitStore.patientVisit?.ageUnits}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.ageUnits ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const ageUnits = e.target.value
                          onChange(ageUnits)
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            ageUnits,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {LibraryUtils.lookupItems(
                          routerStore.lookupItems,
                          "PATIENT VISIT - AGE_UNITS"
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {`${item.value} - ${item.code}`}
                          </option>
                        ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="ageUnits"
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
                {registrationLocationsStore.listRegistrationLocations && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.InputWrapper
                        label="Collection Center"
                        hasError={errors.collectionCenter}
                      >
                        <LibraryComponents.Molecules.AutoCompleteFilterSingleSelectMultiFieldsDisplay
                          loader={loading}
                          placeholder="Search by code or name"
                          data={{
                            list:
                              registrationLocationsStore.listRegistrationLocations,
                            displayKey: ["locationCode", "locationName"],
                          }}
                          displayValue={
                            patientVisitStore.patientVisit?.collectionCenter
                              ? `${patientVisitStore.patientVisit?.collectionCenter} - ${patientVisitStore.patientVisit?.collectionCenterName}`
                              : ""
                          }
                          hasError={errors.collectionCenter}
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
                            patientVisitStore.updatePatientVisit({
                              ...patientVisitStore.patientVisit,
                              collectionCenter: item.locationCode,
                              collectionCenterName: item.locationName,
                              acClass: item.acClass,
                              corporateCode: item.corporateCode,
                              extraData: {
                                ...patientVisitStore.patientVisit.extraData,
                                methodCollection: item.methodColn,
                                accountType: item.accountType,
                                invoiceAc: item.invoiceAc,
                              },
                            })
                            if (item.corporateCode) {
                              setValue("corporateCode", item.corporateCode)
                              clearErrors("corporateCode")
                            }
                            if (item.acClass) {
                              setValue("acClass", item.acClass)
                              clearErrors("acClass")
                            }
                            registrationLocationsStore.updateRegistrationLocationsList(
                              registrationLocationsStore.listRegistrationLocationsCopy
                            )
                          }}
                        />
                      </LibraryComponents.Atoms.Form.InputWrapper>
                    )}
                    name="collectionCenter"
                    rules={{ required: true }}
                    defaultValue=""
                  />
                )}
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Corporate Code"
                      hasError={errors.corporateCode}
                    >
                      <LibraryComponents.Molecules.AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder="Search by code or name"
                        displayValue={
                          patientVisitStore.patientVisit?.corporateCode &&
                          patientVisitStore.patientVisit?.corporateName
                            ? `${patientVisitStore.patientVisit?.corporateCode} - ${patientVisitStore.patientVisit?.corporateName}`
                            : patientVisitStore.patientVisit?.corporateCode
                            ? `${patientVisitStore.patientVisit?.corporateCode}`
                            : ""
                        }
                        data={{
                          list: corporateClientsStore.listCorporateClients,
                          displayKey: ["corporateCode", "corporateName"],
                        }}
                        hasError={errors.corporateCode}
                        onFilter={(value: string) => {
                          corporateClientsStore.corporateClientsService.filterByFields(
                            {
                              input: {
                                filter: {
                                  fields: ["corporateCode", "corporateName"],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            }
                          )
                        }}
                        onSelect={(item) => {
                          onChange(item.corporateCode)
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            corporateCode: item.corporateCode,
                            corporateName: item.corporateName,
                            extraData: {
                              ...patientVisitStore.patientVisit.extraData,
                              invoiceAc: item.invoiceAc,
                            },
                          })
                          corporateClientsStore.updateCorporateClientsList(
                            corporateClientsStore.listCorporateClientsCopy
                          )
                        }}
                      />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="corporateCode"
                  rules={{ required: true }}
                  defaultValue={patientVisitStore.patientVisit?.corporateCode}
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="AC Class"
                      hasError={errors.acClass}
                    >
                      <select
                        value={patientVisitStore.patientVisit?.acClass}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.acClass ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const acClass = e.target.value
                          onChange(acClass)
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            acClass,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {LibraryUtils.lookupItems(
                          routerStore.lookupItems,
                          "PATIENT VISIT - AC_CLASS"
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {`${item.code} - ${item.value}`}
                          </option>
                        ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="acClass"
                  rules={{ required: true }}
                  defaultValue={patientVisitStore.patientVisit?.acClass}
                />

                {doctorsStore.listDoctors && (
                  <>
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.InputWrapper
                          label="Doctor Id"
                          hasError={errors.doctorId}
                        >
                          <LibraryComponents.Molecules.AutoCompleteFilterSingleSelectMultiFieldsDisplay
                            loader={loading}
                            placeholder="Search by code or name"
                            displayValue={
                              patientVisitStore.patientVisit.doctorId
                                ? `${patientVisitStore.patientVisit.doctorId} - ${patientVisitStore.patientVisit.doctorName}`
                                : ""
                            }
                            data={{
                              list: doctorsStore.listDoctors,
                              displayKey: ["doctorCode", "doctorName"],
                            }}
                            hasError={errors.doctorId}
                            onFilter={(value: string) => {
                              doctorsStore.doctorsService.filterByFields({
                                input: {
                                  filter: {
                                    fields: ["doctorCode", "doctorName"],
                                    srText: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              })
                            }}
                            onSelect={(item) => {
                              onChange(item.doctorCode)
                              patientVisitStore.updatePatientVisit({
                                ...patientVisitStore.patientVisit,
                                doctorId: item.doctorCode,
                                doctorName: item.doctorName,
                              })
                              doctorsStore.updateDoctorsList(
                                doctorsStore.listDoctorsCopy
                              )
                            }}
                          />
                        </LibraryComponents.Atoms.Form.InputWrapper>
                      )}
                      name="doctorId"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                  </>
                )}

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Delivery Type"
                      hasError={errors.deliveryType}
                    >
                      <select
                        value={patientVisitStore.patientVisit.deliveryType}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.deliveryType
                            ? "border-red-500  "
                            : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const deliveryType = e.target.value as string
                          onChange(deliveryType)
                          patientVisitStore.updatePatientVisit({
                            ...patientVisitStore.patientVisit,
                            deliveryType,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {LibraryUtils.lookupItems(
                          routerStore.lookupItems,
                          "PATIENT VISIT - DELIVERY_TYPE"
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {LibraryUtils.lookupValue(item)}
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
                    <LibraryComponents.Atoms.Form.Toggle
                      label="History"
                      id="toggleHistory"
                      hasError={errors.history}
                      value={patientVisitStore.patientVisit?.history}
                      onChange={(history) => {
                        patientVisitStore.updatePatientVisit({
                          ...patientVisitStore.patientVisit,
                          history,
                        })
                      }}
                    />
                  )}
                  name="history"
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
                {patientVisitStore.patientVisit && (
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.InputWrapper
                        label="Status"
                        hasError={errors.status}
                      >
                        <select
                          value={patientVisitStore.patientVisit?.status}
                          disabled={true}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.status ? "border-red-500  " : "border-gray-300"
                          } rounded-md`}
                          onChange={(e) => {
                            const status = e.target.value
                            onChange(status)
                            patientVisitStore.updatePatientVisit({
                              ...patientVisitStore.patientVisit,
                              status,
                            })
                          }}
                        >
                          <option selected>Select</option>
                          {LibraryUtils.lookupItems(
                            routerStore.lookupItems,
                            "PATIENT VISIT - STATUS"
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
                )}
              </LibraryComponents.Atoms.List>
            </LibraryComponents.Atoms.Grid>
          </div>
          <br />
          <div className="extra" style={{ border: "1px solid yellow" }}>
            <Accordion allowZeroExpanded>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>EXTRA DATA</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <>
                    <LibraryComponents.Atoms.Grid cols={3}>
                      <LibraryComponents.Atoms.List
                        direction="col"
                        fill
                        space={4}
                        justify="stretch"
                      >
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Additional Information"
                              name="txtAdditionalInformation"
                              placeholder={
                                errors.additionalInfo
                                  ? "Please Enter AdditionalInformation"
                                  : "AdditionalInformation"
                              }
                              hasError={errors.additionalInfo}
                              value={
                                patientVisitStore.patientVisit?.extraData
                                  ?.additionalInfo
                              }
                              onChange={(additionalInfo) => {
                                onChange(additionalInfo)
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    additionalInfo,
                                  },
                                })
                              }}
                            />
                          )}
                          name="additionalInfo"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputWrapper
                              label="Invoice Ac"
                              hasError={errors.invoiceAc}
                            >
                              <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                                loader={loading}
                                placeholder="Search by code"
                                displayValue={
                                  patientVisitStore.patientVisit.extraData
                                    ?.invoiceAc || ""
                                }
                                disable={true}
                                data={{
                                  list: corporateClientsStore.listCorporateClients,
                                  displayKey: "invoiceAc",
                                }}
                                hasError={errors.invoiceAc}
                                onFilter={(value: string) => {
                                  corporateClientsStore.corporateClientsService.filterByFields(
                                    {
                                      input: {
                                        filter: {
                                          fields: ["invoiceAc"],
                                          srText: value,
                                        },
                                        page: 0,
                                        limit: 10,
                                      },
                                    }
                                  )
                                }}
                                onSelect={(item) => {
                                  onChange(item.invoice)
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit.extraData,
                                      invoiceAc: item.invoice,
                                    },
                                  })
                                  corporateClientsStore.updateCorporateClientsList(
                                    corporateClientsStore.listCorporateClientsCopy
                                  )
                                }}
                              />
                            </LibraryComponents.Atoms.Form.InputWrapper>
                          )}
                          name="invoiceAc"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputWrapper label="Billing Method">
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.billingMethod
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.billingMethod
                                    ? "border-red-500  "
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) => {
                                  const billingMethod = e.target.value
                                  onChange(billingMethod)
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit.extraData,
                                      billingMethod,
                                    },
                                  })
                                }}
                              >
                                <option selected>Select</option>
                                {LibraryUtils.lookupItems(
                                  routerStore.lookupItems,
                                  "PATIENT VISIT - BILLING_METHOD"
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {`${item.value} - ${item.code}`}
                                  </option>
                                ))}
                              </select>
                            </LibraryComponents.Atoms.Form.InputWrapper>
                          )}
                          name="billingMethod"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Bill Number"
                              name="txtBill Number"
                              placeholder={
                                errors.billNumber
                                  ? "Please Enter Bill Number"
                                  : "Bill Number"
                              }
                              hasError={errors.billNumber}
                              value={
                                patientVisitStore.patientVisit.extraData?.billNumber
                              }
                              onChange={(billNumber) => {
                                onChange(billNumber)
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    billNumber,
                                  },
                                })
                              }}
                            />
                          )}
                          name="billNumber"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputWrapper label="Method Collection">
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.methodCollection
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.methodCollection
                                    ? "border-red-500  "
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) => {
                                  const methodCollection = e.target.value
                                  onChange(methodCollection)
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit.extraData,
                                      methodCollection,
                                    },
                                  })
                                }}
                              >
                                <option selected>Select</option>
                                {LibraryUtils.lookupItems(
                                  routerStore.lookupItems,
                                  "PATIENT VISIT - METHOD_COLLECTION"
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {`${item.value} - ${item.code}`}
                                  </option>
                                ))}
                              </select>
                            </LibraryComponents.Atoms.Form.InputWrapper>
                          )}
                          name="methodCollection"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Collection By"
                              placeholder="Collected By"
                              hasError={errors.collectedBy}
                              value={
                                patientVisitStore.patientVisit?.extraData
                                  ?.collectedBy
                              }
                              onChange={(collectedBy) => {
                                onChange(collectedBy)
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    collectedBy,
                                  },
                                })
                              }}
                            />
                          )}
                          name="collectedBy"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputDateTime
                              label="Received Date"
                              name="txtReceivedDate"
                              disabled={true}
                              placeholder={
                                errors.receivedDate
                                  ? "Please Enter Received Date"
                                  : "Received Date"
                              }
                              hasError={errors.receivedDate}
                              value={
                                patientVisitStore.patientVisit.extraData
                                  ?.receivedDate
                              }
                              onChange={(receivedDate) => {
                                onChange(receivedDate)
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    receivedDate,
                                  },
                                })
                              }}
                            />
                          )}
                          name="receivedDate"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputDateTime
                              label="Result Date"
                              name="txtResultDate"
                              disabled={true}
                              placeholder={
                                errors.resultDate
                                  ? "Please Enter Result Date"
                                  : "Result Date"
                              }
                              hasError={errors.resultDate}
                              value={
                                patientVisitStore.patientVisit.extraData?.resultDate
                              }
                              onChange={(resultDate) => {
                                onChange(resultDate)
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    resultDate,
                                  },
                                })
                              }}
                            />
                          )}
                          name="resultDate"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <LibraryComponents.Atoms.Grid cols={2}>
                          <Controller
                            control={control}
                            render={({ field: { onChange } }) => (
                              <LibraryComponents.Atoms.Form.Toggle
                                label="Urgent"
                                id="toggleUrgent"
                                hasError={errors.urgent}
                                value={
                                  patientVisitStore.patientVisit.extraData?.urgent
                                }
                                onChange={(urgent) => {
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit.extraData,
                                      urgent,
                                    },
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
                              <LibraryComponents.Atoms.Form.Toggle
                                label="Pending Data Entry"
                                id="togglePendingDataEntry"
                                hasError={errors.pendingDataEntry}
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.pendingDataEntry
                                }
                                onChange={(pendingDataEntry) => {
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit.extraData,
                                      pendingDataEntry,
                                    },
                                  })
                                }}
                              />
                            )}
                            name="pendingDataEntry"
                            rules={{ required: false }}
                            defaultValue=""
                          />
                        </LibraryComponents.Atoms.Grid>
                      </LibraryComponents.Atoms.List>
                      <LibraryComponents.Atoms.List
                        direction="col"
                        space={4}
                        fill
                        justify="stretch"
                      >
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputDateTime
                              label="Approval Date"
                              disabled={true}
                              placeholder={
                                errors.approvalDate
                                  ? "Please Enter Result Date"
                                  : "Result Date"
                              }
                              hasError={errors.approvalDate}
                              value={
                                patientVisitStore.patientVisit.extraData
                                  ?.approvalDate
                              }
                              onChange={(approvalDate) => {
                                onChange(approvalDate)
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    approvalDate,
                                  },
                                })
                              }}
                            />
                          )}
                          name="approvalDate"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputWrapper label="Approval Status">
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.approvalStatus
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.approvalStatus
                                    ? "border-red-500  "
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) => {
                                  const approvalStatus = e.target.value
                                  onChange(approvalStatus)
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit.extraData,
                                      approvalStatus,
                                    },
                                  })
                                }}
                              >
                                <option selected>Select</option>
                                {LibraryUtils.lookupItems(
                                  routerStore.lookupItems,
                                  "PATIENT VISIT - APPROVAL_STATUS"
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {`${item.value} - ${item.code}`}
                                  </option>
                                ))}
                              </select>
                            </LibraryComponents.Atoms.Form.InputWrapper>
                          )}
                          name="approvalStatus"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputWrapper label="Report Status">
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.reportStatus
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.reportStatus
                                    ? "border-red-500  "
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) => {
                                  const reportStatus = e.target.value
                                  onChange(reportStatus)
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit.extraData,
                                      reportStatus,
                                    },
                                  })
                                }}
                              >
                                <option selected>Select</option>
                                {LibraryUtils.lookupItems(
                                  routerStore.lookupItems,
                                  "PATIENT VISIT - REPORT_STATUS"
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {`${item.value} - ${item.code}`}
                                  </option>
                                ))}
                              </select>
                            </LibraryComponents.Atoms.Form.InputWrapper>
                          )}
                          name="reportStatus"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputDateTime
                              label="Reported Date"
                              disabled={true}
                              placeholder={
                                errors.reportedDate
                                  ? "Please Enter Reported Date"
                                  : "Reported Date"
                              }
                              hasError={errors.reportedDate}
                              value={
                                patientVisitStore.patientVisit.extraData
                                  ?.reportedDate
                              }
                              onChange={(reportedDate) => {
                                onChange(reportedDate)
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    reportedDate,
                                  },
                                })
                              }}
                            />
                          )}
                          name="reportedDate"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Entered By"
                              placeholder={
                                errors.enteredBy
                                  ? "Please Enter Entered By"
                                  : "Entered By"
                              }
                              hasError={errors.enteredBy}
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
                              label="Height (cm)"
                              type="number"
                              placeholder={
                                errors.height ? "Please Enter Height" : "Height"
                              }
                              hasError={errors.height}
                              value={
                                patientVisitStore.patientVisit.extraData?.height
                              }
                              onChange={(height) => {
                                onChange(height)
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    height,
                                  },
                                })
                              }}
                            />
                          )}
                          rules={{
                            required: false,
                            validate: (value) => FormHelper.isValidHeight(value),
                          }}
                          name="height"
                          defaultValue="1"
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Weight (kg)"
                              name="txtWeight"
                              type="number"
                              placeholder={
                                errors.weight ? "Please Enter Weight" : "Weight"
                              }
                              hasError={errors.weight}
                              value={
                                patientVisitStore.patientVisit.extraData?.weight
                              }
                              onChange={(weight) => {
                                onChange(weight)
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    weight,
                                  },
                                })
                              }}
                            />
                          )}
                          name="weight"
                          rules={{
                            required: false,
                            validate: (value) => FormHelper.isValidWeight(value),
                          }}
                          defaultValue="1"
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputWrapper label="Archieve">
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData?.archieve
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.archieve
                                    ? "border-red-500  "
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) => {
                                  const archieve = e.target.value
                                  onChange(archieve)
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit.extraData,
                                      archieve,
                                    },
                                  })
                                }}
                              >
                                <option selected>Select</option>
                                {LibraryUtils.lookupItems(
                                  routerStore.lookupItems,
                                  "PATIENT VISIT - ARCHIVED"
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {`${item.value} - ${item.code}`}
                                  </option>
                                ))}
                              </select>
                            </LibraryComponents.Atoms.Form.InputWrapper>
                          )}
                          name="archieve"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                      </LibraryComponents.Atoms.List>
                      <LibraryComponents.Atoms.List
                        direction="col"
                        justify="stretch"
                        fill
                        space={4}
                      >
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputWrapper label="Login Interface">
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.loginInterface
                                }
                                disabled={true}
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.loginInterface
                                    ? "border-red-500  "
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) => {
                                  const loginInterface = e.target.value
                                  onChange(loginInterface)
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit.extraData,
                                      loginInterface,
                                    },
                                  })
                                }}
                              >
                                <option selected>Select</option>
                                {LibraryUtils.lookupItems(
                                  routerStore.lookupItems,
                                  "PATIENT VISIT - LOGIN_INTERFACE"
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {`${item.value} - ${item.code}`}
                                  </option>
                                ))}
                              </select>
                            </LibraryComponents.Atoms.Form.InputWrapper>
                          )}
                          name="loginInterface"
                          rules={{ required: false }}
                          defaultValue=""
                        />

                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputWrapper label="Registration Interface">
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.registrationInterface
                                }
                                disabled={true}
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.registrationInterface
                                    ? "border-red-500 "
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) => {
                                  const registrationInterface = e.target.value
                                  onChange(registrationInterface)
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit.extraData,
                                      registrationInterface,
                                    },
                                  })
                                }}
                              >
                                <option selected>Select</option>
                                {LibraryUtils.lookupItems(
                                  routerStore.lookupItems,
                                  "PATIENT VISIT - REGISTRATION_INTERFACE"
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {`${item.value} - ${item.code}`}
                                  </option>
                                ))}
                              </select>
                            </LibraryComponents.Atoms.Form.InputWrapper>
                          )}
                          name="registrationInterface"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Submitted System"
                              name="txtSubmitted System"
                              disabled={true}
                              placeholder={
                                errors.submittedSystem
                                  ? "Please Enter Submitted System"
                                  : "Submitted System"
                              }
                              hasError={errors.submittedSystem}
                              value={
                                patientVisitStore.patientVisit.extraData
                                  ?.submittedSystem
                              }
                              onChange={(submittedSystem) => {
                                onChange(submittedSystem)
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    submittedSystem,
                                  },
                                })
                              }}
                            />
                          )}
                          name="submittedSystem"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Submitted On"
                              name="txtSubmittedOn"
                              disabled={true}
                              placeholder={
                                errors.submittedOn
                                  ? "Please Enter Archieve"
                                  : "Archieve"
                              }
                              hasError={errors.submittedOn}
                              value={
                                patientVisitStore.patientVisit.extraData?.submittedOn
                              }
                              onChange={(submittedOn) => {
                                onChange(submittedOn)
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    submittedOn,
                                  },
                                })
                              }}
                            />
                          )}
                          name="submittedOn"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.Input
                              label="Balance"
                              name="txtBalance"
                              disabled={true}
                              placeholder={
                                errors.balance ? "Please Enter Balance" : "Balance"
                              }
                              hasError={errors.balance}
                              type="number"
                              value={
                                patientVisitStore.patientVisit.extraData?.balance
                              }
                              onChange={(balance) => {
                                onChange(balance)
                                patientVisitStore.updatePatientVisit({
                                  ...patientVisitStore.patientVisit,
                                  extraData: {
                                    ...patientVisitStore.patientVisit.extraData,
                                    balance,
                                  },
                                })
                              }}
                            />
                          )}
                          name="balance"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputWrapper label="Account Type">
                              <select
                                value={
                                  patientVisitStore.patientVisit?.extraData
                                    ?.accountType
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.accountType
                                    ? "border-red-500  "
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) => {
                                  const accountType = e.target.value
                                  onChange(accountType)
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit?.extraData,
                                      accountType,
                                    },
                                  })
                                }}
                              >
                                <option selected>Select</option>
                                {LibraryUtils.lookupItems(
                                  routerStore.lookupItems,
                                  "PATIENT VISIT - ACCOUNT_TYPE"
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {`${item.value} - ${item.code}`}
                                  </option>
                                ))}
                              </select>
                            </LibraryComponents.Atoms.Form.InputWrapper>
                          )}
                          name="accountType"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Method">
                              <select
                                value={
                                  patientVisitStore.patientVisit?.extraData
                                    ?.deliveryMethod
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.deliveryMethod
                                    ? "border-red-500  "
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) => {
                                  const deliveryMethod = e.target.value
                                  onChange(deliveryMethod)
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit?.extraData,
                                      deliveryMethod,
                                    },
                                  })
                                }}
                              >
                                <option selected>Select</option>
                                {LibraryUtils.lookupItems(
                                  routerStore.lookupItems,
                                  "PATIENT VISIT - DELIVERY_METHOD"
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {`${item.code} - ${item.value}`}
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
                            <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                              <select
                                value={
                                  patientVisitStore.patientVisit.extraData
                                    ?.environment
                                }
                                disabled={
                                  loginStore.login &&
                                  loginStore.login.role !== "SYSADMIN"
                                    ? true
                                    : false
                                }
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.environment
                                    ? "border-red-500  "
                                    : "border-gray-300"
                                } rounded-md`}
                                onChange={(e) => {
                                  const environment = e.target.value
                                  onChange(environment)
                                  patientVisitStore.updatePatientVisit({
                                    ...patientVisitStore.patientVisit,
                                    extraData: {
                                      ...patientVisitStore.patientVisit.extraData,
                                      environment,
                                    },
                                  })
                                }}
                              >
                                <option selected>Select</option>
                                {LibraryUtils.lookupItems(
                                  routerStore.lookupItems,
                                  "PATIENT VISIT - ENVIRONMENT"
                                ).map((item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {`${item.code} - ${item.value}`}
                                  </option>
                                ))}
                              </select>
                            </LibraryComponents.Atoms.Form.InputWrapper>
                          )}
                          name="environment"
                          rules={{ required: false }}
                          defaultValue=""
                        />
                      </LibraryComponents.Atoms.List>
                    </LibraryComponents.Atoms.Grid>
                  </>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={handleSubmit(onSubmitPatientVisit)}
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

        <div
          className="p-2 rounded-lg shadow-xl overflow-scroll"
          style={{ overflowX: "scroll" }}
        >
          <FeatureComponents.Molecules.PatientVisitList
            data={patientVisitStore.listPatientVisit}
            totalSize={patientVisitStore.listPatientVisitCount}
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
                type: "delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected items!`,
              })
            }}
            onUpdateItem={(value: any, dataField: string, id: string) => {
              setModalConfirm({
                show: true,
                type: "update",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update recoard!`,
              })
            }}
            onPageSizeChange={(page, limit) => {
              patientVisitStore.patientVisitService.listPatientVisit(
                { documentType: "patientVisit" },
                page,
                limit
              )
            }}
            onFilter={(type, filter, page, limit) => {
              patientVisitStore.patientVisitService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
        </div>
        <br />
        <div className="extra" style={{ border: "1px solid yellow" }}>
          <Accordion allowZeroExpanded>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>EXTRA DATA TABLE</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <>
                  <div
                    className="p-2 rounded-lg shadow-xl overflow-scroll"
                    style={{ overflowX: "scroll" }}
                  >
                    <FeatureComponents.Molecules.ExtraDataPatientVisitList
                      data={patientVisitStore.listPatientVisit}
                      totalSize={patientVisitStore.listPatientVisitCount}
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
                          type: "delete",
                          id: rows,
                          title: "Are you sure?",
                          body: `Delete selected items!`,
                        })
                      }}
                      onUpdateItem={(value: any, dataField: string, id: string) => {
                        setModalConfirm({
                          show: true,
                          type: "update",
                          data: { value, dataField, id },
                          title: "Are you sure?",
                          body: `Update recoard!`,
                        })
                      }}
                      onPageSizeChange={(page, limit) => {
                        patientVisitStore.patientVisitService.listPatientVisit(
                          { documentType: "patientVisit" },
                          page,
                          limit
                        )
                      }}
                      onFilter={(type, filter, page, limit) => {
                        patientVisitStore.patientVisitService.filter({
                          input: { type, filter, page, limit },
                        })
                      }}
                    />
                  </div>
                </>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "delete") {
              patientVisitStore.patientVisitService
                .deletePatientVisit({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removePatientVisit.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removePatientVisit.message}`,
                    })
                    setModalConfirm({ show: false })
                    patientVisitStore.patientVisitService.listPatientVisit({
                      documentType: "patientVisit",
                    })
                  }
                })
            } else if (type === "update") {
              patientVisitStore.patientVisitService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updatePatientVisit.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updatePatientVisit.message}`,
                    })
                    setModalConfirm({ show: false })
                    patientVisitStore.patientVisitService.listPatientVisit({
                      documentType: "patientVisit",
                    })
                  }
                })
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </>
    )
  })
)
export default PatientVisit
