/* eslint-disable */
import React, { useState,useEffect } from "react"
import { observer } from "mobx-react"
import * as Config from "@lp/config"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import Storage from "@lp/library/modules/storage"
import { Stores } from "../../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"


const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

interface DoctorsListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
}

const DoctorsList = observer((props: DoctorsListProps) => {
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
          Stores.doctorsStore.updateDoctors({
            ...Stores.doctorsStore.doctors,
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
  
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }

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
            dataField: "doctorCode",
            text: "Doctor Code",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable:false
          },
          {
            dataField: "doctorName",
            text: "Doctor Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "sex",
            text: "Sex",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Sex">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sex = e.target.value
                      props.onUpdateItem && 
                        props.onUpdateItem(sex,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {["Male", "Female"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {`${item}`}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>    
            </>,
          },
          {
            dataField: "title",
            text: "Title",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Title">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const title = e.target.value
                    props.onUpdateItem && 
                    props.onUpdateItem(title,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "TITLE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>    
            </>,
          },
          {
            dataField: "firstName",
            text: "First Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "middleName",
            text: "Middle Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "lastName",
            text: "Last Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "reportName",
            text: "Report Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "address",
            text: "Address",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "city",
            text: "City",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "state",
            text: "State",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "country",
            text: "Country",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "postcode",
            text: "Postcode",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "doctorType",
            text: "Doctor Type",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: "speciality",
            text: "Speciality",
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Speciality">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const speciality = e.target.value
                      props.onUpdateItem && 
                        props.onUpdateItem(speciality,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SPECIALITY").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
            </>,
          },
          {
            dataField: "confidential",
            text: "Confidential",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            formatter: (cell, row) => {
              return <> <LibraryComponents.Atoms.Form.Toggle
             
              value={row.confidential}
              onChange={(confidential) => {
                  props.onUpdateItem && 
                    props.onUpdateItem(confidential,'confidential',row._id)
              }}
            />     </>
            },
            
          },
          {
            dataField: "salesTerritoRy",
            text: "Sales TerritoRy",
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const salesTerritoRy = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(salesTerritoRy,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SPECIALITY").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
            </>,
          },
          {
            dataField: "area",
            text: "Area",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "zone",
            text: "Zone",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "telephone",
            text: "Telephone",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "mobileNo",
            text: "Mobile No",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "email",
            text: "Email",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "workHours",
            text: "Work Hours",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "deliveryType",
            text: "Delivery Type",
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deliveryType = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(deliveryType,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "DELIVERY_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
            </>,
          },
          {
            dataField: "deliveryMethod",
            text: "Delivery Method",
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deliveryMethod = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(deliveryMethod,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "DELIVERY_METHOD").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>  
            </>,
          },
          {
            dataField: "edi",
            text: "EDI",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "ediAddress",
            text: "EDI Address",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: "urgent",
            text: "Urgent",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            formatter: (cell, row) => {
              return <><LibraryComponents.Atoms.Form.Toggle
             
              value={row.urgent}
              onChange={(urgent) => {
                  props.onUpdateItem && 
                    props.onUpdateItem(urgent,'urgent',row._id)
              }}
            />   </>
            },
           
          },
          {
            dataField: "registrationLocation",
            text: "Registration Location",
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
               <LibraryComponents.Atoms.Form.InputWrapper label="Registartion Location">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const registrationLocation = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(registrationLocation,column.dataField,row._id)
                  }}  
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "STATUS").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>       
            </>,
          },
          {
            dataField: "lab",
            text: "Lab",
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
                  value={Stores.doctorsStore.doctors?.lab}
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Location">
                <select
                  value={Stores.doctorsStore.doctors?.location}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const location = e.target.value as string
                    props.onUpdateItem &&
                      props.onUpdateItem(location,column.dataField,row._id);
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
            dataField: "schedule",
            text: "Schedule",
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
                  value={Stores.doctorsStore.doctors?.schedule}
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "info",
            text: "Info",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "fyiLine",
            text: "FYI Line",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "workLine",
            text: "Work Line",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "status",
            text: "Status",
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
            text: "Date Creation",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
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
            text: "Date Active",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
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
            text: "Date Expire",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
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
            text: "Version",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
          },
          {
            dataField: "keyNum",
            text: "Key Num",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
          },
          {
            dataField: "enteredBy",
            text: "Entered By",
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
                <LibraryComponents.Atoms.Tooltip tooltipText="Delete">
                  <LibraryComponents.Atoms.Icons.IconContext
                    color="#000"
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
                          LibraryComponents.Atoms.Icons.IconGr.GrDuplicate
                        )}
                      </LibraryComponents.Atoms.Icons.IconContext>
                    </LibraryComponents.Atoms.Tooltip>
                  </>
                )}
              </div>
            </>
            ),
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
      />
    </div>
  )
})

export default DoctorsList
