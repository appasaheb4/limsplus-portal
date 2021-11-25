/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
interface PatientVisitProps {
  data: any
//   totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}
const PatientVisitList = observer((props:PatientVisitProps)=>{
    const editorCell = (row: any) => {
        return row.status !== "I" ? true : false
      }
    return(
        <>
            <div style={{position:'relative'}}>
                <LibraryComponents.Organisms.TableBootstrap
                id='_id'
                data={props.data}
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
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "dateVisit",
                        text: "Date Visit",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "dateService",
                        text: "Date Service",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "dateReceived",
                        text: "Date Received",
                        headerClasses: "textHeader4",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "dateCollection",
                        text: "Date Collection",
                        headerClasses: "textHeader5",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "methodCollection",
                        text: "Method Collection",
                        headerClasses: "textHeader5",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "rLab",
                        text: "Rlab",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "birthDate",
                        text: "BirthDate",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "age",
                        text: "Age",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "ageUnits",
                        text: "Age Units",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "collectionCenter",
                        text: "Collection Center",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "billTo",
                        text: "Bill To",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "reportCenter",
                        text: "Report Center",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "doctorId",
                        text: "Doctor Id",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "doctorName",
                        text: "Doctor Name",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "deliveryType",
                        text: "Delivery Type",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "history",
                        text: "History",
                        sort: true,
                        // filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "enteredBy",
                        text: "Entered By",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                        editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                    },
                    {
                        dataField: "status",
                        text: "Status",
                        headerClasses: "textHeader3",
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
                        editable: false,
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
                fileName="AnalyteMaster"
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
export default PatientVisitList