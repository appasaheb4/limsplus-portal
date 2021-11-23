/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
// import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
interface PatientResultProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}
const PatientResult = observer((props: PatientResultProps)=>{
    const editorCell = (row: any) => {
        return row.status !== "I" ? true : false
    } 
    return(
        <>
        <div style={{position:'relative'}}>
            <LibraryComponents.Organisms.TableBootstrap
              id='_id'
              data = {props.data}
              totalSize={props.totalSize}
              columns={[
                {
                    dataField: "_id",
                    text: "Id",
                    hidden: true,
                    csvExport: false
                },
                {
                  dataField: "visitID",
                  text: "VisitID",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "pLab",
                  text: "PLab",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "testCode",
                  text: "Test Code",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "testName",
                  text: "Test Name",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "sorter",
                  text: "Sorter",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "analyteCode",
                  text: "Analyte Code",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "analyteName",
                  text: "Analyte Name",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "department",
                  text: "Department",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "section",
                  text: "Section",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "resultType",
                  text: "Result Type",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "rawValue",
                  text: "Raw Value",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "alpha",
                  text: "Alpha",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "value",
                  text: "Value",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "result",
                  text: "Result",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "units",
                  text: "Units",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "resultDate",
                  text: "ResultDate",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "releasedate",
                  text: "Release Date",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "abNormal",
                  text: "AbNormal",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "critical",
                  text: "Critical",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "hold",
                  text: "Hold",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                
                {
                  dataField: "status",
                  text: "Status",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                },
                {
                  dataField: "enteredBy",
                  text: "EnteredBy",
                  headerClasses: "textHeader",
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
                  }
              ]}
              isEditModify={props.isEditModify}
              isSelectRow={true}
              fileName="PatientResult"
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
export default PatientResult