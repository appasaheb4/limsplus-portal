/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import "@lp/library/assets/css/accordion.css"
import { useForm, Controller } from "react-hook-form"
import * as FeatureComponents from "../../components"

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
import { PackagesList } from "../../components/molecules"

interface PatientOrderProps {
  onModalConfirm?: (item: any) => void
}

const PatientOrder = observer((props: PatientOrderProps) => {
  const {
    loading,
    patientOrderStore,
    patientVisitStore,
    loginStore,
    routerStore,
    masterPackageStore,
    masterPanelStore,
    departmentStore,
    sectionStore,
    labStore,
  } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  setValue("orderId", patientOrderStore.patientOrder?.orderId)
  const [hideInputView, setHideInputView] = useState<boolean>(true)
  const onSubmitPatientOrder = () => {
    // Add PatientOrder Api Calling
  }

  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      patientOrderStore.updatePatientOrder({
        ...patientOrderStore.patientOrder,
        environment: loginStore.login.environment,
      })
      setValue("environment", loginStore.login.environment)
    }
  }, [loginStore.login])
  return (
    <>
      {patientOrderStore.patientOrder?.visitId && (
        <LibraryComponents.Atoms.Heading
          title={`${patientOrderStore.patientOrder.visitId} - ${patientOrderStore.patientOrder.patientName}`}
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
        className={"p-2 rounded-lg shadow-xl " + (hideInputView ? "shown" : "shown")}
      >
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Order Id"
                    placeholder={
                      errors.orderId ? "Please Enter order id" : "Order Id"
                    }
                    hasError={errors.orderId}
                    disabled={true}
                    value={patientOrderStore.patientOrder?.orderId}
                    onChange={(orderId) => {
                      onChange(orderId)
                      patientOrderStore.updatePatientOrder({
                        ...patientOrderStore.patientOrder,
                        orderId,
                      })
                    }}
                  />
                )}
                name="orderId"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Visit Id"
                    hasError={errors.visitId}
                  >
                    <LibraryComponents.Molecules.AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      placeholder="Search by visit id or name"
                      data={{
                        list: patientVisitStore.listPatientVisit,
                        displayKey: ["visitId", "patientName"],
                      }}
                      hasError={errors.collectionCenter}
                      onFilter={(value: string) => {
                        patientVisitStore.patientVisitService.filterByFields({
                          input: {
                            filter: {
                              fields: ["visitId", "patientName"],
                              srText: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        })
                      }}
                      onSelect={(item) => {
                        onChange(item.visitId)
                        patientOrderStore.updatePatientOrder({
                          ...patientOrderStore.patientOrder,
                          visitId: item.visitId,
                          patientName: item.patientName,
                        })
                        patientVisitStore.updatePatientVisitList(
                          patientVisitStore.listPatientVisitCopy
                        )
                      }}
                    />
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="visitId"
                rules={{ required: false }}
                defaultValue=""
              />
              {((patientOrderStore.selectedItems &&
                patientOrderStore.selectedItems?.panels &&
                patientOrderStore.selectedItems?.panels.length > 0) ||
                masterPanelStore.listMasterPanel) && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Panel"
                      hasError={errors.panel}
                    >
                      <LibraryComponents.Molecules.AutoCompleteFilterMutiSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder="Search by code or name"
                        data={{
                          list: masterPanelStore.listMasterPanel,
                          selected: patientOrderStore.selectedItems?.panels,
                          displayKey: ["panelCode", "panelName"],
                        }}
                        hasError={errors.panel}
                        onUpdate={(item) => {
                          const panels = patientOrderStore.selectedItems?.panels
                          onChange(panels)
                          patientOrderStore.updatePatientOrder({
                            ...patientOrderStore.patientOrder,
                            panelCode: _.map(panels, (o) =>
                              _.pick(o, ["panelCode", "serviceType"])
                            ),
                            panelName: _.map(panels, (o) =>
                              _.pick(o, ["panelName", "serviceType"])
                            ),
                          })
                          masterPanelStore.updatePanelMasterList(
                            masterPanelStore.listMasterPanelCopy
                          )
                          //get packages list
                          patientOrderStore.patientOrderService.getPackageList({
                            input: {
                              filter: {
                                panel: _.map(panels, (o) =>
                                  _.pick(o, [
                                    "_id",
                                    "panelCode",
                                    "panelName",
                                    "serviceType",
                                  ])
                                ),
                                serviceTypes:
                                  patientOrderStore.selectedItems.serviceTypes,
                              },
                            },
                          })
                        }}
                        onFilter={(value: string) => {
                          masterPanelStore.masterPanelService.filterByFields({
                            input: {
                              filter: {
                                fields: ["panelCode", "panelName"],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          })
                        }}
                        onSelect={(item) => {
                          let panels = patientOrderStore.selectedItems?.panels
                          if (!item.selected) {
                            if (panels && panels.length > 0) {
                              panels.push(item)
                            }
                            if (!panels) panels = [item]
                          } else {
                            panels = panels.filter((items) => {
                              return items._id !== item._id
                            })
                          }
                          patientOrderStore.updateSelectedItems({
                            ...patientOrderStore.selectedItems,
                            panels,
                            serviceTypes: _.union(_.map(panels, "serviceType")),
                          })
                        }}
                      />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="panel"
                  rules={{ required: true }}
                  defaultValue=""
                />
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Service Type"
                    hasError={errors.serviceType}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.serviceType ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const serviceType = e.target.value
                        onChange(serviceType)
                        patientOrderStore.updatePatientOrder({
                          ...patientOrderStore.patientOrder,
                          serviceType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {patientOrderStore.selectedItems?.serviceTypes.map(
                        (item: any, index: number) => (
                          <option key={index} value={item}>
                            {`${item}`}
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

              {patientOrderStore.packageList && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Package"
                      hasError={errors.package}
                    >
                      <PackagesList data={patientOrderStore.packageList} />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="package"
                  rules={{ required: false }}
                  defaultValue=""
                />
              )}

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Bill"
                    hasError={errors.bill}
                  >
                    <select
                      value={patientOrderStore.patientOrder?.bill}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.bill ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const panel = JSON.parse(e.target.value) as any
                        onChange(panel)
                        patientOrderStore.updatePatientOrder({
                          ...patientOrderStore.patientOrder,
                          bill: panel.bill,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {masterPanelStore.listMasterPanel &&
                        masterPanelStore.listMasterPanel.map(
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
                        patientOrderStore.updatePatientOrder({
                          ...patientOrderStore.patientOrder,
                          department,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {departmentStore.listDepartment.map(
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
                        patientOrderStore.updatePatientOrder({
                          ...patientOrderStore.patientOrder,
                          section,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {sectionStore.listSection &&
                        sectionStore.listSection.map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {`${item.code} - ${item.name}`}
                          </option>
                        ))}
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
                      value={patientOrderStore.patientOrder?.rLab}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.bill ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const rLab = JSON.parse(e.target.value) as any
                        onChange(rLab)
                        patientOrderStore.updatePatientOrder({
                          ...patientOrderStore.patientOrder,
                          rLab,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {loginStore.login.labList &&
                        loginStore.login.labList.map((item: any, index: number) => (
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
                      value={patientOrderStore.patientOrder?.pLab}
                      disabled={
                        loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.pLab ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const pLab = e.target.value as string
                        onChange(pLab)
                        patientOrderStore.updatePatientOrder({
                          ...patientOrderStore.patientOrder,
                          pLab,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {labStore.listLabs.map((item: any, index: number) => (
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
                    label="Out Source Lab"
                    hasError={errors.outSourceLab}
                  >
                    <select
                      value={patientOrderStore.patientOrder?.outSourceLab}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.outSourceLab ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const outSourceLab = e.target.value as string
                        onChange(outSourceLab)
                        patientOrderStore.updatePatientOrder({
                          ...patientOrderStore.patientOrder,
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
                        errors.currentDepartment
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const currentDepartment = e.target.value as string
                        onChange(currentDepartment)
                        patientOrderStore.updatePatientOrder({
                          ...patientOrderStore.patientOrder,
                          currentDepartment,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {departmentStore.listDepartment.map(
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
                    placeholder={
                      errors.dueDate ? "Please Enter DueDate" : "Due Date"
                    }
                    hasError={errors.dueDate}
                    value={LibraryUtils.moment(
                      patientOrderStore.patientOrder?.dueDate
                    ).format("YYYY-MM-DD")}
                    onChange={(e) => {
                      let dueDate = new Date(e.target.value)
                      onChange(dueDate)
                      const formatDate = LibraryUtils.moment(dueDate).format(
                        "YYYY-MM-DD HH:mm"
                      )
                      patientOrderStore.updatePatientOrder({
                        ...patientOrderStore.patientOrder,
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
                    placeholder={
                      errors.resultDate ? "Please Enter DueDate" : "Due Date"
                    }
                    hasError={errors.resultDate}
                    value={LibraryUtils.moment(
                      patientOrderStore.patientOrder?.resultDate
                    ).format("YYYY-MM-DD")}
                    onChange={(e) => {
                      let resultDate = new Date(e.target.value)
                      onChange(resultDate)
                      const formatDate = LibraryUtils.moment(resultDate).format(
                        "YYYY-MM-DD HH:mm"
                      )
                      patientOrderStore.updatePatientOrder({
                        ...patientOrderStore.patientOrder,
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
                      value={patientOrderStore.patientOrder?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value as string
                        onChange(status)
                        patientOrderStore.updatePatientOrder({
                          ...patientOrderStore.patientOrder,
                          status,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
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
                    placeholder={
                      errors.comments ? "Please Enter Comments" : "Comments"
                    }
                    hasError={errors.comments}
                    value={patientOrderStore.patientOrder?.comments}
                    onChange={(comments) => {
                      onChange(comments)
                      patientOrderStore.updatePatientOrder({
                        ...patientOrderStore.patientOrder,
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
                      value={patientOrderStore.patientOrder?.environment}
                      disabled={
                        loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const environment = e.target.value
                        onChange(environment)
                        patientOrderStore.updatePatientOrder({
                          ...patientOrderStore.patientOrder,
                          environment,
                        })
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : patientOrderStore.patientOrder?.environment || `Select`}
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
                  <LibraryComponents.Atoms.Grid cols={2}>
                    <LibraryComponents.Atoms.List
                      direction="col"
                      justify="stretch"
                      fill
                      space={4}
                    ></LibraryComponents.Atoms.List>
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
      </div>

      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        <FeatureComponents.Molecules.PatientOrderList
          data={patientOrderStore.listPatientOrder}
          totalSize={patientOrderStore.listPatientOrderCount}
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
  )
})
export default PatientOrder
