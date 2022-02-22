/* eslint-disable */
import React from "react"
import dayjs from "dayjs"
import {lookupItems,lookupValue} from "@/library/utils"
import {NumberFilter,DateFilter,Icons,Tooltip,textFilter,customFilter,TableBootstrap,Form} from "@/library/components"
import {Confirm} from "@/library/models"
import {AutoCompleteFilterSingleSelectLabs,AutoCompleteFilterSingleSelectArea,AutoCompleteFilterSingleSelectCountry,AutoCompleteFilterSingleSelectDistrict,AutoCompleteFilterSingleSelectPostalCode,AutoCompleteFilterSingleSelectState,AutoCompleteFilterSingleSelectCity} from '../index'
// import { NumberFilter, DateFilter } from "@/library/components/Organisms"
let dateCreation
let dateActive
let dateExpire
let version
let enteredBy
let doctorCode
let doctorName
let sex
let title
let reportName
let category
let city
let state
let country
let postcode
let doctorType
let speciality
let salesTerritoRy
let district
let postalCode
let openingTime
let closingTime
let area
let zone
let telephone
let mobileNo
let email
let deliveryType
let deliveryMethod
let registrationLocation
let lab
let schedule
let info
let fyiLine
let workLine
let status
let environment
interface DoctorsListProps {
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

export const DoctorsList = (props: DoctorsListProps) => {
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
            dataField: "title",
            text: "Title",
            headerClasses: "textHeader",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                title = filter
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
                      const title = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(title, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      "TITLE"
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
            dataField: "doctorCode",
            text: "Doctor Code",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                doctorCode = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "doctorName",
            text: "Doctor Name",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                doctorName = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "reportName",
            text: "Report Name",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                reportName = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "sex",
            text: "Sex",
            headerClasses: "textHeader",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
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
                      const sex = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(sex, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {["Male", "Female"].map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {`${item}`}
                      </option>
                    ))}
                  </select>
                
              </>
            ),
          },
        
          
          
          {
            dataField: "doctorType",
            text: "Doctor Type",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                doctorType = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: "speciality",
            text: "Speciality",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                speciality = filter
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
                      const speciality = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(speciality, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      "SPECIALITY"
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
            dataField: "category",
            text: "Category",
            headerClasses: "textHeader2",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                category = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            headerClasses: "textHeader1",
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
            headerClasses: "textHeader",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ""),
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
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                district = filter
              },
            }),
            headerClasses: "textHeader1",
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
                        props.onUpdateItem(
                          item.district,
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                )}
              </>
            ),
          },
          {
            dataField: "city",
            text: "City",
            headerClasses: "textHeader",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ""),
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
            headerClasses: "textHeader",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ""),
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
            headerClasses: "textHeader2",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                postalCode = filter
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
                  <AutoCompleteFilterSingleSelectPostalCode
                    country={row.country}
                    state={row.state}
                    district={row.district}
                    city={row.city}
                    area={row.area}
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.postalCode,
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                )}
              </>
            ),
          },
          
          {
            dataField: "salesTerritoRy",
            text: "Sales Territory",
            headerClasses: "textHeader4",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                salesTerritoRy = filter
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
                      const salesTerritoRy = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(salesTerritoRy, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      "SPECIALITY"
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
            dataField: "zone",
            text: "Zone",
            headerClasses: "textHeader1",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                zone = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "telephone",
            text: "Telephone",
            headerClasses: "textHeader1",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                telephone = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "mobileNo",
            text: "Mobile No",
            headerClasses: "textHeader2",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                mobileNo = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "email",
            text: "Email",
            headerClasses: "textHeader1",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                email = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          
          {
            dataField: "deliveryType",
            text: "Delivery Type",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                deliveryType = filter
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
                      const deliveryType = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(deliveryType, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      "DELIVERY_TYPE"
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
            dataField: "deliveryMethod",
            text: "Delivery Method",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                deliveryMethod = filter
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
                      const deliveryMethod = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(deliveryMethod, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      "DELIVERY_METHOD"
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
            dataField: "registrationLocation",
            text: "Registration Location",
            headerClasses: "textHeader5",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                registrationLocation = filter
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
                      const registrationLocation = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          registrationLocation,
                          column.dataField,
                          row._id
                        )
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
            dataField: "lab",
            text: "Lab",
            headerClasses: "textHeader",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
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
            dataField: "openingTime",
            text: "Opening Time",
            headerClasses: "textHeader2",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                openingTime = filter
              },
            }),
          },

          {
            dataField: "closingTime",
            text: "Closing Time",
            headerClasses: "textHeader2",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) => {
                closingTime = filter
              },
            }),
          },
          {
            dataField: "schedule",
            text: "Schedule",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                schedule = filter
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
            dataField: "info",
            text: "Info",
            headerClasses: "textHeader",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                info = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "fyiLine",
            text: "FYI Line",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
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
              getFilter: (filter) =>{
                workLine = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "confidential",
            text: "Confidential",
            sort: true,
             csvFormatter: (col,row) =>  `${row.confidential ? row.confidential ? "Yes" : "No" : "No"}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  {" "}
                  <Form.Toggle
                  disabled={!editorCell(row)}
                    value={row.confidential}
                    onChange={(confidential) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(confidential, "confidential", row._id)
                    }}
                  />{" "}
                </>
              )
            },
          },
          {
            dataField: "urgent",
            text: "Urgent",
            sort: true,
             csvFormatter: (col,row) => `${row.urgent ? row.urgent ? "Yes" : "No" : "No"}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                  disabled={!editorCell(row)}
                    value={row.urgent}
                    onChange={(urgent) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(urgent, "urgent", row._id)
                    }}
                  />{" "}
                </>
              )
            },
          },
          {
            dataField: "reportFormat",
            text: "Report Format",
            sort: true,
             csvFormatter: (col,row) => `${row.urgent ? row.urgent ? "Yes" : "No" : "No"}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                  disabled={!editorCell(row)}
                    value={row.reportFormat}
                    onChange={(reportFormat) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(reportFormat, "reportFormat", row._id)
                    }}
                  />{" "}
                </>
              )
            },
          },
          {
            dataField: "dateCreation",
            text: "Date Creation",
            headerClasses: "textHeader6",
            sort: true,
             csvFormatter: (col,row) => (row.dateCreation ? dayjs(row.dateCreation).format("YYYY-MM-DD") : ""),
            editable: false,
            filter: customFilter({
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
            filter: customFilter({
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
            text: "Date Expire",
            headerClasses: "textHeader6",
            sort: true,
            csvFormatter: (col,row) => (row.dateExpire ? dayjs(row.dateExpire).format("YYYY-MM-DD") : ""),
            editable: false,
            filter: customFilter({
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
            headerClasses: "textHeader4",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            editable: false,
            filter: customFilter({
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
            text: "Entered By",
            headerClasses: "textHeader2",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                enteredBy = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "status",
            text: "Status",
            headerClasses: "textHeader1",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: textFilter({
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
             editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
        fileName="Doctors"
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
          doctorCode("")
          doctorName("")
          sex("")
          title("")
          reportName("")
          postalCode("")
          district("")
          city("")
          state("")
          country("")
          postalCode("")
          doctorType("")
          speciality("")
          salesTerritoRy("")
          area("")
          zone("")
          telephone("")
          mobileNo("")
          email("")
          category("")
          deliveryType("")
          deliveryMethod("")
          openingTime("")
          registrationLocation("")
          lab("")
          closingTime("")
          schedule("")
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

