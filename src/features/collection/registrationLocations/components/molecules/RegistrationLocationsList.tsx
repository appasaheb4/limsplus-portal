/* eslint-disable */
import React from "react"
import dayjs from 'dayjs'
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { Stores } from "../../stores"


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
  onPageSizeChange?: (page:number,totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

const RegistrationLocationsList = 
  (props: RegistrationLocationsListProps) => {
    
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
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable:false
            },
            {
              dataField: "locationName",
              text: "Location Name",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable:false,
            },
            {
              dataField: "address",
              text: "Address",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "city",
              text: "City",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "state",
              text: "State",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "country",
              text: "Country",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "postcode",
              text: "Postcode",
              headerClasses: "textHeader",
              sort: true,
              //filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "customerGroup",
              text: "Customer Group",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => 
              <>
                <LibraryComponents.Atoms.Form.InputWrapper label="Customer Group">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const customerGroup = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(customerGroup,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "CUSTOMER_GROUP").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
              </>,
            },
            {
              dataField: "category",
              text: "Category",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => 
              <>
                 <LibraryComponents.Atoms.Form.InputWrapper label="Category">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const category = e.target.value
                    props.onUpdateItem &&
                      props.onUpdateItem(category,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "CATEGORY").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
              </>,
            },
            {
              dataField: "confidential",
              text: "Confidential",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return <><LibraryComponents.Atoms.Form.Toggle
                
                value={row.confidential}
                onChange={(confidential) => {
                    props.onUpdateItem &&
                     props.onUpdateItem(confidential,'confidential',row._id)
                }}
              /></>
              },
             
            },
            {
              dataField: "telephone",
              text: "Telephone",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "mobileNo",
              text: "Mobile No",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "email",
              text: "Email",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "deliveryType",
              text: "Delivery Type",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => 
              <>
                <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Type">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deliveryType = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(deliveryType,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "DELIVERY_TYPE").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
              </>,
            },
            {
              dataField: "deliveryMethod",
              text: "Delivery Method",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => 
              <>
                 <LibraryComponents.Atoms.Form.InputWrapper label="Delivery Method">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deliveryMethod = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(deliveryMethod,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "DELIVERY_METHOD").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>      
              </>,
            },
            {
              dataField: "corporateCode",
              text: "Corporate Code",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => 
              <>
                 <LibraryComponents.Atoms.Form.InputWrapper label="Corporate Code">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const corporateCode = e.target.value
                    props.onUpdateItem &&
                      props.onUpdateItem(corporateCode,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {[].map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
              </>,
            },
            {
              dataField: "invoiceAc",
              text: "Invoice Ac",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => 
              <>
                <LibraryComponents.Atoms.Form.InputWrapper label="Invoice AC">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const invoiceAc = e.target.value
                    props.onUpdateItem &&
                      props.onUpdateItem(invoiceAc,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {[].map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>      
              </>,
            },
            {
              dataField: "labLicence",
              text: "Lab Licence",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "printLabel",
              text: "Print Label",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return <> <LibraryComponents.Atoms.Form.Toggle
              
                value={row.printLabel}
                onChange={(printLabel) => {
                    props.onUpdateItem &&
                     props.onUpdateItem(printLabel,'printLabel',row._id)
                }}
              /></>
              },
             

            },
            {
              dataField: "methodColn",
              text: "Method Coln",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) =>
              <>
                 <LibraryComponents.Atoms.Form.InputWrapper label="Method Coln">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const methodColn = e.target.value
                    props.onUpdateItem &&
                    props.onUpdateItem(methodColn,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "METHOD_COLN").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
              </>,
            },
            {
              dataField: "workHrs",
              text: "Work Hrs",
              headerClasses: "textHeader1",
              sort: true,
              //filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "salesTerritoRy",
              text: "Sales TerritoRy",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => 
              <>
                <LibraryComponents.Atoms.Form.InputWrapper label="Sales TerritoRy">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const salesTerritoRy = e.target.value
                    props.onUpdateItem &&
                       props.onUpdateItem(salesTerritoRy,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "SPECIALITY").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>       
            },
            {
              dataField: "area",
              text: "Area",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "zone",
              text: "Zone",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "route",
              text: "Route",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "lab",
              text: "Lab",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => 
              <>
                 <LibraryComponents.Atoms.Form.InputWrapper label="Lab">
                <select
                  value={
                    Stores.registrationLocationsStore.registrationLocations?.lab
                  }
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const lab = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(lab,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {props.extraData.listLabs.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
              </>,
            },
            {
              dataField: "location",
              text: "Location",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "neverBill",
              text: "Never Bill",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return <> <LibraryComponents.Atoms.Form.Toggle
              
                value={row.neverBill}
                onChange={(neverBill) => {
                    props.onUpdateItem &&
                     props.onUpdateItem(neverBill,'neverBill',row._id)
                }}
              /></>
              },
             
            },
            {
              dataField: "edi",
              text: "EDI",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "ediAddress",
              text: "EDI Address",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },

            {
              dataField: "urgent",
              text: "Urgent",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return <> <LibraryComponents.Atoms.Form.Toggle
              
                value={row.urgent}
                onChange={(urgent) => {
                    props.onUpdateItem &&
                     props.onUpdateItem(urgent,'urgent',row._id)
                }}
              /></>
              },
            
            },
            {
              dataField: "schedule",
              text: "Schedule",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => 
              <>
                <LibraryComponents.Atoms.Form.InputWrapper label="Schedule">
                <select
                  value={
                    row.schedule
                  }
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const schedule = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(schedule,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {props.extraData.listLabs.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
              </>,
            },
            {
              dataField: "reportFormat",
              text: "Report Format",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "info",
              text: "Info",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "fyiLine",
              text: "FYI Line",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "workLine",
              text: "Work Line",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "status",
              text: "Status",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => 
              <>
                <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    props.onUpdateItem &&
                    props.onUpdateItem(status,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "STATUS").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
              </>,
            },
            {
              dataField: "environment",
              text: "Environment",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={row.environment}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                      onChange={(e) => {
                        const environment = e.target.value
                        props.onUpdateItem && props.onUpdateItem(environment,column.dataField,row._id)
                        
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(props.extraData.lookupItems, "ENVIRONMENT").map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {`${item.value} - ${item.code}`}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "dateCreation",
              text: "Date Creation",
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {dayjs(row.dateCreation || 0)
                      .format("YYYY-MM-DD")}
                  </>
                )
              },
            },
            {
              dataField: "dateActiveFrom",
              text: "Date Active",
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {dayjs(row.dateActiveFrom || 0)
                      .format("YYYY-MM-DD")}
                  </>
                )
              },
            },
            {
              dataField: "dateExpire",
              text: "Date Expire",
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {dayjs(row.dateExpire)
                      .format("YYYY-MM-DD")}
                  </>
                )
              },
            },
            {
              dataField: "version",
              text: "Version",
              sort: true,
              editable: false,
            },
            {
              dataField: "enteredBy",
              text: "Entered By",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                <LibraryComponents.Atoms.Tooltip tooltipText="Delete" position="top">
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
                        onClick={() =>
                          props.onDuplicate && props.onDuplicate(row)
                        }
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
          onPageSizeChange={(page,size)=>{
            props.onPageSizeChange && props.onPageSizeChange(page,size)
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size)
          }}
        />
      </div>
    )
  }


export default RegistrationLocationsList
