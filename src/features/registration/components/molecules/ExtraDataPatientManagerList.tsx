/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as LibraryUtils from "@lp/library/utils"
import {AutoCompleteFilterSingleSelectCountry,AutoCompleteFilterSingleSelectPostalCode,AutoCompleteFilterSingleSelectCity,AutoCompleteFilterSingleSelectState} from "../orgransims"
interface ExtraDataPatientManagerProps {
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

let address
let postCode
let city
let country
let state
let email
let whatsappNumber
let bloodGroup
let followUp
let comments
let fyiLine
let balance
let enteredBy
let status
let environment
const ExtraDataPatientManagerList = observer(
  (props: ExtraDataPatientManagerProps) => {
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
                dataField: "country",
                text: "Country",
                headerClasses: "textHeader3",
                sort: true,
                csvFormatter: col => (col ? col : ""),
                filter: LibraryComponents.Organisms.Utils.textFilter({
                  getFilter: (filter) =>{
                    country = filter
                  }
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.country}</span>
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
                    <AutoCompleteFilterSingleSelectCountry
                    onSelect={(item)=>{
                      props.onUpdateItem && props.onUpdateItem(item.country,column.dataField,row._id)
                    }}
                    />
                  </>
                ),
              },
              {
                dataField: "state",
                text: "State",
                headerClasses: "textHeader3",
                sort: true,
                csvFormatter: col => (col ? col : ""),
                filter: LibraryComponents.Organisms.Utils.textFilter({
                  getFilter: (filter) =>{
                    state = filter
                  }
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.state}</span>
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
                      <AutoCompleteFilterSingleSelectState
                      country={row.extraData.country}
                        onSelect={(item)=>{
                          props.onUpdateItem && props.onUpdateItem(item.state,column.dataField,row._id)
                        }}
                      />
                  </>
                ),
              },
              {
                dataField: "city",
                text: "City",
                headerClasses: "textHeader3",
                sort: true,
                csvFormatter: col => (col ? col : ""),
                filter: LibraryComponents.Organisms.Utils.textFilter({
                  getFilter: (filter) =>{
                    city = filter
                  }
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.city}</span>
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
                    {(props.extraData.listAdministrativeDiv) && (
                      <AutoCompleteFilterSingleSelectCity
                      country={row.extraData.country}
                      state={row.extraData.state}
                        onSelect={(item)=>{
                          props.onUpdateItem && props.onUpdateItem(item.city,column.dataField,row._id)
                        }}
                      />
                      
                    
                )}
                  </>
                ),
              },
              {
                dataField: "postCode",
                text: "PostCode",
                headerClasses: "textHeader3",
                sort: true,
                csvFormatter: col => (col ? col : ""),
                filter: LibraryComponents.Organisms.Utils.textFilter({
                  getFilter: (filter) =>{
                    postCode = filter
                  }
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.postCode}</span>
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
                   {(props.extraData.listAdministrativeDiv) && (
                      <AutoCompleteFilterSingleSelectPostalCode
                      country={row.extraData.country}
                      state={row.extraData.state}
                      city={row.extraData.city}
                      onSelect={(item)=>{
                        props.onUpdateItem && props.onUpdateItem(item.postalCode,column.dataField,row._id)
                      }}
                      />
                )}
                  </>
                ),
              },
              {
                dataField: "address",
                text: "Address",
                headerClasses: "textHeader3",
                sort: true,
                csvFormatter: col => (col ? col : ""),
                filter: LibraryComponents.Organisms.Utils.textFilter({
                  getFilter: (filter) =>{
                    address = filter
                  }
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.address}</span>
                },
              },
              
              {
                dataField: "email",
                text: "Email",
                headerClasses: "textHeader3",
                sort: true,
                csvFormatter: col => (col ? col : ""),
                filter: LibraryComponents.Organisms.Utils.textFilter({
                  getFilter: (filter) =>{
                    email = filter
                  }
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.email}</span>
                },
              },
              {
                dataField: "extraData.isMobileAndWhatsApp",
                text: "IsMobileAndWhatsapp",
                sort: true,
                csvFormatter: col => (col ? col : false),
                formatter: (cell, row) => {
                  return (
                    <>
                      <LibraryComponents.Atoms.Form.Toggle
                          value={
                            row?.extraData
                              ?.isMobileAndWhatsApp
                          }
                          onChange={(isMobileAndWhatsApp) => {
                           props.onUpdateItem && props.onUpdateItem(isMobileAndWhatsApp,"extraData.isMobileAndWhatsApp",row._id)
                          }}
                        />
                    </>
                  )
                },
              },
              {
                dataField: "extraData.confidental",
                text: "Confidental",
                sort: true,
                csvFormatter: col => (col ? col : false),
                formatter: (cell, row) => {
                  return (
                    <>
                      <LibraryComponents.Atoms.Form.Toggle
                          value={
                            row?.extraData
                              ?.confidental
                          }
                          onChange={(confidental) => {
                           props.onUpdateItem && props.onUpdateItem(confidental,"extraData.confidental",row._id)
                          }}
                        />
                    </>
                  )
                },
              },
              {
                dataField: "photograph",
                text: "PhotoGraph",
                csvExport : false,
                headerClasses: "textHeader3",
                formatter: (cell, row) => {
                  return (
                    row.extraData.photograph && (
                      <div>
                         
                        <div
                          style={{
                            background: `transparent url(${row.extraData.photograph}) no-repeat`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                          className="object-cover h-20 w-20 rounded-md"
                        />
                      </div>
                    )
                  )
                },
              },
              {
                dataField: "signature",
                text: "Signature",
                csvExport : false,
                headerClasses: "textHeader3",
                formatter: (cell, row) => {
                  return (
                    row.extraData.signature && (
                      <div>
                        <div
                          style={{
                            background: `transparent url(${row.extraData.signature}) no-repeat`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                          className="object-cover h-20 w-20 rounded-md"
                        />
                      </div>
                    )
                  )
                },
              },
              {
                dataField: "bloodGroup",
                text: "BloodGroup",
                headerClasses: "textHeader3",
                sort: true,
                csvFormatter: col => (col ? col : ""),
                filter: LibraryComponents.Organisms.Utils.textFilter({
                  getFilter: (filter) =>{
                    bloodGroup = filter
                  }
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.bloodGroup}</span>
                },
              },
              {
                dataField: "followUp",
                text: "FollowUp",
                headerClasses: "textHeader3",
                sort: true,
                csvFormatter: col => (col ? col : ""),
                filter: LibraryComponents.Organisms.Utils.textFilter({
                  getFilter: (filter) =>{
                    followUp = filter
                  }
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.followUp}</span>
                },
              },
              {
                dataField: "comments",
                text: "Comments",
                headerClasses: "textHeader3",
                sort: true,
                csvFormatter: col => (col ? col : ""),
                filter: LibraryComponents.Organisms.Utils.textFilter({
                  getFilter: (filter) =>{
                    comments = filter}
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.comments}</span>
                },
              },
              {
                dataField: "fyiLine",
                text: "FyiLine",
                headerClasses: "textHeader3",
                sort: true,
                csvFormatter: col => (col ? col : ""),
                filter: LibraryComponents.Organisms.Utils.textFilter({
                  getFilter: (filter) =>{
                    fyiLine = filter}
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.fyiLine}</span>
                },
              },
              {
                dataField: "balance",
                text: "Balance",
                headerClasses: "textHeader3",
                sort: true,
                csvFormatter: col => (col ? col : ""),
                filter: LibraryComponents.Organisms.Utils.textFilter({
                  getFilter: (filter) =>{
                    balance = filter}
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.balance}</span>
                },
              },
              {
                dataField: "enteredBy",
                text: "Entered By",
                headerClasses: "textHeader3",
                sort: true,
                csvFormatter: col => (col ? col : ""),
                filter: LibraryComponents.Organisms.Utils.textFilter({
                  getFilter: (filter) =>{
                    enteredBy = filter}
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.enteredBy}</span>
                },
              },
              {
                dataField: "status",
                text: "Status",
                headerClasses: "textHeader3",
                sort: true,
                csvFormatter: col => (col ? col : ""),
                filter: LibraryComponents.Organisms.Utils.textFilter({
                  getFilter: (filter) =>{
                    status = filter}
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.status}</span>
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
                    <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                          <select
                            value={
                              row.extraData?.status
                            }
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                            onChange={(e) => {
                              const status = e.target.value
                              props.onUpdateItem && props.onUpdateItem(status,column.dataField,row._id)
                            }}
                          >
                            <option selected>Select</option>
                            {LibraryUtils.lookupItems(
                              props.extraData.lookupItems,
                              "PATIENT MANAGER - STATUS"
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {`${item.value} - ${item.code}`}
                              </option>
                            ))}
                          </select>
                        </LibraryComponents.Atoms.Form.InputWrapper>
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
                    environment = filter}
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.environment}</span>
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
                    <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                          <select
                            value={
                             row.extraData
                                ?.environment
                            }
                           
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                            onChange={(e) => {
                              const environment = e.target.value
                              props.onUpdateItem && props.onUpdateItem(environment,column.dataField,row._id)
                             
                            }}
                          >
                            <option>Select</option>
                            {LibraryUtils.lookupItems(
                              props.extraData.lookupItems,
                              "PATIENT MANAGER - ENVIRONMENT"
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {`${item.value} - ${item.code}`}
                              </option>
                            ))}
                          </select>
                        </LibraryComponents.Atoms.Form.InputWrapper>
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
                      <LibraryComponents.Atoms.Tooltip tooltipText="Delete">
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
                              body: `Delete record`,
                            })
                          }
                        >
                          {LibraryComponents.Atoms.Icons.getIconTag(
                            LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                          )}
                        </LibraryComponents.Atoms.Icons.IconContext>
                      </LibraryComponents.Atoms.Tooltip>
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
            fileName="Patient Manager ExtraData"
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
              address("")
              postCode("")
              city("")
              country("")
              state("")
              email("")
              bloodGroup("")
              followUp("")
              comments("")
              fyiLine("")
              balance("")
              enteredBy("")
              status("")
              environment("")
            }}
          />
        </div>
      </>
    )
  }
)
export default ExtraDataPatientManagerList
