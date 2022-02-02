/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { lookupItems,lookupValue,moment } from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import { PatientSampleList } from "../../components"
import { Stores as SampleTypeStore } from "@lp/features/master/sampleType/stores"
import { Stores as SampleContainerStore } from "@lp/features/master/sampleContainer/stores"
import { Stores as LoginStores } from "@lp/features/login/stores"
import { Stores as AdministrativeDivisionStore } from "@lp/features/master/administrativeDivisions/stores"
import { Stores as DepartmentStore } from "@lp/features/master/department/stores"
import { Stores as LabStores } from "@lp/features/master/labs/stores"
import { Stores as SectionStore } from "@lp/features/master/section/stores"
import "@lp/library/assets/css/accordion.css"
import { stores } from "@lp/stores"
import { toJS } from "mobx"
import { Stores } from "../../stores"
import { RouterFlow } from "@lp/flows"

interface PatientSampleProps {
  onModalConfirm?: (item: any) => void
}

export const PatientSample = observer((props: PatientSampleProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const onSubmitPatientSample = () => {
    //api calling
  }
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.patientRegistationStore.updatePatientSample({
        ...Stores.patientRegistationStore.patientSample,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])
  return (
    <>
      <div className="p-2 rounded-lg shadow-xl">
        <LibraryComponents.Atoms.Grid cols={2}>
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            fill
            justify="stretch"
          >
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Input
                  label="Specimen ID"
                  name="txtSpecimenId"
                  placeholder={
                    errors.specimenId ? "Please Enter Specimen Id" : "Specimen Id"
                  }
                  hasError={errors.specimenId}
                  value={Stores.patientRegistationStore.patientSample?.specimenId}
                  onChange={(specimenId) => {
                    onChange(specimenId)
                    Stores.patientRegistationStore.updatePatientSample({
                      ...Stores.patientRegistationStore.patientSample,
                      specimenId,
                    })
                  }}
                />
              )}
              name="specimenId"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="PLab"
                  hasError={errors.pLab}
                >
                  <select
                    value={Stores.patientRegistationStore.patientSample?.pLab}
                    disabled={
                      stores.loginStore.login &&
                      stores.loginStore.login.role !== "SYSADMIN"
                        ? true
                        : false
                    }
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.pLab ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const pLab = e.target.value as string
                      onChange(pLab)
                      Stores.patientRegistationStore.updatePatientSample({
                        ...Stores.patientRegistationStore.patientSample,
                        pLab,
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
              name="pLab"
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
                    value={Stores.patientRegistationStore.patientSample?.rLab}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.rLab ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const rLab = JSON.parse(e.target.value) as any
                      onChange(rLab)
                      Stores.patientRegistationStore.updatePatientSample({
                        ...Stores.patientRegistationStore.patientSample,
                        rLab,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {LoginStores.loginStore.login?.labList &&
                      LoginStores.loginStore.login?.labList.map(
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
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Out Source Lab"
                  hasError={errors.outSourceLab}
                >
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.outSourceLab ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const outSourceLab = e.target.value as string
                      onChange(outSourceLab)
                      Stores.patientRegistationStore.updatePatientSample({
                        ...Stores.patientRegistationStore.patientSample,
                        outSourceLab,
                      })
                    }}
                  >
                    <option selected>Select</option>
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="outSourceLab"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Out Source Lab"
                  hasError={errors.outSourceLab}
                >
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.outSourceLab ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const outSourceStatus = e.target.value as string
                      onChange(outSourceStatus)
                      Stores.patientRegistationStore.updatePatientSample({
                        ...Stores.patientRegistationStore.patientSample,
                        outSourceStatus,
                      })
                    }}
                  >
                    <option selected>Select</option>
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="outSourceStatus"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Department"
                  hasError={errors.department}
                >
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.department ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const department = e.target.value as string
                      onChange(department)
                      Stores.patientRegistationStore.updatePatientSample({
                        ...Stores.patientRegistationStore.patientSample,
                        department,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {DepartmentStore.departmentStore.listDepartment.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.code} - ${item.name}`}
                        </option>
                      )
                    )}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="department"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Section"
                  hasError={errors.section}
                >
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.section ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const section = e.target.value as string
                      onChange(section)
                      Stores.patientRegistationStore.updatePatientSample({
                        ...Stores.patientRegistationStore.patientSample,
                        section,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {SectionStore.sectionStore.listSection.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.code} - ${item.name}`}
                        </option>
                      )
                    )}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="section"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Container ID"
                  hasError={errors.containerId}
                >
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.containerId ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const containerId = e.target.value as string
                      onChange(containerId)
                      Stores.patientRegistationStore.updatePatientSample({
                        ...Stores.patientRegistationStore.patientSample,
                        containerId,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {SampleContainerStore.sampleContainerStore.listSampleContainer &&
                      SampleContainerStore.sampleContainerStore.listSampleContainer.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.sampleType}>
                            {`${item.containerCode} - ${item.containerName}`}
                          </option>
                        )
                      )}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="containerId"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Sample Type"
                  hasError={errors.sampleType}
                >
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.sampleType ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const sampleType = e.target.value as string
                      onChange(sampleType)
                      Stores.patientRegistationStore.updatePatientSample({
                        ...Stores.patientRegistationStore.patientSample,
                        sampleType,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {SampleTypeStore.sampleTypeStore.listSampleType &&
                      SampleTypeStore.sampleTypeStore.listSampleType.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.sampleType}>
                            {`${item.sampleCode} - ${item.sampleType}`}
                          </option>
                        )
                      )}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="sampleType"
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
                <LibraryComponents.Atoms.Form.InputDate
                  label="Received Date"
                  name="txtReceivedDate"
                  placeholder={
                    errors.receivedDate
                      ? "Please Enter ReceivedDate"
                      : "Received Date"
                  }
                  hasError={errors.receivedDate}
                  value={moment(
                    Stores.patientRegistationStore.patientSample?.receivedDate
                  ).format("YYYY-MM-DD")}
                  onChange={(e) => {
                    let receivedDate = new Date(e.target.value)
                    onChange(receivedDate)
                    const formatDate =
                      moment(receivedDate).format("YYYY-MM-DD HH:mm")

                    Stores.patientRegistationStore.updatePatientSample({
                      ...Stores.patientRegistationStore.patientSample,
                      receivedDate: new Date(formatDate),
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
                  label="Collection Date"
                  name="txtCollectionDate"
                  placeholder={
                    errors.collectionDate
                      ? "Please Enter Collection Date"
                      : "Collection Date"
                  }
                  hasError={errors.collectionDate}
                  value={moment(
                    Stores.patientRegistationStore.patientSample?.collectionDate
                  ).format("YYYY-MM-DD")}
                  onChange={(e) => {
                    let collectionDate = new Date(e.target.value)
                    onChange(collectionDate)
                    const formatDate =
                      moment(collectionDate).format("YYYY-MM-DD HH:mm")

                    Stores.patientRegistationStore.updatePatientSample({
                      ...Stores.patientRegistationStore.patientSample,
                      collectionDate: new Date(formatDate),
                    })
                  }}
                />
              )}
              name="collectionDate"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Method Collection"
                  hasError={errors.methodCollection}
                >
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.methodCollection
                        ? "border-red-500  "
                        : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const methodCollection = e.target.value
                      onChange(methodCollection)
                      Stores.patientRegistationStore.updatePatientSample({
                        ...Stores.patientRegistationStore.patientSample,
                        methodCollection,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      stores.routerStore.lookupItems,
                      "PATIENT SAMPLE - METHOD_COLLECTION"
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
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
                  placeholder={
                    errors.dateCollection
                      ? "Please Enter Date Collection"
                      : "Date Collection"
                  }
                  hasError={errors.dateCollection}
                  value={moment(
                    Stores.patientRegistationStore.patientSample?.dateCollection
                  ).format("YYYY-MM-DD")}
                  onChange={(e) => {
                    let dateCollection = new Date(e.target.value)
                    onChange(dateCollection)
                    const formatDate =
                      moment(dateCollection).format("YYYY-MM-DD HH:mm")

                    Stores.patientRegistationStore.updatePatientSample({
                      ...Stores.patientRegistationStore.patientSample,
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
                <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                  <select
                    value={Stores.patientRegistationStore.patientSample?.status}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.status ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const status = e.target.value
                      onChange(status)
                      Stores.patientRegistationStore.updatePatientSample({
                        ...Stores.patientRegistationStore.patientSample,
                        status,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      stores.routerStore.lookupItems,
                      "PATIENT SAMPLE - STATUS"
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

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                  <select
                    value={Stores.patientRegistationStore.patientSample?.environment}
                    disabled={
                      stores.loginStore.login &&
                      stores.loginStore.login.role !== "SYSADMIN"
                        ? true
                        : false
                    }
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.environment ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const environment = e.target.value
                      onChange(environment)
                      Stores.patientRegistationStore.updatePatientSample({
                        ...Stores.patientRegistationStore.patientSample,
                        environment,
                      })
                    }}
                  >
                    <option selected>
                      {stores.loginStore.login &&
                      stores.loginStore.login.role !== "SYSADMIN"
                        ? `Select`
                        : Stores.patientRegistationStore.patientSample
                            ?.environment || `Select`}
                    </option>
                    {lookupItems(
                      stores.routerStore.lookupItems,
                      "PATIENT SAMPLE - ENVIRONMENT"
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
      </div>
      <br />
      <LibraryComponents.Atoms.List direction="row" space={3} align="center">
        <LibraryComponents.Atoms.Buttons.Button
          size="medium"
          type="solid"
          icon={LibraryComponents.Atoms.Icon.Save}
          onClick={handleSubmit(onSubmitPatientSample)}
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
        <PatientSampleList
          data={Stores.patientRegistationStore.listPatientSample}
          totalSize={Stores.patientRegistationStore.listPatientSampleCount}
          extraData={{
            lookupItems: stores.routerStore.lookupItems,
            listAdministrativeDiv:
              AdministrativeDivisionStore.administrativeDivStore
                .listAdministrativeDiv,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(stores.routerStore.userPermission),
            "Delete"
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(stores.routerStore.userPermission),
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
          //   // Stores.enviromentSettingsStore.fetchSessionManagementList(page, limit)
          // }}
        />
      </div>
    </>
  )
})

