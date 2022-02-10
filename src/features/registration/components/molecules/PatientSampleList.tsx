/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
// import { lookupItems } from "@/library/utils"
import {textFilter,Icons,Tooltip,TableBootstrap} from "@/library/components"
import {Confirm} from "@/library/models"
interface PatientSampleListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}
export const PatientSampleList = observer((props: PatientSampleListProps) => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <TableBootstrap
          id="_id"
          data={props.data}
          totalSize={props.totalSize}
          columns={[
            {
              dataField: "_id",
              text: "Id",
              hidden: true,
              csvExport: false,
            },
            {
              dataField: "specimenId",
              text: "Specimen Id",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "pLab",
              text: "PLab",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "rLab",
              text: "RLab",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "outSourceLab",
              text: "Out Source Lab",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "outSourceStatus",
              text: "Out Source Status",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "department",
              text: "Department",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "section",
              text: "Section",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "containerId",
              text: "Container Id",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "sampleType",
              text: "Sample Type",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "receivedDate",
              text: "Received Date",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "collectionDate",
              text: "Collection Date",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "methodCollection",
              text: "Method Collection",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "dateCollection",
              text: "Date Collection",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "status",
              text: "Status",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
            },
            {
              dataField: "opration",
              text: "Action",
              editable: false,
              csvExport: false,
              hidden: !props.isDelete,
              formatter: (cellContent, row) => (
                <>
                  <div className="flex flex-row">
                    <Tooltip tooltipText="Delete">
                      <Icons.IconContext
                        color="#000"
                        size="20"
                        onClick={() =>
                          props.onDelete &&
                          props.onDelete({
                            type: "delete",
                            show: true,
                            id: [row._id],
                            title: "Are you sure?",
                            body: `Delete item`,
                          })
                        }
                      >
                        {Icons.getIconTag(
                          Icons.IconBs.BsFillTrashFill
                        )}
                      </Icons.IconContext>
                    </Tooltip>
                  </div>
                </>
              ),
            },
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName="PatientOrder"
          onSelectedRow={(rows) => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id))
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onUpdateItem && props.onUpdateItem(value, dataField, id)
          }}
        />
      </div>
    </>
  )
})
