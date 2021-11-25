/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
interface PatientOrderListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}
const PatientOrderList = observer((props:PatientOrderListProps)=>{
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }
  return(
    <>
    <div style={{position:'relative'}}>
      <LibraryComponents.Organisms.TableBootstrap
        id='_id'
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
            dataField: "visitId",
            text: "Visit Id",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "packageCode",
            text: "Package Code",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "packageName",
            text: "Package Name",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "panelCode",
            text: "Panel Code",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "panelName",
            text: "Panel Name",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "bill",
            text: "Bill",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "serviceType",
            text: "Service Type",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "department",
            text: "Department",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "section",
            text: "Section",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "rLab",
            text: "RLab",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "pLab",
            text: "PLab",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "outSourceLab",
            text: "Out Source Lab",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "currentDepartment",
            text: "Current Department",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },  
          {
            dataField: "dueDate",
            text: "Due Date",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "resultDate",
            text: "Result Date",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "status",
            text: "Status",
            headerClasses: "textHeader2",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "comments",
            text: "Comments",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "environment",
            text: "Environment",
            headerClasses: "textHeader3",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "opration",
            text: "Action",
            csvExport: false,
            hidden: !props.isDelete,
            formatter: (cellContent, row) => (   
              <>
                <div className="flex flex-row">
                  <LibraryComponents.Atoms.Tooltip tooltipText="Delete">
                    <LibraryComponents.Atoms.Icons.IconContext
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
                      {LibraryComponents.Atoms.Icons.getIconTag(
                        LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                      )}
                    </LibraryComponents.Atoms.Icons.IconContext>
                  </LibraryComponents.Atoms.Tooltip>
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
export default PatientOrderList