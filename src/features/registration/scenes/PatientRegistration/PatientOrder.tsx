/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import "@lp/library/assets/css/accordion.css"
import { useForm, Controller } from "react-hook-form"
import { Stores } from "../../stores"

import { stores } from "@lp/stores"


interface PatientOrderProps {
  onModalConfirm?: (item: any) => void
}

const PatientOrder = observer((props: PatientOrderProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()
  const onSubmitPatientOrder = () =>{
    // Add PatientOrder Api Calling
  }
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.patientRegistationStore.updatePatientOrder({
        ...Stores.patientRegistationStore.patientOrder,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])
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
            <LibraryComponents.Atoms.Form.Input
              label="Lab Id"
              name="txtLabId"
              placeholder={errors.labId?"Please Enter Lab Id":"Lab Id"}
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.labId}
              onChange={(labId) => {
                onChange(labId)
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  labId,
                })
              }}
            />
            )}
              name="labId"
              rules={{ required: true }}
              defaultValue=""
            />

            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Package"
              name="txtPackage"
              placeholder={errors.packageValue?"Please Enter Package Value":"Package"}
              hasError={errors.packageValue}
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.packageValue}
              onChange={(packageValue) => {
                onChange(packageValue)
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  packageValue,
                })
              }}
            />
            )}
              name="packageValue"
              rules={{ required: true }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Panel"
              name="txtPanel"
              placeholder={errors.panel?"Please Enter Panel":"Panel"}
              hasError={errors.panel}
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.panel}
              onChange={(panel) => {
                onChange(panel)
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  panel,
                })
              }}
            />
            )}
              name="panel"
              rules={{ required: true }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Test"
              name="txtTest"
              placeholder={errors.test?"Please Enter Test":"Test"}
              hasError={errors.test}
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.test}
              onChange={(test) => {
                onChange(test)
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  test,
                })
              }}
            />
            )}
              name="test"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Analyte"
              name="txtAnalyte"
              placeholder={errors.analyte?"Please Enter Analyte":"Analyte"}
              hasError={errors.analyte}
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.analyte}
              onChange={(analyte) => {
                onChange(analyte)
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
            )}
              name="analyte"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Bill"
              name="txtBill"
              placeholder={errors.bill?"Please Enter Bill":"Bill"}
              hasError={errors.bill}
              value={Stores.patientRegistationStore.patientOrder?.bill}
              onChange={(bill) => {
                onChange(bill)
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
            )}
              name="bill"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
              label="Container Id"
              name="txtContainerId"
              placeholder={errors.containerId?"Please Enter Container Id":"Containcer Id"}
              hasError={errors.containerId}
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.containerId}
              onChange={(containerId) => {
                onChange(containerId)
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
            )}
              name="containerId"
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
              label="Sample Type"
              name="txtSampleType"
              placeholder={errors.sampleType?"Please Enter Sample Type":"Sample Type"}
              hasError={errors.sampleType}
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.sampleType}
              onChange={(sampleType) => {
                onChange(sampleType)
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
            )}
              name="sampleType"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Sample Id"
              name="txtSampleId"
              placeholder={errors.sampleId?"Please Enter Sample ID":"Sample Id"}
              hasError={errors.sampleId}
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.sampleId}
              onChange={(sampleId) => {
                onChange(sampleId)
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
            )}
              name="sampleId"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="RLab"
              name="txtRLab"
              placeholder={errors.rLab?"Please Enter RLab":"RLab"}
              hasError={errors.rLab}
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.rLab}
              onChange={(rLab) => {
                onChange(rLab)
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
            )}
              name="rLab"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="PLab"
              name="txtPLab"
              placeholder={errors.pLab?"Please Enter PLab":"PLab"}
              hasError={errors.pLab}
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.pLab}
              onChange={(pLab) => {
                onChange(pLab)
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
            )}
              name="pLab"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Department"
              name="txtDepartment"
              placeholder={errors.department?"Please Enter Department":"Department"}
              hasError={errors.department}
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.department}
              onChange={(department) => {
                onChange(department)
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
            )}
              name="department"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Section"
              name="txtSection"
              placeholder={errors.section?"Please Enter Section":"Section"}
              hasError={errors.section}
              disabled={true}
              value={Stores.patientRegistationStore.patientOrder?.section}
              onChange={(section) => {
                onChange(section)
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
            )}
              name="section"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
             <LibraryComponents.Atoms.Form.Input
              label="PS"
              name="txtPS"
              placeholder={errors.ps?"Please Enter PS":"PS"}
              hasError={errors.ps}
              value={Stores.patientRegistationStore.patientOrder?.ps}
              onChange={(ps) => {
                onChange(ps)
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
            )}
              name="ps"
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
              label="TS"
              name="txtTS"
              placeholder={errors.ts?"Please Enter TS":"TS"}
              hasError={errors.ts}
              value={Stores.patientRegistationStore.patientOrder?.ts}
              onChange={(ts) => {
                onChange(ts)
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
            )}
              name="ts"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="AS"
              name="txtAS"
              placeholder={errors.as?"Please Enter AS":"AS"}
              hasError={errors.as}
              value={Stores.patientRegistationStore.patientOrder?.as}
              onChange={(as) => {
                onChange(as)
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
            )}
              name="as"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputDate
              label="Due Date"
              name="txtDueDate"
              placeholder={errors.dueDate?"Please Enter DueDate":"Due Date"}
              hasError={errors.dueDate}
              value={LibraryUtils.moment(
                Stores.patientRegistationStore.patientOrder?.dueDate
              ).format("YYYY-MM-DD")}
              onChange={(e) => {
                let dueDate = new Date(e.target.value)
                onChange(dueDate)
                const formatDate = LibraryUtils.moment(dueDate).format(
                  "YYYY-MM-DD HH:mm"
                )
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  dueDate: new Date(formatDate),
                })
              }}
            />
            )}
              name="dueDate"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.MultilineInput
              rows={4}
              label="Comments"
              name="txtComments"
              placeholder={errors.comments?"Please Enter Comments":"Comments"}
              hasError={errors.comments}
              value={Stores.patientRegistationStore.patientOrder?.comments}
              onChange={(comments) => {
                onChange(comments)
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  comments,
                })
              }}
            />
            )}
              name="comments"
              rules={{ required: false }}
              defaultValue=""
            />

            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Order Status"
              name="txtOrderStatus"
              placeholder={errors.orderStatus?"Please Enter OrderStatus":"Order Status"}
              hasError={errors.orderStatus}
              value={Stores.patientRegistationStore.patientOrder?.orderStatus}
              onChange={(orderStatus) => {
                onChange(orderStatus)
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
            )}
              name="orderStatus"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                <select
                  value={Stores.patientRegistationStore.patientOrder?.environment}
                  disabled={
                    stores.loginStore.login &&
                    stores.loginStore.login.role !== "SYSADMIN"
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
                    Stores.patientRegistationStore.updatePatientOrder({
                      ...Stores.patientRegistationStore.patientOrder,
                      environment,
                    })
                  }}
                >
                  <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.patientRegistationStore.patientOrder?.environment || `Select`}
                      </option>
                  {LibraryUtils.lookupItems(stores.routerStore.lookupItems, "ENVIRONMENT").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="environment"
            rules={{ required: true }}
            defaultValue=""
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
          onClick={handleSubmit(onSubmitPatientOrder)}
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
