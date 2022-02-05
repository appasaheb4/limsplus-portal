/* eslint-disable */
import React from "react"
import {lookupItems} from "@lp/library/utils"
import {TableBootstrap,textFilter,Form,Icons,Tooltip} from "@lp/library/components"
import {Confirm} from "@lp/library/models"
import {AutoCompleteFilterSingleSelectLabs,AutoCompleteFilterSingleSelectHod} from '../index'

let lab;
let code;
let name;
let shortName;
let hod;
let mobileNo;
let contactNo;
let openingTime;
let closingTime;
let fyiLine;
let workLine;
let status;
let environment;

interface DepartmentListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

export const DepartmentList = (props: DepartmentListProps) => {
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }
  return (
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
            headerClasses: "textHeader",
            sort: true,
            filter: textFilter({
              getFilter: (filter)=>{
                lab = filter
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
                <AutoCompleteFilterSingleSelectLabs
                onSelect={(item)=>{
                  props.onUpdateItem && props.onUpdateItem(item.code,column.dataField,row._id)
                }}
                />
              </>
            ),
          },
          {
            dataField: "code",
            text: "Code",
            headerClasses: "textHeader1",
            sort: true,
            filter: textFilter({
              getFilter: (filter)=>{
                code = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "name",
            text: "Name",
            headerClasses: "textHeader1",
            sort: true,
            filter: textFilter({
              getFilter: (filter)=>{
                name = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "shortName",
            text: "Short Name",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter)=>{
                shortName = filter
              }
            }),
            style : {textTransform:"uppercase"},
            editorStyle : {textTransform:"uppercase"},
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "hod",
            text: "HOD",
            headerClasses: "textHeader1",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter)=>{
                hod = filter
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
                <AutoCompleteFilterSingleSelectHod
                  onSelect={(item)=>{
                  props.onUpdateItem && props.onUpdateItem(item.fullName,column.dataField,row._id)
                }}
                />
              </>
            ),
          },
          {
            dataField: "mobileNo",
            text: "Mobile No",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter)=>{
                mobileNo = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "contactNo",
            text: "Contact No",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter)=>{
                contactNo = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "autoRelease",
            text: "Auto Release",
            sort: true,
            csvFormatter: col => (col ? col : false),
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
            dataField: "requireReceveInLab",
            text: "Require Receve In Lab",
            sort: true,
            csvFormatter: col => (col ? col :false),
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.requireReceveInLab}
                    onChange={(requireReceveInLab) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          requireReceveInLab,
                          "requireReceveInLab",
                          row._id
                        )
                    }}
                  />
                </>
              )
            },
          },
          {
            dataField: "requireScainIn",
            text: "Require Scain In",
            sort: true,
            csvFormatter: col => (col ? col : false),
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                  disabled={!editorCell(row)}
                    value={row.requireScainIn}
                    onChange={(requireScainIn) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(requireScainIn, "requireScainIn", row._id)
                    }}
                  />
                </>
              )
            },
          },
          {
            dataField: "routingDept",
            text: "Routing Dept",
            sort: true,
            csvFormatter: col => (col ? col : false),
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                  disabled={!editorCell(row)}
                    value={row.routingDept}
                    onChange={(routingDept) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(routingDept, "routingDept", row._id)
                    }}
                  />
                </>
              )
            },
          },
          {
            dataField: "openingTime",
            text: "Opening Time",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter)=>{
                openingTime = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "closingTime",
            text: "Closing Time",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter)=>{
                closingTime = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: "fyiLine",
            text: "Fyi Line",
            headerClasses: "textHeader1",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter)=>{
                fyiLine = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "workLine",
            text: "Work Line",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter)=>{
                workLine = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "status",
            text: "Status",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter)=>{
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
                      const status = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(status, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
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
            dataField: "environment",
            text: "Environment",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter)=>{
                environment = filter
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
                    value={row.environment}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                    onChange={(e) => {
                      const environment = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(environment, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
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
                  <Tooltip
                    tooltipText="Delete"
                    position="top"
                  >
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
                      {Icons.getIconTag(
                        Icons.IconBs.BsFillTrashFill
                      )}
                    </Icons.IconContext>
                  </Tooltip>
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
        fileName="Department"
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
          lab("")
          code("")
          name("")
          shortName("")
          hod("")
          mobileNo("")
          contactNo("")
          openingTime("")
          closingTime("")
          fyiLine("")
          workLine("")
          status("")
          environment("")
        }}
      />
    </div>
  )
}
