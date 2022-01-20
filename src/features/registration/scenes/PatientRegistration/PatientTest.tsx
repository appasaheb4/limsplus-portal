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
import { PatientTestTable, ExtraDataPatientTestTable } from "../../components/molecules"

interface PatientTestProps {
  onModalConfirm?: (item: any) => void
}

const PatientTest = PatientOrderHoc(
  observer((props: PatientTestProps) => {
    const {
      loading,
      patientTestStore,
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
            documentType: "patientTest_TestId",
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
                {patientOrderStore.listPatientOrder &&
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.InputWrapper
                        label="Order Id"
                        hasError={errors.orderId}
                      >
                        <LibraryComponents.Molecules.AutoCompleteFilterSingleSelectMultiFieldsDisplay
                          loader={loading}
                          placeholder="Search by orderId or patient name"
                          data={{
                            list: patientOrderStore.listPatientOrder,
                            displayKey: ["orderId", "patientName"],
                          }}
                          hasError={errors.orderId}
                          onFilter={(value: string) => {
                            patientOrderStore.patientOrderService.filterByFields({
                              input: {
                                filter: {
                                  fields: ["orderId", "patientName"],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            })
                          }}
                          onSelect={(item) => {
                            console.log({ item });
                            onChange(item.orderId)
                            patientTestStore.updateTest({
                              ...patientTestStore.patientTest,
                              orderId: item.orderId,
                              labId: item.labId,
                              patientName: item.patientName,
                              panelCode: item.panelCode
                            })
                            patientOrderStore.updatePatientOrderList(
                              patientOrderStore.listPatientOrderCopy
                            )
                            // get panelcode list
                            patientTestStore.patientTestService.getPanelList({
                              input: {
                                filter:
                                {  
                                  panels: _.map(item.panelCode, (o) =>
                                    _.pick(o, [
                                      "panelCode",
                                      "confidential"
                                    ])
                                  ),
                                },
                              }
                            })
                          }}
                        />
                      </LibraryComponents.Atoms.Form.InputWrapper>
                    )}
                    name="orderId"
                    rules={{ required: true }}
                    defaultValue=""
                  />
                }
                <LibraryComponents.Atoms.Form.InputWrapper label="Panels">
                  <LibraryComponents.Atoms.List space={2} direction="row" justify="center">
                    <div className="flex flex-row gap-2 flex-wrap">
                      {patientTestStore.patientTest?.panelCode?.map((item, index) => (
                        <div className="mb-2" key={index}>
                          <LibraryComponents.Atoms.Buttons.Button
                            size="medium"
                            type="solid"
                          >
                            {`${item.panelCode}`}
                          </LibraryComponents.Atoms.Buttons.Button>
                        </div>
                      ))}
                    </div>
                  </LibraryComponents.Atoms.List>
                </LibraryComponents.Atoms.Form.InputWrapper>




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
                      label="Lab Id"
                      hasError={errors.visitId}
                    >
                      <LibraryComponents.Molecules.AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder="Search by lab id, visit id or name"
                        displayValue={`${patientTestStore.patientTest?.labId || ''} - ${patientTestStore.patientTest?.patientName || ''}`}
                        data={{
                          list: patientVisitStore.listPatientVisit,
                          displayKey: ["labId", "patientName"],
                        }}
                        hasError={errors.labId}
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
                          patientTestStore.updateTest({
                            ...patientTestStore.patientTest,
                            visitId: item.visitId,
                            labId: item.labId,
                            patientName: item.patientName,
                          })
                          patientVisitStore.updatePatientVisitList(
                            patientVisitStore.listPatientVisitCopy
                          )
                        }}
                      />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="labId"
                  rules={{ required: true }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      label="Test Id"
                      placeholder={
                        errors.testId ? "Please enter test id" : "Test Id"
                      }
                      hasError={errors.testId}
                      disabled={true}
                      value={patientTestStore.patientTest?.testId}
                      onChange={(testId) => {
                        onChange(testId)
                        patientTestStore.updateTest({
                          ...patientTestStore.patientTest,
                          testId,
                        })
                      }}
                    />
                  )}
                  name="testId"
                  rules={{ required: false }}
                  defaultValue=""
                />

              </LibraryComponents.Atoms.List>
            </LibraryComponents.Atoms.Grid>
            <div
              className="rounded-lg shadow-xl overflow-scroll mt-2"
              style={{ overflowX: "scroll" }}
            >
              {/* {patientOrderStore.packageList && (
                <PatientTestTable data={patientOrderStore.packageList} totalSize={0} />
              )} */}
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
                      {/* {patientOrderStore.packageList && (
                        <ExtraDataPatientTestTable
                          data={patientOrderStore.packageList}
                        />
                      )} */}
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
          {/* <FeatureComponents.Molecules.PatientOrderList
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
          /> */}
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
export default PatientTest
