/* eslint-disable */
import React from "react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import dayjs from "dayjs"
import {AutoCompleteFilterSingleSelectLabs,AutoCompleteFilterSingleSelectBillTo,
  AutoCompleteFilterSingleSelectCorporateName,AutoCompleteFilterSingleSelectInvoiceAc,
  AutoCompleteFilterSingleSelectPanelCode,AutoCompleteFilterSingleSelectPanelName} from "../organsims"
import { NumberFilter, DateFilter } from "@lp/library/components/Organisms"

let panelCode
let panelName
let priority
let priceGroup
let billTo
let clientName
let invoiceAc
let lab
let price
let fixedPrice
let minSp
let maxSp
let specialScheme
let schemePrice
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
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

const MasterAnalyteList = (props: PriceListProps) => {
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
              dataField: "panelCode",
              text: "Panel Code",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
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
              filter: LibraryComponents.Organisms.Utils.textFilter({
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
              dataField: "priority",
              text: "Priority",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  priority = filter
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
                        const priority = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(priority, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "PRIORIITY"
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
              dataField: "priceGroup",
              text: "Price Group",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
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
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "PRICE_GROUP"
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
              dataField: "billTo",
              text: "Bill To",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  billTo = filter
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
                  <AutoCompleteFilterSingleSelectBillTo
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.corporateCode,column.dataField,row._id)
                  }}
                  />
                </>
              ),
            },
            {
              dataField: "clientName",
              text: "Client Name",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  clientName = filter
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
                  <AutoCompleteFilterSingleSelectCorporateName
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.corporateName,column.dataField,row._id)
                  }}
                  />
                </>
              ),
            },
            {
              dataField: "invoiceAc",
              text: "Invoice Ac",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  invoiceAc = filter
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
                  <AutoCompleteFilterSingleSelectInvoiceAc
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.invoiceAc,column.dataField,row._id)
                  }}
                  />
                </>
              ),
            },
            {
              dataField: "lab",
              text: "Lab",
              headerClasses: "textHeader",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
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
              dataField: "price",
              text: "Price",
              headerClasses: "textHeader4",
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
            },
            {
              dataField: "fixedPrice",
              text: "Fixed Price",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) =>{
                  fixedPrice = filter
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
              filter: LibraryComponents.Organisms.Utils.customFilter({
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
              filter: LibraryComponents.Organisms.Utils.customFilter({
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
              dataField: "anyScheme",
              text: "Any Scheme",
              sort: true,
              csvFormatter: col => (col ? col : false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                    disabled={!editorCell(row)}
                      value={row.anyScheme}
                      onChange={(anyScheme) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(anyScheme, "anyScheme", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "specialScheme",
              text: "Special Scheme",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  specialScheme = filter
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
                        const speicalScheme = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            speicalScheme,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "SPECIAL_SCHEME"
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
              dataField: "schemePrice",
              text: "Scheme Price",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  schemePrice = filter
                 }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "disOnScheme",
              text: "Dis On Scheme",
              sort: true,
              csvFormatter: col => (col ? col :false),
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                    disabled={!editorCell(row)}
                      value={row.disOnScheme}
                      onChange={(disOnScheme) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(disOnScheme, "disOnScheme", row._id)
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
              filter: LibraryComponents.Organisms.Utils.textFilter({
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
                        const status = e.target.value
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
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
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
              dataField: "dateCreation",
              editable: false,
              text: "Date Creation",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: (col,row) => (row.dateCreation ? dayjs(row.dateCreation || 0).format("YYYY-MM-DD") : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
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
                  <LibraryComponents.Atoms.Form.InputDateTime
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
              filter: LibraryComponents.Organisms.Utils.customFilter({
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
                  <LibraryComponents.Atoms.Form.InputDateTime
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
              filter: LibraryComponents.Organisms.Utils.customFilter({
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
                  <LibraryComponents.Atoms.Form.InputDateTime
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
              dataField: "opration",
              text: "Action",
              editable: false,
              csvExport: false,
              hidden: !props.isDelete,
              formatter: (cellContent, row) => (
                <>
                  <div className="flex flex-row">
                    <LibraryComponents.Atoms.Tooltip
                      tooltipText="Delete"
                      position="top"
                    >
                      <LibraryComponents.Atoms.Icons.IconContext
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
                              LibraryComponents.Atoms.Icons.Iconio5
                                .IoDuplicateOutline
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
            priority("")
            priceGroup("")
            billTo("")
            clientName("")
            invoiceAc("")
            lab("")
            price("")
            fixedPrice("")
            minSp("")
            maxSp("")
            specialScheme("")
            schemePrice("")
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
export default MasterAnalyteList
