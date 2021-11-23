/* eslint-disable */
import React from "react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as LibraryUtils from "@lp/library/utils"

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
  onPageSizeChange?: (page:number,totalSize: number) => void
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
            headerClasses: "textHeader1",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable:false
          },
          {
            dataField: "corporateName",
            text: "Corporate Name",
            headerClasses: "textHeader1",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable:false
          },
          {
            dataField: "invoiceAc",
            text: "Invoice Ac",
            headerClasses: "textHeader1",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "priceList",
            text: "Price List",
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
            ) => 
            <>
               <LibraryComponents.Atoms.Form.InputWrapper label="Price List">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const priceList = e.target.value
                      props.onUpdateItem && 
                        props.onUpdateItem(priceList,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {[].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {`${item}`}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
            </>,
          },
          {
            dataField: "priceGroup",
            text: "Price Group",
            headerClasses: "textHeader1",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "billingOn",
            text: "Billing On",
            headerClasses: "textHeader1",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "address",
            text: "Address",
            headerClasses: "textHeader",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "city",
            text: "City",
            headerClasses: "textHeader",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "state",
            text: "State",
            headerClasses: "textHeader",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "country",
            text: "Country",
            headerClasses: "textHeader",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "postcode",
            text: "Postcode",
            headerClasses: "textHeader",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "customerGroup",
            text: "Customer Group",
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
            formatter: (cell, row) => {
              return <> <LibraryComponents.Atoms.Form.Toggle
             
              value={row.confidential}
              onChange={(confidential) => {
                  props.onUpdateItem &&
                   props.onUpdateItem(confidential,'confidental',row._id)
              }}
            /></>
            },
           
          },
          {
            dataField: "telephone",
            text: "Telephone",
            headerClasses: "textHeader1",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "mobileNo",
            text: "Mobile No",
            headerClasses: "textHeader",
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
            dataField: "deliveryType",
            text: "Delivery Type",
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
            dataField: "salesTerritoRy",
            text: "Sales TerritoRy",
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
            </>,
          },
          {
            dataField: "area",
            text: "Area",
            headerClasses: "textHeader",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "zone",
            text: "Zone",
            headerClasses: "textHeader",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "edi",
            text: "EDI",
            headerClasses: "textHeader",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "ediAddress",
            text: "EDI Address",
            headerClasses: "textHeader1",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "urgent",
            text: "Urgent",
            sort: true,
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
            dataField: "workHours",
            text: "Work Hours",
            headerClasses: "textHeader",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "schedule",
            text: "Schedule",
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
            ) => 
            <>
                    <LibraryComponents.Atoms.Form.InputWrapper label="Schedule">
                <select
                  value={row.schedule}
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
          },
          {
            dataField: "info",
            text: "Info",
            headerClasses: "textHeader",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "fyiLine",
            text: "FYI Line",
            headerClasses: "textHeader1",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "workLine",
            text: "Work Line",
            headerClasses: "textHeader",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "status",
            text: "Status",
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
            editable: false,
            text: "Date Creation",
            sort: true,
            formatter: (cell, row) => {
              return (
                <>
                  {LibraryUtils.moment
                    .unix(row.dateCreation || 0)
                    .format("YYYY-MM-DD")}
                </>
              )
            },
          },
          {
            dataField: "dateActiveFrom",
            editable: false,
            text: "Date Active",
            sort: true,
            formatter: (cell, row) => {
              return (
                <>
                  {LibraryUtils.moment
                    .unix(row.dateActiveFrom || 0)
                    .format("YYYY-MM-DD")}
                </>
              )
            },
          },
          {
            dataField: "dateActiveTo",
            editable: false,
            text: "Date Expire",
            sort: true,
            formatter: (cell, row) => {
              return (
                <>
                  {LibraryUtils.moment
                    .unix(row.dateActiveTo || 0)
                    .format("YYYY-MM-DD")}
                </>
              )
            },
          },
          {
            dataField: "version",
            editable: false,
            text: "Version",
            sort: true,
          },
          {
            dataField: "enteredBy",
            editable: false,
            headerClasses: "textHeader",
            text: "Entered By",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                            color="#000"
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
                            color="#000"
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
        fileName="Methods"
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
      />
    </div>
  )
}

export default CorporateClient
