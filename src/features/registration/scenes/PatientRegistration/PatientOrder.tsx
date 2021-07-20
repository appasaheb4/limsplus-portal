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
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

interface PatientOrderProps {
  onModalConfirm?: (item: any) => void
}

const PatientOrder = observer((props: PatientOrderProps) => {
  const [errors, setErrors] = useState<Models.PatientOrder>()
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
              label="Lab Id"
              name="txtLabId"
              placeholder="Lab Id"
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.labId}
              onChange={(labId) => {
                setErrors({
                  ...errors,
                  labId: Utils.validate.single(labId, Utils.patientOrder.labId),
                })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
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
              label="Package"
              name="txtPackage"
              placeholder="Package"
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.packageValue}
              onChange={(packageValue) => {
                setErrors({
                  ...errors,
                  packageValue: Utils.validate.single(
                    packageValue,
                    Utils.patientOrder.packageValue
                  ),
                })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  packageValue,
                })
              }}
            />
            {errors?.packageValue && (
              <span className="text-red-600 font-medium relative">
                {errors.packageValue}
              </span>
            )}
            <LibraryComponents.Atoms.Form.Input
              label="Panel"
              name="txtPanel"
              placeholder="Panel"
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.panel}
              onChange={(panel) => {
                // setErrors({
                //   ...errors,
                //   panel: Utils.validate.single(
                //     panel,
                //     Utils.patientOrder.panel
                //   ),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  panel,
                })
              }}
            />
            {/* {errors?.panel && (
              <span className="text-red-600 font-medium relative">
                {errors.panel}
              </span>
            )} */}
            <LibraryComponents.Atoms.Form.Input
              label="Test"
              name="txtTest"
              placeholder="Test"
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.test}
              onChange={(test) => {
                // setErrors({
                //   ...errors,
                //   rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  test,
                })
              }}
            />
            {/* {errors?.test && (
              <span className="text-red-600 font-medium relative">
                {errors.test}
              </span>
            )} */}
            <LibraryComponents.Atoms.Form.Input
              label="Analyte"
              name="txtAnalyte"
              placeholder="Analyte"
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.analyte}
              onChange={(analyte) => {
                // setErrors({
                //   ...errors,
                //   rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  analyte,
                })
              }}
            />
            <LibraryComponents.Atoms.Form.Input
              label="Bill"
              name="txtBill"
              placeholder="Bill"
              value={Stores.patientRegistationStore.patientOrder?.bill}
              onChange={(bill) => {
                // setErrors({
                //   ...errors,
                //   rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  bill,
                })
              }}
            />
              <LibraryComponents.Atoms.Form.Input
              label="Container Id"
              name="txtContainerId"
              placeholder="Containcer Id"
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.containerId}
              onChange={(containerId) => {
                // setErrors({
                //   ...errors,
                //   rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  containerId,
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
              label="Sample Type"
              name="txtSampleType"
              placeholder="Sample Type"
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.sampleType}
              onChange={(sampleType) => {
                // setErrors({
                //   ...errors,
                //   rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  sampleType,
                })
              }}
            />
            <LibraryComponents.Atoms.Form.Input
              label="Sample Id"
              name="txtSampleId"
              placeholder="Sample Id"
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.sampleId}
              onChange={(sampleId) => {
                // setErrors({
                //   ...errors,
                //   rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  sampleId,
                })
              }}
            />
            <LibraryComponents.Atoms.Form.Input
              label="RLab"
              name="txtRLab"
              placeholder="RLab"
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.rLab}
              onChange={(rLab) => {
                // setErrors({
                //   ...errors,
                //   rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  rLab,
                })
              }}
            />
            <LibraryComponents.Atoms.Form.Input
              label="PLab"
              name="txtPLab"
              placeholder="PLab"
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.pLab}
              onChange={(pLab) => {
                // setErrors({
                //   ...errors,
                //   rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  pLab,
                })
              }}
            />
            <LibraryComponents.Atoms.Form.Input
              label="Department"
              name="txtDepartment"
              placeholder="Department"
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.department}
              onChange={(department) => {
                // setErrors({
                //   ...errors,
                //   rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  department,
                })
              }}
            />
            <LibraryComponents.Atoms.Form.Input
              label="Section"
              name="txtSection"
              placeholder="Section"
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.section}
              onChange={(section) => {
                // setErrors({
                //   ...errors,
                //   rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  section,
                })
              }}
            />
             <LibraryComponents.Atoms.Form.Input
              label="PS"
              name="txtPS"
              placeholder="PS"
              value={Stores.patientRegistationStore.patientOrder?.ps}
              onChange={(ps) => {
                // setErrors({
                //   ...errors,
                //   rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  ps,
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
              label="TS"
              name="txtTS"
              placeholder="TS"
              value={Stores.patientRegistationStore.patientOrder?.ts}
              onChange={(ts) => {
                // setErrors({
                //   ...errors,
                //   rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  ts,
                })
              }}
            />
            <LibraryComponents.Atoms.Form.Input
              label="AS"
              name="txtAS"
              placeholder="AS"
              value={Stores.patientRegistationStore.patientOrder?.as}
              onChange={(as) => {
                // setErrors({
                //   ...errors,
                //   rLab: Utils.validate.single(rLab, Utils.patientVisit.rLab),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  as,
                })
              }}
            />
            <LibraryComponents.Atoms.Form.InputDate
              label="Due Date"
              name="txtDueDate"
              placeholder="Due Date"
              value={LibraryUtils.moment(
                Stores.patientRegistationStore.patientOrder?.dueDate
              ).format("YYYY-MM-DD")}
              onChange={(e) => {
                let dueDate = new Date(e.target.value)
                const formatDate = LibraryUtils.moment(dueDate).format(
                  "YYYY-MM-DD HH:mm"
                )
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  dueDate: new Date(formatDate),
                })
              }}
            />
            <LibraryComponents.Atoms.Form.MultilineInput
              rows={4}
              label="Comments"
              name="txtComments"
              placeholder="Comments"
              value={Stores.patientRegistationStore.patientOrder?.comments}
              onChange={(comments) => {
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  comments,
                })
              }}
            />

            <LibraryComponents.Atoms.Form.Input
              label="Order Status"
              name="txtOrderStatus"
              placeholder="Order Status"
              value={Stores.patientRegistationStore.patientOrder?.orderStatus}
              onChange={(orderStatus) => {
                // setErrors({
                //   ...errors,
                //   acClass: Utils.validate.single(acClass, Utils.patientVisit.acClass),
                // })
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  orderStatus,
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
            //   
            //   Stores.enviromentSettingsStore.EnvironmentSettingsService.addSessionManagement(
            //     Stores.enviromentSettingsStore
            //       .sessionManagement as Models.SessionManagement
            //   ).then((res) => {
            //     
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
export default PatientOrder
