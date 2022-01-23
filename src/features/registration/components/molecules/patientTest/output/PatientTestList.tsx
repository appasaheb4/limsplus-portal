/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { PatientTestExpandPanel } from "./PatientTestExpandPanel"

import { NumberFilter } from "@lp/library/components/Organisms"

interface PatientTestListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}      
let labid;
let orderId
let testId
let panelCode
const PatientTestList = observer((props: PatientTestListProps) => {
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }
  return (
    <>
      <div style={{ position: "relative" }}>
        <PatientTestExpandPanel
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
              dataField: "labId",
              text: "Lab Id",
              headerClasses: "textHeader4 z-10",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  labid = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
            },
            {
              dataField: "orderId",
              text: "Order Id",
              headerClasses: "textHeader4 z-10",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  orderId = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
            },
            {
              dataField: "panelCode",
              text: "Panel Code",
              headerClasses: "textHeader4 z-10",
              sort: true,
              csvFormatter: (cell, row, rowIndex) =>
                `${row.panelCode.map((item) => item.panelCode)}`,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  panelCode = filter
                },
              }),
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row.panelCodes.map((item, index) => (
                      <li key={index}>{item.panelCode}</li>
                    ))}
                  </ul>
                </>
              ),  
            },  
          ]}
          isEditModify={false}
          isSelectRow={true}
          fileName="PatientTest"
          onSelectedRow={(rows) => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id))
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onUpdateItem && props.onUpdateItem(value, dataField, id)
          }}
          onPageSizeChange={(page, size) => {
            props.onPageSizeChange && props.onPageSizeChange(page, size)
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size)
          }}
          clearAllFilter={()=>{
            labid("")
            testId("")
            orderId("")
            panelCode("")
          }}
        />
      </div>
    </>
  )
})
export default PatientTestList
