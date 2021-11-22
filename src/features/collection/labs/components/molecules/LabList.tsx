/* eslint-disable */
import React from "react"
import { Stores } from "../../stores"
import * as LibraryUtils from "@lp/library/utils"
import _ from "lodash"
import * as Utils from "../../util"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { useStores } from "@lp/stores"

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

const LabList = (props: LabListProps) => {
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
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable:false,
              headerClasses: "textHeader",
            },
            {
              dataField: "name",
              text: "Name",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "180px" },
              editable:false,
              headerClasses: "textHeader",
            },
            {
              dataField: "country",
              text: "Country",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Country"
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                        onChange={(e) => {
                          const country = e.target.value
                          props.onUpdateItem && props.onUpdateItem(country,column.dataField,row._id)
                        }}
                      >
                        <option selected>Select</option>
                        {_.uniq(
                          _.map(
                            props.extraData.listAdministrativeDiv,
                            "country"
                          )
                        ).map((item: any, index: number) => (
                          <option key={index} value={item}>
                            {`${item}`}
                          </option>
                        ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
              )}
                </>
              ),
            },
            {
              dataField: "state",
              text: "State",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  {(props.extraData.country || props.extraData.listAdministrativeDiv)  && (
                
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="State"
                     
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                        onChange={(e) => {
                          const state = e.target.value
                          props.onUpdateItem && props.onUpdateItem(state,column.dataField,row._id)
                        }}
                      >
                        <option selected>Select</option>
                        {props.extraData.listAdministrativeDiv &&
                          props.extraData.stateList(
                            props.extraData.listAdministrativeDiv,
                            props.extraData.country
                          ).map((item: any, index: number) => (
                            <option key={index} value={item}>
                              {`${item}`}
                            </option>
                          ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  
              )}
                </>
              ),
            },
            {
              dataField: "district",
              text: "District",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                  {(props.extraData.state ||  props.extraData.listAdministrativeDiv) && (
                
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="District"
                     
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                        onChange={(e) => {
                          const district = e.target.value
                          props.onUpdateItem && props.onUpdateItem(district,column.dataField,row._id)
                        }}
                      >
                        <option selected>Select</option>
                        {props.extraData.listAdministrativeDiv &&
                          props.extraData.districtList(
                            props.extraData.listAdministrativeDiv,
                            props.extraData.country,
                            props.extraData.state
                          ).map((item: any, index: number) => (
                            <option key={index} value={item}>
                              {`${item}`}
                            </option>
                          ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  
              )}
                </>
              ),
            },
            {
              dataField: "city",
              text: "City",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  {(props.extraData.district || props.extraData.listAdministrativeDiv) && (
                
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="City"
                      
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                        onChange={(e) => {
                          const city = e.target.value
                          props.onUpdateItem && props.onUpdateItem(city,column.dataField,row._id)
                          
                        }}
                      >
                        <option selected>Select</option>
                        {props.extraData.listAdministrativeDiv &&
                          props.extraData.cityList(
                            props.extraData.listAdministrativeDiv,
                            props.extraData.country,
                            props.extraData.state,
                            props.extraData.district
                          ).map((item: any, index: number) => (
                            <option key={index} value={item}>
                              {`${item}`}
                            </option>
                          ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  
              )}
                </>
              ),
            },
            {
              dataField: "area",
              text: "Area",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  {(props.extraData.city || props.extraData.listAdministrativeDiv) && (
                
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Area"
                      
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                        onChange={(e) => {
                          const area = e.target.value
                          props.onUpdateItem && props.onUpdateItem(area,column.dataField,row._id)
                          
                        }}
                      >
                        <option selected>Select</option>
                        {props.extraData.listAdministrativeDiv &&
                          Utils.areaList(
                            props.extraData.listAdministrativeDiv,
                            props.extraData.country,
                            props.extraData.state,
                            props.extraData.district,
                            props.extraData.city
                          ).map((item: any, index: number) => (
                            <option key={index} value={item}>
                              {`${item}`}
                            </option>
                          ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  
              )}
                </>
              ),
            },
            {
              dataField: "postalCode",
              text: "Postal Code",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                 {(props.extraData.area || props.extraData.listAdministrativeDiv) && (
                
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Postal Code"
                     
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                        onChange={(e) => {
                          const postalCode = e.target.value
                          props.onUpdateItem && props.onUpdateItem(postalCode,column.dataField,row._id)
                        }}
                      >
                        <option selected>Select</option>
                        {props.extraData.listAdministrativeDiv &&
                          props.extraData.postCodeList(
                            props.extraData.listAdministrativeDiv,
                            props.extraData.country,
                            props.extraData.state,
                            props.extraData.district,
                            props.extraData.city,
                            props.extraData.area
                          ).map((item: any, index: number) => (
                            <option key={index} value={item}>
                              {`${item}`}
                            </option>
                          ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  
              )}
                </>
              ),
            },

            {
              dataField: "address",
              text: "Address",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "deliveryType",
              text: "Delivery Type",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Type">
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
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "salesTerritory",
              text: "Sales Territory",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Sales Territory">
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
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "labLicence",
              text: "Lab Licence",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "180px" },
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
              filter: LibraryComponents.Organisms.Utils.textFilter(),
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
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "mobileNo",
              text: "Mobile No",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "contactNo",
              text: "Contact No",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },

            {
              dataField: "speciality",
              text: "Speciality",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "labType",
              text: "Lab Type",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Lab type">
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
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "LAB_TYPE"
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
              dataField: "openingTime",
              text: "Opening Time",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },

            {
              dataField: "closingTime",
              text: "Closing Time",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "email",
              text: "Email",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
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
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "workLine",
              text: "Work Line",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
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
        />
      </div>
    </>
  )
}
export default LabList
