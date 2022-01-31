/* eslint-disable */
import React from "react"
import { Stores } from "../../stores"
import {lookupItems} from "@lp/library/utils"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { useStores } from "@lp/stores"
import {AutoCompleteFilterSingleSelectCountry,AutoCompleteFilterSingleSelectState,AutoCompleteFilterSingleSelectDistrict
,AutoCompleteFilterSingleSelectCity,AutoCompleteFilterSingleSelectArea,AutoCompleteFilterSingleSelectPostalCode} from '../organisms'

let code;
let name;
let country;
let state;
let district;
let city;
let area;
let address;
let postalCode;
let deliveryType;
let salesTerritory;
let labLicence;
let director;
let physician;
let mobileNo;
let contactNo;
let speciality;
let labType;
let openingTime;
let closingTime;
let email;
let fyiLine
let workLine;
let environment;



interface LabListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onUpdateImage?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}
export const LabList = (props: LabListProps) => {
  const { administrativeDivisions, salesTeamStore } = useStores()

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
              dataField: "code",
              text: "Code",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  code = filter
                }
              }),
              editable:false,
              headerClasses: "textHeader",
            },
            {
              dataField: "name",
              text: "Name",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter)=>{
                  name = filter
                }
              }),
              editable:false,
              headerClasses: "textHeader",
            },
            {
              dataField: "country",
              text: "Country",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter)=>{
                  country = filter
                }
              }),
              headerClasses: "textHeader1",
              style :{textTransform :"uppercase"},
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
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter)=>{
                  state = filter
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
                  {( props.extraData.listAdministrativeDiv)  && (
                    <AutoCompleteFilterSingleSelectState
                    country={row.country}
                      onSelect={(item)=>{
                        props.onUpdateItem && props.onUpdateItem(item.state,column.dataField,row._id)
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
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  district = filter
                }
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
                  {(props.extraData.listAdministrativeDiv) && (
                    <AutoCompleteFilterSingleSelectDistrict
                    country={row.country}
                    state={row.state}
                    onSelect={(item)=>{
                      props.onUpdateItem && props.onUpdateItem(item.district,column.dataField,row._id)
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
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  city = filter
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
                  {(props.extraData.listAdministrativeDiv) && (
                    <AutoCompleteFilterSingleSelectCity
                    country={row.country}
                    state={row.state}
                    district={row.district}
                      onSelect={(item)=>{
                        props.onUpdateItem && props.onUpdateItem(item.city,column.dataField,row._id)
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
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  area = filter
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
                  {(props.extraData.listAdministrativeDiv) && (
                
                    <AutoCompleteFilterSingleSelectArea
                    country={row.country}
                    state={row.state}
                    district={row.district}
                    city={row.city}
                      onSelect={(item)=>{
                        props.onUpdateItem && props.onUpdateItem(item.area,column.dataField,row._id)
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
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  postalCode = filter
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
                 {(props.extraData.listAdministrativeDiv) && (
                    <AutoCompleteFilterSingleSelectPostalCode
                    country={row.country}
                    state={row.state}
                    district={row.district}
                    city={row.city}
                    area={row.area}
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
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter)=>{
                  address = filter
                }
              }),
            },
            {
              dataField: "deliveryType",
              text: "Delivery Type",
              headerClasses: "textHeader2",
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
                      {lookupItems(
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
              dataField: "salesTerritory",
              text: "Sales Territory",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  salesTerritory = filter
                }
              }),
              headerClasses: "textHeader3",
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
                        const salesTerritory = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            salesTerritory,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {salesTeamStore.listSalesTeam &&
                        salesTeamStore.listSalesTeam.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.salesTerritory.area}>
                              {`${item.salesTerritory.area}`}
                            </option>
                          )
                        )}
                    </select>
                  
                </>
              ),
            },
            {
              dataField: "labLicence",
              text: "Lab Licence",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter)=>{
                  labLicence = filter
                }
              }),
              style : {textTransform: 'uppercase'},
              editorStyle: {
                textTransform: 'uppercase'
              }
            },

            {
              dataField: "director",
              text: "Director",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter)=>{
                  director = filter
                }
              }),
              style : {textTransform: 'uppercase'},
              editorStyle: {
                textTransform: 'uppercase'
              }
            },
            {
              dataField: "physician",
              text: "Physician",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter)=>{
                  physician = filter
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
                getFilter: (filter)=>{
                  mobileNo = filter
                }
              }),
            },
            {
              dataField: "contactNo",
              text: "Contact No",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter)=>{
                  contactNo = filter
                }
              }),
            },

            {
              dataField: "speciality",
              text: "Speciality",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter)=>{
                  speciality = filter
                }
              }),
            },
            {
              dataField: "labType",
              text: "Lab Type",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter)=>{
                  labType = filter
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
                      value={Stores.labStore.labs?.labType}
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const labType = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(labType, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "LAB_TYPE"
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
              dataField: "openingTime",
              text: "Opening Time",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  openingTime  = filter
                }
              }),
            },

            {
              dataField: "closingTime",
              text: "Closing Time",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  closingTime  = filter
                }
              }),
            },
            {
              dataField: "email",
              text: "Email",
              headerClasses: "textHeader",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  email  = filter
                }
              }),
            },
            {
              dataField: "image",
              text: "Lab Log",
              headerClasses: "textHeader1",
              sort: true,
              csvExport: false,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.image && (
                      <img
                        src={row.image}
                        alt="lab logo"
                        className="object-fill h-35 w-40 rounded-md"
                      />
                    )}
                  </>
                )
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
                  <LibraryComponents.Atoms.Form.InputFile
                    label="File"
                    placeholder="File"
                    onChange={(e) => {
                      const image = e.target.files[0]
                      props.onUpdateImage &&
                        props.onUpdateImage(image, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "autoRelease",
              text: "Auto Release",
              sort: true,
              csvFormatter: col => (col ? col : false),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.autoRelease}
                      onChange={(autoRelease) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(autoRelease, "autoRelease", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "requireReceveInLab",
              text: "Require Receve In Lab",
              sort: true,
              csvFormatter: col => (col ? col : false),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.requireReceveInLab}
                      onChange={(requireReceveInLab) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            requireReceveInLab,
                            "requireReceveInLab",
                            row._id
                          )
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "requireScainIn",
              text: "Require Scain In",
              sort: true,
              csvFormatter: col => (col ? col : false),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.requireScainIn}
                      onChange={(requireScainIn) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            requireScainIn,
                            "requireScainIn",
                            row._id
                          )
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "routingDept",
              text: "Routing Dept",
              sort: true,
              csvFormatter: col => (col ? col : false),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.routingDept}
                      onChange={(routingDept) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(routingDept, "routingDept", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "fyiLine",
              text: "Fyi Line",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  fyiLine  = filter
                }
              }),
            },
            {
              dataField: "workLine",
              text: "Work Line",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  workLine  = filter
                }
              }),
            },
            {
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  environment  = filter
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
                  </div>
                </>
              ),
              headerClasses: "sticky right-0 bg-gray-500 text-white",
              classes: (cell, row, rowIndex, colIndex) => {
                return "sticky right-0 bg-gray-500"
              },
            },
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName="Lab"
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
            code("")
            name("")
            country("")
            state("")
            district("")
            city("")
            area("")
            postalCode("")
            address("")
            deliveryType("")
            salesTerritory("")
            labLicence("")
            director("")
            physician("")
            mobileNo("")
            contactNo("")
            speciality("")
            labType("")
            openingTime("")
            closingTime("")
            email("")
            fyiLine("")
            workLine("")
            environment("")
          }}  
        />
      </div>
    </>
  )
}
