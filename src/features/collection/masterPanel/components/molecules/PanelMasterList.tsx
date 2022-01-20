/* eslint-disable */
import React from "react"
import daysjs from "dayjs"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import {AutoCompleteFilterSingleSelectPlabs,AutoCompleteFilterSingleSelectDepartment,AutoCompleteFilterSingleSelectPanelMethod} from '../organsims'
import { NumberFilter, DateFilter } from "@lp/library/components/Organisms"


let rLab
let pLab
let department
let panelMethodCode
let panelMethodName
let description
let shortName
let price
let tat
let validationLevel
let reportGroup
let reportOrder
let sex
let hiAge
let loAge
let processing
let category
let suffix
let serviceType
let panelType
let tubeGroup
let labelInstruction
let panelMethod
let workflow
let reportTemplate
let sampleType
let specalInstructions
let status
let environment
let dateCreation
let dateActive
let dateExpire
let version
let enteredBy



interface PanelMasterListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

const PanelMasterList = (props: PanelMasterListProps) => {
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        <LibraryComponents.Organisms.TableBootstrap
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
              dataField: "rLab",
              text: "RLab",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  rLab = filter
                }
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
                        const rLab = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(rLab, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.labList&&props.extraData.labList.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {item.name}
                          </option>
                        )
                      )}
                    </select>
                 
                </>
              ),
            },
            {
              dataField: "pLab",
              text: "PLab",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  pLab = filter
                }
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
                  <AutoCompleteFilterSingleSelectPlabs
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.code,column.dataField,row._id)
                  }}
                  />
                </>
              ),
            },

            {
              dataField: "department",
              text: "Department",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  department = filter
                }
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
                  <AutoCompleteFilterSingleSelectDepartment
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.code,column.dataField,row._id)
                  }}
                  />
                </>
              ),
            },
            // {
            //   dataField: "section",
            //   text: "Section",
            //   sort: true,
            //   filter: LibraryComponents.Organisms.Utils.textFilter(),
            //   editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            //   formatter: (cell, row) => {
            //     return <>{row.section}</>
            //   },
            //   editorRenderer: (
            //     editorProps,
            //     value,
            //     row,
            //     column,
            //     rowIndex,
            //     columnIndex
            //   ) => (
            //     <>
            //       
            //         <select
            //           className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
            //           onChange={(e) => {
            //             const section = e.target.value as string
            //             props.onUpdateItem &&
            //               props.onUpdateItem(section, column.dataField, row._id)
            //           }}
            //         >
            //           <option selected>Select</option>
            //           {["Section 1"].map((item: any, index: number) => (
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
              dataField: "serviceType",
              text: "Service Type",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  serviceType = filter
                }
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
                        const serviceType = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(serviceType, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "SERVICE_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                 
                </>
              ),
            },
            {
              dataField: "panelMethodCode",
              text: "Panel Method Code",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  panelMethodCode = filter
                }
              }),
              editable: false,
            },
            {
              dataField: "panelMethodName",
              text: "Panel Method Name",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  panelMethodName = filter
                }
              }),
              editable:false,
            },
            {
              dataField: "description",
              text: "Description",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  description = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "method",
              text: "Method",
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
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
              dataField: "panelMethod",
              text: "Panel Method",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  panelMethod = filter
                }
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
                  <AutoCompleteFilterSingleSelectPanelMethod
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.methodsName,column.dataField,row._id)
                  }}
                  />
                </>
              ),
            },
            {
              dataField: "shortName",
              text: "Short Name",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  shortName = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              style : {textTransform : "uppercase"},
              editorStyle: {
                textTransform: 'uppercase'
              }
            },
            {  
              dataField: "price",
              text: "Price",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) =>{
                  price = filter
                }
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Price"
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
              csvFormatter: col => (col ? col : false),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
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
              dataField: "schedule",
              text: "Schedule",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  rLab = filter
                }
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
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                      onChange={(e) => {
                        const schedule = e.target.value
                        props.onUpdateItem && props.onUpdateItem(schedule,column.dataField,row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listDeliverySchedule.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.schCode}>
                            {`${item.schCode}`}
                          </option>
                        )
                      )}
                    </select>
                 
                </>
              ),
            },
            {
              dataField: "tat",
              text: "TAT",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  tat = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "validationLevel",
              text: "Validation Level",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  validationLevel = filter
                }
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
                      value={row.validationLevel}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                      onChange={(e) => {
                        const validationLevel: any = e.target.value
                        props.onUpdateItem && props.onUpdateItem(validationLevel,column.dataField,row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                        (item: any, index: number) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        )
                      )}
                    </select>
                 
                </>
              ),
            },
            {
              dataField: "reportOrder",
              text: "Report Order",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  reportOrder = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "processing",
              text: "Processing",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  processing = filter
                }
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
                        const processing = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(processing, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "PROCESSING"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                 
                </>
              ),
            },
            {
              dataField: "workflow",
              text: "Workflow",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  workflow = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "category",
              text: "Category",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  category = filter
                }
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
                        const category = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(category, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "CATEGORY"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                 
                </>
              ),
            },
            {
              dataField: "panelType",
              text: "Panel Type",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  panelType = filter
                }
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
                        const panelType = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(panelType, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "PANEL_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                 
                </>
              ),
            },

            {
              dataField: "autoRelease",
              text: "Auto Release",
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
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
              csvFormatter: col => (col ? col : false),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
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
              dataField: "confidential",
              text: "Confidential",
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.confidential}
                      onChange={(confidential) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(confidential, "confidential", row._id)
                      }}
                    />
                  </>
                )
              },
            },

            {
              dataField: "urgent",
              text: "Urgent",
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.urgent}
                      onChange={(urgent) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(urgent, "urgent", row._id)
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
              csvFormatter: col => (col ? col :false),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
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
              dataField: "repitation",
              text: "Repitation",
              sort: true,
              csvFormatter: col => (col ? col :false),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.repitation}
                      onChange={(repitation) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(repitation, "repitation", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "printLabel",
              text: "Print Label",
              sort: true,
              csvFormatter: col => (col ? col :false),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.printLabel}
                      onChange={(printLabel) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(printLabel, "printLabel", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "cumulative",
              text: "Cumulative",
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.cumulative}
                      onChange={(cumulative) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(cumulative, "cumulative", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "reportGroup",
              text: "Report Group",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  reportGroup = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              style : {textTransform : "uppercase"},
              editorStyle: {
                textTransform: 'uppercase'
              }
            },

            {
              dataField: "sex",
              text: "sex",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  sex = filter
                }
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
                        const sex = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(sex, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "SEX"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                 
                </>
              ),
            },

            {
              dataField: "sexAction",
              text: "Sex Action",
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.sexAction}
                      onChange={(sexAction) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(sexAction, "sexAction", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "hiAge",
              text: "Hi Age",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  hiAge = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "loAge",
              text: "Lo Age",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  loAge = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },

            {
              dataField: "suffix",
              text: "Suffix",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  suffix = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },

            {
              dataField: "tubeGroup",
              text: "TubeGroup",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  tubeGroup = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },

            {
              dataField: "pageBreak",
              text: "Page Break",
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
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
            {
              dataField: "reportTemplate",
              text: "Report Template",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  reportTemplate = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "sampleType",
              text: "Sample Type",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  sampleType = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "labelInstruction",
              text: "Label Instruction",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  labelInstruction = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              
            },
            {
              dataField: "specalInstructions",
              text: "Specal Instructions",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  specalInstructions = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              style : {textTransform : "uppercase"},
              editorStyle: {
                textTransform: 'uppercase'
              }
            },

            {
              dataField: "status",
              text: "Status",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  status = filter
                }
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
                        const status = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(status, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "STATUS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                 
                </>
              ),
            },
            {
              dataField: "enteredBy",
              text: "Entered By",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  enteredBy = filter
                }
              }),
              editable: false,
            },
            {
              dataField: "dateCreation",
              text: "Date Creation",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: (col,row) => (row.dateCreation ? daysjs(row.dateCreation).format("YYYY-MM-DD") : ""),
              editable: false,
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) =>{
                  dateCreation = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{daysjs(row.dateCreation).format("YYYY-MM-DD")}</>
              },
            },
            {
              dataField: "dateActive",
              text: "Date Active",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: (col,row) => (row.dateActive ? daysjs(row.dateActive || 0).format("YYYY-MM-DD") : ""),
              editable: false,
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) =>{
                  dateActive = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{daysjs(row.dateActive || 0).format("YYYY-MM-DD")}</>
              },
            },
            {
              dataField: "dateExpire",
              text: "Date Expire",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: (col,row) => (row.dateExpire ? daysjs(row.dateExpire || 0).format("YYYY-MM-DD"): ""),
              editable: false,
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) =>{
                  dateExpire = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{daysjs(row.dateExpire || 0).format("YYYY-MM-DD")}</>
              },
            },
            {
              dataField: "version",
              text: "Version",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              editable: false,
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) =>{
                  version = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
            },
            {
              dataField: "environment",
              text: "Envirenvironmentonment",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  environment = filter
                }
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
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "ENVIRONMENT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
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
                    <LibraryComponents.Atoms.Tooltip tooltipText="Delete" position="top">
                      <LibraryComponents.Atoms.Icons.IconContext
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
                        {LibraryComponents.Atoms.Icons.getIconTag(
                          LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                        )}
                      </LibraryComponents.Atoms.Icons.IconContext>
                    </LibraryComponents.Atoms.Tooltip>
                    {row.status !== "I" && (
                      <>
                        <LibraryComponents.Atoms.Tooltip
                          className="ml-2"
                          tooltipText="Version Upgrade"
                        >
                          <LibraryComponents.Atoms.Icons.IconContext
                            color="#fff"
                            size="20"
                            onClick={() =>
                              props.onVersionUpgrade && props.onVersionUpgrade(row)
                            }
                          >
                            {LibraryComponents.Atoms.Icons.getIconTag(
                              LibraryComponents.Atoms.Icons.Iconvsc.VscVersions
                            )}
                          </LibraryComponents.Atoms.Icons.IconContext>
                        </LibraryComponents.Atoms.Tooltip>
                        <LibraryComponents.Atoms.Tooltip
                          className="ml-2"
                          tooltipText="Duplicate"
                        >
                          <LibraryComponents.Atoms.Icons.IconContext
                            color="#fff"
                            size="20"
                            onClick={() =>
                              props.onDuplicate && props.onDuplicate(row)
                            }
                          >
                            {LibraryComponents.Atoms.Icons.getIconTag(
                              LibraryComponents.Atoms.Icons.Iconio5.IoDuplicateOutline
                            )}
                          </LibraryComponents.Atoms.Icons.IconContext>
                        </LibraryComponents.Atoms.Tooltip>
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
          fileName="Panel Master"
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
            dateCreation()
            dateActive()
            dateExpire()
            version("")
            enteredBy("")
            rLab("")
            pLab("")
            department("")
            panelMethodCode("")
            panelMethodName("")
            description("")
            shortName("")
            price("")
            tat("")
            validationLevel("")
            reportGroup("")
            reportOrder("")
            sex("")
            hiAge("")
            loAge("")
            processing("")
            category("")
            suffix("")
            serviceType("")
            panelType("")
            tubeGroup("")
            labelInstruction("")
            panelMethod("")
            workflow("")
            reportTemplate("")
            sampleType("")
            specalInstructions("")
            status("")
            environment("")
          }}
        />
      </div>
    </>
  )
}
export default PanelMasterList
