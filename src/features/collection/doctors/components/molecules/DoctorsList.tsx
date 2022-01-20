/* eslint-disable */
import React from "react"
import dayjs from "dayjs"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import {AutoCompleteFilterSingleSelectLabs} from '../organsims'
import { NumberFilter, DateFilter } from "@lp/library/components/Organisms"
let dateCreation
let dateActive
let dateExpire
let version
let enteredBy
let doctorCode
let doctorName
let sex
let title
let firstName
let middleName
let lastName
let reportName
let address
let city
let state
let country
let postcode
let doctorType
let speciality
let salesTerritoRy
let area
let zone
let telephone
let mobileNo
let email
let workHours
let deliveryType
let deliveryMethod
let edi
let ediAddress
let registrationLocation
let lab
let location
let schedule
let reportFormat
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
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

const DoctorsList = (props: DoctorsListProps) => {
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
            dataField: "doctorCode",
            text: "Doctor Code",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                doctorName = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "sex",
            text: "Sex",
            headerClasses: "textHeader",
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
            dataField: "title",
            text: "Title",
            headerClasses: "textHeader",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "TITLE"
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
            dataField: "firstName",
            text: "First Name",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                firstName = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "middleName",
            text: "Middle Name",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                middleName = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "lastName",
            text: "Last Name",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                lastName = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "reportName",
            text: "Report Name",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                reportName = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "city",
            text: "City",
            headerClasses: "textHeader1",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                city = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "country",
            text: "Country",
            headerClasses: "textHeader1",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                country = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "doctorType",
            text: "Doctor Type",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            dataField: "confidential",
            text: "Confidential",
            sort: true,
             csvFormatter: col => (col ? col : false),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            formatter: (cell, row) => {
              return (
                <>
                  {" "}
                  <LibraryComponents.Atoms.Form.Toggle
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
            dataField: "salesTerritoRy",
            text: "Sales TerritoRy",
            headerClasses: "textHeader4",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            headerClasses: "textHeader",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                area = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "telephone",
            text: "Telephone",
            headerClasses: "textHeader1",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                email = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "workHours",
            text: "Work Hours",
            headerClasses: "textHeader6",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.customFilter({
              getFilter: (filter) =>{
                workHours = filter
              }
            }),
            filterRenderer: (onFilter, column) => (
              <NumberFilter onFilter={onFilter} column={column} />
            ),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "deliveryType",
            text: "Delivery Type",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "ediAddress",
            text: "EDI Address",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                ediAddress = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
                  />{" "}
                </>
              )
            },
          },
          {
            dataField: "registrationLocation",
            text: "Registration Location",
            headerClasses: "textHeader5",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            dataField: "location",
            text: "Location",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                location = filter
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
            dataField: "schedule",
            text: "Schedule",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            dataField: "reportFormat",
            text: "Report Format",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                reportFormat = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "fyiLine",
            text: "FYI Line",
            headerClasses: "textHeader3",
            sort: true,
             csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
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
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                workLine = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            text: "Date Creation",
            headerClasses: "textHeader6",
            sort: true,
             csvFormatter: (col,row) => (row.dateCreation ? dayjs(row.dateCreation).format("YYYY-MM-DD") : ""),
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
              return <>{dayjs(row.dateCreation).format("YYYY-MM-DD")}</>
            },
          },
          {
            dataField: "dateActive",
            text: "Date Active",
            headerClasses: "textHeader6",
            sort: true,
            csvFormatter: (col,row) => (row.dateActive ? dayjs(row.dateActive).format("YYYY-MM-DD") : ""),
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
              return <>{dayjs(row.dateActive).format("YYYY-MM-DD")}</>
            },
          },
          {
            dataField: "dateExpire",  
            text: "Date Expire",
            headerClasses: "textHeader6",
            sort: true,
            csvFormatter: (col,row) => (row.dateExpire ? dayjs(row.dateExpire).format("YYYY-MM-DD") : ""),
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
              return <>{dayjs(row.dateExpire).format("YYYY-MM-DD")}</>
            },
          },
          {
            dataField: "version",
            text: "Version",
            headerClasses: "textHeader4",
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
          firstName("")
          middleName("")
          lastName("")
          reportName("")
          address("")
          city("")
          state("")
          country("")
          postcode("")
          doctorType("")
          speciality("")
          salesTerritoRy("")
          area("")
          zone("")
          telephone("")
          mobileNo("")
          email("")
          workHours("")
          deliveryType("")
          deliveryMethod("")
          edi("")
          ediAddress("")
          registrationLocation("")
          lab("")
          location("")
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

export default DoctorsList
