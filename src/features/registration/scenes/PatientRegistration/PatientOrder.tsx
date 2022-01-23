/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import "@lp/library/assets/css/accordion.css"
import { useForm, Controller } from "react-hook-form"
import * as FeatureComponents from "../../components"
import { PatientOrderHoc } from "../../hoc"

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
import { TablePackagesList, TableExtraDataPackages } from "../../components/molecules"

interface PatientOrderProps {
  onModalConfirm?: (item: any) => void
}

const PatientOrder = PatientOrderHoc(
  observer((props: PatientOrderProps) => {
    const {
      loading,
      patientOrderStore,
      patientVisitStore,
      loginStore,
      routerStore,
      masterPanelStore,
    } = useStores()
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm()
    setValue("orderId", patientOrderStore.patientOrder?.orderId)
    setValue("environment", patientOrderStore.patientOrder?.environment)

    const [modalConfirm, setModalConfirm] = useState<any>()
    const [hideInputView, setHideInputView] = useState<boolean>(true)
    const onSubmitPatientOrder = () => {
      if(!patientOrderStore.checkExistsRecord){
        const packageList = [
          ...patientOrderStore.packageList.pacakgeListS,
          ...patientOrderStore.packageList.pacakgeListM,
          ...patientOrderStore.packageList.pacakgeListN,
          ...patientOrderStore.packageList.pacakgeListK,
        ]
        patientOrderStore.patientOrderService
          .addPatientOrder({
            input: {
              ...patientOrderStore.patientOrder,
              packageList,
              documentType: "patientOrder",
              __typename: undefined,
            },
          })
          .then((res) => {
            if (res.createPatientOrder.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.createPatientOrder.message}`,
              })
            }
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          })
        } else {  
          LibraryComponents.Atoms.Toast.warning({
            message: `😔 Please select different lab id`,
          })
        }
    
    }
    return (
      <>
        {patientOrderStore.patientOrder?.labId && (
          <LibraryComponents.Atoms.Heading
            title={`${patientOrderStore.patientOrder.labId} - ${patientOrderStore.patientOrder.patientName}`}
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
                      label="Lab Id"
                      hasError={errors.visitId}
                    >
                      <LibraryComponents.Molecules.AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder="Search by lab id, visit id or name"
                        data={{
                          list: patientVisitStore.listPatientVisit,
                          displayKey: ["labId", "patientName"],
                        }}
                        hasError={errors.visitId}
                        onFilter={(value: string) => {
                          patientVisitStore.patientVisitService.filterByFields({
                            input: {
                              filter: {
                                fields: ["labId", "visitId", "patientName"],
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
                            labId: item.labId,
                            rLab: item.rLab,
                            patientName: item.patientName,
                          })
                          patientVisitStore.updatePatientVisitList(
                            patientVisitStore.listPatientVisitCopy
                          )
                          if(item.labId)
                          patientOrderStore.patientOrderService
                          .checkExistsRecords({
                            input: {
                              filter:{
                                fildes:{
                                  labId: item.labId,
                                  documentType: 'patientOrder'
                                }
                              }
                            },
                          })
                          .then((res) => {
                            if (res.checkExistsRecordsPatientOrder.success) {
                              patientOrderStore.updateExistsRecords(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkExistsRecordsPatientOrder.message}`,
                              })
                            } else patientOrderStore.updateExistsRecords(false)
                          })
                        }}
                      />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="visitId"
                  rules={{ required: true }}
                  defaultValue=""
                />
                 {patientOrderStore.checkExistsRecord && (
                  <span className="text-red-600 font-medium relative">
                    Lab Id already exits. Please use other lab id.
                  </span>
                )}
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
                              list: masterPanelStore.listMasterPanel.filter((item)=> item.rLab === patientOrderStore.patientOrder.rLab),
                              selected: patientOrderStore.selectedItems?.panels,
                              displayKey: ["panelCode", "panelName"],
                            }}   
                            disable={!patientOrderStore.patientOrder?.rLab}
                            hasError={errors.panel}
                            onUpdate={(item) => {
                              const panels = patientOrderStore.selectedItems?.panels
                              onChange(panels)
                              console.log({ panels });

                              patientOrderStore.updatePatientOrder({
                                ...patientOrderStore.patientOrder,
                                panelCode: _.map(panels, (o) =>
                                  _.pick(o, ["panelCode", "serviceType", "confidential"])
                                ),
                              })
                              masterPanelStore.updatePanelMasterList(
                                masterPanelStore.listMasterPanelCopy
                              )  
                              //get packages list
                              if (panels?.length > 0)
                                patientOrderStore.patientOrderService.getPackageList({
                                  input: {
                                    filter: {
                                      panel: _.map(panels, (o) =>
                                        _.pick(o, [
                                          "_id",
                                          "department",
                                          "section",
                                          "bill",
                                          "rLab",
                                          "pLab",
                                          "panelCode",
                                          "panelName",
                                          "serviceType",
                                          "confidential"
                                        ])
                                      ),
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
                              console.log({ item, panels })
                              if (!item.selected) {
                                if (panels && panels.length > 0) {
                                  panels.push(item)
                                } else panels = [item]
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
                    <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                      <select
                        value={patientOrderStore.patientOrder?.environment}
                        disabled={
                          loginStore.login && loginStore.login.role !== "SYSADMIN"
                            ? true
                            : false
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${errors.environment ? "border-red-500  " : "border-gray-300"
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
                        <option selected>Select</option>
                        {LibraryUtils.lookupItems(
                          routerStore.lookupItems,
                          "PATIENT ORDER - ENVIRONMENT"
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
            <div
              className="rounded-lg shadow-xl overflow-scroll mt-2"
              style={{ overflowX: "scroll" }}
            >
              {patientOrderStore.packageList && (
                <TablePackagesList data={patientOrderStore.packageList} />
              )}
            </div>
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
                    <div
                      className="rounded-lg shadow-xl overflow-scroll mt-2"
                      style={{ overflowX: "scroll" }}
                    >
                      {patientOrderStore.packageList && (
                        <TableExtraDataPackages
                          data={patientOrderStore.packageList}
                        />
                      )}
                    </div>
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
            }}
            isDelete={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
              "Edit/Modify"
            )}
            onDelete={(selectedUser) => setModalConfirm(selectedUser)}
            onSelectedRow={(rows) => {
              setModalConfirm({
                show: true,
                type: "delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected items!`,
              })
            }}
            onPageSizeChange={(page, limit) => {
              patientOrderStore.patientOrderService.listPatientOrder(
                { documentType: "patientOrder" },
                page,
                limit
              )
            }}
            onFilter={(type, filter, page, limit) => {
              patientOrderStore.patientOrderService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "delete") {
              patientOrderStore.patientOrderService
                .deletePatientOrder({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removePatientOrder.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removePatientOrder.message}`,
                    })
                    setModalConfirm({ show: false })
                    patientOrderStore.patientOrderService.listPatientOrder({
                      documentType: "patientOrder",
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
export default PatientOrder
