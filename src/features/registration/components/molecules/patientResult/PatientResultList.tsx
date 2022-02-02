/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import TableBootstrap from './TableBootstrap' 

import { NumberFilter } from "@lp/library/components/Organisms"

interface PatientResultProps {
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

let labId;
export const PatientResultList = observer((props: PatientResultProps) => {
  const editorCell = (row: any) => {
    return false //row.status !== "I" ? true : false
  }
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
              dataField: "labId",
              text: "Lab Id",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  labId = filter
                },
              }),
               filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "pLab",
              text: "PLab",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "analyteCode",
              text: "Analyte Code",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "analyteName",
              text: "Analyte Name",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "reportable",
              text: "Reportable",
              headerClasses: "textHeader4",
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.reportable}
                      onChange={(reportable) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(reportable, "reportable", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "resultType",
              text: "Result Type",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "calculationFlag",
              text: "Calculation Flag",
              headerClasses: "textHeader4",
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.calculationFlag}
                      onChange={(calculationFlag) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            calculationFlag,
                            "calculationFlag",
                            row._id
                          )
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "picture",
              text: "Picture",
              headerClasses: "textHeader3",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "result",
              text: "Result",
              headerClasses: "textHeader3",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "units",
              text: "Units",
              headerClasses: "textHeader3",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "resultDate",
              text: "Result Date",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "alpha",
              text: "Alpha",
              headerClasses: "textHeader3",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "numeric",
              text: "Numeric",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "instrumentResult",
              text: "Instrument Result",
              headerClasses: "textHeader6",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "instrumentUnit",
              text: "Instrument Unit",
              headerClasses: "textHeader6",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "instrumentResultDate",
              text: "Instrument Result Date",
              headerClasses: "textHeader6",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "abnFlag",
              text: "ABN Flag",
              headerClasses: "textHeader4",
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.abnFlag}
                      onChange={(abnFlag) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(abnFlag, "abnFlag", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "critical",
              text: "Critical",
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.critical}
                      onChange={(critical) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(critical, "critical", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "rangeVersion",
              text: "Range Version",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "showRanges",
              text: "ShowRanges",
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.showRanges}
                      onChange={(showRanges) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(showRanges, "showRanges", row._id)
                      }}
                    />
                  </>
                )
              },
            },

            {
              dataField: "loNor",
              text: "Lo Nor",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "hiNor",
              text: "Hi Nor",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },

            {
              dataField: "conclusion",
              text: "Conclusion",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },

            {
              dataField: "equid",
              text: "Equid",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "equType",
              text: "EquType",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "testStatus",
              text: "Test Status",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            // extra Data
            {
              dataField: "method",
              text: "Method",
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.extraData.method}
                      // onChange={(method) => {
                      //   props.onUpdateItem &&
                      //     props.onUpdateItem(method, "showRanges", row._id)
                      // }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "analyteMethodCode",
              text: "Analyte Method Code",
              headerClasses: "textHeader6",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                   <span>{row.extraData.analyteMethodCode}</span>
                  </>
                )
              },
            },
            {
              dataField: "analyteMethodName",
              text: "Analyte Method Name",
              headerClasses: "textHeader6",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>  
                   <span>{row.extraData.analyteMethodName}</span>
                  </>
                )
              },
            },
            {
              dataField: "runno",
              text: "Runno",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                   <span>{row.extraData.runno}</span>
                  </>
                )
              },
            },
            {
              dataField: "platerunno",
              text: "Platerunno",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                   <span>{row.extraData.platerunno}</span>
                  </>
                )
              },
            },
            {
              dataField: "plateno",
              text: "Plateno",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                   <span>{row.extraData.plateno}</span>
                  </>
                )
              },
            },
            {
              dataField: "repetation",
              text: "Repetation",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                   <span>{row.extraData.repetation}</span>
                  </>
                )
              },
            },
            {
              dataField: "version",
              text: "Version",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                   <span>{row.extraData.version}</span>
                  </>
                )
              },
            },
            {
              dataField: "enteredBy",
              text: "Entered By",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                   <span>{row.extraData.enteredBy}</span>
                  </>
                )
              },
            },
            {
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                   <span>{row.extraData.environment}</span>
                  </>
                )
              },
            },
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
          onPageSizeChange={(page, size) => {
            props.onPageSizeChange && props.onPageSizeChange(page, size)
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size)
          }}
           clearAllFilter={()=>{
            labId("")
          }}
        />
      </div>
    </>
  )
})

