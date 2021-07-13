/* eslint-disable */
import React, { useState,useEffect } from "react"
import { observer } from "mobx-react"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"
import Storage from "@lp/library/modules/storage"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

import { Stores } from "../../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

interface RegistrationLocationsListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const RegistrationLocationsList = observer(
  (props: RegistrationLocationsListProps) => {
    const [lookupItems, setLookupItems] = useState<any[]>([])
    const getLookupValues = async () => {
      const listLookup = LookupStore.lookupStore.listLookup
      if (listLookup.length > 0) {
        const selectedCategory: any = await Storage.getItem(
          `__persist_mobx_stores_routerStore_SelectedCategory__`
        )
        const items = listLookup.filter((item: any) => {
          if (
            item.documentName.name === selectedCategory.category &&
            item.documentName.children.name === selectedCategory.item
          )
            return item
        })
        if (items) {
          const status = items
            .find((fileds) => {
              return fileds.fieldName === "STATUS"
            })
            ?.arrValue?.find((statusItem) => statusItem.code === "A")
          if (status) {
            Stores.registrationLocationsStore.updateRegistrationLocations({
              ...Stores.registrationLocationsStore.registrationLocations,
              status: status.code,
            })
          }
          setLookupItems(items)
        }
      }
    }
  
    useEffect(() => {
      getLookupValues()
    }, [LookupStore.lookupStore.listLookup])
    return (
      <div style={{ position: "relative" }}>
        <LibraryComponents.Organisms.TableBootstrap
          id="_id"
          data={props.data}
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
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable:false
            },
            {
              dataField: "locationName",
              text: "Location Name",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "address",
              text: "Address",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "city",
              text: "City",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "state",
              text: "State",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "country",
              text: "Country",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "postcode",
              text: "Postcode",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "customerGroup",
              text: "Customer Group",
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const customerGroup = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(customerGroup,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "CUSTOMER_GROUP").map((item: any, index: number) => (
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const category = e.target.value
                    props.onUpdateItem &&
                      props.onUpdateItem(category,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "CATEGORY").map((item: any, index: number) => (
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
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.confidential ? "Yes" : "No"}</>
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => <>
                     <LibraryComponents.Atoms.Form.Toggle
                  label="Confidential"
                  id="modeConfidential"
                  value={row.confidential}
                  onChange={(confidential) => {
                      props.onUpdateItem &&
                       props.onUpdateItem(confidential,column.dataField,row._id)
                  }}
                />
              </>,
            },
            {
              dataField: "telephone",
              text: "Telephone",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "mobileNo",
              text: "Mobile No",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "email",
              text: "Email",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "deliveryType",
              text: "Delivery Type",
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deliveryType = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(deliveryType,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "DELIVERY_TYPE").map((item: any, index: number) => (
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deliveryMethod = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(deliveryMethod,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "DELIVERY_METHOD").map((item: any, index: number) => (
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Corporate Code">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
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
                <LibraryComponents.Atoms.Form.InputWrapper label="Invoice AC">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
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
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "printLabel",
              text: "Print Label",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.printLabel ? "Yes" : "No"}</>
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => <>
                     <LibraryComponents.Atoms.Form.Toggle
                  label="printLabel"
                  id="modePrintLabel"
                  value={row.printLabel}
                  onChange={(printLabel) => {
                      props.onUpdateItem &&
                       props.onUpdateItem(printLabel,column.dataField,row._id)
                  }}
                />
              </>,

            },
            {
              dataField: "methodColn",
              text: "Method Coln",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Method Coln">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const methodColn = e.target.value
                    props.onUpdateItem &&
                    props.onUpdateItem(methodColn,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "METHOD_COLN").map((item: any, index: number) => (
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
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "salesTerritoRy",
              text: "Sales TerritoRy",
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const salesTerritoRy = e.target.value
                    props.onUpdateItem &&
                       props.onUpdateItem(salesTerritoRy,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SPECIALITY").map((item: any, index: number) => (
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
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "zone",
              text: "Zone",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "route",
              text: "Route",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "lab",
              text: "Lab",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Lab">
                <select
                  value={
                    Stores.registrationLocationsStore.registrationLocations?.lab
                  }
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const lab = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(lab,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LabStores.labStore.listLabs.map((item: any, index: number) => (
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
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "neverBill",
              text: "Never Bill",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.neverBill ? "Yes" : "No"}</>
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => <>
                     <LibraryComponents.Atoms.Form.Toggle
                  label="neverBill"
                  id="modeNeverBill"
                  value={row.neverBill}
                  onChange={(neverBill) => {
                      props.onUpdateItem &&
                       props.onUpdateItem(neverBill,column.dataField,row._id)
                  }}
                />
              </>,
            },
            {
              dataField: "edi",
              text: "EDI",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "ediAddress",
              text: "EDI Address",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },

            {
              dataField: "urgent",
              text: "Urgent",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.urgent ? "Yes" : "No"}</>
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => <>
                     <LibraryComponents.Atoms.Form.Toggle
                  label="Urgent"
                  id="modeUrgent"
                  value={row.urgent}
                  onChange={(urgent) => {
                      props.onUpdateItem &&
                       props.onUpdateItem(urgent,column.dataField,row._id)
                  }}
                />
              </>,
            },
            {
              dataField: "schedule",
              text: "Schedule",
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
                  value={
                    Stores.registrationLocationsStore.registrationLocations?.schedule
                  }
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const schedule = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(schedule,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LabStores.labStore.listLabs.map((item: any, index: number) => (
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
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "info",
              text: "Info",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "fyiLine",
              text: "FYI Line",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "workLine",
              text: "Work Line",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "status",
              text: "Status",
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    props.onUpdateItem &&
                    props.onUpdateItem(status,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "STATUS").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
              </>,
            },
            {
              dataField: "dateCreation",
              editable: false,
              text: "Date Creation",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
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
              filter: LibraryComponents.Organisms.Utils.textFilter(),
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
              filter: LibraryComponents.Organisms.Utils.textFilter(),
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
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "keyNum",
              editable: false,
              text: "Key Num",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "enteredBy",
              editable: false,
              text: "Entered By",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },

            {
              dataField: "opration",
              text: "Delete",
              editable: false,
              csvExport: false,
              hidden: !props.isDelete,
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Atoms.Buttons.Button
                    size="small"
                    type="outline"
                    icon={LibraryComponents.Atoms.Icon.Remove}
                    onClick={() => {
                      props.onDelete &&
                        props.onDelete({
                          type: "Delete",
                          show: true,
                          id: [row._id],
                          title: "Are you sure?",
                          body: `Delete record`,
                        })
                    }}
                  >
                    Delete
                  </LibraryComponents.Atoms.Buttons.Button>
                </>
              ),
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
        />
      </div>
    )
  }
)

export default RegistrationLocationsList
