/* eslint-disable */
import React, { useEffect} from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import "@lp/library/assets/css/accordion.css"
import { useForm, Controller } from "react-hook-form"
import { stores } from "@lp/stores"

import { Stores } from "../../stores"


interface PatientVisitProps {
  onModalConfirm?: (item: any) => void
}

const PatientVisit = observer((props: PatientVisitProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const onSubmitPatientVisit = () =>{
    //  Add PatientVisit Api Calling.
  }

  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.patientRegistationStore.updatePatientVisit({
        ...Stores.patientRegistationStore.patientVisit,
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
              label="Pid"
              name="txtPid"
              placeholder={errors.pId?"Please Enter PId":"Pid"}
              hasError={errors.pId}
              disabled={true}
              value={Stores.patientRegistationStore.patientVisit?.pId}
              onChange={(pId) => {
                onChange(pId)
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  pId,
                })
              }}
            />
            )}
              name="pId"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Lab Id"
              name="txtLabId"
              placeholder={errors.labId?"Please Enter LabId":"Lab Id"}
              hasError={errors.labId}
              value={Stores.patientRegistationStore.patientVisit?.labId}
              onChange={(labId) => {
               onChange(labId)
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
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
              label="Internal Id"
              name="txtInternalId"
              placeholder={errors.internalId?"Please Enter InternalId":"Internal Id"}
              hasError={errors.internalId}
              value={Stores.patientRegistationStore.patientVisit?.internalId}
              onChange={(internalId) => {
                onChange(internalId)
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  internalId,
                })
              }}
            />
            )}
              name="internalId"
              rules={{ required: true }}
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
              value={Stores.patientRegistationStore.patientVisit?.rLab}
              onChange={(rLab) => {
                onChange(rLab)
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  rLab,
                })
              }}
            />
            )}
              name="rLab"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputDate
              label="BithDate"
              name="txtBirthDate"
              placeholder={errors.birthDate?"Please Enter BirthDate":"BirthDate"}
              hasError={errors.birthDate}
              value={LibraryUtils.moment(
                Stores.patientRegistationStore.patientVisit?.birthDate
              ).format("YYYY-MM-DD")}
              onChange={(e) => {
                let birthDate = new Date(e.target.value)
                onChange(birthDate)
                const formatDate = LibraryUtils.moment(birthDate).format(
                  "YYYY-MM-DD HH:mm"
                )
                
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
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
              placeholder={errors.birthDate?"Please Enter Age":"Age"}
              hasError={errors.age}
              type="number"
              value={Stores.patientRegistationStore.patientVisit?.age}
              onChange={(age) => {
                onChange(age)
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
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
              placeholder={errors.ageUnits?"Please Enter AgeUnits":"Age Units"}
              hasError={errors.ageUnits}
              value={Stores.patientRegistationStore.patientVisit?.ageUnits}
              onChange={(ageUnits) => {
                onChange(ageUnits)
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  ageUnits,
                })
              }}
            />
            )}
              name="ageUnits"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputDate
              label="Date Registration"
              name="txtDateRegistration"
              placeholder={errors.dateRegistration?"Please Enter DateRegistration":"Date Registration"}
              hasError={errors.dateRegistration}
              value={LibraryUtils.moment(
                Stores.patientRegistationStore.patientVisit?.dateRegistration
              ).format("YYYY-MM-DD")}
              onChange={(e) => {
                let dateRegistration = new Date(e.target.value)
                onChange(dateRegistration)
                const formatDate = LibraryUtils.moment(dateRegistration).format(
                  "YYYY-MM-DD HH:mm"
                )
                
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  dateRegistration: new Date(formatDate),
                })
              }}
            />
            )}
              name="dateRegistration"
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
            <LibraryComponents.Atoms.Form.InputDate
              label="Date Service"
              name="txtDateService"
              placeholder={errors.dateService?"Please Enter DateService":"Date Service"}
              hasError={errors.dateService}
              value={LibraryUtils.moment(
                Stores.patientRegistationStore.patientVisit?.dateService
              ).format("YYYY-MM-DD")}
              onChange={(e) => {
                let dateService = new Date(e.target.value)
                onChange(dateService)
                const formatDate = LibraryUtils.moment(dateService).format(
                  "YYYY-MM-DD HH:mm"
                )
                
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  dateService: new Date(formatDate),
                })
              }}
            />
            )}
              name="dateService"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputWrapper
              label="Method Collection"
              id="optionMethodCollection"
              hasError={errors.methodCollection}
            >
              <select
                name="optionMethodCollections"
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.methodCollection
                    ? "border-red-500  "
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const methodCollection = e.target.value as string
                  onChange(methodCollection)
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
            )}
            name="methodCollection"
            rules={{ required: true }}
            defaultValue=""
          />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputDate
              label="Date Collection"
              name="txtDateCollection"
              placeholder={errors.dateCollection?"Please Enter DateCollection":"Date Collection"}
              hasError={errors.dateCollection}
              value={LibraryUtils.moment(
                Stores.patientRegistationStore.patientVisit?.dateCollection
              ).format("YYYY-MM-DD")}
              onChange={(e) => {
                let dateCollection = new Date(e.target.value)
                onChange(dateCollection)
                const formatDate = LibraryUtils.moment(dateCollection).format(
                  "YYYY-MM-DD HH:mm"
                )
               
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  dateCollection: new Date(formatDate),
                })
              }}
            />
            )}
              name="dateCollection"
              rules={{ required: true }}
              defaultValue=""
            />
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
            )}
            name="collectionCenter"
            rules={{ required: false }}
            defaultValue=""
          />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputWrapper
              label="Report Center"
              id="optionReportCenter"
              hasError={errors.reportCenter}
            >
              <select
                name="optionReportCenters"
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.reportCenter
                    ? "border-red-500  "
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const reportCenter = e.target.value as string
                  onChange(reportCenter)
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
            )}
            name="reportCenter"
            rules={{ required: false }}
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
                  errors.doctorId
                    ? "border-red-500  "
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const doctorId = e.target.value as string
                  onChange(doctorId)
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
                  errors.doctorName
                    ? "border-red-500  "
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const doctorName = e.target.value as string
                  onChange(doctorName)
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
            )}
            name="doctorName"
            rules={{ required: false }}
            defaultValue=""
          />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="AC Class"
              name="txtAcClass"
              placeholder={errors.acClass?"Please Enter ACClass":"AC Class"}
              hasError={errors.acClass}
              value={Stores.patientRegistationStore.patientVisit?.acClass}
              onChange={(acClass) => {
                onChange(acClass)
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
            )}
              name="acClass"
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
              label="Bill To"
              name="txtBillTo"
              placeholder={errors.billTo?"Please Enter BillTo":"Bill To"}
              hasError={errors.billTo}
              value={Stores.patientRegistationStore.patientVisit?.billTo}
              onChange={(billTo) => {
                onChange(billTo)
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
            )}
              name="billTo"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Invoice Ac"
              name="txtInvoiceAC"
              placeholder={errors.invoiceAc?"Please Enter InvoiceAc":"Invoice Ac"}
              hasError={errors.invoiceAc}
              value={Stores.patientRegistationStore.patientVisit?.invoiceAc}
              onChange={(invoiceAc) => {
                onChange(invoiceAc)
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
            )}
              name="invoiceAc"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Report Priority"
              name="txtReportPriority"
              placeholder={errors.reportPriority?"Please Enter ReportPriority":"Report Priority"}
              hasError={errors.reportPriority}
              value={Stores.patientRegistationStore.patientVisit?.reportPriority}
              onChange={(reportPriority) => {
                onChange(reportPriority)
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
            )}
              name="reportPriority"
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
              value={Stores.patientRegistationStore.patientVisit?.history}
              onChange={(history) => {
                Stores.patientRegistationStore.updatePatientVisit({
                  ...Stores.patientRegistationStore.patientVisit,
                  history,
                })
              }}
            />
            )}
              name="history"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Status"
              name="txtStatus"
              hasError={errors.status}
              placeholder={errors.status?"Please Enter Status":"Status"}
              value={Stores.patientRegistationStore.patientVisit?.status}
              onChange={(status) => {
                onChange(status)
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
            )}
              name="status"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Created By"
              name="txtCreateBy"
              placeholder={errors.createdBy?"Please Enter CreatedBy":"Created By"}
              hasError={errors.createdBy}
              value={Stores.patientRegistationStore.patientVisit?.createdBy}
              onChange={(createdBy) => {
                onChange(createdBy)
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
            )}
              name="createdBy"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                <select
                  value={Stores.patientRegistationStore.patientVisit?.environment}
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
                    Stores.patientRegistationStore.updatePatientVisit({
                      ...Stores.patientRegistationStore.patientVisit,
                      environment,
                    })
                  }}
                >
                  <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.patientRegistationStore.patientVisit?.environment || `Select`}
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
      ></div>
    </>
  )
})
export default PatientVisit
