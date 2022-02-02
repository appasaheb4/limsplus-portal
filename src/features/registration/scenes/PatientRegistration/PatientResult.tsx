/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import { useForm } from "react-hook-form"
import {PatientResultList} from "../../components"
import { useStores } from "@lp/stores"
import { toJS } from "mobx"
import { RouterFlow } from "@lp/flows"

interface PatientResultProps {
  onModalConfirm?: (item: any) => void
}
export const PatientResult = observer((props: PatientResultProps) => {
  const {patientResultStore,routerStore} = useStores()

  return (
    <>
      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        <PatientResultList
          data={patientResultStore.patientResultList}
          totalSize={patientResultStore.patientResultTestCount}
          extraData={{}}
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
          onPageSizeChange={(page, limit) => {
            patientResultStore.patientResultService.listPatientResult(
              page,
              limit
            )
          }}
          onFilter={(type, filter, page, limit) => {
            patientResultStore.patientResultService.filter({
              input: { type, filter, page, limit },
            })
          }}
        />
      </div>
      <br />
    </>
  )
})

