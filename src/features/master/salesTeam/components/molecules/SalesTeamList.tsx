/* eslint-disable */
import React from "react"
import {lookupItems} from "@lp/library/utils"
import {TableBootstrap,textFilter,Icons,Tooltip} from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import {AutoCompleteFilterSingleSelectSalesTerrority,AutoCompleteFilterSingleSelectReportingTo} from "../index"
let salesHierarchy
let salesTerritory
let empCode
let empName
let reportingTo
let environment
interface SalesTeamListProps {
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

export const SalesTeamList = (props: SalesTeamListProps) => {
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
            dataField: "salesHierarchy",
            text: "Sales Hierarchy",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                salesHierarchy = filter
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
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                    onChange={(e) => {
                      const salesHierarchy = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(salesHierarchy, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select </option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      "SALES_HIERARCHY"
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
            dataField: "salesTerritory",
            text: "Sales Territory",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                salesTerritory = filter
              }
            }),
            // formatter: (cell, row) => {
            //   return <>{(row.salesTerritory && row.salesTerritory.area) || ""}</>
            // },
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex
            ) => (
              <>
               <AutoCompleteFilterSingleSelectSalesTerrority
               onSelect={(item)=>{
                  props.onUpdateItem && props.onUpdateItem(item.country,column.dataField,row._id)
               }}
               />
              </>
            ),
          },
          {
            dataField: "empCode",
            text: "Employee Code",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                empCode = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "empName",
            text: "Employee Name",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                empName = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "reportingTo",
            text: "Reporting To",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                reportingTo = filter
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
                <AutoCompleteFilterSingleSelectReportingTo
                onSelect={(item)=>{
                  props.onUpdateItem && props.onUpdateItem(item.fullName,column.dataField,row._id)
                }}
                />
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
            text: "Actions",
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
        fileName="SalesTeam"
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
          salesHierarchy("")
          salesTerritory("")
          empCode("")
          empName("")
          reportingTo("")
          environment("")
        }}
      />
    </div>
  )
}
