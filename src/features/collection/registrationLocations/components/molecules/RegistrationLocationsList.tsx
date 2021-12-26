/* eslint-disable */
import React from "react"
import dayjs from "dayjs"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { AutoCompleteFilterSingleSelectLabs,AutoCompleteFilterSingleSelectCorparateCode } from "../organsims"
import { NumberFilter, DateFilter } from "@lp/library/components/Organisms"

let dateCreation
let dateActive
let dateExpire
let version
let enteredBy
let locationName
let locationCode
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
let corporateCode
let invoiceAc
let labLicence
let methodColn
let workHrs
let salesTerritoRy
let area
let zone
let route
let lab
let location
let edi
let ediAddress
let schedule
let reportFormat
let info
let fyiLine
let workLine
let acClass
let accountType
let status
let environment
interface RegistrationLocationsListProps {
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

const RegistrationLocationsList = (props: RegistrationLocationsListProps) => {
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }
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
            dataField: "locationCode",
            text: "Location Code",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                locationCode = filter
              },
            }),
            editable: false,
          },
          {
            dataField: "locationName",
            text: "Location Name",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                locationName = filter
              },
            }),
            editable: false,
          },
          {
            dataField: "address",
            text: "Address",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                address = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "city",
            text: "City",
            headerClasses: "textHeader",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                city = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "state",
            text: "State",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                state = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "country",
            text: "Country",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                country = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "postcode",
            text: "Postcode",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.customFilter({
              getFilter: (filter) => {
                postcode = filter
              },
            }),
            filterRenderer: (onFilter, column) => (
              <NumberFilter onFilter={onFilter} column={column} />
            ),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "customerGroup",
            text: "Customer Group",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                customerGroup = filter
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
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                category = filter
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
            csvFormatter: (col) => (col ? col : ""),
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
            dataField: "telephone",
            text: "Telephone",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                telephone = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "mobileNo",
            text: "Mobile No",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                mobileNo = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "email",
            text: "Email",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                email = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "deliveryType",
            text: "Delivery Type",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                deliveryType = filter
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
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                deliveryMethod = filter
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
            dataField: "corporateCode",
            text: "Corporate Code",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                corporateCode = filter
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
                <AutoCompleteFilterSingleSelectCorparateCode
                onSelect={(item)=>{
                  props.onUpdateItem && props.onUpdateItem(item.corporateCode,column.dataField,row._id)
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
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                invoiceAc = filter
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
                    const invoiceAc = e.target.value
                    props.onUpdateItem &&
                      props.onUpdateItem(invoiceAc, column.dataField, row._id)
                  }}
                >
                  <option selected>Select</option>
                  {[].map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </>
            ),
          },
          {
            dataField: "labLicence",
            text: "Lab Licence",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                labLicence = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "printLabel",
            text: "Print Label",
            sort: true,
            csvFormatter: (col) => (col ? col : false),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            formatter: (cell, row) => {
              return (
                <>
                  {" "}
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
            dataField: "methodColn",
            text: "Method Coln",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                methodColn = filter
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
                    const methodColn = e.target.value
                    props.onUpdateItem &&
                      props.onUpdateItem(methodColn, column.dataField, row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(
                    props.extraData.lookupItems,
                    "METHOD_COLN"
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
            dataField: "workHrs",
            text: "Work Hrs",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.customFilter({
              getFilter: (filter) => {
                workHrs = filter
              },
            }),
            filterRenderer: (onFilter, column) => (
              <NumberFilter onFilter={onFilter} column={column} />
            ),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "salesTerritoRy",
            text: "Sales TerritoRy",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                salesTerritoRy = filter
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
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                area = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "zone",
            text: "Zone",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                zone = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "route",
            text: "Route",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                route = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "lab",
            text: "Lab",
            headerClasses: "textHeader",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            dataField: "location",
            text: "Location",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                location = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "neverBill",
            text: "Never Bill",
            sort: true,
            csvFormatter: (col) => (col ? col : false),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            formatter: (cell, row) => {
              return (
                <>
                  {" "}
                  <LibraryComponents.Atoms.Form.Toggle
                    value={row.neverBill}
                    onChange={(neverBill) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(neverBill, "neverBill", row._id)
                    }}
                  />
                </>
              )
            },
          },
          {
            dataField: "edi",
            text: "EDI",
            headerClasses: "textHeader",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                edi = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "ediAddress",
            text: "EDI Address",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                ediAddress = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: "edi",
            text: "EDI",
            headerClasses: "textHeader",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                edi = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "ediAddress",
            text: "EDI Address",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                ediAddress = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: "urgent",
            text: "Urgent",
            sort: true,
            csvFormatter: (col) => (col ? col : false),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                schedule = filter
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
            dataField: "reportFormat",
            text: "Report Format",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                reportFormat = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "info",
            text: "Info",
            headerClasses: "textHeader",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                info = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "fyiLine",
            text: "FYI Line",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                fyiLine = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "workLine",
            text: "Work Line",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                workLine = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "acClass",
            text: "Ac Class",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                acClass = filter
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
                    const acClass = e.target.value
                    props.onUpdateItem &&
                      props.onUpdateItem(acClass, column.dataField, row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(
                    props.extraData.lookupItems,
                    "AC_CLASS"
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
            dataField: "accountType",
            text: "Account Type",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                accountType = filter
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
                    const accountType = e.target.value
                    props.onUpdateItem &&
                      props.onUpdateItem(accountType, column.dataField, row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(
                    props.extraData.lookupItems,
                    "ACCOUNT_TYPE"
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
            dataField: "status",
            text: "Status",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            text: "Date Creation",
            headerClasses: "textHeader7",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            editable: false,
            filter: LibraryComponents.Organisms.Utils.customFilter({
              getFilter: (filter) => {
                dateCreation = filter
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return <>{dayjs(row.dateCreation || 0).format("YYYY-MM-DD")}</>
            },
          },
          {
            dataField: "dateActive",
            text: "Date Active",
            headerClasses: "textHeader6",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            editable: false,
            filter: LibraryComponents.Organisms.Utils.customFilter({
              getFilter: (filter) => {
                dateActive = filter
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return <>{dayjs(row.dateActive || 0).format("YYYY-MM-DD")}</>
            },
          },
          {
            dataField: "dateExpire",
            text: "Date Expire",
            headerClasses: "textHeader6",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            editable: false,
            filter: LibraryComponents.Organisms.Utils.customFilter({
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
          },
          {
            dataField: "version",
            text: "Version",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            editable: false,
            filter: LibraryComponents.Organisms.Utils.customFilter({
              getFilter: (filter) => {
                version = filter
              },
            }),
            filterRenderer: (onFilter, column) => (
              <NumberFilter onFilter={onFilter} column={column} />
            ),
          },
          {
            dataField: "enteredBy",
            text: "Entered By",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                enteredBy = filter
              },
            }),
            editable: false,
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
        fileName="Registration Locations"
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
          dateCreation()
          dateActive()
          dateExpire()
          version("")
          enteredBy("")
          locationName("")
          locationCode("")
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
          labLicence("")
          methodColn("")
          workHrs("")
          salesTerritoRy("")
          area("")
          zone("")
          route("")
          lab("")
          location("")
          edi("")
          ediAddress("")
          schedule("")
          reportFormat("")
          info("")
          fyiLine("")
          workLine("")
          acClass("")
          accountType("")
          status("")
          environment("")
        }}
      />
    </div>
  )
}

export default RegistrationLocationsList
