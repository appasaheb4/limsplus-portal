/* eslint-disable */
import React from "react"
import dayjs from "dayjs"
import { lookupItems } from "@lp/library/utils"
import {
  NumberFilter,
  DateFilter,
  TableBootstrap,
  textFilter,
  customFilter,
  Form,
  Icons,
  Tooltip,
} from "@lp/library/components"
import { Confirm } from "@lp/library/models"
import {
  AutoCompleteFilterSingleSelectLabs,
  AutoCompleteFilterSingleSelectAnalayteMethod,
  AutoCompleteDepartment
} from "../index"
let lab
let analyteCode
let analyteName
let description
let shortName
let price
let analyteMethodCode
let analyteMethodName
let calcyName
let high
let low
let picture
let units
let usage
let cptCode
let departments
let resultType
let analyteType
let status
let environment
let enteredBy
let dateCreation
let dateActive
let dateExpire
let version

interface MasterAnalyteProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onUpdateFileds?: (fileds: any, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

export const MasterAnalyteList = (props: MasterAnalyteProps) => {
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
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
              dataField: "lab",
              text: "Lab",
              headerClasses: "textHeader1",
              sort: true,
              filter: textFilter({
                getFilter: (filter) => {
                  lab = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectLabs
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item.code, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "analyteCode",
              text: "Analyte Code",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter({
                getFilter: (filter) => {
                  analyteCode = filter
                },
              }),
              editable: false,
            },
            {
              dataField: "analyteName",
              text: "Analyte Name",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter({
                getFilter: (filter) => {
                  analyteName = filter
                },
              }),
              editable: false,
            },
            {
              dataField: "description",
              text: "Description",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  description = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <Form.MultilineInput
                    rows={3}
                    value={row.description}
                    onChange={(description) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(description, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "method",
              text: "Method",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.method}
                      onChange={(method) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(method, "method", row._id)
                      }}
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
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  analyteMethodCode = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectAnalayteMethod
                    onSelect={(item) => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            analyteMethodCode: item.methodsCode,
                            analyteMethodName: item.methodsName,
                          },
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "analyteMethodName",
              text: "Analyte Method Name",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  analyteMethodName = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectAnalayteMethod
                    onSelect={(item) => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            analyteMethodCode: item.methodsCode,
                            analyteMethodName: item.methodsName,
                          },
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "shortName",
              text: "Short Name",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  shortName = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              style: { textTransform: "uppercase" },
              editorStyle: { textTransform: "uppercase" },
            },
            {
              dataField: "price",
              text: "Price",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: customFilter({
                getFilter: (filter) => {
                  price = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <Form.Input
                    name="txtPrice"
                    placeholder="Price"
                    type="number"
                    value={row.price}
                    onChange={(price) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          parseFloat(price),
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "bill",
              text: "Bill",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.bill}
                      onChange={(bill) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(bill, "bill", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "high",
              text: "High",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  high = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "low",
              text: "Low",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  low = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "reportable",
              text: "Reportable",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
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
              dataField: "departments",
              text: "Departments",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  departments = filter
                },
              }),
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row?.departments.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              ),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <AutoCompleteDepartment
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item, "departments", row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "resultType",
              text: "Result Type",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  resultType = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    className="leading-4 p-4 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const resultType = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(resultType, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, "RESULT_TYPE").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },

            {
              dataField: "calculationFlag",
              text: "Calculation Flag",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
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
              dataField: "analyteType",
              text: "Analyte Type",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  analyteType = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    className="leading-4 p-4 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const analyteType = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(analyteType, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, "ANALYTE_TYPE").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "units",
              text: "Units",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  units = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    className="leading-4 p-4 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const units = e.target.value as string
                      props.onUpdateItem &&
                        props.onUpdateItem(units, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, "UNITS").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "usage",
              text: "Usage",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  usage = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    className="leading-4 p-4 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const usage = e.target.value as string
                      props.onUpdateItem &&
                        props.onUpdateItem(usage, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, "USAGE").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "picture",
              text: "picture",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  picture = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    className="leading-4 p-4 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const picture = e.target.value as "0" | "1" | "4" | "3"
                      props.onUpdateItem &&
                        props.onUpdateItem(picture, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {["0", "1", "4", "3"].map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: "repetition",
              text: "Repetition",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.repetition}
                      onChange={(repetition) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(repetition, "repetition", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "autoRelease",
              text: "Auto Release",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.autoRelease}
                      onChange={(autoRelease) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(autoRelease, "autoRelease", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "holdOOS",
              text: "Hold OOS",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.holdOOS}
                      onChange={(holdOOS) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(holdOOS, "holdOOS", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "instantResult",
              text: "Instant Result",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {" "}
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.instantResult}
                      onChange={(instantResult) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(instantResult, "instantResult", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "pageBreak",
              text: "Page Break",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.pageBreak}
                      onChange={(pageBreak) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(pageBreak, "pageBreak", row._id)
                      }}
                    />
                  </>
                )
              },
            },

            // {
            //   dataField: "workflow",
            //   text: "Workflow",
            //   sort: true,
            //   filter: textFilter(),
            //   editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            //   editorRenderer: (
            //     editorProps,
            //     value,
            //     row,
            //     column,
            //     rowIndex,
            //     columnIndex
            //   ) => (
            //     <>
            //       <Form.InputWrapper label="Workflow">
            //         <select
            //           className="leading-4 p-4 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
            //           onChange={(e) => {
            //             const workflow = e.target.value as string
            //             props.onUpdateItem &&
            //               props.onUpdateItem(workflow, column.dataField, row._id)
            //           }}
            //         >
            //           <option selected>Select</option>
            //           {lookupItems(lookupItems, "WORKFLOW").map(
            //             (item: any, index: number) => (
            //               <option key={index} value={item.code}>
            //                 {`${item.value} - ${item.code}`}
            //               </option>
            //             )
            //           )}
            //         </select>
            //
            //     </>
            //   ),
            // },
            // {
            //   dataField: "sampleType",
            //   text: "sampleType",
            //   sort: true,
            //   filter: textFilter(),
            //   editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            //   editorRenderer: (
            //     editorProps,
            //     value,
            //     row,
            //     column,
            //     rowIndex,
            //     columnIndex
            //   ) => (
            //     <>
            //       <Form.InputWrapper
            //         label="Sample Type"
            //         id="optionSampleType"
            //       >
            //         <select
            //           name="optionSampleTypes"
            //           className="leading-4 p-4 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
            //           onChange={(e) => {
            //             const sampleType = e.target.value as string
            //             props.onUpdateItem &&
            //               props.onUpdateItem(sampleType, column.dataField, row._id)
            //           }}
            //         >
            //           <option selected>Select</option>
            //           {["sampleType1"].map((item: any, index: number) => (
            //             <option key={index} value={item}>
            //               {item}
            //             </option>
            //           ))}
            //         </select>
            //
            //     </>
            //   ),
            // },

            {
              dataField: "calcyName",
              text: "Calcy Name",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  calcyName = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "cptCode",
              text: "CPT Code",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  cptCode = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "status",
              text: "Status",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  status = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const status = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(status, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, "STATUS").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "enteredBy",
              editable: false,
              text: "Entered By",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  enteredBy = filter
                },
              }),
            },
            {
              dataField: "dateCreation",
              editable: false,
              text: "Date Creation",
              headerClasses: "textHeader11",
              sort: true,
              csvFormatter: (col, row) =>
                row.dateCreation ? dayjs(row.dateCreation).format("YYYY-MM-DD") : "",
              filter: customFilter({
                getFilter: (filter) => {
                  dateCreation = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.dateCreation).format("YYYY-MM-DD")}</>
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <Form.InputDateTime
                    value={new Date(row.dateCreation)}
                    onFocusRemove={(dateCreation) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(dateCreation, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "dateActive",
              editable: false,
              text: "Date Active",
              headerClasses: "textHeader11",
              sort: true,
              csvFormatter: (col, row) =>
                row.dateActive ? dayjs(row.dateActive).format("YYYY-MM-DD") : "",
              filter: customFilter({
                getFilter: (filter) => {
                  dateActive = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.dateActive).format("YYYY-MM-DD")}</>
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <Form.InputDateTime
                    value={new Date(row.dateActive)}
                    onFocusRemove={(dateActive) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(dateActive, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "dateExpire",
              editable: false,
              text: "Date Expire",
              headerClasses: "textHeader11",
              sort: true,
              csvFormatter: (col, row) =>
                row.dateExpire ? dayjs(row.dateExpire).format("YYYY-MM-DD") : "",
              // filter: dateFilter({
              //   comparators: [
              //     Comparator.EQ,
              //     Comparator.GE,
              //     Comparator.LT,
              //   ],
              //   dateStyle: { marginLeft: "2px" },
              //   defaultValue: {
              //     comparator: Comparator.EQ,
              //   },
              //   style: { display: "inline" },
              // }),
              filter: customFilter({
                getFilter: (filter) => {
                  dateExpire = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.dateExpire).format("YYYY-MM-DD")}</>
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <Form.InputDateTime
                    value={new Date(row.dateExpire)}
                    onFocusRemove={(dateExpire) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(dateExpire, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "version",
              editable: false,
              text: "Version",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              // filter: numberFilter({
              //   numberStyle: { marginLeft: "2px" },
              //   style: { display: "inline" },
              //   defaultValue: {
              //     comparator: Comparator.EQ,
              //   },
              // }),
              filter: customFilter({
                getFilter: (filter) => {
                  version = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
            },
            {
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              filter: textFilter({
                getFilter: (filter) => {
                  environment = filter
                },
              }),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    value={row.environment}
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const environment = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(environment, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, "ENVIRONMENT").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
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
                    <Tooltip tooltipText="Delete" position="top">
                      <Icons.IconContext
                        color="#fff"
                        size="20"
                        onClick={() =>
                          props.onDelete &&
                          props.onDelete({
                            type: "Delete",
                            show: true,
                            id: [row._id],
                            title: "Are you sure?",
                            body: `Delete item`,
                          })
                        }
                      >
                        {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                      </Icons.IconContext>
                    </Tooltip>
                    {row.status !== "I" && (
                      <>
                        <Tooltip className="ml-4" tooltipText="Version Upgrade">
                          <Icons.IconContext
                            color="#fff"
                            size="20"
                            onClick={() =>
                              props.onVersionUpgrade && props.onVersionUpgrade(row)
                            }
                          >
                            {Icons.getIconTag(Icons.Iconvsc.VscVersions)}
                          </Icons.IconContext>
                        </Tooltip>
                        <Tooltip className="ml-4" tooltipText="Duplicate">
                          <Icons.IconContext
                            color="#fff"
                            size="20"
                            onClick={() =>
                              props.onDuplicate && props.onDuplicate(row)
                            }
                          >
                            {Icons.getIconTag(Icons.Iconio5.IoDuplicateOutline)}
                          </Icons.IconContext>
                        </Tooltip>
                      </>
                    )}
                  </div>
                </>
              ),
              headerClasses: "sticky right-0  bg-gray-500 text-white",
              classes: (cell, row, rowIndex, colIndex) => {
                return "sticky right-0 bg-gray-500"
              },
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
          onPageSizeChange={(page, size) => {
            props.onPageSizeChange && props.onPageSizeChange(page, size)
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size)
          }}
          clearAllFilter={() => {
            lab("")
            analyteCode("")
            analyteName("")
            description("")
            shortName("")
            analyteMethodCode("")
            analyteMethodName("")
            calcyName("")
            high("")
            low("")
            picture("")
            units("")
            usage("")
            cptCode("")
            resultType("")
            analyteType("")
            status("")
            environment("")
            enteredBy()
            dateCreation()
            dateActive()
            dateExpire()
            version("")
            price("")
          }}
        />
      </div>
    </>
  )
}
