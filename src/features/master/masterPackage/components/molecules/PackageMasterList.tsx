/* eslint-disable */
import React from "react"
import dayjs from "dayjs"
import {NumberFilter,DateFilter,textFilter,customFilter,TableBootstrap,Form,Icons,Tooltip} from "@/library/components"
import {Confirm} from "@/library/models"
import {lookupItems,lookupValue} from "@/library/utils"
import {AutoCompleteFilterSingleSelectLabs} from '../index'



let dateCreation
let dateActive
let dateExpire
let version
let enteredBy
let lab
let packageCode
let packageName
let panelCode
let panelName
let status
let serviceType
let environment

interface PackageMasterListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

export const PackageMasterList = (props: PackageMasterListProps) => {
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }

  return (
    <>
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
            csvFormatter: col => (col ? col : ""),
            filter:textFilter({
              getFilter: (filter) =>{
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
            dataField: "packageCode",
            text: "Package Code",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter:textFilter({
              getFilter: (filter) =>{
                packageCode = filter
              }
            }),
            editable: false,
          },

          {
            dataField: "packageName",
            text: "Package Name",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter:textFilter({
              getFilter: (filter) =>{
                packageName = filter
              }
            }),
            editor: false,
            editable: false,
          },
          {
            dataField: "panelCode",
            text: "Panel Code",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter:textFilter({
              getFilter: (filter) =>{
                panelCode = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "panelName",
            text: "Panel Name",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter:textFilter({
              getFilter: (filter) =>{
                panelName = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "bill",
            text: "Bill",
            sort: true,
            csvFormatter: col => (col ? col : false),
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                  disabled={!editorCell(row)}
                    value={row.bill}
                    onChange={(bill) => {
                      props.onUpdateItem && props.onUpdateItem(bill, "bill", row._id)
                    }}
                  />
                </>
              )
            },
          },
          {
            dataField: "status",
            text: "Status",
            headerClasses: "textHeader1",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter:textFilter({
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
                        {lookupValue(item)}
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
            filter:textFilter({
              getFilter: (filter) =>{
                enteredBy = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "dateCreation",
            editable: false,
            text: "Date Creation",
            headerClasses: "textHeader6",
            sort: true,
            csvFormatter: (col,row) => (row.dateCreation ? dayjs(row.dateCreation).format("YYYY-MM-DD") : ""),  
            filter:customFilter({
              getFilter: (filter) =>{
                dateCreation = filter
              }
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
            text: "Date Active",
            headerClasses: "textHeader6",
            sort: true,
            csvFormatter: (col,row) => (row.dateActive ? dayjs(row.dateActive).format("YYYY-MM-DD") : ""),
            editable: false,
            filter:customFilter({
              getFilter: (filter) =>{
                dateActive = filter
              }
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
            csvFormatter: (col,row) => (row.dateExpire ? dayjs(row.dateExpire).format("YYYY-MM-DD") : ""),
            filter:customFilter({
              getFilter: (filter) =>{
                dateExpire = filter
              }
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
            text: "Version",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            editable: false,
            filter:customFilter({
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
            text: "Environment",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            filter:textFilter({
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
                    {lookupItems(
                      props.extraData.lookupItems,
                      "ENVIRONMENT"
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
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
                  {row.status !== "I" && (
                    <>
                      <Tooltip
                        className="ml-2"
                        tooltipText="Version Upgrade"
                      >
                        <Icons.IconContext
                          color="#fff"
                          size="20"
                          onClick={() =>
                            props.onVersionUpgrade && props.onVersionUpgrade(row)
                          }
                        >
                          {Icons.getIconTag(
                            Icons.Iconvsc.VscVersions
                          )}
                        </Icons.IconContext>
                      </Tooltip>
                      <Tooltip
                        className="ml-2"
                        tooltipText="Duplicate"
                      >
                        <Icons.IconContext
                          color="#fff"
                          size="20"
                          onClick={() => props.onDuplicate && props.onDuplicate(row)}
                        >
                          {Icons.getIconTag(
                            Icons.Iconio5.IoDuplicateOutline
                          )}
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
        fileName="Package Master"
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
          lab("")
          packageCode("")
          packageName("")
          panelCode("")
          panelName("")
          status("")
          environment("")
        }}
      />
    </>
  )
}

