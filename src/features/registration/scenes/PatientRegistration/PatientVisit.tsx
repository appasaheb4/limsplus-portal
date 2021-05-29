/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { Accordion, AccordionItem } from "react-sanfona"
import "@lp/library/assets/css/accordion.css"
import * as Utils from "../../utils"
import * as Models from "../../models"

import { Stores } from "../../stores"
import { Stores as UserStore } from "@lp/features/users/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

interface PatientVisitProps {
  onModalConfirm?: (item: any) => void
}

const PatientVisit = observer((props: PatientVisitProps) => {
  const [errors, setErrors] = useState<Models.PatientVisit>()
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
            <LibraryComponents.Atoms.Form.Input
              label="Pid"
              name="txtPid"
              placeholder="Pid"
              disabled={true}
              value={Stores.patientRegistationStore.patientVisit?.pId}
              onChange={(pId) => {
                setErrors({
                  ...errors,
                  pId: Utils.validate.single(pId, Utils.patientVisit.pId),
                })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  pId,
                })
              }}
            />
            {errors?.pId && (
              <span className="text-red-600 font-medium relative">{errors.pId}</span>
            )}
            <LibraryComponents.Atoms.Form.Input
              label="Lab Id"
              name="txtLabId"
              placeholder="Lab Id"
              value={Stores.patientRegistationStore.patientVisit?.labId}
              onChange={(labId) => {
                setErrors({
                  ...errors,
                  labId: Utils.validate.single(labId, Utils.patientVisit.labId),
                })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  labId,
                })
              }}
            />
            {errors?.labId && (
              <span className="text-red-600 font-medium relative">
                {errors.labId}
              </span>
            )}
            <LibraryComponents.Atoms.Form.Input
              label="Internal Id"
              name="txtInternalId"
              placeholder="Internal Id"
              value={Stores.patientRegistationStore.patientVisit?.internalId}
              onChange={(internalId) => {
                setErrors({
                  ...errors,
                  internalId: Utils.validate.single(
                    internalId,
                    Utils.patientVisit.internalId
                  ),
                })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  internalId,
                })
              }}
            />
            {errors?.internalId && (
              <span className="text-red-600 font-medium relative">
                {errors.internalId}
              </span>
            )}
            <LibraryComponents.Atoms.Form.Input
              label="RLab"
              name="txtRLab"
              placeholder="RLab"
              value={Stores.patientRegistationStore.patientVisit?.rLab}
              onChange={(rLab) => {
                setErrors({
                  ...errors,
                  rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  rLab,
                })
              }}
            />
            {errors?.rLab && (
              <span className="text-red-600 font-medium relative">
                {errors.rLab}
              </span>
            )}
            <LibraryComponents.Atoms.Form.InputDate
              label="BithDate"
              name="txtBirthDate"
              placeholder="BirthDate"
              value={LibraryUtils.moment(
                Stores.patientRegistationStore.patientVisit?.birthDate
              ).format("YYYY-MM-DD")}
              onChange={(e) => {
                let birthDate = new Date(e.target.value)
                const formatDate = LibraryUtils.moment(birthDate).format(
                  "YYYY-MM-DD HH:mm"
                )
                setErrors({
                  ...errors,
                  birthDate: Utils.validate.single(
                    birthDate,
                    Utils.patientVisit.birthDate
                  ),
                })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  birthDate: new Date(formatDate),
                })
              }}
            />
            {errors?.birthDate && (
              <span className="text-red-600 font-medium relative">
                {errors.birthDate}
              </span>
            )}
            <LibraryComponents.Atoms.Form.Input
              label="Age"
              name="txtAge"
              placeholder="Age"
              type="number"
              value={Stores.patientRegistationStore.patientVisit?.age}
              onChange={(age) => {
                setErrors({
                  ...errors,
                  age: Utils.validate.single(age, Utils.patientVisit.age),
                })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  age,
                })
              }}
            />
            {errors?.age && (
              <span className="text-red-600 font-medium relative">{errors.age}</span>
            )}
            <LibraryComponents.Atoms.Form.Input
              label="Age Units"
              name="txtAgeUnits"
              placeholder="Age Units"
              value={Stores.patientRegistationStore.patientVisit?.ageUnits}
              onChange={(ageUnits) => {
                setErrors({
                  ...errors,
                  ageUnits: Utils.validate.single(
                    ageUnits,
                    Utils.patientVisit.ageUnits
                  ),
                })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  ageUnits,
                })
              }}
            />
            {errors?.ageUnits && (
              <span className="text-red-600 font-medium relative">
                {errors.ageUnits}
              </span>
            )}
            <LibraryComponents.Atoms.Form.InputDate
              label="Date Registration"
              name="txtDateRegistration"
              placeholder="Date Registration"
              value={LibraryUtils.moment(
                Stores.patientRegistationStore.patientVisit?.dateRegistration
              ).format("YYYY-MM-DD")}
              onChange={(e) => {
                let dateRegistration = new Date(e.target.value)
                const formatDate = LibraryUtils.moment(dateRegistration).format(
                  "YYYY-MM-DD HH:mm"
                )
                setErrors({
                  ...errors,
                  dateRegistration: Utils.validate.single(
                    dateRegistration,
                    Utils.patientVisit.dateRegistration
                  ),
                })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  dateRegistration: new Date(formatDate),
                })
              }}
            />
            {errors?.dateRegistration && (
              <span className="text-red-600 font-medium relative">
                {errors.dateRegistration}
              </span>
            )}
          </LibraryComponents.Atoms.List>
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
            <LibraryComponents.Atoms.Form.InputDate
              label="Date Service"
              name="txtDateService"
              placeholder="Date Service"
              value={LibraryUtils.moment(
                Stores.patientRegistationStore.patientVisit?.dateService
              ).format("YYYY-MM-DD")}
              onChange={(e) => {
                let dateService = new Date(e.target.value)
                const formatDate = LibraryUtils.moment(dateService).format(
                  "YYYY-MM-DD HH:mm"
                )
                setErrors({
                  ...errors,
                  dateService: Utils.validate.single(
                    dateService,
                    Utils.patientVisit.dateService
                  ),
                })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  dateService: new Date(formatDate),
                })
              }}
            />
            {errors?.dateService && (
              <span className="text-red-600 font-medium relative">
                {errors.dateService}
              </span>
            )}
            <LibraryComponents.Atoms.Form.InputWrapper
              label="Method Collection"
              id="optionMethodCollection"
            >
              <select
                name="optionMethodCollections"
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const methodCollection = e.target.value as string
                  setErrors({
                    ...errors,
                    methodCollection: Utils.validate.single(
                      methodCollection,
                      Utils.patientVisit.methodCollection
                    ),
                  })
                  Stores.patientRegistationStore.updatePatientVisit({
                    ...Stores.patientRegistationStore.patientVisit,
                    methodCollection,
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
            {errors?.methodCollection && (
              <span className="text-red-600 font-medium relative">
                {errors.methodCollection}
              </span>
            )}
            <LibraryComponents.Atoms.Form.InputDate
              label="Date Collection"
              name="txtDateCollection"
              placeholder="Date Collection"
              value={LibraryUtils.moment(
                Stores.patientRegistationStore.patientVisit?.dateCollection
              ).format("YYYY-MM-DD")}
              onChange={(e) => {
                let dateCollection = new Date(e.target.value)
                const formatDate = LibraryUtils.moment(dateCollection).format(
                  "YYYY-MM-DD HH:mm"
                )
                setErrors({
                  ...errors,
                  dateCollection: Utils.validate.single(
                    dateCollection,
                    Utils.patientVisit.dateCollection
                  ),
                })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  dateCollection: new Date(formatDate),
                })
              }}
            />
            {errors?.dateCollection && (
              <span className="text-red-600 font-medium relative">
                {errors.dateCollection}
              </span>
            )}
            <LibraryComponents.Atoms.Form.InputWrapper
              label="Collection Center"
              id="optionCollectionCenter"
            >
              <select
                name="optionCollectionCenters"
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const collectionCenter = e.target.value as string
                  // setErrors({
                  //   ...errors,
                  //   collectionCenter: Utils.validate.single(
                  //     collectionCenter,
                  //     Utils.patientVisit.collectionCenter
                  //   ),
                  // })
                  Stores.patientRegistationStore.updatePatientVisit({
                    ...Stores.patientRegistationStore.patientVisit,
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
            <LibraryComponents.Atoms.Form.InputWrapper
              label="Report Center"
              id="optionReportCenter"
            >
              <select
                name="optionReportCenters"
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const reportCenter = e.target.value as string
                  // setErrors({
                  //   ...errors,
                  //   collectionCenter: Utils.validate.single(
                  //     collectionCenter,
                  //     Utils.patientVisit.collectionCenter
                  //   ),
                  // })
                  Stores.patientRegistationStore.updatePatientVisit({
                    ...Stores.patientRegistationStore.patientVisit,
                    reportCenter,
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
            <LibraryComponents.Atoms.Form.InputWrapper
              label="Doctor id"
              id="optionsDoctorId"
            >
              <select
                name="optionsDoctorIds"
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const doctorId = e.target.value as string
                  // setErrors({
                  //   ...errors,
                  //   collectionCenter: Utils.validate.single(
                  //     collectionCenter,
                  //     Utils.patientVisit.collectionCenter
                  //   ),
                  // })
                  Stores.patientRegistationStore.updatePatientVisit({
                    ...Stores.patientRegistationStore.patientVisit,
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
            <LibraryComponents.Atoms.Form.InputWrapper
              label="Doctor Name"
              id="optionsDoctorName"
            >
              <select
                name="optionsDoctorNames"
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const doctorName = e.target.value as string
                  // setErrors({
                  //   ...errors,
                  //   collectionCenter: Utils.validate.single(
                  //     collectionCenter,
                  //     Utils.patientVisit.collectionCenter
                  //   ),
                  // })
                  Stores.patientRegistationStore.updatePatientVisit({
                    ...Stores.patientRegistationStore.patientVisit,
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
            <LibraryComponents.Atoms.Form.Input
              label="AC Class"
              name="txtAcClass"
              placeholder="AC Class"
              value={Stores.patientRegistationStore.patientVisit?.acClass}
              onChange={(acClass) => {
                // setErrors({
                //   ...errors,
                //   acClass: Utils.validate.single(acClass, Utils.patientVisit.acClass),
                // })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  acClass,
                })
              }}
            />
          </LibraryComponents.Atoms.List>
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
          
            <LibraryComponents.Atoms.Form.Input
              label="Bill To"
              name="txtBillTo"
              placeholder="Bill To"
              value={Stores.patientRegistationStore.patientVisit?.billTo}
              onChange={(billTo) => {
                // setErrors({
                //   ...errors,
                //   acClass: Utils.validate.single(acClass, Utils.patientVisit.acClass),
                // })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  billTo,
                })
              }}
            />
            <LibraryComponents.Atoms.Form.Input
              label="Invoice Ac"
              name="txtInvoiceAC"
              placeholder="Invoice Ac"
              value={Stores.patientRegistationStore.patientVisit?.invoiceAc}
              onChange={(invoiceAc) => {
                // setErrors({
                //   ...errors,
                //   acClass: Utils.validate.single(acClass, Utils.patientVisit.acClass),
                // })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  invoiceAc,
                })
              }}
            />
            <LibraryComponents.Atoms.Form.Input
              label="Report Priority"
              name="txtReportPriority"
              placeholder="Report Priority"
              value={Stores.patientRegistationStore.patientVisit?.reportPriority}
              onChange={(reportPriority) => {
                // setErrors({
                //   ...errors,
                //   acClass: Utils.validate.single(acClass, Utils.patientVisit.acClass),
                // })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  reportPriority,
                })
              }}
            />
            <LibraryComponents.Atoms.Form.Toggle
              label="History"
              id="toggleHistory"
              value={Stores.patientRegistationStore.patientVisit?.history}
              onChange={(history) => {
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  history,
                })
              }}
            />
            <LibraryComponents.Atoms.Form.Input
              label="Status"
              name="txtStatus"
              placeholder="Status"
              value={Stores.patientRegistationStore.patientVisit?.status}
              onChange={(status) => {
                // setErrors({
                //   ...errors,
                //   acClass: Utils.validate.single(acClass, Utils.patientVisit.acClass),
                // })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  status,
                })
              }}
            />
            <LibraryComponents.Atoms.Form.Input
              label="Created By"
              name="txtCreateBy"
              placeholder="Created By"
              value={Stores.patientRegistationStore.patientVisit?.createdBy}
              onChange={(createdBy) => {
                // setErrors({
                //   ...errors,
                //   acClass: Utils.validate.single(acClass, Utils.patientVisit.acClass),
                // })
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  createdBy,
                })
              }}
            />
          </LibraryComponents.Atoms.List>
        </LibraryComponents.Atoms.Grid>
      </div>
      <br />

      <LibraryComponents.Atoms.List direction="row" space={3} align="center">
        <LibraryComponents.Atoms.Buttons.Button
          size="medium"
          type="solid"
          icon={LibraryComponents.Atoms.Icon.Save}
          onClick={() => {
            // if (
            //   Utils.validate(
            //     Stores.enviromentSettingsStore.sessionManagement,
            //     Utils.constraintsSessionManagement
            //   ) === undefined
            // ) {
            //   RootStore.rootStore.setProcessLoading(true)
            //   Stores.enviromentSettingsStore.EnvironmentSettingsService.addSessionManagement(
            //     Stores.enviromentSettingsStore
            //       .sessionManagement as Models.SessionManagement
            //   ).then((res) => {
            //     RootStore.rootStore.setProcessLoading(false)
            //     if (res.status === 201) {
            //       LibraryComponents.Atoms.ToastsStore.success(`Session created.`)
            //       // Stores.userStore.clear()
            //       // Stores.userStore.loadUser()
            //       setTimeout(() => {
            //         window.location.reload()
            //       }, 2000)
            //     } else {
            //       LibraryComponents.Atoms.ToastsStore.warning(
            //         "Session not create.Please try again"
            //       )
            //     }
            //   })
            // } else {
            //   LibraryComponents.Atoms.ToastsStore.warning(
            //     "Please enter all information!"
            //   )
            // }
          }}
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
      ></div>
    </>
  )
})
export default PatientVisit
