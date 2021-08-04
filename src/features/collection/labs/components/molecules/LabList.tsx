/* eslint-disable */
import React, { useState,useEffect } from "react"
import { observer } from "mobx-react"
import { Stores } from "../../stores"
import { Stores as SalesTeamStore } from "@lp/features/collection/salesTeam/stores"
import { Stores as AdministrativeDivStore } from "@lp/features/collection/administrativeDivisions/stores"
import Storage from "@lp/library/modules/storage"
import * as LibraryUtils from "@lp/library/utils"
import * as Utils from "../../util"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

interface LabListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const LabList = observer((props: LabListProps) => {
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
        setLookupItems(items)
      }
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])

  return (
    <>
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
            dataField: "code",
            text: "Code",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "name",
            text: "Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "country",
            text: "Country",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Country">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const country = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(country,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {AdministrativeDivStore.administrativeDivStore
                    .listAdministrativeDiv &&
                    AdministrativeDivStore.administrativeDivStore.listAdministrativeDiv.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.country}>
                          {`${item.country}`}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            ),
          },
          {
            dataField: "state",
            text: "State",
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
                <LibraryComponents.Atoms.Form.InputWrapper label="State">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const state = e.target.value
                    props.onUpdateItem &&
                    props.onUpdateItem(state,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {Utils.stateList(
                    AdministrativeDivStore.administrativeDivStore
                      .listAdministrativeDiv,
                    Stores.labStore.labs?.country
                  ) &&
                    Utils.stateList(
                      AdministrativeDivStore.administrativeDivStore
                        .listAdministrativeDiv,
                      Stores.labStore.labs?.country
                    ).map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {`${item}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            ),
          },
          {
            dataField: "district",
            text: "District",
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
                <LibraryComponents.Atoms.Form.InputWrapper label="District">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const district = e.target.value
                    props.onUpdateItem &&
                        props.onUpdateItem(district,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {Utils.districtList(
                    AdministrativeDivStore.administrativeDivStore
                      .listAdministrativeDiv,
                    Stores.labStore.labs?.country,
                    Stores.labStore.labs?.state
                  ) &&
                    Utils.districtList(
                      AdministrativeDivStore.administrativeDivStore
                        .listAdministrativeDiv,
                      Stores.labStore.labs?.country,
                      Stores.labStore.labs?.state
                    ).map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {`${item}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            ),
          },
          {
            dataField: "city",
            text: "City",
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
                <LibraryComponents.Atoms.Form.InputWrapper label="City">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const city = e.target.value
                    props.onUpdateItem &&
                    props.onUpdateItem(city,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {Utils.cityList(
                    AdministrativeDivStore.administrativeDivStore
                      .listAdministrativeDiv,
                    Stores.labStore.labs?.country,
                    Stores.labStore.labs?.state,
                    Stores.labStore.labs?.district
                  ) &&
                    Utils.cityList(
                      AdministrativeDivStore.administrativeDivStore
                        .listAdministrativeDiv,
                      Stores.labStore.labs?.country,
                      Stores.labStore.labs?.state,
                      Stores.labStore.labs?.district
                    ).map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {`${item}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            ),
          },
          {
            dataField: "area",
            text: "Area",
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
                <LibraryComponents.Atoms.Form.InputWrapper label="Area">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const area = e.target.value
                    props.onUpdateItem &&
                        props.onUpdateItem(area,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {Utils.areaList(
                    AdministrativeDivStore.administrativeDivStore
                      .listAdministrativeDiv,
                    Stores.labStore.labs?.country,
                    Stores.labStore.labs?.state,
                    Stores.labStore.labs?.district,
                    Stores.labStore.labs?.city
                  ) &&
                    Utils.areaList(
                      AdministrativeDivStore.administrativeDivStore
                        .listAdministrativeDiv,
                      Stores.labStore.labs?.country,
                      Stores.labStore.labs?.state,
                      Stores.labStore.labs?.district,
                      Stores.labStore.labs?.city
                    ).map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {`${item}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            ),
          },
          {
            dataField: "postalCode",
            text: "Postal Code",
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
                <LibraryComponents.Atoms.Form.InputWrapper label="Postal Code">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const postalCode = e.target.value
                    props.onUpdateItem &&
                        props.onUpdateItem(postalCode,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {Utils.postCodeList(
                    AdministrativeDivStore.administrativeDivStore
                      .listAdministrativeDiv,
                    Stores.labStore.labs?.country,
                    Stores.labStore.labs?.state,
                    Stores.labStore.labs?.district,
                    Stores.labStore.labs?.city
                  ) &&
                    Utils.postCodeList(
                      AdministrativeDivStore.administrativeDivStore
                        .listAdministrativeDiv,
                      Stores.labStore.labs?.country,
                      Stores.labStore.labs?.state,
                      Stores.labStore.labs?.district,
                      Stores.labStore.labs?.city
                    ).map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {`${item}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            ),
          },

          {
            dataField: "address",
            text: "Address",
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
            ) => (
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
              </>
            ),
          },
          {
            dataField: "salesTerritory",
            text: "Sales Territory",
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
                <LibraryComponents.Atoms.Form.InputWrapper label="Sales Territory">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const salesTerritory = e.target.value
                    props.onUpdateItem &&
                        props.onUpdateItem(salesTerritory,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {SalesTeamStore.salesTeamStore.listSalesTeam &&
                    SalesTeamStore.salesTeamStore.listSalesTeam.map(
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
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },

          {
            dataField: "director",
            text: "Director",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "physician",
            text: "Physician",
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
            dataField: "contactNo",
            text: "Contact No",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },

          {
            dataField: "speciality",
            text: "Speciality",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "labType",
            text: "Lab Type",
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const labType = e.target.value
                      props.onUpdateItem && 
                        props.onUpdateItem(labType,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "LAB_TYPE").map(
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
            dataField: "openingTime",
            text: "Opening Time",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },

          {
            dataField: "closingTime",
            text: "Closing Time",
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
            dataField: "image",
            text: "Lab Log",
            sort: true,
            csvExport: false,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
                <>
                {row.image &&  <img
                    src={row.image}
                    alt="lab logo"
                    className='object-fill h-35 w-40 rounded-md'
                  /> }
                 
                </>
              )
            },
          },
          {
            dataField: "autoRelease",
            text: "Auto Release",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return <><LibraryComponents.Atoms.Form.Toggle
              value={row.autoRelease}
              onChange={(autoRelease) => {
                props.onUpdateItem &&
                  props.onUpdateItem(autoRelease, 'autoRelease', row._id)
              }}
            /></>
            },
            
          },
          {
            dataField: "requireReceveInLab",
            text: "Require Receve In Lab",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return <><LibraryComponents.Atoms.Form.Toggle
              value={row.requireReceveInLab}
              onChange={(requireReceveInLab) => {
                props.onUpdateItem &&
                props.onUpdateItem(requireReceveInLab, 'requireReceveInLab', row._id)
            }}
            /></>
            },
           
          },
          {
            dataField: "requireScainIn",
            text: "Require Scain In",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return <><LibraryComponents.Atoms.Form.Toggle
              value={row.requireScainIn}
              onChange={(requireScainIn) => {
                props.onUpdateItem &&
                props.onUpdateItem(requireScainIn, 'requireScainIn', row._id)
              }}
            /></>
            },
           
          },

          {
            dataField: "routingDept",
            text: "Routing Dept",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return <><LibraryComponents.Atoms.Form.Toggle
              value={row.routingDept}
              onChange={(routingDept) => {
                props.onUpdateItem &&
                props.onUpdateItem(routingDept, 'routingDept', row._id)
              }}
            /></>
            },
           
          },
          {
            dataField: "fyiLine",
            text: "Fyi Line",
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
                  </div>
              </>
            ),
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
      />
      </div>
    </>
  )
})
export default LabList
