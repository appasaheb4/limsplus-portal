/* eslint-disable */
import React from "react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as LibraryUtils from "@lp/library/utils"
import {AutoCompleteFilterSingleSelectLabs} from "../organsims"
import dayjs from "dayjs"
import { NumberFilter, DateFilter } from "@lp/library/components/Organisms"
let dateCreation
let dateActive
let dateExpire
let version
let enteredBy
let corporateCode
let corporateName
let invoiceAc
let priceList
let priceGroup
let billingOn
let address
let city
let state
let country
let postcode
let customerGroup
let category
let telephone
let mobileNo
let email
let deliveryType
let deliveryMethod
let salesTerritoRy
let area
let zone
let edi
let ediAddress
let schedule
let reportFormat
let info
let fyiLine
let workLine
let status
let environment
interface CorporateClientListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

const CorporateClient = (props: CorporateClientListProps) => {
  return (
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
            dataField: "corporateCode",
            text: "Corporate Code",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                corporateCode = filter  
              }
            }),
            editable: false,
          },
          {
            dataField: "corporateName",
            text: "Corporate Name",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                corporateName = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "invoiceAc",
            text: "Invoice Ac",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                invoiceAc = filter
              }
            }),
          },
          {
            dataField: "priceList",
            text: "Price List",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                priceList = filter
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const priceList = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(priceList, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {[].map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {`${item}`}
                      </option>
                    ))}
                  </select>
                
              </>
            ),
          },
          {
            dataField: "priceGroup",
            text: "Price Group",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                priceGroup = filter
              }
            }),
          },
          {
            dataField: "billingOn",
            text: "Billing On",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                billingOn = filter
              }
            }),
          },
          {
            dataField: "address",
            text: "Address",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                address = filter
              }
            }),
          },
          {
            dataField: "city",
            text: "City",
            headerClasses: "textHeader",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                city = filter
              }
            }),
          },
          {
            dataField: "state",
            text: "State",
            headerClasses: "textHeader1",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                state = filter
              }
            }),
          },
          {
            dataField: "country",
            text: "Country",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                country = filter
              }
            }),
          },
          {
            dataField: "postcode",
            text: "Postcode",
            headerClasses: "textHeader6",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.customFilter({
              getFilter: (filter) =>{
                postcode = filter
              }
            }),
            filterRenderer: (onFilter, column) => (
              <NumberFilter onFilter={onFilter} column={column} />
            ),
          },
          {
            dataField: "customerGroup",
            text: "Customer Group",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                customerGroup = filter
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const customerGroup = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(customerGroup, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "CUSTOMER_GROUP"
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
            dataField: "category",
            text: "Category",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                category = filter
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const category = e.target.value
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
            dataField: "confidential",
            text: "Confidential",
            sort: true,
            csvFormatter: col => (col ? col : false),
            formatter: (cell, row) => {
              return (
                <>
                  {" "}
                  <LibraryComponents.Atoms.Form.Toggle
                    value={row.confidential}
                    onChange={(confidential) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(confidential, "confidental", row._id)
                    }}
                  />
                </>
              )
            },
          },
          {
            dataField: "telephone",
            text: "Telephone",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                telephone = filter
              }
            }),
          },
          {
            dataField: "mobileNo",
            text: "Mobile No",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                mobileNo = filter
              }
            }),
          },
          {
            dataField: "email",
            text: "Email",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                email = filter
              }
            }),
          },
          {
            dataField: "deliveryType",
            text: "Delivery Type",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                deliveryType = filter
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const deliveryType = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(deliveryType, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "DELIVERY_TYPE"
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
            dataField: "deliveryMethod",
            text: "Delivery Method",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                deliveryMethod = filter
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const deliveryMethod = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(deliveryMethod, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "DELIVERY_METHOD"
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
            dataField: "salesTerritoRy",
            text: "Sales TerritoRy",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                salesTerritoRy = filter
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const salesTerritoRy = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(salesTerritoRy, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "SPECIALITY"
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
            dataField: "area",
            text: "Area",
            headerClasses: "textHeader1",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                area = filter
              }
            }),
          },
          {
            dataField: "zone",
            text: "Zone",
            headerClasses: "textHeader1",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                zone = filter
              }
            }),
          },
          {
            dataField: "edi",
            text: "EDI",
            headerClasses: "textHeader",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                edi = filter
              }
            }),
          },
          {
            dataField: "ediAddress",
            text: "EDI Address",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                ediAddress = filter
              }
            }),
          },
          {
            dataField: "urgent",
            text: "Urgent",
            sort: true,
            csvFormatter: col => (col ? col : false),
            formatter: (cell, row) => {
              return (
                <>
                  {" "}
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
            dataField: "schedule",
            text: "Schedule",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                schedule = filter
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
                <AutoCompleteFilterSingleSelectLabs
                onSelect={(item)=>{
                  props.onUpdateItem && props.onUpdateItem(item.code,column.dataField,row._id)
                }}
                />
              </>
            ),
          },
          {
            dataField: "reportFormat",
            text: "Report Format",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                reportFormat = filter
              }
            }),
          },
          {
            dataField: "info",
            text: "Info",
            headerClasses: "textHeader",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                info = filter
              }
            }),
          },
          {
            dataField: "fyiLine",
            text: "FYI Line",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                fyiLine = filter
              }
            }),
          },
          {
            dataField: "workLine",
            text: "Work Line",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                workLine = filter
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
            headerClasses: "textHeader4",
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
            dataField: "enteredBy",
            editable: false,
            headerClasses: "textHeader3",
            text: "Entered By",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                enteredBy = filter
              }
            }),
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
                          onClick={() => props.onDuplicate && props.onDuplicate(row)}
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
        fileName="CorporateClients"
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
          corporateCode("")
          corporateName("")
          priceList("")
          priceGroup("")
          billingOn("")
          address("")
          city("")
          state("")
          country("")
          postcode("")
          customerGroup("")
          category("")
          telephone("")
          mobileNo("")
          email("")
          deliveryType("")
          deliveryMethod("")
          corporateCode("")
          invoiceAc("")
          salesTerritoRy("")
          area("")
          zone("")
          edi("")
          ediAddress("")
          schedule("")
          reportFormat("")
          info("")
          fyiLine("")
          workLine("")
          status("")
          environment("")
        }}
      />
    </div>
  )
}

export default CorporateClient
