/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import "@lp/library/assets/css/accordion.css"
import { useForm, Controller } from "react-hook-form"
import * as FeatureComponents from "../../components"
import { Stores as PanelMaster } from "@lp/features/collection/masterPanel/stores"
import { Stores as LoginStores } from "@lp/features/login/stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as PackageMaster } from "@lp/features/collection/masterPackage/stores"
import { Stores as SectionMaster } from "@lp/features/collection/section/stores"
import { Stores } from "../../stores"
import { stores } from "@lp/stores"
import { toJS } from "mobx"
import { RouterFlow } from "@lp/flows"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';



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
        <LibraryComponents.Atoms.Grid cols={2}>
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
              label="Visit Id"
              hasError={errors.visitId}
            >
              <select
                name="optionCollectionCenters"
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.visitId
                    ? "border-red-500  "
                    : "border-gray-300"
                } rounded-md`}
                onChange={(e) => {
                  const visitId = e.target.value as string
                  onChange(visitId)
                  Stores.patientRegistationStore.updatePatientOrder({
                    ...Stores.patientRegistationStore.patientOrder,
                    visitId,
                  })
                }}
              >
                <option selected>Select</option>
                {/* {["Collection 1"].map((item: any, index: number) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))} */}
              </select>
            </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="visitId"
            rules={{ required: false }}
            defaultValue=""
          />
            <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Package Code"
                    hasError={errors.packageCode}
                  >
                    <select
                      // value={Stores.patientRegistationStore.patientOrder?.packageCode}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.packageCode
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const packageItem = JSON.parse(e.target.value) as any
                        onChange(packageItem)
                        setValue("packageName",packageItem.packageName)
                        Stores.patientRegistationStore.updatePatientOrder({
                          ...Stores.patientRegistationStore.patientOrder,
                          packageCode: packageItem.packageCode,
                          packageName: packageItem.packageName
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {PackageMaster.masterPackageStore.listMasterPackage &&
                        PackageMaster.masterPackageStore.listMasterPackage.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.packageCode} - ${item.packageName}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="packageCode"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Package Name"
                    name="txtPackageName"
                    disabled={true}
                    value={Stores.patientRegistationStore.patientOrder?.packageName}
                    placeholder={
                      errors.packageName ? "Please Enter Package Name" : "Package Name"
                    }
                    hasError={errors.packageName}
                  />
                )}
                name="packageName"
                rules={{ required: false }}
                defaultValue=""
              />
            <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Panel Code"
                    hasError={errors.panelCode}
                  >
                    <select
                      // value={Stores.patientRegistationStore.patientOrder?.panelCode}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.panelCode
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const panel = JSON.parse(e.target.value) as any
                        onChange(panel)
                        setValue("panelName", panel.panelName)
                        Stores.patientRegistationStore.updatePatientOrder({
                          ...Stores.patientRegistationStore.patientOrder,
                          panelCode: panel.panelCode,
                          panelName: panel.panelName,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {PanelMaster.masterPanelStore.listMasterPanel &&
                        PanelMaster.masterPanelStore.listMasterPanel.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.panelName} - ${item.panelCode}  `}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="panelCode"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Panel Name"
                    name="txtPanelName"
                    disabled={true}
                    value={Stores.patientRegistationStore.patientOrder?.panelName}
                    placeholder={
                      errors.panelName ? "Please Enter Panel Name" : "Panel Name"
                    }
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.panelName ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    hasError={errors.panelName}
                  />
                )}
                name="panelName"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Bill"
                    hasError={errors.bill}
                  >
                    <select
                      value={Stores.patientRegistationStore.patientOrder?.bill}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.bill
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const panel = JSON.parse(e.target.value) as any
                        onChange(panel)
                        Stores.patientRegistationStore.updatePatientOrder({
                          ...Stores.patientRegistationStore.patientOrder,
                          bill:panel.bill 
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {PanelMaster.masterPanelStore.listMasterPanel &&
                        PanelMaster.masterPanelStore.listMasterPanel.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.bill}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="bill"
                rules={{ required: true }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Service Type"
                    hasError={errors.serviceType}
                  >
                    <select
                      // value={Stores.patientRegistationStore.patientOrder?.serviceType}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.serviceType
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const service = JSON.parse(e.target.value) as any
                        onChange(service)
                        Stores.patientRegistationStore.updatePatientOrder({
                          ...Stores.patientRegistationStore.patientOrder,
                          serviceType: service.serviceType
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {PanelMaster.masterPanelStore.listMasterPanel &&
                        PanelMaster.masterPanelStore.listMasterPanel.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.serviceType}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="serviceType"
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
                        Stores.patientRegistationStore.updatePatientOrder({
                          ...Stores.patientRegistationStore.patientOrder,
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
                        Stores.patientRegistationStore.updatePatientOrder({
                          ...Stores.patientRegistationStore.patientOrder,
                          section,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {SectionMaster.sectionStore.listSection&&SectionMaster.sectionStore.listSection.map(
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
                    label="Rlab"
                    hasError={errors.rLab}
                  >
                    <select
                      value={Stores.patientRegistationStore.patientOrder?.rLab}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.bill
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const rLab = JSON.parse(e.target.value) as any
                        onChange(rLab)
                        Stores.patientRegistationStore.updatePatientOrder({
                          ...Stores.patientRegistationStore.patientOrder,
                          rLab
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
                    label="PLab"
                    hasError={errors.pLab}
                  >
                    <select
                      value={Stores.patientRegistationStore.patientOrder?.pLab}
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
                        Stores.patientRegistationStore.updatePatientOrder({
                          ...Stores.patientRegistationStore.patientOrder,
                          pLab,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LabStores.labStore.listLabs.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {item.name}
                          </option>
                        )
                      )}
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
                    label="Out Source Lab"
                    hasError={errors.outSourceLab}
                  >
                    <select
                      value={Stores.patientRegistationStore.patientOrder?.outSourceLab}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.outSourceLab ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const outSourceLab = e.target.value as string
                        onChange(outSourceLab)
                        Stores.patientRegistationStore.updatePatientOrder({
                          ...Stores.patientRegistationStore.patientOrder,
                          outSourceLab,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {/* //coming from Panel Master */}
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
                    label="Current Department"
                    hasError={errors.currentDepartment}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.currentDepartment ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const currentDepartment = e.target.value as string
                        onChange(currentDepartment)
                        Stores.patientRegistationStore.updatePatientOrder({
                          ...Stores.patientRegistationStore.patientOrder,
                          currentDepartment,
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
                name="currentDepartment"
                rules={{ required: true }}
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
            <LibraryComponents.Atoms.Form.InputDate
              label="Result Date"
              name="txtResultDate"
              placeholder={errors.resultDate?"Please Enter DueDate":"Due Date"}
              hasError={errors.resultDate}
              value={LibraryUtils.moment(
                Stores.patientRegistationStore.patientOrder?.resultDate
              ).format("YYYY-MM-DD")}
              onChange={(e) => {
                let resultDate = new Date(e.target.value)
                onChange(resultDate)
                const formatDate = LibraryUtils.moment(resultDate).format(
                  "YYYY-MM-DD HH:mm"
                )
                Stores.patientRegistationStore.updatePatientOrder({
                  ...Stores.patientRegistationStore.patientOrder,
                  resultDate: new Date(formatDate),
                })
              }}
            />
            )}
              name="resultDate"
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
                      value={Stores.patientRegistationStore.patientOrder?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value as string
                        onChange(status)
                        Stores.patientRegistationStore.updatePatientOrder({
                          ...Stores.patientRegistationStore.patientOrder,
                          status,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "PATIENT ORDER - STATUS"
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
      <div className='extra' style={{border:'1px solid yellow'}}>
      <Accordion allowZeroExpanded>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        EXTRA DATA
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <>
                        <LibraryComponents.Atoms.Grid cols={2}>
                            <LibraryComponents.Atoms.List direction='col' justify='stretch' fill space={4}> 
                              
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
      >
        <FeatureComponents.Molecules.PatientOrderList
          data={Stores.patientRegistationStore.listPatientOrder}
          totalSize={Stores.patientRegistationStore.listPatientOrderCount}
          extraData={{
            lookupItems: stores.routerStore.lookupItems,
            // listAdministrativeDiv: AdministrativeDivisionStore.administrativeDivStore.listAdministrativeDiv
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
export default PatientOrder
