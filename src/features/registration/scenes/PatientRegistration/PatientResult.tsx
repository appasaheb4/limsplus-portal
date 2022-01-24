/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import * as FeatureComponents from "../../components"
import { Stores as MasterAnalyteStore } from "@lp/features/collection/masterAnalyte/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as TestMasterStore } from "@lp/features/collection/testMaster/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as SectionStore } from "@lp/features/collection/section/stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import "@lp/library/assets/css/accordion.css"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"
import "react-accessible-accordion/dist/fancy-example.css"
import { stores } from "@lp/stores"
import { toJS } from "mobx"
import { Stores } from "../../stores"
import { RouterFlow } from "@lp/flows"

interface PatientResultProps {
  onModalConfirm?: (item: any) => void
}
const PatientResult = observer((props: PatientResultProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  return (
    <>
      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        <FeatureComponents.Molecules.PatientResultList
          data={Stores.patientRegistationStore.listPatientResult}
          totalSize={Stores.patientRegistationStore.listPatientResultCount}
          extraData={{}}
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
      <br />
      <hr />
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
                  <FeatureComponents.Molecules.ExtraDataPatientResultList
                    data={Stores.patientRegistationStore.extraDataListPatientResult}
                    totalSize={
                      Stores.patientRegistationStore.extraDataListPatientResultCount
                    }
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
                  />
                </div>
              </>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <br />
    </>
  )
})
export default PatientResult
