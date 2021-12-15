/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import dayjs from "dayjs"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import "@lp/library/assets/css/accordion.css"
import * as FeatureComponents from "../../components"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/stores"
import { toJS } from "mobx"
import { RouterFlow } from "@lp/flows"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"
import "react-accessible-accordion/dist/fancy-example.css"

interface PatientVisitProps {
  onModalConfirm?: (item: any) => void
}

const PatientVisit = observer((props: PatientVisitProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const {
    patientVisitStore,
    loginStore,
    routerStore,
    corporateClientsStore,
  } = useStores()

  const onSubmitPatientVisit = () => {
    //  Add PatientVisit Api Calling.
  }

  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      patientVisitStore.updatePatientVisit({
        ...patientVisitStore.patientVisit,
        extraData: {
          ...patientVisitStore.patientVisit.extraData,
          environment: loginStore.login.environment,
        },
      })
      setValue("environment", loginStore.login.environment)
    }
  }, [loginStore.login])
  return (
    <>
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
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Rlab"
                  hasError={errors.rLab}
                >
                  <select
                    value={patientVisitStore.patientVisit?.rLab}
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
                      loginStore.login?.labList.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.name}
                        </option>
                      ))}
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
                <LibraryComponents.Atoms.Form.Input
                  label="Visit Id"
                  name="txtVisitId"
                  placeholder={errors.visitId ? "Please Enter Visit ID" : "Visit ID"}
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
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputDate
                  label="Visit Date"
                  name="txtVisitDate"
                  placeholder={
                    errors.visitDate ? "Please Enter VisitDate" : "VisitDate"
                  }
                  hasError={errors.visitDate}
                  value={LibraryUtils.moment(
                    patientVisitStore.patientVisit?.visitDate
                  ).format("YYYY-MM-DD")}
                  onChange={(e) => {
                    let visitDate = new Date(e.target.value)
                    onChange(visitDate)
                    const formatDate = LibraryUtils.moment(visitDate).format(
                      "YYYY-MM-DD HH:mm"
                    )
                    patientVisitStore.updatePatientVisit({
                      ...patientVisitStore.patientVisit,
                      visitDate: new Date(formatDate),
                    })
                  }}
                />
              )}
              name="visitDate"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputDate
                  label="Registration Date"
                  name="txtRegistrationDate"
                  placeholder={
                    errors.registrationDate
                      ? "Please Enter RegistrationDate"
                      : "RegistrationDate"
                  }
                  hasError={errors.registrationDate}
                  value={dayjs(
                    patientVisitStore.patientVisit?.registrationDate
                  ).format("YYYY-MM-DD")}
                  onChange={(e) => {
                    let registrationDate = new Date(e.target.value)
                    onChange(registrationDate)
                    const formatDate = LibraryUtils.moment(registrationDate).format(
                      "YYYY-MM-DD HH:mm"
                    )
                    patientVisitStore.updatePatientVisit({
                      ...patientVisitStore.patientVisit,
                      registrationDate: new Date(formatDate),
                    })
                  }}
                />
              )}
              name="registrationDate"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputDate
                  label="Collection Date"
                  name="txtCollectionDate"
                  placeholder={
                    errors.collectionDate
                      ? "Please Enter Collection Date"
                      : "Collection Date"
                  }
                  hasError={errors.collectionDate}
                  value={dayjs(
                    patientVisitStore.patientVisit?.collectionDate
                  ).format("YYYY-MM-DD")}
                  onChange={(e) => {
                    let collectionDate = new Date(e.target.value)
                    onChange(collectionDate)
                    const formatDate = LibraryUtils.moment(collectionDate).format(
                      "YYYY-MM-DD HH:mm"
                    )
                    patientVisitStore.updatePatientVisit({
                      ...patientVisitStore.patientVisit,
                      collectionDate: new Date(formatDate),
                    })
                  }}
                />
              )}
              name="dateReceived"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputDate
                  label="Due Date"
                  name="txtDueDate"
                  placeholder={errors.dueDate ? "Please Enter Due Date" : "Due Date"}
                  hasError={errors.dueDate}
                  value={LibraryUtils.moment(
                    patientVisitStore.patientVisit?.dueDate
                  ).format("YYYY-MM-DD")}
                  onChange={(e) => {
                    let dueDate = new Date(e.target.value)
                    onChange(dueDate)
                    const formatDate = LibraryUtils.moment(dueDate).format(
                      "YYYY-MM-DD HH:mm"
                    )
                    patientVisitStore.updatePatientVisit({
                      ...patientVisitStore.patientVisit,
                      dueDate: new Date(formatDate),
                    })
                  }}
                />
              )}
              name="dueDate"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputDate
                  label="BithDate"
                  name="txtBirthDate"
                  placeholder={
                    errors.birthDate ? "Please Enter BirthDate" : "BirthDate"
                  }
                  hasError={errors.birthDate}
                  value={dayjs(patientVisitStore.patientVisit?.birthDate).format(
                    "YYYY-MM-DD"
                  )}
                  onChange={(e) => {
                    let birthDate = new Date(e.target.value)
                    onChange(birthDate)
                    const formatDate = LibraryUtils.moment(birthDate).format(
                      "YYYY-MM-DD HH:mm"
                    )
                    patientVisitStore.updatePatientVisit({
                      ...patientVisitStore.patientVisit,
                      birthDate: new Date(formatDate),
                    })
                  }}
                />
              )}
              name="birthDate"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Input
                  label="Age"
                  name="txtAge"
                  placeholder={errors.birthDate ? "Please Enter Age" : "Age"}
                  hasError={errors.age}
                  type="number"
                  value={patientVisitStore.patientVisit?.age}
                  onChange={(age) => {
                    onChange(age)
                    patientVisitStore.updatePatientVisit({
                      ...patientVisitStore.patientVisit,
                      age,
                    })
                  }}
                />
              )}
              name="age"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Input
                  label="Age Units"
                  name="txtAgeUnits"
                  placeholder={
                    errors.ageUnits ? "Please Enter AgeUnits" : "Age Units"
                  }
                  hasError={errors.ageUnits}
                  value={patientVisitStore.patientVisit?.ageUnits}
                  onChange={(ageUnits) => {
                    onChange(ageUnits)
                    patientVisitStore.updatePatientVisit({
                      ...patientVisitStore.patientVisit,
                      ageUnits,
                    })
                  }}
                />
              )}
              name="ageUnits"
              rules={{ required: true }}
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
                  label="Collection Center"
                  id="optionCollectionCenter"
                  hasError={errors.collectionCenter}
                >
                  <select
                    name="optionCollectionCenters"
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.collectionCenter
                        ? "border-red-500  "
                        : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const collectionCenter = e.target.value as string
                      onChange(collectionCenter)
                      patientVisitStore.updatePatientVisit({
                        ...patientVisitStore.patientVisit,
                        collectionCenter,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {["Collection 1"].map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="collectionCenter"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Bill To"
                  hasError={errors.billTo}
                >
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.billTo ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const billTo = JSON.parse(e.target.value)
                      onChange(billTo)
                      patientVisitStore.updatePatientVisit({
                        ...patientVisitStore.patientVisit,
                        billTo,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {/* {corporateClientsStore.listCorporateClients &&
                        corporateClientsStore.listCorporateClients.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.corporateCode} - ${item.corporateName}`}
                            </option>
                          )
                        )} */}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="billTo"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Input
                  label="Ac Class"
                  name="txtAcClass"
                  placeholder={errors.acClass ? "Please Enter Ac Class" : "Ac Class"}
                  hasError={errors.acClass}
                  value={patientVisitStore.patientVisit?.acClass}
                  onChange={(acClass) => {
                    onChange(acClass)
                    patientVisitStore.updatePatientVisit({
                      ...patientVisitStore.patientVisit,
                      acClass,
                    })
                  }}
                />
              )}
              name="acClass"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Doctor id"
                  id="optionsDoctorId"
                  hasError={errors.doctorId}
                >
                  <select
                    name="optionsDoctorIds"
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.doctorId ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const doctorId = e.target.value as string
                      onChange(doctorId)
                      patientVisitStore.updatePatientVisit({
                        ...patientVisitStore.patientVisit,
                        doctorId,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {["Collection 1"].map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="doctorId"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Doctor Name"
                  id="optionsDoctorName"
                  hasError={errors.doctorName}
                >
                  <select
                    name="optionsDoctorNames"
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.doctorName ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const doctorName = e.target.value as string
                      onChange(doctorName)
                      patientVisitStore.updatePatientVisit({
                        ...patientVisitStore.patientVisit,
                        doctorName,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {["Collection 1"].map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="doctorName"
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
                      "PATIENT MANAGER - DELIVERY_TYPE"
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {LibraryUtils.lookupValue(item)}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="deliveryType"
              rules={{ required: true }}
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
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                  <select
                    value={patientVisitStore.patientVisit?.status}
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
                            patientVisitStore.patientVisit?.extraData?.additionalInfo
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
                      rules={{ required: true }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.InputWrapper
                          label="Invoice Ac"
                          hasError={errors.invoiceAc}
                        >
                          <select
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.invoiceAc ? "border-red-500" : "border-gray-300"
                            } rounded-md`}
                            onChange={(e) => {
                              const invoice = JSON.parse(e.target.value)
                              onChange(invoice)
                              patientVisitStore.updatePatientVisit({
                                ...patientVisitStore.patientVisit,
                                extraData: {
                                  ...patientVisitStore.patientVisit.extraData,
                                  invoiceAc: invoice.invoiceAc,
                                },
                              })
                            }}
                          >
                            <option selected>Select</option>
                            {corporateClientsStore.listCorporateClients &&
                              corporateClientsStore.listCorporateClients.map(
                                (item: any, index: number) => (
                                  <option key={index} value={JSON.stringify(item)}>
                                    {`${item.invoiceAc}`}
                                  </option>
                                )
                              )}
                          </select>
                        </LibraryComponents.Atoms.Form.InputWrapper>
                      )}
                      name="invoiceAc"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          label="Billing Method"
                          name="txtBillingMethod"
                          placeholder={
                            errors.billingMethod
                              ? "Please Enter Billing Method"
                              : "Billing Method"
                          }
                          hasError={errors.billingMethod}
                          value={
                            patientVisitStore.patientVisit.extraData?.billingMethod
                          }
                          onChange={(billingMethod) => {
                            onChange(billingMethod)
                            patientVisitStore.updatePatientVisit({
                              ...patientVisitStore.patientVisit,
                              extraData: {
                                ...patientVisitStore.patientVisit.extraData,
                                billingMethod,
                              },
                            })
                          }}
                        />
                      )}
                      name="billingMethod"
                      rules={{ required: true }}
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
                      rules={{ required: true }}
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
                        <LibraryComponents.Atoms.Form.InputWrapper label=" Collection By">
                          <select
                            value={
                              patientVisitStore.patientVisit.extraData?.collectedBy
                            }
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.collectedBy
                                ? "border-red-500  "
                                : "border-gray-300"
                            } rounded-md`}
                            onChange={(e) => {
                              const collectedBy = e.target.value
                              onChange(collectedBy)
                              patientVisitStore.updatePatientVisit({
                                ...patientVisitStore.patientVisit,
                                extraData: {
                                  ...patientVisitStore.patientVisit.extraData,
                                  collectedBy,
                                },
                              })
                            }}
                          >
                            <option selected>Select</option>
                          </select>
                        </LibraryComponents.Atoms.Form.InputWrapper>
                      )}
                      name="collectedBy"
                      rules={{ required: false }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.InputDate
                          label="Received Date"
                          name="txtReceivedDate"
                          placeholder={
                            errors.receivedDate
                              ? "Please Enter Received Date"
                              : "Received Date"
                          }
                          hasError={errors.receivedDate}
                          value={dayjs(
                            patientVisitStore.patientVisit.extraData?.receivedDate
                          ).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            let receivedDate = new Date(e.target.value)
                            onChange(receivedDate)
                            const formatDate = dayjs(receivedDate).format(
                              "YYYY-MM-DD HH:mm"
                            )
                            patientVisitStore.updatePatientVisit({
                              ...patientVisitStore.patientVisit,
                              extraData: {
                                ...patientVisitStore.patientVisit.extraData,
                                receivedDate: new Date(formatDate),
                              },
                            })
                          }}
                        />
                      )}
                      name="receivedDate"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.InputDate
                          label="Result Date"
                          name="txtResultDate"
                          placeholder={
                            errors.resultDate
                              ? "Please Enter Result Date"
                              : "Result Date"
                          }
                          hasError={errors.resultDate}
                          value={dayjs(
                            patientVisitStore.patientVisit.extraData?.resultDate
                          ).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            let resultDate = new Date(e.target.value)
                            onChange(resultDate)
                            const formatDate = LibraryUtils.moment(
                              resultDate
                            ).format("YYYY-MM-DD HH:mm")
                            patientVisitStore.updatePatientVisit({
                              ...patientVisitStore.patientVisit,
                              extraData: {
                                ...patientVisitStore.patientVisit.extraData,
                                resultDate: new Date(formatDate),
                              },
                            })
                          }}
                        />
                      )}
                      name="resultDate"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                    <LibraryComponents.Atoms.Grid cols={3}>
                      <Controller
                        control={control}
                        render={({ field: { onChange } }) => (
                          <LibraryComponents.Atoms.Form.Toggle
                            label="Urgent"
                            id="toggleUrgent"
                            hasError={errors.urgent}
                            value={patientVisitStore.patientVisit.extraData?.urgent}
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
                            label="Confidental"
                            id="toggleConfidental"
                            hasError={errors.confidental}
                            value={
                              patientVisitStore.patientVisit.extraData?.confidental
                            }
                            onChange={(confidental) => {
                              patientVisitStore.updatePatientVisit({
                                ...patientVisitStore.patientVisit,
                                extraData: {
                                  ...patientVisitStore.patientVisit.extraData,
                                  confidental,
                                },
                              })
                            }}
                          />
                        )}
                        name="confidental"
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
                        <LibraryComponents.Atoms.Form.InputDate
                          label="Approval Date"
                          name="txtApprovalDate"
                          placeholder={
                            errors.approvalDate
                              ? "Please Enter Result Date"
                              : "Result Date"
                          }
                          hasError={errors.approvalDate}
                          value={dayjs(
                            patientVisitStore.patientVisit.extraData?.approvalDate
                          ).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            let approvalDate = new Date(e.target.value)
                            onChange(approvalDate)
                            const formatDate = dayjs(approvalDate).format(
                              "YYYY-MM-DD HH:mm"
                            )
                            patientVisitStore.updatePatientVisit({
                              ...patientVisitStore.patientVisit,
                              extraData: {
                                ...patientVisitStore.patientVisit.extraData,
                                approvalDate: new Date(formatDate),
                              },
                            })
                          }}
                        />
                      )}
                      name="approvalDate"
                      rules={{ required: true }}
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
                              patientVisitStore.patientVisit.extraData?.reportStatus
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
                        <LibraryComponents.Atoms.Form.InputDate
                          label="Reported Date"
                          name="txtReportedDate"
                          placeholder={
                            errors.reportedDate
                              ? "Please Enter Reported Date"
                              : "Reported Date"
                          }
                          hasError={errors.reportedDate}
                          value={dayjs(
                            patientVisitStore.patientVisit.extraData?.reportedDate
                          ).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            let reportedDate = new Date(e.target.value)
                            onChange(reportedDate)
                            const formatDate = dayjs(reportedDate).format(
                              "YYYY-MM-DD HH:mm"
                            )
                            patientVisitStore.updatePatientVisit({
                              ...patientVisitStore.patientVisit,
                              extraData: {
                                ...patientVisitStore.patientVisit.extraData,
                                reportedDate: new Date(formatDate),
                              },
                            })
                          }}
                        />
                      )}
                      name="reportedDate"
                      rules={{ required: true }}
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
                          label="Height"
                          name="txtHeight"
                          placeholder={
                            errors.height ? "Please Enter Height" : "Height"
                          }
                          hasError={errors.height}
                          value={patientVisitStore.patientVisit.extraData?.height}
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
                      name="height"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          label="Weight"
                          name="txtWeight"
                          placeholder={
                            errors.weight ? "Please Enter Weight" : "Weight"
                          }
                          hasError={errors.weight}
                          value={patientVisitStore.patientVisit.extraData?.weight}
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
                      rules={{ required: true }}
                      defaultValue=""
                    />
                     <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          label="Archieve"
                          name="txtArchieve"
                          placeholder={
                            errors.archieve ? "Please Enter Archieve" : "Archieve"
                          }
                          hasError={errors.archieve}
                          value={patientVisitStore.patientVisit.extraData?.archieve}
                          onChange={(archieve) => {
                            onChange(archieve)
                            patientVisitStore.updatePatientVisit({
                              ...patientVisitStore.patientVisit,
                              extraData: {
                                ...patientVisitStore.patientVisit.extraData,
                                archieve,
                              },
                            })
                          }}
                        />
                      )}
                      name="archieve"
                      rules={{ required: true }}
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
                        <LibraryComponents.Atoms.Form.Input
                          label="Submitted System"
                          name="txtSubmitted System"
                          placeholder={
                            errors.submittedSystem
                              ? "Please Enter Submitted System"
                              : "Submitted System"
                          }
                          hasError={errors.submittedSystem}
                          value={
                            patientVisitStore.patientVisit.extraData?.submittedSystem
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
                      rules={{ required: true }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          label="Submitted On"
                          name="txtSubmittedOn"
                          placeholder={
                            errors.submittedOn ? "Please Enter Archieve" : "Archieve"
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
                      rules={{ required: true }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          label="Balance"
                          name="txtBalance"
                          placeholder={
                            errors.balance ? "Please Enter Balance" : "Balance"
                          }
                          hasError={errors.balance}
                          type="number"
                          value={patientVisitStore.patientVisit.extraData?.balance}
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
                      rules={{ required: true }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.InputWrapper label="Account Type">
                          <select
                            value={
                              patientVisitStore.patientVisit?.extraData?.accountType
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
                        <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                          <select
                            value={
                              patientVisitStore.patientVisit.extraData?.environment
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
                            <option selected>
                              {loginStore.login &&
                              loginStore.login.role !== "SYSADMIN"
                                ? `Select`
                                : patientVisitStore.patientVisit.extraData
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
      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        <FeatureComponents.Molecules.PatientVisitList
          data={patientVisitStore.listPatientVisit}
          //totalSize={patientVisitStore.listPatientVisitCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            // listAdministrativeDiv: AdministrativeDivisionStore.administrativeDivStore.listAdministrativeDiv
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            "Delete"
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            "Edit/Modify"
          )}
          onDelete={(selectedUser) =>
            props.onModalConfirm && props.onModalConfirm(selectedUser)
          }
          onSelectedRow={(rows) => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: "Delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected items!`,
              })
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: "Update",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update recoard!`,
              })
          }}
          // onPageSizeChange={(page, limit) => {
          //   // enviromentSettingsStore.fetchSessionManagementList(page, limit)
          // }}
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
                      // listAdministrativeDiv: AdministrativeDivisionStore.administrativeDivStore.listAdministrativeDiv
                    }}
                    isDelete={RouterFlow.checkPermission(
                      toJS(routerStore.userPermission),
                      "Delete"
                    )}
                    isEditModify={RouterFlow.checkPermission(
                      toJS(routerStore.userPermission),
                      "Edit/Modify"
                    )}
                    onDelete={(selectedUser) =>
                      props.onModalConfirm && props.onModalConfirm(selectedUser)
                    }
                    onSelectedRow={(rows) => {
                      props.onModalConfirm &&
                        props.onModalConfirm({
                          show: true,
                          type: "Delete",
                          id: rows,
                          title: "Are you sure?",
                          body: `Delete selected items!`,
                        })
                    }}
                    onUpdateItem={(value: any, dataField: string, id: string) => {
                      props.onModalConfirm &&
                        props.onModalConfirm({
                          show: true,
                          type: "Update",
                          data: { value, dataField, id },
                          title: "Are you sure?",
                          body: `Update recoard!`,
                        })
                    }}
                    // onPageSizeChange={(page, limit) => {
                    //   // enviromentSettingsStore.fetchSessionManagementList(page, limit)
                    // }}
                  />
                </div>
              </>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
})
export default PatientVisit
