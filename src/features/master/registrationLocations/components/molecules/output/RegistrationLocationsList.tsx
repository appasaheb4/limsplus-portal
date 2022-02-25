/* eslint-disable */
import React from "react"
import dayjs from "dayjs"
import _ from "lodash"
import { lookupItems, lookupValue } from "@/library/utils"
import {
  NumberFilter,
  DateFilter,
  textFilter,
  customFilter,
  Form,
  Tooltip,
  Icons,
  TableBootstrap,
} from "@/library/components"
import { FormHelper } from "@/helper"
import { useForm, Controller } from "react-hook-form"
import { Confirm } from "@/library/models"
import {
  AutoCompleteFilterSingleSelectLabs,
  AutoCompleteFilterSingleSelectCorparateCode,
  AutoCompleteFilterSingleSelectArea,
  AutoCompleteFilterSingleSelectCity,
  AutoCompleteFilterSingleSelectCountry,
  AutoCompleteFilterSingleSelectDistrict,
  AutoCompleteFilterSingleSelectPostalCode,
  AutoCompleteFilterSingleSelectState,
  AutoCompleteSalesTerritory,
  PriceListTableForRegLocationsList,
} from "../../index"
// import { NumberFilter, DateFilter } from "@/library/components/Organisms"

let dateCreation
let dateActive
let dateExpire
let version
let enteredBy
let locationName
let locationCode
let priceList
let district
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
let openingTime
let closingTime
let methodColn
let salesTerritoRy
let area
let zone
let sbu
let route
let lab
let schedule
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
  onDelete?: (selectedItem: Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onUpdateFileds?: (fileds: any, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

export const RegistrationLocationsList = (props: RegistrationLocationsListProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
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
            dataField: "locationCode",
            text: "Location Code",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
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
            filter: textFilter({
              getFilter: (filter) => {
                locationName = filter
              },
            }),
            editable: false,
          },
          {
            dataField: "corporateCode",
            text: "Client Code",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
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
                  onSelect={(item) => {
                    props.onUpdateFileds &&
                      props.onUpdateFileds(
                        {
                          corporateCode: item.corporateCode,
                          invoiceAc: item.invoiceAc,
                        },
                        row._id
                      )
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
            filter: textFilter({
              getFilter: (filter) => {
                invoiceAc = filter
              },
            }),
            editable: false,
          },
          {
            dataField: "priceList",
            text: "Price List",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                priceList = filter
              },
            }),
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  {row?.priceList ? (
                    <PriceListTableForRegLocationsList
                      data={row?.priceList}
                      onUpdate={(data) => {
                        props.onUpdateItem &&
                        props.onUpdateItem(data, "priceList", row._id)
                      }}
                    />
                  ) : null}
                </>
              )
            },
          },
          {
            dataField: "acClass",
            text: "Ac Class",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
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
                  {lookupItems(props.extraData.lookupItems, "AC_CLASS").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    )
                  )}
                </select>
              </>
            ),
          },
          {
            dataField: "accountType",
            text: "Account Type",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
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
                  {lookupItems(props.extraData.lookupItems, "ACCOUNT_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    )
                  )}
                </select>
              </>
            ),
          },
          {
            dataField: "customerGroup",
            text: "Customer Group",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
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
                  {lookupItems(props.extraData.lookupItems, "CUSTOMER_GROUP").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    )
                  )}
                </select>
              </>
            ),
          },
          {
            dataField: "methodColn",
            text: "Method Coln",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
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
                  {lookupItems(props.extraData.lookupItems, "METHOD_COLN").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    )
                  )}
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
            filter: textFilter({
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
                  {lookupItems(props.extraData.lookupItems, "CATEGORY").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    )
                  )}
                </select>
              </>
            ),
          },
          {
            dataField: "country",
            text: "Country",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            filter: textFilter({
              getFilter: (filter) => {
                country = filter
              },
            }),
            headerClasses: "textHeader4",
            style: { textTransform: "uppercase" },
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex
            ) => (
              <>
                {props.extraData.listAdministrativeDiv && (
                  <AutoCompleteFilterSingleSelectCountry
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item.country, column.dataField, row._id)
                    }}
                  />
                )}
              </>
            ),
          },
          {
            dataField: "state",
            text: "State",
            headerClasses: "textHeader4",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                state = filter
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
                {props.extraData.listAdministrativeDiv && (
                  <AutoCompleteFilterSingleSelectState
                    country={row.country}
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item.state, column.dataField, row._id)
                    }}
                  />
                )}
              </>
            ),
          },
          {
            dataField: "district",
            text: "District",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                district = filter
              },
            }),
            headerClasses: "textHeader4",
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex
            ) => (
              <>
                {props.extraData.listAdministrativeDiv && (
                  <AutoCompleteFilterSingleSelectDistrict
                    country={row.country}
                    state={row.state}
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item.district, column.dataField, row._id)
                    }}
                  />
                )}
              </>
            ),
          },
          {
            dataField: "city",
            text: "City",
            headerClasses: "textHeader4",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                city = filter
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
                {props.extraData.listAdministrativeDiv && (
                  <AutoCompleteFilterSingleSelectCity
                    country={row.country}
                    state={row.state}
                    district={row.district}
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item.city, column.dataField, row._id)
                    }}
                  />
                )}
              </>
            ),
          },
          {
            dataField: "area",
            text: "Area",
            headerClasses: "textHeader4",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                area = filter
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
                {props.extraData.listAdministrativeDiv && (
                  <AutoCompleteFilterSingleSelectArea
                    country={row.country}
                    state={row.state}
                    district={row.district}
                    city={row.city}
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item.area, column.dataField, row._id)
                    }}
                  />
                )}
              </>
            ),
          },
          {
            dataField: "postalCode",
            text: "Postal Code",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: customFilter({
              getFilter: (filter) => {
                postcode = filter
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
                {props.extraData.listAdministrativeDiv && (
                  <AutoCompleteFilterSingleSelectPostalCode
                    country={row.country}
                    state={row.state}
                    district={row.district}
                    city={row.city}
                    area={row.area}
                    onSelect={(item) => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            postalCode: parseInt(item.postalCode),
                            sbu: item.sbu,
                            zone: item.zone,
                          },
                          row._id
                        )
                    }}
                  />
                )}
              </>
            ),
          },
          {
            dataField: "sbu",
            text: "SBU",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                sbu = filter
              },
            }),
            editable: false,
          },
          {
            dataField: "zone",
            text: "Zone",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                zone = filter
              },
            }),
            editable: false,
          },
          {
            dataField: "salesTerritoRy",
            text: "Sales Territory",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
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
                <AutoCompleteSalesTerritory
                  onSelect={(item) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(item, column.dataField, row._id)
                  }}
                />
              </>
            ),
          },

          {
            dataField: "telephone",
            text: "Telephone",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
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
            filter: textFilter({
              getFilter: (filter) => {
                mobileNo = filter
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
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      placeholder={
                        errors.mobileNo ? "Please Enter MobileNo" : "Mobile No"
                      }
                      hasError={errors.mobileNo}
                      type="number"
                      defaultValue={row.mobileNo}
                      onChange={(mobileNo) => {
                        onChange(mobileNo)
                      }}
                      onBlur={(mobileNo) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(mobileNo, column.dataField, row._id)
                      }}
                    />
                  )}
                  name="mobileNo"
                  rules={{ required: true, pattern: FormHelper.patterns.mobileNo }}
                  defaultValue=""
                />
              </>
            ),
          },
          {
            dataField: "email",
            text: "Email",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
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
            filter: textFilter({
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
                  {lookupItems(props.extraData.lookupItems, "DELIVERY_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    )
                  )}
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
            filter: textFilter({
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
                  {lookupItems(props.extraData.lookupItems, "DELIVERY_METHOD").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    )
                  )}
                </select>
              </>
            ),
          },
          {
            dataField: "route",
            text: "Route",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
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
                <select
                  value={row?.lab}
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                  onChange={(e) => {
                    const lab = e.target.value
                    props.onUpdateItem && props.onUpdateItem(lab, "lab", row._id)
                  }}
                >
                  <option selected>Select</option>
                  {props?.extraData?.labList?.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.code} - ${item.name}`}
                    </option>
                  ))}
                </select>
              </>
            ),
          },
          {
            dataField: "openingTime",
            text: "Opening Time",
            headerClasses: "textHeader5",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                openingTime = filter
              },
            }),
          },

          {
            dataField: "closingTime",
            text: "Closing Time",
            headerClasses: "textHeader5",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                closingTime = filter
              },
            }),
          },
          {
            dataField: "confidential",
            text: "Confidential",
            sort: true,
            csvFormatter: (col, row) =>
              `${row.confidential ? (row.confidential ? "Yes" : "No") : "No"}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    disabled={!editorCell(row)}
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
            dataField: "printLabel",
            text: "Print Label",
            sort: true,
            csvFormatter: (col, row) =>
              `${row.printLabel ? (row.printLabel ? "Yes" : "No") : "No"}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  {" "}
                  <Form.Toggle
                    disabled={!editorCell(row)}
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
            dataField: "neverBill",
            text: "Never Bill",
            sort: true,
            csvFormatter: (col, row) =>
              `${row.neverBill ? (row.neverBill ? "Yes" : "No") : "No"}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  {" "}
                  <Form.Toggle
                    disabled={!editorCell(row)}
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
            dataField: "urgent",
            text: "Urgent",
            sort: true,
            csvFormatter: (col, row) =>
              `${row.urgent ? (row.urgent ? "Yes" : "No") : "No"}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  {" "}
                  <Form.Toggle
                    disabled={!editorCell(row)}
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
            dataField: "reportFormat",
            text: "Report Format",
            sort: true,
            csvFormatter: (col, row) =>
              `${row.reportFormat ? (row.reportFormat ? "Yes" : "No") : "No"}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  {" "}
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.reportFormat}
                    onChange={(reportFormat) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(reportFormat, "reportFormat", row._id)
                    }}
                  />
                </>
              )
            },
          },
          {
            dataField: "info",
            text: "Info",
            headerClasses: "textHeader",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
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
            filter: textFilter({
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
            filter: textFilter({
              getFilter: (filter) => {
                workLine = filter
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: "dateCreation",
            text: "Date Creation",
            headerClasses: "textHeader7",
            sort: true,
            csvFormatter: (col, row) =>
              row.dateCreation
                ? dayjs(row.dateCreation || 0).format("YYYY-MM-DD")
                : "",
            editable: false,
            filter: customFilter({
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
            csvFormatter: (col, row) =>
              row.dateActive ? dayjs(row.dateActive || 0).format("YYYY-MM-DD") : "",
            editable: false,
            filter: customFilter({
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
            text: "Date Expire",
            headerClasses: "textHeader6",
            sort: true,
            csvFormatter: (col, row) =>
              row.dateExpire ? dayjs(row.dateExpire || 0).format("YYYY-MM-DD") : "",
            editable: false,
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
            text: "Version",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            editable: false,
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
            dataField: "enteredBy",
            text: "Entered By",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                enteredBy = filter
              },
            }),
            editable: false,
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
                        {lookupValue(item)}
                      </option>
                    )
                  )}
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
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
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
                        {lookupValue(item)}
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
                      <Tooltip className="ml-2" tooltipText="Version Upgrade">
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
                      <Tooltip className="ml-2" tooltipText="Duplicate">
                        <Icons.IconContext
                          color="#fff"
                          size="20"
                          onClick={() => props.onDuplicate && props.onDuplicate(row)}
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
          openingTime("")
          closingTime("")
          city("")
          state("")
          country("")
          postcode("")
          sbu("")
          customerGroup("")
          category("")
          telephone("")
          mobileNo("")
          email("")
          deliveryType("")
          deliveryMethod("")
          corporateCode("")
          invoiceAc("")
          priceList("")
          methodColn("")
          salesTerritoRy("")
          area("")
          zone("")
          route("")
          lab("")
          schedule("")
          info("")
          fyiLine("")
          workLine("")
          acClass("")
          accountType("")
          district("")
          status("")
          environment("")
        }}
      />
    </div>
  )
}
