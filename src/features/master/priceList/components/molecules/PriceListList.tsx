/* eslint-disable */
import React from "react"
import {lookupItems,lookupValue} from "@/library/utils"
import {NumberFilter,DateFilter,textFilter,customFilter,TableBootstrap,Form,Icons,Tooltip} from "@/library/components"
import {Confirm} from "@/library/models"
import dayjs from "dayjs"
import {AutoCompleteFilterSingleSelectLabs,AutoCompleteFilterSingleSelectBillTo,
  AutoCompleteFilterSingleSelectCorporateName,AutoCompleteFilterSingleSelectInvoiceAc,
  AutoCompleteFilterSingleSelectPanelCode,AutoCompleteFilterSingleSelectPanelName} from "../index"
// import { NumberFilter, DateFilter } from "@/library/components/Organisms"

let panelCode
let panelName
let priceList
let priceGroup
let description
let price
let minSp
let maxSp
let maxDiscount
let enteredBy
let status
let environment
let dateCreation
let dateActive
let dateExpire
let version

interface PriceListProps {   
  data: any
  extraData: any
  isDelete?: boolean
  totalSize: number
  isEditModify?: boolean
  onDelete?: (selectedItem: Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

export const PriceListList = (props: PriceListProps) => {
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
              dataField: "priceGroup",
              text: "Price Group",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter:textFilter({
                getFilter: (filter) =>{
                  priceGroup = filter
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
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2"
                      onChange={(e) => {
                        const priceGroup = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(priceGroup, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "PRICE_GROUP"
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
              dataField: "priceList",
              text: "Price List",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter:textFilter({
                getFilter: (filter) =>{
                  priceList = filter
                 }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "description",
              text: "Description",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter:textFilter({
                getFilter: (filter) =>{
                  description = filter
                 }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
                  <AutoCompleteFilterSingleSelectPanelCode
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.panelCode,column.dataField,row._id)
                  }}
                  />
                </>
              ),
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
                  <AutoCompleteFilterSingleSelectPanelName
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.panelName,column.dataField,row._id)
                  }}
                  />
                </>
              ),
            },
            
            
            
            {
              dataField: "price",
              text: "Price",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter:customFilter({
                getFilter: (filter) =>{
                  price = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "minSp",
              text: "Min Sp",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter:customFilter({
                getFilter: (filter) =>{
                  minSp = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "maxSp",
              text: "Max Sp",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter:customFilter({
                getFilter: (filter) =>{
                  maxSp = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "maxDis",
              text: "Max Discount",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter:textFilter({
                getFilter: (filter) =>{
                  maxDiscount = filter
                 }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "fixedPrice",
              text: "Fixed Price",
              sort: true,
              csvFormatter: (col,row) => (row.fixedPrice ? row.fixedPrice ? "Yes" : "No" : "No"),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.fixedPrice}
                      onChange={(fixedPrice) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(fixedPrice, "fixedPrice", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            
           

            {
              dataField: "enteredBy",
              editable: false,
              text: "Entered By",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter:textFilter({
                getFilter: (filter) =>{
                  enteredBy = filter
                 }
              }),
            },
            {
              dataField: "status",
              text: "Status",
              headerClasses: "textHeader2",
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
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter:textFilter({
                getFilter: (filter) =>{
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
              dataField: "dateCreation",
              editable: false,
              text: "Date Creation",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: (col,row) => (row.dateCreation ? dayjs(row.dateCreation || 0).format("YYYY-MM-DD") : ""),
              filter:customFilter({
                getFilter: (filter) =>{
                  dateCreation = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.dateCreation || 0).format("YYYY-MM-DD")}</>
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
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: (col,row) => (row.dateActive ? dayjs(row.dateActive || 0).format("YYYY-MM-DD") : ""),
              filter:customFilter({
                getFilter: (filter) =>{
                  dateActive = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.dateActive || 0).format("YYYY-MM-DD")}</>
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
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: (col,row) => (row.dateExpire ? dayjs(row.dateExpire || 0).format("YYYY-MM-DD") : ""),
              filter:customFilter({
                getFilter: (filter) =>{
                  dateExpire = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.dateExpire || 0).format("YYYY-MM-DD")}</>
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
              csvFormatter: col => (col ? col : ""),
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
                            type: "delete",
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
                            onClick={() =>
                              props.onDuplicate && props.onDuplicate(row)
                            }
                          >
                            {Icons.getIconTag(
                              Icons.Iconio5
                                .IoDuplicateOutline
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
          fileName="PriceList"
          onSelectedRow={(rows) => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id))
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onUpdateItem && props.onUpdateItem(value, dataField, id)
          }}
          onPageSizeChange={(page, limit) => {
            props.onPageSizeChange && props.onPageSizeChange(page, limit)
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size)
          }}
          clearAllFilter={()=>{
            panelCode("")
            panelName("")
            priceList("")
            priceGroup("")
            price("")
            minSp("")
            maxSp("")
            maxDiscount("")
            description("")
            enteredBy("")
            status("")
            environment("")
            dateCreation()
            dateActive()
            dateExpire()
            version("")
          }}
        />
      </div>
    </>
  )
}
